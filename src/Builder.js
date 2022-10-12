import React, {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom'
import Form from 'react-bootstrap/Form';
import FieldService from './MockService'
import SubmitButton from "./SubmitButton";
import './Builder.css'


const Builder = () => {
    const [ formFields, setFormFields ] = useState({
        selectType: 'multi',
        displayAlpha: 'alphabetical'
    })
    const [ errors, setErrors ] = useState({})
    const navigate = useNavigate();

    useEffect(() => {
        setFormFields(JSON.parse(localStorage.getItem("formFields") || "{}"));
    }, [])

    const setField = (field, value) => {
        const newFormFields = {
            ...formFields,
            [field]: value
        }
        if(field === "choicesText") {
            newFormFields.choices = setOfChoices(value);
        }

        if(field === "displayAlpha") {
            if(value === 'alphabetical'){
                const { choices } = formFields;
                newFormFields.choices = choices.sort();
            }
        }

        setFormFields(newFormFields);

        localStorage.setItem("formFields", JSON.stringify(newFormFields));

        if ( !!errors[field] ) setErrors({
            ...errors,
            [field]: null
        })
    }

    const setOfChoices = (choicesText) => {
        const { defaultValue, displayAlpha } = formFields
        let choicesArray = choicesText.split("\n").map(x => x.trim()).filter(element => element !== '' && element !== defaultValue);
        if(displayAlpha === 'alphabetical'){
            choicesArray.sort()
        }
        return choicesArray
    }

    const adjustDefault = () => {
        const { choices, defaultValue, displayAlpha } = formFields;
        if(choices.includes(defaultValue)){
            const index = choices.indexOf(defaultValue);
            if (index > -1) { 
                choices.splice(index, 1);
            }
        }
        if(displayAlpha === 'alphabetical'){
            choices.sort();
        }
        if(defaultValue!=='')
            choices.unshift(defaultValue);
    }

    const doesContainDuplicates = (choicesArray) => {
        if(choicesArray === undefined)
            return false
        choicesArray = choicesArray.map(element => element.toLowerCase());
        const choicesSet = new Set(choicesArray);
        return choicesSet.size !== choicesArray.length;
    }

    const handleSubmit = e => {
        e.preventDefault()
        const newErrors = findFormErrors()
        if ( Object.keys(newErrors).length > 0 ) {
            setErrors(newErrors)
        } else {
            adjustDefault();
            FieldService.saveField(formFields);
            navigate("/submit", {state: formFields})
        }
    }

    const findFormErrors = () => {
        const { label, choices } = formFields
        const newErrors = {}
        if ( !label || label === '' ) newErrors.label = 'Label cannot be blank!'
        if( choices === undefined) newErrors.choices = 'Please enter atleast one choice'
        if ( choices !== undefined && choices.length > 50) newErrors.choices = 'More than 50 choices not allowed!'
        if ( doesContainDuplicates(choices) ) newErrors.choices = 'Duplicate Choices not allowed!'
        return newErrors
    }

    const resetForm = () => {
        localStorage.setItem("formFields", JSON.stringify({}));
        setFormFields({
            label: '',
            choicesText: ''
        })
    }

    return (
        <div className='wd-builder'>
            <h1>Form Builder</h1>
            <Form>
                <Form.Group>
                    <Form.Label>Label</Form.Label>
                    <Form.Control
                        type='text'
                        onChange={ e => setField('label', e.target.value) }
                        isInvalid={ !!errors.label }
                        value = {formFields.label || ''}
                   />
                    <Form.Control.Feedback type='invalid'>{ errors.label }</Form.Control.Feedback>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Type</Form.Label>
                    <Form.Control
                        as='select'
                        onChange={ e => setField('selectType', e.target.value) }
                        isInvalid={ !!errors.selectType }
                        value = {formFields.selectType || 'Multi Select'}>
                        <option value='multi'>Multi Select</option>
                        <option value='single'>Single Select</option>
                    </Form.Control>
                    <Form.Control.Feedback type='invalid'>{ errors.selectType }</Form.Control.Feedback>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Default Value</Form.Label>
                    <Form.Control
                        type='text'
                        onChange={ e => setField('defaultValue', e.target.value) }
                        isInvalid={ !!errors.defaultValue }
                        value = {formFields.defaultValue || ''}
                    />
                    <Form.Control.Feedback type='invalid'>{ errors.defaultValue }</Form.Control.Feedback>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Choices</Form.Label>
                    <Form.Control
                        as='textarea'
                        onChange={ e => {
                            setField('choicesText', e.target.value)
                        }}
                        isInvalid={ !!errors.choices }
                        value={formFields.choicesText}
                    />
                    <Form.Control.Feedback type='invalid'>{ errors.choices }</Form.Control.Feedback>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Order</Form.Label>
                    <Form.Control as="select" onChange={ e => {
                            setField('displayAlpha', e.target.value)
                        }}>
                        <option value="alphabetical">Alphabetical</option>
                        <option value="default">Default</option>
                    </Form.Control>
                </Form.Group>
                <div className='button-wrapper'>
                    <SubmitButton title={"Submit Button"} onClickFunc={handleSubmit} variant={"primary"}/>
                    <SubmitButton title={"Reset Button"} onClickFunc={resetForm} variant={"danger"}/>
                </div>
            </Form>
        </div>
    )
}

export default Builder;