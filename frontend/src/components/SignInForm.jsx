import * as yup from 'yup';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Form, Button, Alert, Spinner } from "react-bootstrap";

const schema = yup.object({
    email: yup.string("Please enter your email").email("Please enter a valid email").required(),
    password: yup.string("Please enter your password").required()
}).required();

function SignInForm(props) {
    const [loading, setLoading] = useState(false);
    const [error, seterror] = useState('');
    const { register, handleSubmit, formState: { errors }} = useForm({
        resolver: yupResolver(schema)
    })

    async function onSubmit(formData) {
        setLoading(true);
        const response = await fetch(`http://localhost:3001/api/login`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });
        const json = await response.json();
        console.log(json);
        if(response.status === 200) {
            localStorage.setItem('token', json.token);
            props.setShowSignIn(false);
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
                    <Form.Label>Email address</Form.Label>
                    <Form.Control {...register("email")} type="email" placeholder="Enter your email" />
                    <p className="text-danger">{ errors.email?.message }</p>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control {...register("password")} type="password" placeholder="Password" />
                    <p className="text-danger">{ errors.password?.message }</p>
                </Form.Group>
                <div className="text-center">
                    <Button variant="primary" size="lg" style={{ width: "60%" }} type="submit">
                        { loading ? <Spinner animation="border" /> : "Submit"}
                    </Button>
                </div>
            </Form>
        </>
    )
}

export default SignInForm;