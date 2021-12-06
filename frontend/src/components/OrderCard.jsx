import { Card } from 'react-bootstrap';

function OrderCard(props) {
    return (
        <Card body className="my-3">
            <div className="row">
                <div className="col-5"><img style={{ height: "20rem" }} src={props.image} alt="" className="img-thumbnail" /></div>
                <div className="col-7">
                    <h1>{props.title}</h1>
                    <p className="fw-bold">&#8377; { props.price } x {props.quantity}</p>
                    <p>{props.description}</p>
                    <span>Order Placed on - {`${props.date.getDate()}`}/{`${props.date.getMonth() + 1}`}/{`${props.date.getFullYear()}`}</span>
                </div>
            </div>
        </Card>
    )
}

export default OrderCard;