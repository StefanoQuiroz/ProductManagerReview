import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Row, Col, Button } from 'reactstrap';
const Details = () => {
    const {id} = useParams();
    const history = useHistory();
    const [details, setDetails] = useState([]);

    useEffect(()=>{
        axios.get(`http://localhost:8000/api/product/${id}`)
            .then(response => setDetails(response.data.datos))
            .catch(err => Swal.fire({
                icon: 'error',
                title: 'Error',
                text: `Ha ocurrido un error al obtener el producto ${id}`
            }))
    }, [id])

    const home = (event) => {
        history.push("/details");
    }

    return (
        <Row style={{marginTop:'5rem'}}>
            <Col md={6}>
                <h1>{details.titulo}</h1>
                <p><strong>Precio : </strong>{details.precio}</p>            
                <p><strong>Descripcion: </strong>{details.descripcion}</p>
                <p><strong>Fecha :</strong>{details.fecha}</p>            
            </Col>
            <Row md={6}>
                <Button type="button" onClick={(event) => home(event)}>Home</Button>
            </Row>
        </Row>
    );
}

export default Details;

