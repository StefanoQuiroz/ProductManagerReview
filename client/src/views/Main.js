import React from 'react';
import { Container } from 'reactstrap';
import ProductoForm from '../components/ProductoForm';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';

const Main = () => {
    return (
        <Container>
            <Router>
                <Switch>
                    <Route path={`/`}>
                        <ProductoForm/>            
                    </Route>
                </Switch>
            </Router>
        </Container>
    );
}

export default Main;
