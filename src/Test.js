import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import 'bootstrap/dist/css/bootstrap.min.css';
import  { useNavigate } from 'react-router-dom'
import FieldService from './MockService'

function Builder() {
    const [formFields, setFormFields] = useState({
        label: '',
        selectType: "multi",
        required: false,
        default: '',
        choices: [],
        displayAlpha: true
    })

    const {errors, setErrors} = useState ({})

    const navigate = useNavigate();

    const setOfChoices = (choicesText) => {
        let choicesArray = choicesText.split("\n").map(x => x.trim()).filter(element => element !== '');
        return choicesArray
    }

    const validateChoices = (event) => {
        console.log(formFields.choices.length)
        var rows = document.getElementById("choices").value.split("\n").length;
        if(rows === 50){
            event.preventDefault();
        }

    }

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            validateChoices(event)
        }
    }

    const handleLabelChange = (e) => {
        const { target: { value } } = e;
        setFormFields({
            ...formFields,
            'label' : value
        })

    }

    const handleRequiredChange = (e) => {
        const { target : { checked }} = e;
        setFormFields({
            ...formFields,
            'required': checked
        })
    }

    const handleSelectChange = (e) => {
        const { target : { value }} = e;
        setFormFields({
            ...formFields,
            selectType: value
        })
    }

    const handleDefaultValueChange = (e) => {
        const {target : { value }} = e
        setFormFields({
            ...formFields,
            default: value,
        })
    }

    const handleChoicesChange = (e) => {
        const {target : { value }} = e
        console.log(value);
        setFormFields({
            ...formFields,
            choices: setOfChoices(value),
        })
    }

    const handleOrderChange = (e) => {
        const {target : { value }} = e
        setFormFields({
            ...formFields,
            displayAlpha: value === 'alphabetical' ? true : false,
        })

    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const newErrors = findFormErrors();
        if ( Object.keys(newErrors).length > 0 ) {
            setErrors(newErrors)
        } else {
            FieldService.saveField(formFields);
            navigate("/submit", {state: formFields})
        }
    }

    const findFormErrors = () => {
        const {label, selectType, required,defaultVal, chices, displayAlpha} = formFields
        const newErrors = {}
        if(!label || label ==='') newErrors.label = "Label can't be empty!"
        else if (chices.length>50) newErrors.choices = "Can't have more than 50 choices in selection"
        return newErrors
    }


    return (
        <div className="square border border-1" style = {{display:'block', width:700, padding: 30}}>
            {JSON.stringify(formFields, 0, 2)}
            <Form>
                <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
                    <Form.Label column sm={2}>
                        Label
                    </Form.Label>
                    <Col sm={10}>
                        <Form.Control type="text" name="label" placeholder="Label" onChange={handleLabelChange}/>
                        {/*<Form.Control.Feedback type='invalid'>*/}
                        {/*    { errors.label }*/}
                        {/*</Form.Control.Feedback>*/}
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
                    <Form.Label column sm={2}>
                        Type
                    </Form.Label>
                    <Col sm={5}>
                        <Form.Select name="selectType" onChange={handleSelectChange}>
                            <option value="multi">Multi-Select</option>
                            <option value="single">Single-Select</option>
                        </Form.Select>
                    </Col>
                    <Col sm={5}>
                        <Form.Check type="checkbox" label="A Value is Required"  onChange={handleRequiredChange} />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="form">
                    <Form.Label column sm={2}>
                        Default Value
                    </Form.Label>
                    <Col sm={10}>
                        <Form.Control type="text" placeholder="Default Value"  onChange={handleDefaultValueChange}/>
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="choices">
                    <Form.Label column sm={2}>
                        Choices
                    </Form.Label>
                    <Col sm={10}>
                        <Form.Control as="textarea" rows={5} onKeyDown={handleKeyDown} onChange={handleChoicesChange}  />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Label column sm={2}>
                        Order
                    </Form.Label>
                    <Col sm={10}>
                        <Form.Select name="orderType" onChange={handleOrderChange}>
                            <option value="alphabetical">Display choices in Alphabetical</option>
                            <option value="default">Display choices in Default Order</option>
                        </Form.Select>
                    </Col>
                    {/* {errors.choicesText ? errors.choicesText : null} */}
                </Form.Group>

                <Form.Group as={Row} className="mb-3">
                    <Col sm={{ span: 10, offset: 2 }}>
                        <Button type="submit" onClick={handleSubmit}>Save Changes</Button>
                        <Form.Label>
                            <h6 style={{color: "red"}}><ul>Cancel</ul></h6>
                        </Form.Label>
                        <Form.Label>
                            <ul>
                                <p style={{color: "blue"}}>Reset</p>
                            </ul>
                        </Form.Label>

                    </Col>
                </Form.Group>
            </Form>
        </div>
    );
}

export default Builder;