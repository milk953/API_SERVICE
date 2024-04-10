const express = require("express");
const oracledb = require("oracledb");
const app = express();

const connectToDatabase = require('../Common/database.cjs');

const { FPC, SMT, pgFETLPSQL_A1, client } = connectToDatabase();

module.exports.getCurrentDate = async function (req, res) {
  try {
    const connection = await oracledb.getConnection(FPC);
    const result = await connection.execute("SELECT SYSDATE FROM DUAL");
    const currentDate = result.rows[0][0];
    await connection.close();

    res.json({ date: currentDate });
  } catch (error) {
    console.error("Error fetching current date:", error);
    res.status(500).json({ error: "An error occurred" });
  }
};

//Selct Menu Data/////////////////////////////////////////////////////////

module.exports.getFetch_menudata = async function (req, res) {
  try {
    const query = `select  tm.id as id
                  ,tmp.menu_name as parent_id
                ,tm.menu_name as menu_name
                ,tm.app_id as app_id
                ,tm.url as url
                ,tm.active_flag as active_flag
                ,tm.visible_flag as visible_flag
                ,tmp.seq , tm.seq
                from traceability.trace_menu tm inner join traceability.trace_menu tmp on tmp.id =tm.parent_id  
                where tm.parent_id is not null
                order by tmp.seq , tm.seq`;
    const { rows } = await client.query(query);
    res.json(rows);
  } catch (error) {
    console.error("Error querying PostgreSQL:", error.message);
    res
      .status(500)
      .json({ error: "An error occurred while querying the database." });
  }
};

////Search MenuName only////////////////////////

module.exports.postMenuname = async function (req, res) {
  //app.post("/search/MenuName", async (req, res) => {

  const { System, ParentMenuName, MenuName } = req.body;

  if (MenuName != undefined) {
    const searchQuery = `
    SELECT *
    FROM traceability.trace_menu
    WHERE menu_name = $1
  `;

    try {
      const result = await client.query(searchQuery, [MenuName]);
      const foundDataArray = result.rows;
      res.json(foundDataArray);
      //console.log("Path",foundDataArray)
    } catch (error) {
      console.error("Error searching data:", error);
      res
        .status(500)
        .json({ message: "An error occurred while searching data" });
    }
  }
};

module.exports.Menuname = async function (req, res) {
  try {
    const { login_id } = req.body;
    const connect = await oracledb.getConnection(FPC);
    const query = `
    SELECT
	   NM.MENU_ID,
	   NM.MENU_NAME ,
	   NM.URL ,
	   NM.SEQ ,
	   NM.ACTIVE_FLAG ,
	   NM.VISIBLE_FLAG ,
	   NM.PARENT_ID
    FROM
	   NAP_MAP_ROLE_USER NMRU
    INNER JOIN NAP_MAP_ROLE_MENU NMRM ON
	   NMRM.ROLE_ID = NMRU.ROLE_ID
    INNER JOIN NAP_MENU NM ON
	   NM.MENU_ID = NMRM.MENU_ID
    WHERE
	   NMRU.LOGIN_ID = '${login_id}'
	  AND NM.APP_ID = '16'
    ORDER BY NM.SEQ `;
    const result = await connect.execute(query);
    connect.release();
    res.json(result.rows);
  } catch (error) {
    console.error("ข้อผิดพลาดในการค้นหาข้อมูล:", error.message);
  }
};

