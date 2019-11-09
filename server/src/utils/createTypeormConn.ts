import { getConnectionOptions, createConnection } from "typeorm";

export const createTypeormConn = async () => {
  const connectionOptions = await getConnectionOptions(
    process.env.NODE_ENV === "production" ? "production" : "default"
  );

  return createConnection({ ...connectionOptions, name: "default" });
};
