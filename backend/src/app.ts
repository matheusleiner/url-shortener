import express from "express";
import setupMiddlewares from "./config/express";
import urlRoutes from "./routes/url.routes";

const app = express();
setupMiddlewares(app);
app.use(urlRoutes);

export default app;
