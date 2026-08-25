import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import cookieParser from "cookie-parser";

const app = express();

// Enable CORS for your frontend origin with credentials
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

// Parse JSON bodies
app.use(express.json());

// Parse cookies
app.use(cookieParser());

// ✅ Helmet with CORP set to "cross-origin" to allow cross-origin image loading
app.use(
  helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" },
  }),
);

// Request logging
app.use(morgan("dev"));

export default app;
