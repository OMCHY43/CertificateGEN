import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser"; 


const app = express();
app.use(cookieParser()); // Middleware to handle cookies

const allowedOrigins = [
  process.env.FRONTEND_CORS_ORIGIN,
  process.env.ADMIN_CORS_ORIGIN,
];


app.use(
  cors({
    origin: function (origin, callback) {
      if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: "POST, GET, DELETE, PATCH, HEAD, PUT",
    credentials: true, 
  })
);

// Middleware setup
app.use(express.json({ limit: "100kb" }));
app.use(express.urlencoded({ extended: true, limit: "1mb" }));
app.use(express.static("public"));

// Import Routes
import RegisterRouter from "./Routes/certificates.routes.js";
import WorkShopRouter from "./Routes/WorkShop.routes.js";
import AdminLoginRoute from "./Routes/Admin.Login.routes.js";

// Endpoints
app.use("/api/v1/users", RegisterRouter);
app.use("/api/v1/admin", WorkShopRouter);
app.use("/api/v1/Admin", AdminLoginRoute);

export { app };