import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { API_BASE } from "../apiConfig";
 
export default function PatientConfirm() {
  const [records, setRecords] = useState([]);
 const [form, setForm] = useState({
   phoneNumber: ''
 });
 const params = useParams();
 const navigate = useNavigate();
 let gRecords
 let gId = params.id.toString()
 
 useEffect(() => {
   async function fetchData() {
     const id = params.id.toString();
     
  const response = await fetch(`${API_BASE}/record/${params.id.toString()}`);
     gId = params.id.toString();
 
     if (!response.ok) {
       const message = `An error has occurred: ${response.statusText}`;
       window.alert(message);
       return;
     }
 
     const record = await response.json();
     if (!record) {
       window.alert(`Record with id ${id} not found`);
       navigate("/");
       return;
     }
 
     setForm(record);
   }
 
   

    // This method fetches the records from the database.

    fetchData();

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
  },[params.id, navigate], [records.length]);

 
 // These methods will update the state properties.
 function updateForm(value) {
   return setForm((prev) => {
     return { ...prev, ...value };
   });
 }

const result = records.find( ({ _id }) => _id === gId );
 
 async function onSubmit(e) {
   e.preventDefault();
   const editedPerson = {
     phoneNumber: form.phoneNumber
   };
  if(form.phoneNumber == result.phoneNumber){
    // This will send a post request to update the data in the database.
  await fetch(`${API_BASE}/update/${params.id}`, {
    method: "POST",
    body: JSON.stringify(editedPerson),
    headers: {
      'Content-Type': 'application/json'
    },
  });

  navigate("/Queue");
  }else{
    alert(`The phone number you have submitted is invalid`)
  }
   
 }

 // This following section will display the form that takes input from the user to update the data.
 return (
   <div>
     <h3>Check-in for your appointment.</h3>
     <form onSubmit={onSubmit}>
        
        <div className="form-group">
          <label htmlFor="phoneNumber">Phone Number:</label>
              <input
                className="form-control"
                type="tel"
                name="phoneNumber"
                id="phoneNumber"
                value={form.value}
                maxLength= "10"
                minLength= "10"
                onChange={(e) => updateForm({phoneNumber: e.target.value})}
                required
              />
            </div>
       
       <div className="form-group">
         <input
           type="submit"
           value="Check-in"
           className="btn btn-primary"
         />
       </div>
     </form>
   </div>
 );
}