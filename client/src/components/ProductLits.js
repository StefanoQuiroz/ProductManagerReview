import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Row, Table} from 'reactstrap';
import { MyContext } from '../views/Main';
import { FaPen } from "react-icons/fa";
//crear un boton detail y que redireccione a nueva page con title, precio descripcion y fecha de producto

const ProductLits = () => {
    const {products} = useContext(MyContext);
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
                        <th><Link to={`/update/${items._id}`}><FaPen style={{margin:'2px'}}/></Link></th>
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
