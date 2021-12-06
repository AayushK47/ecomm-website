import { useState } from 'react';
import { Card, Button } from 'react-bootstrap'

import Modal from './Modal';
import OrderForm from './OrderForm';

function ProductCard(props) {
    const [show, setShow] = useState(false);
    return (
        <>
            <Modal show={show} setShow={setShow} title="Place Order">
                <OrderForm setShow={setShow} title={props.title} price={props.price} id={props.id} image={props.image} description={props.description} />
            </Modal>
            <Card style={{ width: '24rem', marginTop: "2.5rem", marginRight: "2.5rem" }}>
                <Card.Img variant="top" src={props.image} />
                <Card.Body>
                    <Card.Title>{props.title}</Card.Title>
                    <p className="fw-bold">&#8377; { props.price }</p>
                    <Card.Text>
                    { props.description }
                    </Card.Text>
                    <Button onClick={() => setShow(true)} variant="primary">Order Now</Button>
                </Card.Body>
            </Card>
        </>
    )
}

export default ProductCard;