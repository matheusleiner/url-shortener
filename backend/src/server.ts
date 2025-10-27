import dotenv from "dotenv"; dotenv.config();
import connectToDatabase from "./config/db";
import app from "./app";

async function init(): Promise<void>
{
  await connectToDatabase();
  app.listen(process.env.PORT!, () => {
    console.log("Server running.");
    console.log(`PORT: ${process.env.PORT}`);
  });
}

init();
