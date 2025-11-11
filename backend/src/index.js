import app from "./app.js";
import { connectDB } from "./db.js";

// ...existing code...
async function start() {
  try {
    await connectDB();        
    console.log("MongoDB conectado");
    app.listen(4000, () => {
      console.log("Servidor en puerto 4000");
    });
  } catch (err) {
    console.error("Error conectando a MongoDB:", err);
    process.exit(1);
  }
}

start();
