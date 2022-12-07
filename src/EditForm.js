import React, {useState, useEffect} from 'react';
import { useParams, useNavigate} from 'react-router-dom';
import axios from 'axios';
import {useForm} from 'react-hook-form';

const EditForm = () => {

    const API_URL = "http://localhost:8080/api/v1/person";

    let params = useParams();
    const navigate= useNavigate();
    const [personId,setPersonId] =useState(params.id);
    const [person, setPerson] = useState({id: 0, firstName: '', lastName: '',email: '', title: ''});
    const {formState: {errors}}= useForm();
    const [loadData, setLoadData] = useState(false);


    useEffect(()=>{
        getPersonByID();
    }, [loadData])

    const getPersonByID = async () =>{        
        await axios
           .get(`${API_URL}/${personId}`)
           .then((response) =>{
            if(response.status===200){
                console.log(`API: (ByID) Request was executed successfully!`);
                console.log(response.data);
                setPerson(response.data);
                loadData(!loadData);
            }else{
                console.error(`API: Request was executed with status code ${response.status}`);
            }   
           }).catch(error=>{
            console.warn(`API: Request encounter an Error ${error}`);
           })
        
      }

      const updatePerson = async () =>{
        let data = {id: personId, firstName: person.firstName, lastName: person.lastName,email: person.email, title:person.title };
        await axios.put(API_URL, data).then(
            (response) =>{
                console.log(response);
                if(response.status===204){
                    console.log(`API: (Update) Request was executed successfully!`);
                }else if(response.status===400){
                    console.log(`API: (Update) Bad Request!`);
                }else{
                    console.error(`API: Request was executed with status code ${response.status}`);
                }
            }).catch(error =>{
                console.warn(`API: Request Encounter an Error ${error}`);
            })
      }


    const changeFirstName = (e) =>{
        const value= e.target.value;
        let _person ={...person, firstName:value};
        setPerson(_person)
    }

    const changeLastName = (e) =>{
        const value= e.target.value;
        let _person ={...person, lastName:value};
        setPerson(_person)
    }
    
    const changeTitle = (e) =>{
        const value= e.target.value;
        let _person ={...person, title:value};
        setPerson(_person)
    }

    const changeEmail = (e) =>{
        const value= e.target.value;
        let _person ={...person, email:value};
        setPerson(_person)
    }

    return (
        <div className='container col-10'>
            <form className='form-control my-4'>
                <h1 className='display-6 my-3'>Edit a Person</h1>
            
                <div className='form-floating my-3'>
                    <input
                    type='text'
                    className='form-control'
                    id='firstName'
                    onChange={changeFirstName}
                    value={person.firstName}                    
                    placeholder='Enter first name'

                    />
                    <label htmlFor='firstName'>Enter First Name</label>
                    {errors.firstName&& <span className='text-danger'>This is required</span>}
                </div>

                <div className='form-floating my-3'>
                    <input
                    type='text'
                    className='form-control'
                    id='lastName'
                    onChange={changeLastName}
                    value={person.lastName}
                    placeholder='Enter last name'
                    />
                    <label htmlFor='lastName'>Enter Last Name</label>
                    {errors.lastName&& <span className='text-danger'>This is required</span>}
                </div>
                <div className='form-floating my-3'>
                    <input
                    type='text'
                    className='form-control'
                    id='email'
                    onChange={changeEmail}
                    value={person.email}
                    placeholder='Enter email'
                    />
                    <label htmlFor='email'>Enter Email</label>
                    {errors.email&&<span className='text-danger'>This is required</span>}
                </div>
                <div className='form-floating my-3'>
                    <input
                    type='text'
                    className='form-control'
                    id='title'
                    onChange={changeTitle}
                    value={person.title}
                    placeholder='Enter Title'
                    />
                    <label htmlFor='title'>Enter Title</label>
                    {errors.title&&<span className='text-danger'>This is required</span>}
                </div>

                <div className='card-footer row justify-content-center mb-3'>
                    <button type='submit' className='btn btn-primary col-3' onClick={updatePerson}>Save</button>
                    <div className='col-4'></div>
                    <button type='button' className='btn btn-outline-warning col-3' onClick={()=>navigate('/crud')}>Back</button>
                </div>
            </form>            
        </div>
    );
};

export default EditForm;