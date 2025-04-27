import express from "express";

const port = 3000;
const app = express();
app.use(express.static("public"));

app.get("/", (req, res) => {
  console.log("request recieved");
  //res.send("hello world2");
  res.sendFile("views/index.htm", { root: "." });
});

app.get("/todos", (req, res) => {
  res.sendFile("views/todos.htm", { root: "." });
});

app.listen(port, () => {
  console.log(`server has started in port ${port}`);
});
