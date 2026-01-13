import express from "express";

const app = express();

const port = 3000;

app.use(express.json());

let teaDate = [];
let nextId = 1;

// add a tea
app.post("/teas", (req, res) => {
  const { name, price } = req.body;
  const newTea = { id: nextId++, name, price };
  teaDate.push(newTea);
  res.status(201).send(newTea);
});

// get all tea
app.get("/teas", (req, res) => {
  res.status(200).send(teaDate);
});

// get a tea with id
app.get("/teas/:id", (req, res) => {
  const tea = teaDate.find((t) => t.id === parseInt(req.params.id));
  console.log("body us", req.params.id);
  if (!tea) {
    return res.status(404).send("tea not found");
  } else {
    res.status(200).send(tea);
  }
});

// update tea
app.put("/teas/:id", (req, res) => {
  const tea = teaDate.find((t) => t.id === parseInt(req.params.id));
  if (!tea) {
    return res.status(404).send("tea not found");
  }
  const { name, price } = req.body;
  tea.name = name;
  tea.price = price;
  res.status(200).send(tea);
});

// delete tea
app.delete("/teas/:id", (req, res) => {
  const index = teaDate.findIndex((t) => t.id === parseInt(req.params.id));
  if (index === -1) {
    return res.status(404).send("tea not found");
  }
  teaDate.splice(index, 1);
  return res.status(204).send("deleted successfully");
});
app.listen(port, () => {
  console.log(`server is running at port ${port}`);
});
