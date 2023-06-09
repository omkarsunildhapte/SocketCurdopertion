const express = require("express");
const http = require("http");
const mysql = require("mysql");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:4200", // Update this with the correct origin of your Angular application
    methods: ["GET", "POST", "DELETE"], // Allow the necessary HTTP methods
    allowedHeaders: ["Content-Type", "Authorization"], // Specify the allowed request headers
    credentials: true, // Allow cookies and authorization headers
  },
});
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
    console.log("Socket connected:", socket.id);

    socket.on("get-data", () => {
      const query = "SELECT * FROM employee";
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
  const query = "SELECT * FROM employee";
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
  const { name, email } = req.body;
  const query = `INSERT INTO employee (name, email) VALUES (?, ?)`;
  const values = [name, email];

  connection.query(query, values, (err, result) => {
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
  const query = `DELETE FROM employee WHERE id = ?`;
  const values = [employeeId];

  connection.query(query, values, (err, result) => {
    if (err) {
      console.error("Error executing query: ", err);
      res.status(500).json({ error: "Error executing query" });
      return;
    }

    res.status(200).json({ message: "Employee deleted successfully" });
  });
});

app.put("/api/employees/:id", (req, res) => {
  const employeeId = req.params.id;
  const { name, email } = req.body;
  const query = "UPDATE employee SET name = ?, email = ? WHERE id = ?";
  const values = [name, email, employeeId];

  connection.query(query, values, (err, result) => {
    if (err) {
      console.error("Error executing query:", err);
      res.status(500).json({ error: "Error executing query" });
      return;
    }

    res.status(200).json({ message: "Employee updated successfully" });
  });
});

const port = 3000;
server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
