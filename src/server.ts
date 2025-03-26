// server.ts
import app from "./index"; // Importa o app configurado
import swaggerUi from "swagger-ui-express";
import yaml from "yamljs";
const port = 3000; // Defina a porta que sua API vai rodar
import dotenv from "dotenv";
dotenv.config();

const swaggerDocument = yaml.load(__dirname + "/swagger.yaml");

swaggerDocument.servers = [
  {
    url: process.env.SWAGGER_SERVER_URL || "http://localhost:3000",
    description: "Servidor de Produção",
  },
];

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(port, () => {
  console.log(`Server is running on port http://localhost:${port}`);
});
