import express, { json } from "express";
import cookieParser from "cookie-parser";
import { SeedDatabase } from "./utils/seed";
import { requestLogger } from "./middlewares/logger";
import { errorHandler } from "./middlewares/errorHandler";
import cors from "cors";

const app = express();

const allowedOrigins = ["http://localhost:3000", "http://localhost:5173"];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  }),
);

SeedDatabase();

app.set("trust proxy", true);
app.use(json());
app.use(cookieParser());
app.use(requestLogger);

import routes from "./routes";

app.use(routes);
app.use(errorHandler);

export default app;
