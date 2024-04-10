const express = require("express");
const app = express();
app.use(express.json());

const connectToDatabase = require('../Common/database.cjs');

const { FPC, SMT, pgFETLPSQL_A1, client } = connectToDatabase();

module.exports.SerialCodeName = async function (req, res) {
    //app.post("/search/SerialCodeName", async (req, res) => {
  
    const { Code, Name } = req.body;
    console.log("Serial",Code,Name)
    if (Code != undefined && Name != undefined) {
      const searchQuery = `
      select
      tssm_sn_struc_code,
      tssm_sn_struc_name,
      tssm_sn_struc_upcount,
      tssm_sn_length,
      tssm_plant_flag,
      tssm_plant_code,
      tssm_plant_start_digit,
      tssm_plant_end_digit,
      tssm_week_flag,
      tssm_week_code,
      tssm_week_start_digit,
      tssm_week_end_digit,
      tssm_week_convert,
      tssm_week_convert_base,
      tssm_seq_flag,
      tssm_seq_format,
      tssm_seq_start_digit,
      tssm_seq_end_digit,
      tssm_seq_convert,
      tssm_seq_convert_base,
      tssm_eng_flag,
      tssm_eng_start_digit,
      tssm_eng_end_digit,
      tssm_rev_flag,
      tssm_rev_start_digit,
      tssm_rev_end_digit,
      tssm_checksum_flag,
      tssm_checksum_start_digit,
      tssm_checksum_end_digit,
      tssm_config_flag,
      tssm_config_start_digit,
      tssm_config_end_digit
  from
      "FETLPSQL_A1"."Traceability".trc_serial_structure_mst
  where
      tssm_sn_struc_code like '${Code}' || '%'
      and tssm_sn_struc_name like '${Name}' || '%'
  order by
      tssm_sn_struc_code,
      tssm_sn_struc_name
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

  module.exports.insertSerial_Master = async function (req, res) {
  
    const { 
      sn_code,
      sn_name,
      sn_upcount,
      sn_length,
      plant_flag,
      plant_code,
      plant_start_digit,
      plant_end_digit,
      week_flag,
      week_code,
      week_start_digit,
      week_end_digit,
      week_convert,
      week_convert_base,
      seq_flag,
      seq_format,
      seq_start_digit,
      seq_end_digit,
      seq_convert,
      seq_convert_base,
      eng_flag,
      eng_start_digit,
      eng_end_digit,
      rev_flag,
      rev_start_digit,
      rev_end_digit,
      checksum_flag,
      checksum_start_digit,
      checksum_end_digit,
      config_flag,
      config_start_digit,
      config_end_digit,
      emp_id,
      ip_address

    } = req.body;
    console.log("innn",sn_code,">>>>>>>>>>>>>>>",sn_upcount)
      const searchQuery = `
      insert
	into
	"FETLPSQL_A1"."Traceability".trc_serial_structure_mst
   (tssm_sn_struc_code,
	tssm_sn_struc_name,
	tssm_sn_struc_upcount,
	tssm_sn_length,
	tssm_plant_flag,
	tssm_plant_code,
	tssm_plant_start_digit,
	tssm_plant_end_digit,
	tssm_week_flag,
	tssm_week_code,
	tssm_week_start_digit,
	tssm_week_end_digit,
	tssm_week_convert,
	tssm_week_convert_base,
	tssm_seq_flag,
	tssm_seq_format,
	tssm_seq_start_digit,
	tssm_seq_end_digit,
	tssm_seq_convert,
	tssm_seq_convert_base,
	tssm_eng_flag,
	tssm_eng_start_digit,
	tssm_eng_end_digit,
	tssm_rev_flag,
	tssm_rev_start_digit,
	tssm_rev_end_digit,
	tssm_checksum_flag,
	tssm_checksum_start_digit,
	tssm_checksum_end_digit,
	tssm_config_flag,
	tssm_config_start_digit,
	tssm_config_end_digit,
	tssm_modified_by,
	tssm_modified_date,
	tssm_modified_ip)
values('${sn_code}',
'${sn_name}',
'${sn_upcount}',
'${sn_length}',
'${plant_flag}',
 ${plant_code ? `'${plant_code}'` : null},
 ${plant_start_digit ? `'${plant_start_digit}'` : null},
 ${plant_end_digit ? `'${plant_end_digit}'` : null},
'${week_flag}',
 ${week_code ? `'${week_code}'` : null},
 ${week_start_digit ? `'${week_start_digit}'` : null},
 ${week_end_digit ? `'${week_end_digit}'` : null},
'${week_convert}',
 ${week_convert_base ? `'${week_convert_base}'` : null},
'${seq_flag}',
 ${seq_format ? `'${seq_format}'` : null},
 ${seq_start_digit ? `'${seq_start_digit}'` : null},
 ${seq_end_digit ? `'${seq_end_digit}'` : null},
'${seq_convert}',
 ${seq_convert_base ? `'${seq_convert_base}'` : null},
'${eng_flag}',
 ${eng_start_digit ? `'${eng_start_digit}'` : null},
 ${eng_end_digit ? `'${eng_end_digit}'` : null},
'${rev_flag}',
 ${rev_start_digit ? `'${rev_start_digit}'` : null},
 ${rev_end_digit ? `'${rev_end_digit}'` : null},
'${checksum_flag}',
 ${checksum_start_digit ? `'${checksum_start_digit}'` : null},
 ${checksum_end_digit ? `'${checksum_end_digit}'` : null},
'${config_flag}',
 ${config_start_digit ? `'${config_start_digit}'` : null},
 ${config_end_digit ? `'${config_end_digit}'` : null},
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

    module.exports.updateSerial_Master = async function (req, res) {
  
      const { 
        sn_code,
      sn_name,
      sn_upcount,
      sn_length,
      plant_flag,
      plant_code,
      plant_start_digit,
      plant_end_digit,
      week_flag,
      week_code,
      week_start_digit,
      week_end_digit,
      week_convert,
      week_convert_base,
      seq_flag,
      seq_format,
      seq_start_digit,
      seq_end_digit,
      seq_convert,
      seq_convert_base,
      eng_flag,
      eng_start_digit,
      eng_end_digit,
      rev_flag,
      rev_start_digit,
      rev_end_digit,
      checksum_flag,
      checksum_start_digit,
      checksum_end_digit,
      config_flag,
      config_start_digit,
      config_end_digit,
      emp_id,
      ip_address,
  
      } = req.body;
      // console.log("nnnn",sht_code,)

        const searchQuery = `
        update "FETLPSQL_A1"."Traceability".trc_serial_structure_mst
        set
	        tssm_sn_struc_name = '${sn_name}',
	        tssm_sn_struc_upcount = '${sn_upcount}',
	        tssm_sn_length = '${sn_length}',
	        tssm_plant_flag = '${plant_flag}',
	        tssm_plant_code = ${plant_code ? `'${plant_code}'` : null},
	        tssm_plant_start_digit = ${plant_start_digit ? `'${plant_start_digit}'` : null},
	        tssm_plant_end_digit = ${plant_end_digit ? `'${plant_end_digit}'` : null},
	        tssm_week_flag = '${week_flag}',
	        tssm_week_code = ${week_code ? `'${week_code}'` : null},
	        tssm_week_start_digit = ${week_start_digit ? `'${week_start_digit}'` : null},
	        tssm_week_end_digit = ${week_end_digit ? `'${week_end_digit}'` : null},
	        tssm_week_convert = '${week_convert}',
	        tssm_week_convert_base = ${week_convert_base ? `'${week_convert_base}'` : null},
	        tssm_seq_flag = '${seq_flag}',
	        tssm_seq_format = ${seq_format ? `'${seq_format}'` : null},
	        tssm_seq_start_digit = ${seq_start_digit ? `'${seq_start_digit}'` : null},
	        tssm_seq_end_digit = ${seq_end_digit ? `'${seq_end_digit}'` : null},
	        tssm_seq_convert = '${seq_convert}',
	        tssm_seq_convert_base = ${seq_convert_base ? `'${seq_convert_base}'` : null},
	        tssm_eng_flag = '${eng_flag}',
	        tssm_eng_start_digit = ${eng_start_digit ? `'${eng_start_digit}'` : null},
	        tssm_eng_end_digit = ${eng_end_digit ? `'${eng_end_digit}'` : null},
	        tssm_rev_flag = '${rev_flag}',
	        tssm_rev_start_digit = ${rev_start_digit ? `'${rev_start_digit}'` : null},
	        tssm_rev_end_digit = ${rev_end_digit ? `'${rev_end_digit}'` : null},
	        tssm_checksum_flag = '${checksum_flag}',
	        tssm_checksum_start_digit = ${checksum_start_digit ? `'${checksum_start_digit}'` : null},
	        tssm_checksum_end_digit = ${checksum_end_digit ? `'${checksum_end_digit}'` : null},
	        tssm_config_flag = '${config_flag}',
	        tssm_config_start_digit = ${config_start_digit ? `'${config_start_digit}'` : null},
	        tssm_config_end_digit = ${config_end_digit ? `'${config_end_digit}'` : null},
	        tssm_modified_by = '${emp_id}',
	        tssm_modified_date = current_timestamp,
	        tssm_modified_ip = '${ip_address}'
        where
	        tssm_sn_struc_code = '${sn_code}'
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

      module.exports.delSerial_Master = async function (req, res) {
      
        const { sn_code } = req.body;
        console.log("delSerial",sn_code)
          const searchQuery = `
          DELETE FROM "FETLPSQL_A1"."Traceability".trc_serial_structure_mst	
          where tssm_sn_struc_code='${sn_code}'	          
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

    module.exports.runningCode = async function (req, res) {

        const searchQuery = `
        SELECT
	        'SM' || TO_CHAR(MAX(cast(SUBSTRING(TSSM_SN_STRUC_CODE, 3) as INTEGER))+ 1,
	        'FM00000') as F_RUNNIUNG
        FROM "FETLPSQL_A1"."Traceability".trc_serial_structure_mst
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