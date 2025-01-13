import * as protoLoader from "@grpc/proto-loader";
import * as grpc from "@grpc/grpc-js";
import { SellerProtoPath, winstonLogger } from "@ronasunil/jobber-shared";
import { config } from "@user/Config";
import { SellerModel } from "@user/models/sellerModel";

const logger = winstonLogger(
  config.ELASTIC_SEARCH_ENDPOINT!,
  "User service",
  "info"
);

const checkUserIsSeller = async function (
  call: grpc.ServerUnaryCall<any, any>,
  callback: grpc.sendUnaryData<any>
) {
  const id = call.request;
  const seller = await SellerModel.findById(id);

  const sellerExist = seller ? true : false;

  callback(null, { sellerExist });
};

export const startGrpcuserServer = async function () {
  const sellerDef = protoLoader.loadSync(SellerProtoPath);
  const sellerProto = grpc.loadPackageDefinition(sellerDef) as any;

  const server = new grpc.Server();
  server.addService(sellerProto.seller.SellerService.service, {
    checkUserIsSeller,
  });

  server.bindAsync(
    "0.0.0.0:50052",
    grpc.ServerCredentials.createInsecure(),
    () => {
      logger.info("GRPC User service started running...");
    }
  );
};
