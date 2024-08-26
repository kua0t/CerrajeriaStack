import app from "./app.js";
import app from "./app.js";
import { PORT } from "./config.js";
import { connectDB } from "./db.js";

async function main() {
  try {
    await connectDB();
    console.log(`Environment: ${process.env.NODE_ENV}`);
  } catch (error) {
    console.error(error);
  }
}

export default app;

main();
