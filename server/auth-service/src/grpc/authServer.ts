import { config } from "@auth/Config";
import { getUserById } from "@auth/services/authService";
import * as grpc from "@grpc/grpc-js";
import * as protoLoader from "@grpc/proto-loader";
import { AuthProtoPath, winstonLogger } from "@ronasunil/jobber-shared";

const logger = winstonLogger(
  config.ELASTIC_SEARCH_ENDPOINT!,
  "Auth service",
  "info"
);

const checkUserExist = async function (
  call: grpc.ServerUnaryCall<any, any>,
  callback: grpc.sendUnaryData<any>
) {
  const { id } = call.request;

  const user = await getUserById(id);

  const userExist = user ? true : false;
  callback(null, { userExist });
};

export const startGrpcServer = function () {
  const authDef = protoLoader.loadSync(AuthProtoPath, {});

  const authProto = grpc.loadPackageDefinition(authDef) as any;

  const server = new grpc.Server();
  server.addService(authProto.auth.AuthService.service, { checkUserExist });
  server.bindAsync(
    "0.0.0.0:50051",
    grpc.ServerCredentials.createInsecure(),
    () => {
      logger.info("GRPC Auth service started running...");
    }
  );
};
