import React, { useContext } from 'react';
import { Row, Table} from 'reactstrap';
import { MyContext } from '../views/Main';

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
                        <th>&nbsp;</th>
                        <th>{items.titulo}</th>
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
