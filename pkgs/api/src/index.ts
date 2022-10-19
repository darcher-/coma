import cors from "cors";
import express from "express";
import { join } from "path";

express()
  .use(cors())
  .use(express.static(join(__dirname, "../../../dist")))
  .get("*", (_request: any, response: any) =>
    response.sendFile(join(__dirname, "../../../dist", "index.html")),
  )
  .listen(8080, () => console.log(`listening on localhost:8080`));
