import React, { useRef, useState } from 'react';
import { Card, Button, Form, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';


export default function SignIn() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const { signIn, currentUser } = useAuth();
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);


    async function handleSubmit(e) {
        e.preventDefault();

        try {
            setError("")
            setIsLoading(true)
            await signIn(emailRef.current.value, passwordRef.current.value)
            // history.push("/")
        } catch {
            setError("Failed to Log In")
        }

        setIsLoading(false)
    }

    return (
        <div>
            <Card>
                <Card.Body>
                    <h2 className="text-center mb-4">Sign In</h2>
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
                        <Button className="w-100" type='submit' onClick={handleSubmit} disabled={isLoading}>Log In</Button>
                    </Form>
                </Card.Body>
            </Card>
            <div className="w-100 text-center mt-2">
                Do not have any Account? <Link to="/signUp">Sign Up</Link>
            </div>
        </div>
    )
}