import React, { useContext, useRef, useState } from 'react';
import { Form , Container, Row, Col, FormGroup, Label, Input, Button } from 'reactstrap';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useHistory } from 'react-router-dom';
import { MyContext } from '../views/Main';

const ProductoForm = () => {
    const useTitulo = useRef(null);
    const usePrecio = useRef(null);
    const useDescripcion = useRef(null);
    const useFecha = useRef(null);
    const [inputs, setInputs] = useState({
        titulo:"",
        precio:"",
        descripcion:"",
        fecha: new Date()
    })

    const history = useHistory();
    const {products, setProducts} = useContext(MyContext);
    //volver que refresca y lleva ala ruta home
    //Validaciones       con Swal

    const createProduct = (event) => {
        axios.post("http://localhost:8000/api/product/create", inputs)
            .then(response => {
                if(response.data.datos) {
                    //setInputs(products.concat([response.data.datos]));
                    setProducts(products.concat([response.data.datos]));//funcion concatena un nuevo objeto como arreglo de products general;
                    home(event);
                } else { Swal.fire({    
                    icon: 'error',
                    title: 'Este campo es obligatorio',
                    text: response.data.error.message
            })}})
            
            .catch(err => Swal.fire({
                icon: 'error',
                title: "Error",
                text: "Ha ocurrido un error al crear un nuevo producto"
            }))
    }

    const home = (event) =>{
        history.push('/');
    }

    const onChange = (event) => {
        const {name, value} = event.target;
        setInputs({
            ...inputs,
            [name] : value
        })
    }

    const onSubmit = (event) => {
        event.preventDefault();
        createProduct(event);

        useTitulo.current.value="";
        usePrecio.current.value="";
        useDescripcion.current.value="";
        useFecha.current.value="";
    }

    return (
        <Container>
            <Row>
                <h1>Product Manager</h1>
            </Row>
            <Form onSubmit={onSubmit}>
                <Row form>
                    <Col md={6}>
                    <FormGroup>
                        <Label for="titulo">Title</Label>
                        <Input ref={useTitulo} type="text" name="titulo" value={inputs.titulo} id="titulo" onChange={onChange}/>
                    </FormGroup>
                    </Col>
                </Row>
                <Row form>
                    <Col md={6}>
                    <FormGroup>
                        <Label for="precio">Price</Label>
                        <Input ref={usePrecio} type="text" name="precio"  value={inputs.precio} id="precio" onChange={onChange}/>
                    </FormGroup>
                    </Col>
                </Row>
                <Row form>
                    <Col md={6}>
                    <FormGroup>
                        <Label for="descripcion">Description</Label>
                        <Input ref={useDescripcion} type="text" name="descripcion" value={inputs.descripcion} id="descripcion" onChange={onChange}/>
                    </FormGroup>
                    </Col>
                </Row>
                <Row form>
                    <Col md={6}>
                    <FormGroup>
                        <Label for="fecha">Date</Label>
                        <Input ref={useFecha} type="datetime-local" name="fecha" value={inputs.fecha} id="fecha" onChange={onChange}/>
                    </FormGroup>
                    </Col>
                </Row>
                <Col sm={{ size: 7, offset: 1 }}>
                    <Button type="submit" style={{margin: '5px', width: '50%'}}>create</Button>
                </Col>
            </Form>
        </Container>
    );
}

export default ProductoForm;
