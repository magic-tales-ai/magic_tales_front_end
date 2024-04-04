import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import { connect } from 'react-redux';
import withRouter from "../../components/withRouter";

//components
import LoginForm from "../../components/Auth/Login/Form";

//redux store
import { loginUser, apiError } from '../../redux/actions';

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


const mapStateToProps = (state) => {
    const user = state.Auth.get('user');
    const loading = state.Auth.get('loading');
    const error = state.Auth.get('error');

    return { user, loading, error };
};

export default withRouter(connect(mapStateToProps, { loginUser, apiError })(Login));