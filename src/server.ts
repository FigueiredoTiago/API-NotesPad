// server.ts
import app from "./index"; // Importa o app configurado
const port = 3000; // Defina a porta que sua API vai rodar

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
