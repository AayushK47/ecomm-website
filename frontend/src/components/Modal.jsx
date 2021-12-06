import { Modal } from 'react-bootstrap';

function AppModal(props) {
    return (
        <Modal show={props.show} onHide={() => props.setShow(false) }>
            <Modal.Header>
                <h3>{ props.title }</h3>
            </Modal.Header>
            <Modal.Body>
                { props.children }
            </Modal.Body>
        </Modal>
    )
}

export default AppModal;