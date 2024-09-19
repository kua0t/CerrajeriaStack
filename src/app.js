import express from "express";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.routes.js";
import taskRoutes from "./routes/tasks.routes.js";
import { FRONTEND_URL, PORT } from "./config.js";
import { connectDB } from "./db.js";

const app = express();

app.use(cors({
  origin: 'https://cerrajeria-frontend.vercel.app',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
}));

app.use(express.json());
app.use(morgan("dev"));
app.use(cookieParser());

// Manejo de solicitudes OPTIONS para CORS
app.options('/api/recursos', (req, res) => {
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.sendStatus(204); // Respuesta sin contenido
});

// Rutas
app.use("/api/auth", authRoutes);
app.use("/api", taskRoutes);
app.post('/api/recursos', (req, res) => {
   res.status(200).json({ message: 'Recurso creado correctamente' });
});

async function startServer() {
  console.log("intento de inicio de server");
  try {
    await connectDB();
    console.log(`Environment: ${process.env.NODE_ENV}`);
    console.log("database connected");

    if (process.env.NODE_ENV === "production") {
      const path = (await import("path")).default;
      app.use(express.static("client/dist"));

      app.get("*", (req, res) => {
        console.log(path.resolve("client", "dist", "index.html"));
        res.sendFile(path.resolve("client", "dist", "index.html"));
      });
    }

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });

  } catch (error) {
    console.error("Error en el inicio del servidor:", error);
  }
}

startServer();
