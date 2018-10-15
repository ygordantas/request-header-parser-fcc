const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors({ optionSuccessStatus: 200 }));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

app.get("/api/me", async (req, res) => {
  const ipList = req.headers["x-forwarded-for"].split(",");
  const ipAddress = ipList[ipList.length - 1];

  res.send({
    ipAddress,
    language: req.headers["accept-language"],
    software: req.headers["user-agent"]
  });
});

app.get("*", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

const PORT = process.env.PORT || "5000";

app.listen(PORT, () => {
  console.log(`Your app is listening on port ${PORT}`);
});
