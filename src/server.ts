import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { productsRoutes } from "./products/routes";


const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json());

// Rotas principais
app.use('/products', productsRoutes );

app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});
