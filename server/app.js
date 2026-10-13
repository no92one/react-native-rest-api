import express from "express";

const app = express();
const port = 3000;

app.use(express.json());

const products = [
  {
    "id": 1,
    "name": "Laptop",
    "price": 9999
  },
  {
    "id": 2,
    "name": "Mus",
    "price": 499
  },
  {
    "id": 3,
    "name": "Tangentbord",
    "price": 899
  }
];

app.get("/api/products", (request, response) => {
  setTimeout(() => {
    return response.json(products);
  }, 3000);
});

app.listen(port, () => {
  console.log(`Server is live, go to http://localhost:${port}`);
});