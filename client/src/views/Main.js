import React, { createContext, useEffect, useState } from 'react';
import { Container } from 'reactstrap';
import ProductoForm from '../components/ProductoForm';
import ProductLits from '../components/ProductLits';
import { BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
import Swal from 'sweetalert2';
import axios from 'axios';
//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FaPlus } from 'react-icons/fa';
import Details from '../components/Details';

export const MyContext = createContext(); 

const Main = () => {
    const [products, setProducts] = useState([]);
    useEffect(()=>{
        axios.get("http://localhost:8000/api/product")
            .then(response => setProducts(response.data.datos))
            .catch(err => Swal.fire({
                icon: 'error',
                title: 'Error',
                text : 'Ha ocurrido un error al obtener los datos'
            }))
    },[])
    return (
        <Container>
            <MyContext.Provider value={{products, setProducts}}>
                <Router>
                   {/*  <Link to={`/create/new`}>
                        <FaPlus style={{margin:'2rem'}}/>
                    </Link> */}
                    <Switch>
                        <Route path={`/create/new`}>
                            <ProductoForm/>            
                        </Route>
                        <Route path={`/details/:id`}>
                            <Details/>            
                        </Route>
                        <Route path={`/`}>
                            <Link to={`/create/new`}>
                                <FaPlus style={{margin:'2rem'}}/>
                            </Link>
                            <ProductLits/>            
                        </Route>
                        <Route path={`/details`}>
                            <Link to={`/create/new`}>
                                <FaPlus style={{margin:'2rem'}}/>
                            </Link>
                            <ProductLits/>            
                        </Route>
                    </Switch>
                </Router>
                
            </MyContext.Provider>
        </Container>
    );
}

export default Main;
