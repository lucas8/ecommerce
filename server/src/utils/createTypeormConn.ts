import { getConnectionOptions, createConnection } from "typeorm";

export const createTypeormConn = async () => {
  const connectionOptions = await getConnectionOptions(
    process.env.NODE_ENV === "production" ? "production" : "default"
  );

  return process.env.NODE_ENV === "production"
    ? createConnection({
        ...(connectionOptions as any),
        name: "default",
        type: "postgres",
        url: process.env.DATABASE_URL as string
      })
    : createConnection({ ...connectionOptions, name: "default" });
};
