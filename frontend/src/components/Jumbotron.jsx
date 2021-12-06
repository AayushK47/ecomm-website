import './Jumbotron.css';

function Jumbotron() {
    return (
        <div className="p-5 mb-4 bg-image rounded-3">
            <div className="container-fluid py-5 text-center">
                <h1 className="display-5 pb-4 fw-bold text-light">Get your daily groceries delivered to your doorstep</h1>
                <a href="#products" className="my-4 btn btn-success btn-lg">Browse our Products</a>
            </div>
        </div>
    )
}

export default Jumbotron;