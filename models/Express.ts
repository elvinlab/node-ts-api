import express from "express";

require("dotenv").config();

const cors = require("cors");

const app = express();

app.use(cors());

app.get("/", (req, res) => res.send("Express + TypeScript Server"));

app.listen(process.env.PORT, () => {
  console.log(
    `⚡️[server]: Server is running at https://localhost:${process.env.PORT}`
  );
});
