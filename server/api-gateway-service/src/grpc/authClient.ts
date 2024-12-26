import { config } from "@gateway/Config";
import * as grpc from "@grpc/grpc-js";
import * as protoLoader from "@grpc/proto-loader";
import { AuthProtoPath, winstonLogger } from "@ronasunil/jobber-shared";

const logger = winstonLogger(
  config.ELASTIC_SEARCH_ENDPOINT!,
  "Gateway service",
  "info"
);

const createClient = function () {
  const authDef = protoLoader.loadSync(AuthProtoPath, {});
  const authProto = grpc.loadPackageDefinition(authDef).auth as any;

  const client = new authProto.AuthService(
    "localhost:50051",
    grpc.credentials.createInsecure()
  );

  return client;
};

export const checkUserExist = function (id: string): boolean {
  const client = createClient();
  let userExist = false;
  userExist = client.checkUserExist(
    { id },
    (error: grpc.ServiceError | null, response: any) => {
      if (error) return logger.info(error.message, error);
      userExist = response.userExist;
    }
  );

  return userExist;
};
