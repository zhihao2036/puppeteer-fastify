import { FastifyInstance, FastifyPluginOptions } from "fastify";
import plugin from "fastify-plugin";

export default plugin(
  async (app: FastifyInstance, opts: FastifyPluginOptions) => {
    const { prefix } = opts;

    app.register(import("~/routes/hello"), { prefix: prefix + "/hello" });
    app.register(import("~/routes/puppeteer"), { prefix: prefix + "/pu" });
  },
  { name: "router" }
);
