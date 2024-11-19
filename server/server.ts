import express, { Request, Response } from 'express';
import userRoutes from './src/routes/userRoutes';
import supplierRoutes from './src/routes/supplierRoutes';
import customerRoutes from './src/routes/customerRoutes';
import productRoutes from './src/routes/productRoutes';
import orderRoutes from './src/routes/orderRoutes';
import orderItemRoutes from './src/routes/orderItemRoutes';

import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';

const app = express();
dotenv.config();
app.use(express.json());

app.use(cors({
  origin: '*', 
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req: Request, res: Response) => {
  console.log('Raiz do servidor acessada');
  res.send('Servidor rodando com TypeScript e Express!');
});

app.use('/api/users', userRoutes);
app.use('/api/suppliers', supplierRoutes);
app.use('/api/customers', customerRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/orderItem', orderItemRoutes);


app.get('/', (req: Request, res: Response) => {
  res.send('Servidor rodando com TypeScript e Express!');
});

app.listen(3000, () => {
  console.log('Servidor ta rodando na porta 3000');
});
