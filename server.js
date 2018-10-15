const express = require("express");
const cors = require("cors");
const publicIp = require("public-ip");
const proxyaddr = require("proxy-addr");
const ipaddr = require("ipaddr.js");

const app = express();

app.use(cors({ optionSuccessStatus: 200 }));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

app.get("/api/me", async (req, res) => {
  //const ipAddress = proxyaddr(req, ["loopback", "54.211.63.22"]);
  //let test = ipaddr.parse(ipAddress).isIPv4MappedAddress();
  let ip = req.headers["x-forwarded-for"];
  let list = ip.split(",");

  res.send({
    ipAddress: list[list.length - 1],
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
