import React from 'react'
import Form from 'react-bootstrap/Form';
import { useLocation, useNavigate } from 'react-router-dom'
import SubmitButton from "./SubmitButton";
import './Userform.css';

const Userform = () => {
    const location = useLocation(); 
    const choices = location.state["choices"]
    const navigate = useNavigate();
    const goBack = () => {
        navigate("/", {state: location.state || {}})
    }
     return (
        <div className="wrapper">
        <h1 style={{align: "center"}}>{location.state["label"]}</h1>
        <Form>
            <Form.Control as="select">
            {    
                choices.map((choice,i) => {
                    return (<option key={i} value={choice.value}>{choice}</option>)
                })
            }
            </Form.Control>
         <SubmitButton title="Submit"/>
         <SubmitButton title="Back" onClickFunc={goBack}/>
        </Form>
        
      </div>
    );
}

export default Userform;