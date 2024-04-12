import React from 'react';
import { Container, Row, Col } from 'reactstrap';

// Components
import { RegisterForm } from "../../components/Auth/Register/Form";

/**
 * Register component
 * @param {*} props 
 */
const Register = (props) => {

    return (
        <React.Fragment>
            <div className="account-pages my-5 pt-sm-5">
                <Container>
                    <Row className="justify-content-center">
                        <Col md={8} lg={6} xl={5} >
                            <RegisterForm />
                        </Col>
                    </Row>
                </Container>
            </div>
        </React.Fragment>
    )
}

export default Register;