import { navigate } from '@reach/router';
import Navbar from "../components/Navbar";

function _404Page() {
    return (
        <>
            <Navbar />
            <div className="mt-5">
                <h1>Oops! This page does not exits</h1>
                <button className="btn btn-primary" onClick={navigate('/')}>Go Back</button>
            </div>
        </>
    )
}

export default _404Page;