import express, { json } from "express";
import cookieParser from "cookie-parser";
import { SeedDatabase } from "./utils/seed";
import { requestLogger } from "./middlewares/logger";
import { errorHandler } from "./middlewares/errorHandler";
import cors from "cors";

const app = express();

SeedDatabase();

app.use(
  // Whitelist frontend for cors
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  }),
);

app.set("trust proxy", true);
app.use(json());
app.use(cookieParser());
app.use(requestLogger);

import routes from "./routes";

app.use(routes);

app.use(errorHandler);

export default app;
