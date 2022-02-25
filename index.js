require('dotenv').config();
require('express-async-errors');

const express = require('express');

const { errorMiddleware } = require('./middlewares');

const { productsRouter, salesRouter } = require('./routes');

const app = express();

app.use(express.json());

app.use('/products', productsRouter);
app.use('/sales', salesRouter);

app.use(errorMiddleware);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.listen(process.env.PORT, () => {
  console.log(`Escutando na porta ${process.env.PORT}`);
});
