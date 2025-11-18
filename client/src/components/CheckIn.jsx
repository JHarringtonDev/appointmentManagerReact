import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { API_BASE } from "../apiConfig";
 
const Record = (props) => (
 <tr>
   <td>{props.record.fname}</td>
   <td>{`${props.record.lname[0].toUpperCase()}.`}</td>
   <td>
     <Link className="btn btn-link" to={`/patientConfirm/${props.record._id}`}>Check-in</Link>
   </td>
 </tr>
);
 
export default function Queue() {
 const [records, setRecords] = useState([]);
 
 // This method fetches the records from the database.
 useEffect(() => {
   async function getRecords() {
  const response = await fetch(`${API_BASE}/record/`);
 
     if (!response.ok) {
       const message = `An error occurred: ${response.statusText}`;
       window.alert(message);
       return;
     }
 
     const records = await response.json();
     setRecords(records);
   }
 
   getRecords();
 
   return;
 }, [records.length]);
 
 // This method will map out the records on the table
 function recordList() {
   return records.map((record) => {

    if(record.checkedIn === false){ return (
       <Record
         record={record}
         key={record._id}
       />
     );}
   });
 }
 // This following section will display the table with the records of individuals.
 return (
   <div>
     <h3>Check-in to your appointment</h3>
     <table className="table table-striped" style={{ marginTop: 20 }}>
       <thead>
         <tr>
           <th>First Name</th>
           <th>Last Name</th>
           <th></th>
         </tr>
       </thead>
       <tbody>{recordList()}</tbody>
     </table>
   </div>
 );
}
