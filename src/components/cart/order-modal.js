import {Button, ButtonGroup, Col, Container, Form, ListGroup, Modal, Row} from "react-bootstrap";
import React, {useState} from "react";
import {Dollar} from "../other";
import {FullscreenExit, X, XSquare, XSquareFill} from "bootstrap-icons-react";
import {Validators} from "../../helpers/validators";

const TITLE = 'Order details';
const ADDRESS_TITLE = 'Delivery address';
const ADDRESS_HINT = 'Enter your delivery address';
const PHONE_TITLE = 'Phone number';
const PHONE_HINT = 'Enter your phone number';
const PHONE_TEXT = 'We will contact you when the order is completed';

export const Order = props => {
    const {show, onClose, totalPrice} = props;

    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');
    const [validAddress, setValidAddress] = useState(false);
    const [validPhone, setValidPhone] = useState(false);

    const onChangeAddress = e => {
        e.persist();
        const val = e.target.value;

        if (Validators.address(val)){
            setValidAddress(true);
        }else{
            setValidAddress(false);
        }

        setAddress(val);
    };

    const onChangePhone = e => {
        e.persist();
        const val = e.target.value;

        if (Validators.phone(val)){
            setValidPhone(true);
        }else{
            setValidPhone(false);
        }

        setPhone(val);
    };

    const renderBody = () => <Form>
        <Container fluid>
            <Form.Group controlId={'address'}>
                <Form.Label>{ADDRESS_TITLE}</Form.Label>
                <Form.Control required type={'text'} placeholder={ADDRESS_HINT} value={address}
                              onChange={onChangeAddress}/>
            </Form.Group>
            <Form.Group controlId={'phone'}>
                <Form.Label>{PHONE_TITLE}</Form.Label>
                <Form.Control required type={'text'} placeholder={PHONE_HINT} value={phone} onChange={onChangePhone}/>
                <Form.Text>{PHONE_TEXT}</Form.Text>
            </Form.Group>
            <div className={'d-flex justify-content-between py-3'}>
                <strong className="text-muted">Total</strong>
                <h5 className={'font-weight-bold'}><Dollar>{totalPrice}</Dollar></h5>
            </div>
        </Container>
    </Form>;


    return <Modal show={show} onHide={onClose}>
        <Modal.Header closeButton>
            <Modal.Title className={'text-center text-uppercase'}>{TITLE}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            {renderBody()}
        </Modal.Body>
        <Modal.Footer>
            <Button variant="primary" onClick={onClose} name={'order'} disabled={!(validAddress&&validPhone)} className={''}>Make an order</Button>
            <Button variant="outline-secondary" onClick={onClose} name={'cancel'} className={''}>Close</Button>
        </Modal.Footer>
    </Modal>
};
