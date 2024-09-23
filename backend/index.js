const fs = require("fs");
const express = require("express");
const app = express();

const connectToDb = require("./connect");
const cors = require("cors");
const authRouter = require("./routes/auth");
const bodyParser = require("body-parser");

const port = process.env.PORT || 8000;

app.use(
  cors({
    origin: "*",
    credentials: true,
    exposedHeaders: "X-token",
    "Acess-Control-Allow-Headers": "X-token",
  })
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Logging input request
app.use((req, res, next) => {
  const log = `\n${req.method} - ${req.url} - ${new Date()}`;
  fs.appendFile("log.txt", log, (err) => {
    if (err) console.log(err);
  });
  next();
});

app.use("/auth", authRouter);

// Handling errors
app.use((err, req, res, next) => {
  const log = `\n${req.method} - ${req.url} - ${new Date()} => ${err.stack}`;
  fs.appendFile("error.txt", log, (err) => {
    if (err) console.log(err);
  });

  res.status(500).json({ err });
});

// Connecting to DB and starting the server.
connectToDb()
  .then(() => {
    console.log("Connected to DB.");
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  })
  .catch((e) => console.log(e));
