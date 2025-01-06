import fastify from "fastify";
import router from "./plugins/router";
import fastifyStatic from "./plugins/static";

export default () => {
  const app = fastify({
    logger: {
      transport: {
        target: "@fastify/one-line-logger",
      },
    },
  });

  app.register(router, { prefix: "/api" });
  app.register(fastifyStatic);

  return app;
};
