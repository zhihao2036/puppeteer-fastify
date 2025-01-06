// src/server.ts
import app from "./app";

const server = app();

const start = async () => {
  try {
    await server.listen({ host: "0.0.0.0", port: 3000 });
  } catch (err) {
    server.log.error(err);

    if (process.env.NODE_ENV === "production") {
      process.exit(1);
    }
  }
};

start();
