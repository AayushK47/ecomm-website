import { navigate } from '@reach/router';
import { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';

import Navbar from '../components/Navbar';
import OrderCard from '../components/OrderCard';
import { isLoggedIn } from '../utils/isLoggedIn';

function OrdersPage() {
    const [orders, setOrders] = useState();

    useEffect(() => {
        if(!isLoggedIn()) {
            navigate('/')
        }
        async function getOrders() {
            const response = await fetch(`http://localhost:3001/api/order`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem('token')}`
                }
            }, []);
            const json = await response.json();
            setOrders(json.data);
            console.log(json.data);
        }
        getOrders();
    }, []);
    return (
        <>
            <Navbar />
            <Container className="mt-5">
                {
                    orders && orders.length > 0 ? orders.map(
                        (e, i) => <OrderCard key={i} title={e.product.name} quantity={e.quantity} description={e.product.description} price={e.product.price} image={e.product.image} date={new Date(e.createdAt)}  />
                    ) :
                    <h1>You have made no purchases yet.</h1>
                }
                
            </Container>
        </>
    )
}

export default OrdersPage;