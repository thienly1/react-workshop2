import React, { useState, useEffect} from 'react';
import axios from 'axios';
import Table from './Table';
import Form from './Form';
import ExportList from './ExportList';

const API_URL = "http://localhost:8080/api/v1/person";

const CrudDemo = () => {

    const [persons, setPersons] = useState([]);
    const [person, setPerson] = useState({id: 0, firstName: '', lastName: '',email: '', title: ''})
    const [loadData, setLoadData] = useState(false);

    useEffect(() =>{
        getAllData();
    }, [loadData])
    
    const getAllData = async () => {
        await axios
          .get(API_URL)
          .then((response) => {
            if(response.status===200){
                console.log(`API: (All) Request was executed Successfully!`);
              setPersons(response.data);
              console.table(response.data);
            }else{
                console.error(`API: Request was executed with status code ${response.status}`);
            }        
          }).catch((error) =>{
            console.warn(`API: Request Encounter an Error ${error}`);
          })
      };

      const deletePersonByID= async (id) =>{
        await axios.delete(`${API_URL}/${id}`).then(
            (response)=>{
                if(response===204){
                    console.log(`API: (Delete) Request was executed successfully!`);
                    setLoadData(!loadData);
                }else{
                    console.error(`API: Request was executed with status code ${response.status}`);                   
                }
            }).catch(error=>{
                console.warn(`API:Request encounter an Error ${error}`);
            })
      }
      const savePerson = async (data)=>{
        await axios.post(API_URL, data).then(
            (response) =>{
                console.log(response);
                if(response.status===201){
                    console.log(`API: (Save) Request was executed successfully!`);
                    setLoadData(!loadData);
                }else if(response.status===400){

                }else{
                    console.error(`API: Request was executed with status code ${response.status}`);
                }
            }).catch(error =>{
                console.warn(`API: Request Encounter an Error ${error}`);
            })

      }

    return (        
        <div className="container">        
           <div className="row"> 
                <Form handleSave={savePerson}/> 
                <div className='card'>
                    <div className='card-header bg-info text-white'>
                        <h4 className='d-grid col-md'>People List</h4>
                    </div>
                    <div className='card-body'>
                    <Table persons={persons} handleDelete={deletePersonByID} />
                    </div>
                    <div className='card-footer bg-info'>
                         <ExportList/> {/* because the backend Api datas are not saved in Json,but in H2 Database, so we are not able to use this function now.*/}
                    </div>
                </div>     
            </div>    
        </div>
    );
};

export default CrudDemo;