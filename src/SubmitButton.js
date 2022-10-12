import React from "react";
import Button from 'react-bootstrap/Button';

const SubmitButton = ({title, onClickFunc = () => {alert("Form Submitted")}, variant}) => {
    return (
        <Button variant={variant} onClick={onClickFunc}>{title}</Button>
    )
}

export default SubmitButton;