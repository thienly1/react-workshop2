import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {ExportToExcel} from './ExportToExcel'

const API_URL="http://localhost:8080/api/v1/person";

function ExportList() {
  const [persons, setPersons] = useState([])
  const fileName = "peopleList"; // here enter filename for your excel file

  useEffect(() => {
    fetchData()
  }, []);

  const fetchData = () =>{
    axios.get(API_URL).then(response => {

    // reshaping the array
    const customHeadings = response.persons.map(person=>({
      "person Id": person.id,
      "person name": person.firstName + " " + person.lastName,
      "person email": person.email,
      "Title": person.title
    }))
     setPersons(customHeadings) 
    })
   }

  return (
    <div className='btn btn-outline-light text-dark'>
      <ExportToExcel apiData={persons} fileName={fileName} />
    </div>
  );
}

export default ExportList;