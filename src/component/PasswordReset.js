import React, {useRef, useState} from 'react';
import {Form, Button, Card, Alert} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import {useAuth} from '../context/AuthContext';

export default function PasswordReset() {
    const emailRef = useRef();
    const [error, setError] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const {resetPassword} = useAuth(); 
    const [message, setMessage] = useState("");

    async function handleSubmit(e) {
        e.preventDefault();
        try{
            setError("");
            setMessage("");
            setIsLoading(true);
            await resetPassword(emailRef.current.value);
            setMessage("check your email for further instruction")
        }catch{
            setError("Failed to send password reset email")
        }
        setIsLoading(false);
    }

    return (
        <div>
            <Card>
                <Card.Body>
                    <h2 className="text-center mb-4">Password Reset</h2>
                    {error && <Alert variant='danger'>{error}</Alert>}
                    {message && <Alert variant="success">{message}</Alert>}
                    <Form>
                        <Form.Group id="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type='email' ref={emailRef} required />
                        </Form.Group>
                        <Button className="w-100" type='submit' onClick={handleSubmit} disabled={isLoading}>Reset</Button>
                    </Form>
                </Card.Body>
            </Card>
            <div className="w-100 text-center mt-2">
                Log In? <Link to="/login">Log In</Link>
            </div>
        </div>
    );
}