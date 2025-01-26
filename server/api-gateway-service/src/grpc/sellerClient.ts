import * as protoLoader from "@grpc/proto-loader";
import * as grpc from "@grpc/grpc-js";
import { SellerProtoPath, winstonLogger } from "@ronasunil/jobber-shared";
import { config } from "@gateway/Config";

const logger = winstonLogger(
  config.ELASTIC_SEARCH_ENDPOINT!,
  "Gateway service",
  "info"
);

const createClient = function () {
  const sellerDef = protoLoader.loadSync(SellerProtoPath, {});
  const sellerProto = grpc.loadPackageDefinition(sellerDef) as any;

  const client = new sellerProto.SellerService().seller.SellerService(
    "localhost:50052",
    grpc.credentials.createInsecure()
  );

  return client;
};

export const checkUserIsSeller = function (username: string): boolean {
  const client = createClient();
  let isSeller = false;
  client.checkUserIsSeller(
    { username },
    (err: grpc.ServiceError | null, response: any) => {
      if (err) return logger.info(err.message, err);
      isSeller = response.sellerExist;
    }
  );

  return isSeller;
};
