import React, {useState, useEffect} from 'react';
import { useParams, useNavigate, Navigate } from 'react-router-dom';
import axios from 'axios';

const PersonDetails = () => {

    const API_URL = "http://localhost:8080/api/v1/person";

    let params = useParams();
    const navigate= useNavigate();
    const [id,setId] =useState(params.id);
    const [person, setPerson] = useState({id: 0, firstName: '', lastName: '',email: '', title: ''});

    useEffect(()=>{
        getPersonByID();
    }, []);

    const getPersonByID = async () =>{
        
        await axios
           .get(`${API_URL}/${id}`)
           .then((response) =>{
            if(response.status===200){
                console.log(`API: (ByID) Request was executed successfully!`);
                setPerson(response.data);
                console.log(response.data);
            }else{
                console.error(`API: Request was executed with status code ${response.status}`);
            }   
           }).catch(error=>{
            console.warn(`API: Request encounter an Error ${error}`);
           })
      }

    
    return (
        <div className="container">
            <div className="card mt-5">
                <div className="card-header bg-dark">
                    <h3 className="text-white">Personal Information</h3>
                </div>
                <div className="card-body col-sm-5">
                    <div className="form-floating my-3">
                        <h4>{person.title}</h4>
                        <p>#{person.id}</p>
                        <p>{person.firstName} {person.lastName}</p>
                        <p>{person.email}</p>

                    </div>
                </div>
                <div className="card-footer">
                    <button type="button" onClick={()=> navigate('/crud')}>Close</button>
                </div>
            </div>
        </div>
    )
};

export default PersonDetails;