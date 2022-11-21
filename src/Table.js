import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';

const Table = (props) => {
    const navigate = useNavigate();
    const handleDelete= props.handleDelete;

    const TableHeader=() =>{
        
        return (
            <thead>
                <tr>
                    <th scope='col'>Id</th>
                    <th scope='col'>Name</th>
                    <th scope='col'>Email</th>
                    <th scope='col'>Action</th>
                </tr>
            </thead>
        )
    }
    const TableAction =(props)=>{
        return(
            <>
            <button className='btn btn-primary' onClick={()=>navigate(`/details/${props.id}`)}>Details</button>
            <button className='btn btn-danger' onClick={()=> handleDelete(props.id)}>Delete</button>
            <button className='btn btn-warning' disabled>Edit</button>
            </>
        )        
    }

    const TableRow =() =>{
        return (
            <tbody>
                {
                    props.persons.map(person => {
                        const row= (
                            <tr key={person.id}>
                                <th scope='row'>{person.id}</th>
                                <td>{person.firstName} {person.lastName}</td>
                                <td>{person.email}</td>
                                <td><TableAction id={person.id} /></td>
                            </tr>
                        )
                        return row;
                    })
                }
            </tbody>
        )
    }
    return (
        <div className='container'>
            <table className='table table-striped'>            
                <TableRow/>
            </table>
            
        </div>
    );
};

export default Table;