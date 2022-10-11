import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

function Travel() {
    let count = 0;
    let token = JSON.parse(localStorage.getItem('token'));
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };
    const [items, setItems] = useState([]);
    useEffect(() => {
        loadTravels();
    }, []);

    const loadTravels = async () => {
        const result = await axios.get(" https://localhost:7244/api/Order/GetAllOrder");
        setItems(result.data)
        // console.log(result.data);
    }

    const deleteTravel = async id => {
    
        await axios.delete(`/api/Order/DeleteOrder/${id}`,
            config
        )
            .then(function (response) {

                Swal.fire(
                    "",
                    'Deleted',
                    'success'
                )
            })
            .catch(function (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Something went wrong!',
                    footer: '<a href="">Why do I have this issue?</a>'
                })

            });
         loadTravels();
              
    }
    const TravelUpdate = async id => {
        console.log(id);
    }
    return (
        <div>                
              <Button className="btn btn-success btn-fw">Create Travel</Button>
               <table className="table table-striped">
            <thead  >
                <tr>
                    <th>#No</th>
                    <th> Olke </th>
                    <th> Seher </th>
                    <th> Baslama Tarixi </th>
                    <th> Bitme Tarixi </th>
                    <th> Mebleg </th>
                    <th> Settings </th>
                </tr>
            </thead>
            <tbody>
                {
                    items.map((item =>
                        <tr key={item.id}>
                            <td>{++count}</td>
                            <td className="py-1 ">
                                <b>{item.countryId}</b>
                            </td>
                            <td className="py-1 ">
                                <b>{item.cityId}</b>

                            </td>
                            <td> <b>{item.startTime}</b></td>
                            <td> <b>{item.endTime}</b></td>
                            <td> <b>{item.cash}</b></td>
                            <td><Link to={`/travelupdate/${item.id}`}  ><button className='btn btn-outline-warning' onClick={() => TravelUpdate(item.id)} ><i className="far fa-edit"></i></button></Link>  <button className='btn btn-outline-danger' onClick={() => deleteTravel(item.id)}> <i className="fas fa-trash-alt"></i></button> </td>
                        </tr>
                    ))

                }
            </tbody>
        </table></div>
    )
}

export default Travel