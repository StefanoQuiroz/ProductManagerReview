import React, { useContext, useEffect, useRef, useState } from 'react';
import { Form , Container, Row, Col, FormGroup, Label, Input, Button } from 'reactstrap';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useHistory, useParams } from 'react-router-dom';
import { MyContext } from '../views/Main';

const ProductoForm = (props) => {
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
    const {id} = useParams();
    const {create, update} = props;
    //volver que refresca y lleva ala ruta home
    //Validaciones       con Swal

    ///UpdateProduct
    useEffect(()=>{
        if(id){//me sirve para poder ver la data en el input y poder actualizar
            axios.get(`http://localhost:8000/api/product/${id}`)
            .then(response => setInputs(response.data.datos))// para actualizar products con lo nuevo de inputs
            .catch(err => Swal.fire({
                icon:'error',
                title:'Error',
                text: 'Ha ocurrido un error al obtener el producto especi'
            }))
        }
    }, [id]);

    const updateProduct = (event) => {
        axios.put(`http://localhost:8000/api/product/update/${id}`, inputs)
            .then(response => {
                const index = products.findIndex(res => res._id === id);
                products.splice(index, 1, inputs);
                setProducts(products);
                home(event);
            })
            .catch(err => Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Ha ocurrido un error al actualizar el producto'
            }))
    }



    ///
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
        history.push('/details');
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
        if(id){
            updateProduct(event);
        } else{
            createProduct(event);
        }

        console.log(inputs.titulo)

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
                        <Label for="Titulo">Title</Label>
                        <Input ref={useTitulo} type="text" name="titulo" value={inputs.titulo} id="Titulo" onChange={onChange}/>
                        {(inputs.titulo.length > 0 && inputs.titulo.length < 5) && <p>Ingrese un titulo con mas de 4 caracteres</p>}
                    </FormGroup>
                    </Col>
                </Row>
                <Row form>
                    <Col md={6}>
                    <FormGroup>
                        <Label for="precio">Price</Label>
                        <Input ref={usePrecio} type="text" name="precio"  value={inputs.precio} id="precio" onChange={onChange}/>
                        {(inputs.precio.length === 1) && <p>Ingrese un precio en numeros y en la moneda de su preferencia</p>}
                    </FormGroup>
                    </Col>
                </Row>
                <Row form>
                    <Col md={6}>
                    <FormGroup>
                        <Label for="descripcion">Description</Label>
                        <Input ref={useDescripcion} type="text" name="descripcion" value={inputs.descripcion} id="descripcion" onChange={onChange}/>
                        {(inputs.descripcion.length > 0 && inputs.descripcion.length < 5) && <p>Ingrese una descripción con mas de 4 caracteres</p>}
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
                    {create && <Button type="submit" style={{margin: '5px', width: '50%'}}>Create</Button>}
                    {update && <Button type="submit" style={{margin: '5px', width: '50%'}}>Update</Button>}
                    <Button type="button" style={{margin: '5px', width: '50%'}} onClick={(event) => {home(event)}}>Home</Button>

                    
                </Col>

            </Form>
        </Container>
    );
}

export default ProductoForm;
