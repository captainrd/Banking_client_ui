import { useRef } from "react";
import { Button, Col, Container, Row, Form } from "react-bootstrap";
 
const Login = () => {
  const email = useRef("");
  const password = useRef("");
 
  const loginSubmit = async () => {};
  return (
    <>
      <Container className="mt-2">
        <Row>
          <Col className="col-md-8 offset-md-2">
            <legend>Login Form</legend>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" ref={email} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formPasswor">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" ref={password} />
            </Form.Group>
            <Button variant="primary" type="button" onClick={loginSubmit}>
              Login
            </Button>
          </Col>
        </Row>
      </Container>
    </>
  );
};
export default Login;