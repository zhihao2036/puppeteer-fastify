import { join, resolve } from "path";
import fastifyStatic from "@fastify/static";
import { FastifyInstance } from "fastify";
import plugin from "fastify-plugin";
import { existsSync } from "fs";
import { mkdir } from "fs/promises";

export default plugin(async (app: FastifyInstance) => {
  const root = join(resolve(), "static");
  if (!existsSync(root)) {
    await mkdir(root);
  }
  app.register(fastifyStatic, {
    root,
    prefix: "/static/",
    index: false,
    // list: true
  });
});
