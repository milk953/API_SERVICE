const express = require("express");
const oracledb = require("oracledb");
const { Client } = require("pg");
const app = express();
app.use(express.json());

const FPC = {
    user: "fpc",
    password: "fpc",
    connectString: "PCTTLIV",
};

const pgFETLPSQL_A1 = {
    user: "fetltrace",
    host: "10.17.66.120",
    database: "FETLPSQL_A1",
    password: "f3tltr@c3",
    port: 5432,
}

const client = new Client(pgFETLPSQL_A1);
client.connect();

module.exports.login = async function (req, res) {
    try {
        const { User, Password } = req.body;
        const connect = await oracledb.getConnection(FPC);
        const query = `
        SELECT NUL.LOGIN_ID ,NUL.FACTORY_CODE ,NUL.ID_CODE ,INITCAP(NUL.USER_NAME) AS USER_NAME,INITCAP(NUL.USER_SURNAME) AS USER_SURNAME,NUL.EMAIL_ADD 		
        FROM NAP_USER_LOGIN NUL		
        WHERE UPPER(NUL.USER_LOGIN) = UPPER('${User}')		
            AND UPPER(NUL.USER_PASSWORD) = UPPER('${Password}')		
            AND NUL.USER_STATUS = 'A' `;
        const result = await connect.execute(query);
        connect.release();
        res.json(result.rows);
    } catch (error) {
        console.error("ข้อผิดพลาดในการค้นหาข้อมูล:", error.message);
    }
};