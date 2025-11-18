import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Logout from './Logout'
import LoginButton from './LoginButton'
import { API_BASE } from "../apiConfig";

let newTime
 
const Record = (props) => {
  let time = props.record.appointmentTime.split(':')
      let hour = parseInt(time[0])
      if(hour > 12){
          newTime=`${hour-12}:${time[1]} p.m.`
      }else if(hour === 12){
          newTime = `${hour}:${time[1]} p.m.`
      }else{
          newTime = `${hour}:${time[1]} a.m.`
      }
 return(<tr>
   <td>{props.record.fname}</td>
   <td>{props.record.lname}</td>
   <td>{newTime}</td>
   <td>{props.record.phoneNumber}</td>
   <td>
     {/* <Link className="btn btn-link" to={`/edit/${props.record._id}`}>Edit</Link> | */}
     <button className="btn btn-link"
       onClick={() => {
         props.deleteRecord(props.record._id);
       }}
     >
       Delete
     </button>
   </td>
 </tr>)
};
 
export default function Dashboard() {
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
 
 // This method will delete a record
 async function deleteRecord(id) {
  await fetch(`${API_BASE}/${id}`, {
     method: "DELETE"
   });
 
   const newRecords = records.filter((el) => el._id !== id);
   setRecords(newRecords);
 }
 
 // This method will map out the records on the table
 function recordList() {
  {let appointments = records.map((record) => {
   return (
      <Record
        deleteRecord={() => deleteRecord(record._id)}
        record={record}
        key={record._id} 
      />
    );}
  )
  return appointments.sort((a,b) => {
    return a.props.record.appointmentTime < b.props.record.appointmentTime ? -1 : 1
  })};}
 const loggedIn = sessionStorage.getItem('token')
 // This following section will display the table with the records of individuals.
 if(loggedIn){
  return (
    <div className="appList">
      <h3>Appointment List</h3>
       <Logout />
      <table className="table table-striped" style={{ marginTop: 20 }}>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Time</th>
            <th>Phone #</th>
            <th></th>
          </tr>
        </thead>
        <tbody>{recordList()}</tbody>
      </table>
    </div>
  );
 }else{
   return(
  <LoginButton/>)
 }
}