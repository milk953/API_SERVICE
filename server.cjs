const express = require("express");
const oracledb = require("oracledb");
const { Client } = require("pg");
const app = express();
const port = 5353;
const serverLogin = require("../Login/Login.cjs");
const serverMenu = require("../Page/Sidebar/menu.cjs");
const sheetmaster = require("../Page/Sheet Structure Master/sheetmaster.cjs");
const serialmaster = require("../Page/Serial Structure Master/serialMaster.cjs")

oracledb.initOracleClient({
  tnsAdmin: "D:\\app\\Administrator\\product\\11.2.0\\client_1\\network\\admin",
});

const FPC = {
  user: "fpc",
  password: "fpc",
  connectString: "PCTTLIV",
};

const SMT = {
  user: "SMT",
  password: "SMT",
  connectString: "NAPKDBSV",
};

const pgConfig = {
  user: "postgres",
  host: "10.17.66.120",
  database: "postgres",
  password: "postgres",
  port: 5432,
};

const pgFETLPSQL_A1 = {
  user: "fetltrace",
  host: "10.17.66.120",
  database: "FETLPSQL_A1",
  password: "f3tltr@c3",
  port: 5432,
}

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});
app.use(express.json());

const client = new Client(pgConfig, pgFETLPSQL_A1);
client.connect()
  .then(() => {
    console.log('Connected to PostgreSQL');
  })
  .catch(err => {
    console.error('Unable to connect to PostgreSQL:', err);
  });

// app.get("/checkconnect", async (req, res) => {
//   try {
//     const oracleConnection = await oracledb.getConnection(FPC);
//     if (oracleConnection) {
//       res.send("เชื่อมต่อสำเร็จ Oracle");
//     } else {
//       res.send("การเชื่อมต่อไม่สำเร็จ");
//     }
//     await oracleConnection.close();
//   } catch (error) {
//     console.error("เกิดข้อผิดพลาดในการเชื่อมต่อ:", error);
//     res.send("การเชื่อมต่อไม่สำเร็จ");
//   }
// });

//menuname
app.get("/current-date", serverMenu.getCurrentDate);
app.post("/MenuName", serverMenu.Menuname);
app.post("/login", serverLogin.login);


//Sheet Structure Master
app.post("/search/CodeName", sheetmaster.postCodeName);
app.post("/insSheet_Master", sheetmaster.insertSheet_Master);
app.post("/updateSheet_Master", sheetmaster.updateSheet_Master);
app.post("/delSheet_Master", sheetmaster.delSheet_Master);
app.post("/CheckSHTCode", sheetmaster.postSHTCode);

//Serial Structure Master
app.post("/Search/Serial", serialmaster.SerialCodeName);
app.post("/insSerial_Master", serialmaster.insertSerial_Master);
app.post("/updateSerial_Master", serialmaster.updateSerial_Master);
app.post("/delSerial_Master", serialmaster.delSerial_Master);
app.post("/CheckrunCode", serialmaster.runningCode);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});