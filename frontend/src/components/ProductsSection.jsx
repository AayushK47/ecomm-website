import { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap'

import ProductCard from './ProductCard';

function ProductSection() {
    useEffect(() => {
        async function getProducts() {
            const response = await fetch(`http://localhost:3001/api/product`, {
                method: "GET",
            });
            const json = await response.json();
            setProducts(json.data);
            console.log(json.data);
        }
        getProducts();
    }, [])
    const [products, setProducts] = useState()
    return (
        <div id="products" className="my-5">
            <Container>
                <h1>Products</h1>
                <div className="row mt-3">
                    {
                        products && products.map((e, i) => 
                            <ProductCard key={i} id={e.id} image={e.image} price={e.price} title={e.name} description={e.description} />
                        )
                    }
                </div>
            </Container>
        </div>
    )
}

export default ProductSection;