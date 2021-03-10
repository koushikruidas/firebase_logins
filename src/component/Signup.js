import React, { useRef, useState } from 'react';
import { Card, Button, Form, Alert } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Signup() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();
    const { signUp, currentUser } = useAuth();
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const history = useHistory();


    async function handleSubmit(e) {
        e.preventDefault();

        if (passwordRef.current.value !== passwordConfirmRef.current.value) {
            return setError("Password do not match!")
        }
        try {
            setError("")
            setIsLoading(true)
            await signUp(emailRef.current.value, passwordRef.current.value)
            history.push("/")
        } catch {
            setError("Failed to create an account")
        }

        setIsLoading(false)
    }

    return (
        <div>
            <Card>
                <Card.Body>
                    <h2 className="text-center mb-4">Sign Up</h2>
                    {error && <Alert variant='danger'>{error}</Alert>}
                    {currentUser && currentUser.email}
                    <Form>
                        <Form.Group id="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type='email' ref={emailRef} required />
                        </Form.Group>
                        <Form.Group id="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type='password' ref={passwordRef} required />
                        </Form.Group>
                        <Form.Group id="password-confirm">
                            <Form.Label>Password Confirmation</Form.Label>
                            <Form.Control type='password' ref={passwordConfirmRef} required />
                        </Form.Group>
                        <Button className="w-100" type='submit' onClick={handleSubmit} disabled={isLoading}>Sing Up</Button>
                    </Form>
                </Card.Body>
            </Card>
            <div className="w-100 text-center mt-2">
                Already have an account? <Link to="/logIn">Log In</Link>
            </div>
        </div>
    )
}