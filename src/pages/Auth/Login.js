import React from 'react';
import { Container, Row, Col } from 'reactstrap';

// Components
import LoginForm from "../../components/Auth/Login/Form";

/**
 * Login component
 * @param {*} props 
 */
const Login = (props) => {

    return (
        <React.Fragment>
            <div className="account-pages my-5 pt-sm-5">
                <Container>
                    <Row className="justify-content-center">
                        <Col md={8} lg={6} xl={5} >
                            <LoginForm />
                        </Col>
                    </Row>
                </Container>
            </div>
        </React.Fragment>
    )
}

export default Login;