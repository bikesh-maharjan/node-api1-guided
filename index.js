const express = require("express"); //ComonJs modules, similar to above
const server = express();

//teaches epxress how to read JSON from req.body
server.use(express.json()); // needed fro the POST and PUT

server.get("/", (req, res) => {
  res.status(200).json({ hello: "Node 33!!" });
});

let hubs = [
  {
    id: 1,
    name: "node33 api intro",
    lessonId: 1,
    cohort: "node 33",
  },
  {
    id: 2,
    name: "node33 servers side running ",
    lessonId: 2,
    cohort: "node 33",
  },
];

//list hubs
server.get("/hubs", (req, res) => {
  res.status(200).json({ data: hubs });
});

server.post("/hubs", (req, res) => {
  const hub = req.body;
  hubs.push(hub);
  res.status(201).json({ data: hubs });
});

server.delete("/hubs/:id", (req, res) => {
  const id = Number(req.params.id);
  //all values coming from the URL are strings
  const newHubs = hubs.filter((hub) => hub.id !== id);
  //   res.status(204).end()
  res.status(204).json(newHubs);
});

server.put("/hubs/:id", (req, res) => {
  const changes = req.body;
  const id = Number(req.params.id);
  let found = hubs.find((h) => h.id === id);
  if (found) {
    Object.assign(found, changes);
    res.status(200).json(found);
  } else {
    res.status(404).json({ message: "not found" });
  }
  //   res.status(204).end()
  //   res.status(204).json(newHubs);
});

/*
- a unique `id`,
- a `name`,
-a `lessonId` that connects it to the corresonding lesson,
- a `

*/
const port = 8000;
server.listen(port, () => console.log("server is up..."));
