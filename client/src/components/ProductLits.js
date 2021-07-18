import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Row, Table, Button } from 'reactstrap';
import { MyContext } from '../views/Main';
import { FaPen, FaTrash } from "react-icons/fa";
import Swal from 'sweetalert2';
import axios from 'axios';
//crear un boton detail y que redireccione a nueva page con title, precio descripcion y fecha de producto

const ProductLits = () => {
    const {products, setProducts} = useContext(MyContext);

    const deleteProduct = (event, id) => {
        Swal.fire({
            icon: "warning",
            title: "Eliminar el producto",
            text: '¿Está seguro que desea eliminar el producto?',
            showCancelButton: true
        }).then(result => {
            if(result.value){
                axios.delete(` http://localhost:8000/api/product/delete/${id}`)
                    .then(response => {
                        const exceptDelete = products.filter(productsNotDelete => productsNotDelete._id !== id);//eliminar instantaneo
                        setProducts(exceptDelete);
                    })
                    .catch(err => Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: "Ocurrió un error al eliminar el producto"
                    }))
               
            }
        })
    }

    return (
        <Row>
            <Table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Title</th>
                        <th>Price</th>
                        <th>Description</th>
                        <th>Date</th>
                    </tr>
                </thead>
                <tbody>
                    {products && products.map((items, index) => (
                    <tr key={index}>
                        <th>
                            <Link to={`/update/${items._id}`}><FaPen style={{margin:'2px'}}/></Link>
                            <Button style={{margin:'2px'}} type="button" onClick={event => deleteProduct(event, items._id)}><FaTrash /></Button>
                        </th>
                        <th><Link to={`/details/${items._id}`}>{items.titulo}</Link></th>
                        <th>{items.precio}</th>
                        <th>{items.descripcion}</th>
                        <th>{items.fecha}</th>
                    </tr>))}
                </tbody>
            </Table>            
        </Row>
    );
}

export default ProductLits;
