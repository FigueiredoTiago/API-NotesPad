// server.ts
import app from "./index"; // Importa o app configurado
import swaggerUi from "swagger-ui-express";
import yaml from "yamljs";
const port = 3000; // Defina a porta que sua API vai rodar

const swaggerDocument = yaml.load(__dirname + '/swagger.yaml');



app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(port, () => {
  console.log(`Server is running on port http://localhost:${port}`);
});
