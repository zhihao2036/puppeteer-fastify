import type { FastifyInstance } from "fastify";
import { randomUUID } from "node:crypto";
import { join, resolve } from "node:path";
import puppeteer from "puppeteer";
import { BaseResponseType } from "~/types/base";
import { ScreenshotType } from "~/types/puppeteer";

export default async (app: FastifyInstance) => {
  // $ curl http://127.0.0.1:3000/api/test
  app.get("/test", async (req, reply) => {
    // Launch the browser and open a new blank page
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // Navigate the page to a URL
    await page.goto("https://developer.chrome.com/");

    // Set screen size
    await page.setViewport({ width: 1080, height: 1024 });

    // Type into search box
    await page.type(".devsite-search-field", "automate beyond recorder");

    // Wait and click on first result
    const searchResultSelector = ".devsite-result-item-link";
    await page.waitForSelector(searchResultSelector);
    await page.click(searchResultSelector);

    // Locate the full title with a unique string
    const textSelector = await page.waitForSelector(
      "text/Customize and automate"
    );
    const fullTitle = await textSelector?.evaluate((el) => el.textContent);

    // Print the full title
    req.log.info('The title of this blog post is "%s".', fullTitle);

    await browser.close();

    return reply.send({
      code: 200,
      data: fullTitle,
    });
  });

  // $ curl http://127.0.0.1:3000/api/screenshot
  app.post<{ Body: ScreenshotType; Reply: BaseResponseType }>(
    "/screenshot",
    async (req, reply) => {
      req.log.info(req.body.url);
    
      const browser = await puppeteer.launch();
      const page = await browser.newPage();
      await page.goto(req.body.url, {
        waitUntil: "networkidle2",
      });

      const absPath = join(resolve(), "static", `${randomUUID()}.png`);

      await page.screenshot({
        path: absPath,
      });

      await browser.close();
      const relativePath = absPath.replace(resolve(), "");
      return reply.send({
        code: 200,
        data: relativePath,
      });
    }
  );
};
