const express = require('express');
const { PrismaClient } = require('@prisma/client');

const app = express();
const prisma = new PrismaClient();
const port = process.env.PORT || 3000

app.use(express.json());
app.get('/', (req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.write('<h1>Investment dashboard api!</h1>');
  res.end();
});

app.get('/transaction', async (req, res) => {
  const transactions = await prisma.transaction.findMany();
  res.json(transactions);
});

app.post(`/post`, async (req, res) => {
  const { date, amount, price, currency, assetName, category, portfolio } = req.body
  const result = await prisma.transaction.create({
    data: {
      date,
      amount,
      price,
      currency,
      name: assetName,
      category,
      portfolio
    },
  })
  res.json(result)
});

app.listen(port, () =>
  console.log(`Server ready on port ${port}`),
)
