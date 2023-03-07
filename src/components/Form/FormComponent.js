import axios from 'axios';
import { toast } from "react-toastify";
import React, { useState } from 'react';
import server from "../../config/server.json";
import { useNavigate } from 'react-router-dom';
import { Form, Button, Spinner } from 'react-bootstrap';

const FormComponent = (props) => {

  const navigate = useNavigate();
  const [ name, setName ] = useState("");
  const [ email, setEmail ] = useState("");
  const [ message, setMessage ] = useState("");
  const SEND_MESSAGE = server.api.SEND_MESSAGE;
  const SEND_REPORT = server.api.SEND_REPORT;
  const SEND_FEEDBACK = server.api.SEND_FEEDBACK;
  const [ disableBtn, setDisableBtn ] = useState(false);
  const [ showSpinner, setShowSpinner ] = useState(false);

  const resetFields = () => {
    setName("");
    setEmail("");
    setMessage("");
    setDisableBtn(false);
    setShowSpinner(false);
  };

  const sendMessage = async (sendMessageDetails, requestType) => {
    try {
      const config = {
        "Content-type": "application/json"
      };
      const response = await axios.post(
        `${server.url.production}${requestType}`,
        sendMessageDetails,
        { headers: config }
      );
      if (response.status === 201) {
        toast.success(response.data.message, {
          autoClose: 3000,
          position: "bottom-right",
        });
        resetFields();
        setTimeout(function() {
          props.setShowSuccess(true);
        }, 1000);
        setTimeout(function() {
          props.setShowSuccess(false);
          navigate("/")
        }, 7000);
      } else {
        setDisableBtn(false);
        setShowSpinner(false);
        toast.error("Something went wrong.", {
          autoClose: 3000,
          position: "bottom-right",
        });
      }
    } catch (e) {
      setDisableBtn(false);
      setShowSpinner(false);
      if (e.response && e.response.status !== 201) {
        toast.error(e.response.data.message, {
          autoClose: 3000,
          position: "bottom-right",
        });
      } else {
        toast.error("Something went wrong, please try again later.", {
          autoClose: 3000,
          position: "bottom-right",
        });
      }
    }
  }

  const sendRequest = (sendMessageDetails) => {
    if(props.requestType === "sendMessage"){
      sendMessage(sendMessageDetails,SEND_MESSAGE);
    }
    else if(props.requestType === "sendReport"){
      sendMessage(sendMessageDetails,SEND_REPORT);
    }
    else if(props.requestType === "sendFeedback"){
      sendMessage(sendMessageDetails,SEND_FEEDBACK);
    }
  }

  const handleOnSubmit = (e) => {
    e.preventDefault();
    if(name && email && message){
      const sendMessageDetails = {
        name : name,
        email : email, 
        message : message
      }
      setDisableBtn(true);
      setShowSpinner(true);
      sendRequest(sendMessageDetails);
    }
    else{
      toast.error("Please fill all the fields", {
        autoClose: 3000,
        position: "bottom-right",
      });
    }
  };  

  return (
    <div className="col-12 col-md-6 mx-auto my-2 my-md-4">
      <h4 className='text-center'>Simply leave a {props.formType}</h4>
      <Form className='w-100 m-auto' onSubmit={(e) => handleOnSubmit(e)}>
        <Form.Group className="my-3">
          <Form.Control type="text" className="w-75 m-auto text-center bg-dark text-light border-dark" placeholder="Name" value={name} onChange={(e)=>setName(e.target.value)} required/>
        </Form.Group>
        <Form.Group className="my-3">
          <Form.Control type="email" className="w-75 m-auto text-center bg-dark text-light border-dark" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)} required/>
        </Form.Group>
        <Form.Group className="my-3">
          <Form.Control as="textarea" rows={3} className="w-75 m-auto text-center bg-dark text-light border-dark contactMessageBar" value={message} onChange={(e)=>setMessage(e.target.value)} placeholder={props.placeholderText} required/>
        </Form.Group>
        <Form.Group className="mt-3 d-flex">
          <Button variant={props.btnVariant} type="submit" size='sm' className="m-auto" disabled={disableBtn}>{props.btnText} 
            { showSpinner ? 
              <Spinner animation="border" role="status" size="sm" className='mx-2'>
                  <span className="visually-hidden">Loading...</span>
              </Spinner>
              : null }
        </Button>
        </Form.Group>
      </Form>
    </div>
  );
};

export default FormComponent;