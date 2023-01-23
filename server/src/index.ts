import express, { Application, NextFunction, Request, Response } from "express";
import routes from "./routes";
import errorMiddleware from "./middleware/error.middleware";
import config from "./config";
import cors from "cors";

const app: Application = express();

const PORT = config.PORT || 3000;
// create an instance server

app.use(
  cors({
    origin: "*",
  })
);

// Middleware to parses incoming requests with JSON payloads and is based on body-parser.
app.use(express.json());

app.use("/api", routes);

app.get("/", function (_req: Request, res: Response, Next: NextFunction) {
  try {
    res.send("Hello World");
  } catch (err) {
    Next(err);
  }
});

app.use((_req: Request, res: Response, Next: NextFunction) => {
  try {
    throw Error("ohh you are lost");
  } catch (err) {
    Next(err);
  }
});
app.use(errorMiddleware);

app.listen(PORT, (): void => {
  console.log(`Application started in http://localhost:${PORT}`);
});

export default app;
