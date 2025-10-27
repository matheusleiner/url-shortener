import express, { Application } from "express";
import cors from "cors";

export default function setupMiddlewares(app: Application): void
{
  app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
  }));
  app.use(express.json());
};
