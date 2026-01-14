import express from "express";
import "dotenv/config";

//using loggers
import logger from "./logger.js";
import morgan from "morgan";

const app = express();

const port = process.env.PORT || 3000;

app.use(express.json());

const morganFormat = ":method :url :status :response-time ms";

app.use(
  morgan(morganFormat, {
    stream: {
      write: (message) => {
        const logObject = {
          method: message.split(" ")[0],
          url: message.split(" ")[1],
          status: message.split(" ")[2],
          responseTime: message.split(" ")[3],
        };
        logger.info(JSON.stringify(logObject));
      },
    },
  })
);

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
