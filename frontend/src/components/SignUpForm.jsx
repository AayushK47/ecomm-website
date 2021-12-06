import * as yup from 'yup';
import { useState, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Form, Button, Spinner, Alert } from "react-bootstrap";

import { UserContext } from '../context/UserContext';

const schema = yup.object({
    name: yup.string("Please enter your name").required(),
    email: yup.string("Please enter your email").email("Please enter a valid email").required(),
    password: yup.string("Please enter a password").min(8, "Password should have minimum 8 characters").required()
}).required();

function SignUpForm(props) {
    const { setUser } = useContext(UserContext);
    const [loading, setLoading] = useState(false);
    const [error, seterror] = useState('');
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });

    async function onSubmit(formData) {
        setLoading(true);
        const response = await fetch(`http://localhost:3001/api/register`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });
        const json = await response.json();
        console.log(json);
        if(response.status === 201) {
            localStorage.setItem('token', json.token);
            setUser(json.user);
            props.setShowSignUp(false);
        } else {
            seterror(json.message)
        }
        setLoading(false);
    }
    return (
        <>
            {   
                !!error &&
                <Alert variant="danger">
                    { error }
                </Alert>
            }
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Form.Group className="mb-3">
                    <Form.Label>Name</Form.Label>
                    <Form.Control {...register("name")} type="text" placeholder="Enter your name" />
                    <p className="text-danger">{ errors.name?.message }</p>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control {...register("email")} type="email" placeholder="Enter email" />
                    <p className="text-danger">{ errors.email?.message }</p>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control {...register("password")} type="password" placeholder="Password" />
                    <p className="text-danger">{ errors.password?.message }</p>
                </Form.Group>
                <div className="text-center">
                    <Button variant="primary" style={{ width: '60%' }} size="lg" type="submit">
                        { loading ? <Spinner animation="border" /> : "Submit"}
                    </Button>
                </div>
            </Form>
        </>
    )
}

export default SignUpForm;