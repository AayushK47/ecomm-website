import { useContext, useState } from 'react';
import { Card, Button, Alert, Spinner } from 'react-bootstrap';

import { isLoggedIn } from '../utils/isLoggedIn';
import { UserContext } from '../context/UserContext';

function OrderForm(props) {
    const { id, setShowSignIn } = useContext(UserContext)
    const [quantity, setQuantity] = useState(1);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    function addQuantity() {
        setQuantity(quantity + 1);
    }

    function subtractQuantity() {
        if(quantity > 1) {
            setQuantity(quantity - 1);
        }
    }

    async function submit() {
        setLoading(true);
        const response = await fetch('http://localhost:3001/api/order', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({ productId: props.id, userId: id, quantity })
        });
        const json = await response.json();
        if(response.status === 201) {
            props.setShow(false);
        } else {
            setError.apply(json.message);
        }
        setLoading(false);
    }
    return (
        <Card style={{ width: '30rem', border: "none" }}>
            <Card.Img variant="top" src={props.image} />
            <Card.Body>
                {   
                    !!error &&
                    <Alert variant="danger">
                        { error }
                    </Alert>
                }
                <Card.Title>{props.title}</Card.Title>
                <p className="fw-bold">&#8377; { props.price }</p>
                <Card.Text>
                { props.description }
                </Card.Text>
                <h5>Quantity</h5>
                <div className="mb-3">
                    <Button onClick={addQuantity} size="sm" variant="success">+</Button>
                    <span className="mx-2">{ quantity }</span> 
                    <Button onClick={subtractQuantity} size="sm" variant="danger">-</Button>
                </div>
                <Button onClick={ isLoggedIn() ? submit : () => { props.setShow(false); setShowSignIn(true) }} variant="primary">
                { loading ? <Spinner animation="border" /> : "Place Order"}
                </Button>
            </Card.Body>
        </Card>
    )
}

export default OrderForm;