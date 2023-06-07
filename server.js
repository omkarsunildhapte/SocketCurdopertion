const express = require("express");
const http = require("http");
const mysql = require("mysql");
const { Server } = require("socket.io");
const cors = require("cors");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new Server(server);

const dbConfig = {
  host: "localhost",
  user: "root",
  password: "",
  database: "socket",
};

const connection = mysql.createConnection(dbConfig);

connection.connect((err) => {
  if (err) {
    console.error("Error connecting to database: ", err);
    return;
  }

  console.log("Connected to database");
  io.on("connection", (socket) => {
    socket.on("get-data", () => {
      const query = "SELECT * FROM emp";
      connection.query(query, (err, results) => {
        if (err) {
          console.error("Error executing query: ", err);
          return;
        }
        socket.emit("data", results);
      });
    });
  });
});

app.get("/api/employees", (req, res) => {
  const query = "SELECT * FROM emp";
  connection.query(query, (err, results) => {
    if (err) {
      console.error("Error executing query: ", err);
      res.status(500).json({ error: "Error executing query" });
      return;
    }
    res.status(200).json(results);
  });
});
app.post("/api/employees", (req, res) => {
  const { name, age, position } = req.body;
  const query = `INSERT INTO emp (name, age, position) VALUES ('${name}', ${age}, '${position}')`;
  connection.query(query, (err, result) => {
    if (err) {
      console.error("Error executing query: ", err);
      res.status(500).json({ error: "Error executing query" });
      return;
    }
    res.status(200).json({
      message: "Employee added successfully",
      insertedId: result.insertId,
    });
  });
});
app.delete("/api/employees/:id", (req, res) => {
  const employeeId = req.params.id;
  const query = `DELETE FROM emp WHERE id = ${employeeId}`;
  connection.query(query, (err, result) => {
    if (err) {
      console.error("Error executing query: ", err);
      res.status(500).json({ error: "Error executing query" });
      return;
    }

    res.status(200).json({ message: "Employee deleted successfully" });
  });
});

const port = 3000;
server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
