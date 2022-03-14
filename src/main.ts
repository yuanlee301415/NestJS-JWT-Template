const path = require("path");

import { NestFactory } from "@nestjs/core";
import { ValidationPipe } from "@nestjs/common";
import * as serveStatic from "serve-static";

import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix("api/v1");
  app.useGlobalPipes(new ValidationPipe());
  app.use(
    "/public",
    serveStatic(path.resolve("uploads"), {
      maxAge: "1d",
      extensions: ["jpg", "jpeg", "png", "gif"],
    })
  );
  await app.listen(process.env.PORT);
  console.log(
    `[${process.env.NAME}] is running on: ${await app.getUrl()}`,
    new Date()
  );
}

bootstrap();
