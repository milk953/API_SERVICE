const express = require("express");
const app = express();
app.use(express.json());

const connectToDatabase = require('../Common/database.cjs');

const { FPC, SMT, pgFETLPSQL_A1, client } = connectToDatabase();

module.exports.postCodeName = async function (req, res) {
    //app.post("/search/CodeName", async (req, res) => {
  
    const { Code, Name } = req.body;
    console.log("เข้าม",Code,Name)
    if (Code != undefined && Name != undefined) {
      const searchQuery = `
   select
      tstm_sht_struc_code,
      tstm_sht_struc_name,
      tstm_plant_flag,
      tstm_plant_code,
      tstm_plant_start_digit,
      tstm_plant_end_digit,
      tstm_lot_flag,
      tstm_lot_start_digit,
      tstm_lot_end_digit,
      tstm_model_flag,
      tstm_model_start_digit,
      tstm_model_end_digit,
      tstm_seq_flag,
      tstm_seq_format,
      tstm_seq_start_digit,
      tstm_seq_end_digit
  from
  "FETLPSQL_A1"."Traceability".trc_sheet_structure_mst tssm
  where
      tstm_sht_struc_code like '${Code}' || '%'
      and tstm_sht_struc_name like '${Name}' || '%'
  order by
      tstm_sht_struc_code,
      tstm_sht_struc_name
    `;
  
      try {
        const result = await client.query(searchQuery);
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

  module.exports.insertSheet_Master = async function (req, res) {
  
    const { 
      sht_code,
      sht_name,
      plant_flag,
      plant_code,
      plant_start_digit,
      plant_end_digit,
      lot_flag,
      lot_start_digit,
      lot_end_digit,
      model_flag,
      model_start_digit,
      model_end_digit,
      seq_flag,
      seq_format,
      seq_start_digit,
      seq_end_digit,
      emp_id,
      ip_address

    } = req.body;
    console.log("innn",sht_code,">>>>>>>>>>>>>>>",plant_start_digit)
      const searchQuery = `
      insert into "FETLPSQL_A1"."Traceability".trc_sheet_structure_mst
      (tstm_sht_struc_code,
      tstm_sht_struc_name,
      tstm_plant_flag,
      tstm_plant_code,
      tstm_plant_start_digit,
      tstm_plant_end_digit,
      tstm_lot_flag,
      tstm_lot_start_digit,
      tstm_lot_end_digit,
      tstm_model_flag,
      tstm_model_start_digit,
      tstm_model_end_digit,
      tstm_seq_flag,
      tstm_seq_format,
      tstm_seq_start_digit,
      tstm_seq_end_digit,
      tstm_modified_by,
      tstm_modified_date,
      tstm_modified_ip)
    values('${sht_code}',
      '${sht_name}',
      '${plant_flag}',
       ${plant_code ? `'${plant_code}'` : null},
       ${plant_start_digit ? `'${plant_start_digit}'` : null},
       ${plant_end_digit ? `'${plant_end_digit}'` : null},
      '${lot_flag}',
       ${lot_start_digit ? `'${lot_start_digit}'` : null},
       ${lot_end_digit ? `'${lot_end_digit}'` : null},
      '${model_flag}',
       ${model_start_digit ? `'${model_start_digit}'` : null},
       ${model_end_digit ? `'${model_end_digit}'` : null},
      '${seq_flag}',
       ${seq_format ? `'${seq_format}'` : null},
       ${seq_start_digit ? `'${seq_start_digit}'` : null},
       ${seq_end_digit ? `'${seq_end_digit}'` : null},
      '${emp_id}',
      current_timestamp,
      '${ip_address}')
    `;
  //console.log(searchQuery)
      try {
        const result = await client.query(searchQuery);
        const foundDataArray = result.rows;
        res.json(foundDataArray);
        //console.log("Path",foundDataArray)
      } catch (error) {
        console.error("Error searching data:", error);
        res
          .status(500)
          .json({ message: "An error occurred while searching data" });
      }
    };

    module.exports.updateSheet_Master = async function (req, res) {
  
      const { 
        sht_code,
        sht_name,
        plant_flag,
        plant_code,
        plant_start_digit,
        plant_end_digit,
        lot_flag,
        lot_start_digit,
        lot_end_digit,
        model_flag,
        model_start_digit,
        model_end_digit,
        seq_flag,
        seq_format,
        seq_start_digit,
        seq_end_digit,
        emp_id,
        ip_address,
  
      } = req.body;
      // console.log("nnnn",sht_code,
      // sht_name,
      // plant_flag,
      // plant_code,
      // plant_start_digit,
      // plant_end_digit,
      // lot_flag,
      // lot_start_digit,
      // lot_end_digit,
      // model_flag,
      // model_start_digit,
      // model_end_digit,
      // seq_flag,
      // seq_format,
      // seq_start_digit,
      // seq_end_digit,
      // emp_id,
      // ip_address,)
        const searchQuery = `
        update "FETLPSQL_A1"."Traceability".trc_sheet_structure_mst			
        set tstm_sht_struc_name = '${sht_name}'			
          , tstm_plant_flag = '${plant_flag}'			
          , tstm_plant_code = ${plant_code ? `'${plant_code}'` : null}		
          , tstm_plant_start_digit = ${plant_start_digit ? `'${plant_start_digit}'` : null}			
          , tstm_plant_end_digit = ${plant_end_digit ? `'${plant_end_digit}'` : null}			
          , tstm_lot_flag = '${lot_flag}'			
          , tstm_lot_start_digit = ${lot_start_digit ? `'${lot_start_digit}'` : null}			
          , tstm_lot_end_digit = ${lot_end_digit ? `'${lot_end_digit}'` : null}			
          , tstm_model_flag = '${model_flag}'			
          , tstm_model_start_digit = ${model_start_digit ? `'${model_start_digit}'` : null}			
          , tstm_model_end_digit = ${model_end_digit ? `'${model_end_digit}'` : null}			
          , tstm_seq_flag = '${seq_flag}'			
          , tstm_seq_format = ${seq_format ? `'${seq_format}'` : null}			
          , tstm_seq_start_digit = ${seq_start_digit ? `'${seq_start_digit}'` : null}			
          , tstm_seq_end_digit = ${seq_end_digit ? `'${seq_end_digit}'` : null}			
          , tstm_modified_by = '${emp_id}'			
          , tstm_modified_date = current_timestamp			
          , tstm_modified_ip = '${ip_address}'			
        where tstm_sht_struc_code='${sht_code}'
      `;
    //console.log(searchQuery)
        try {
          const result = await client.query(searchQuery);
          const foundDataArray = result.rows;
          res.json(foundDataArray);
          //console.log("Path",foundDataArray)
        } catch (error) {
          console.error("Error searching data:", error);
          res
            .status(500)
            .json({ message: "An error occurred while searching data" });
        }
      };

      module.exports.delSheet_Master = async function (req, res) {
      
        const { sht_code } = req.body;
        console.log(",,,,",sht_code)
          const searchQuery = `
          DELETE FROM "FETLPSQL_A1"."Traceability".trc_sheet_structure_mst	
          where tstm_sht_struc_code='${sht_code}'	          
        `;
      
          try {
            const result = await client.query(searchQuery);
            const foundDataArray = result.rows;
            res.json(foundDataArray);
            //console.log("Path",foundDataArray)
          } catch (error) {
            console.error("Error searching data:", error);
            res
              .status(500)
              .json({ message: "An error occurred while searching data" });
          }
        
      };

    module.exports.postSHTCode = async function (req, res) {

        const searchQuery = `
        SELECT 'SM' || TO_CHAR(MAX(CAST(SUBSTRING(TSTM_SHT_STRUC_CODE, 3) AS INTEGER))+1, 'FM00000') as F_RUNNIUNG
        FROM "FETLPSQL_A1"."Traceability".trc_sheet_structure_mst
      `;
    
        try {
          const result = await client.query(searchQuery);
          const foundDataArray = result.rows;
          res.json(foundDataArray); 
          //console.log("Path",foundDataArray)
        } catch (error) {
          console.error("Error searching data:", error);
          res
            .status(500)
            .json({ message: "An error occurred while searching data" });
        }
    
    };