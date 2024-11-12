import express from 'express';
import userRoutes from './src/routes/userRoutes';
import supplierRoutes from './src/routes/supplierRoutes';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';

const app = express();
dotenv.config();
app.use(express.json());

app.use(cors());
app.use(bodyParser.json());

app.use('/api/users', userRoutes);
app.use('/api/suppliers', supplierRoutes);

app.listen(3000, () => {
  console.log('Servidor ta rodando na porta 3000');
});
