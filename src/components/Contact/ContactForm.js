// import axios from 'axios';
// import { toast } from "react-toastify";
// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import server from "../../config/server.json";
// import { Form, Button, Spinner } from 'react-bootstrap';
import { Form, Button } from 'react-bootstrap';

const ContactForm = () => {

  // const navigate = useNavigate();
  // const [ name, setName ] = useState("");
  // const [ email, setEmail ] = useState("");
  // const [ message, setMessage ] = useState("");
  // const SEND_MESSAGE = server.api.SEND_MESSAGE;
  // const [ disableBtn, setDisableBtn ] = useState(false);
  // const [ showSpinner, setShowSpinner ] = useState(false);

  // const resetFields = () => {
  //   setName("");
  //   setEmail("");
  //   setMessage("");
  //   setDisableBtn(false);
  //   setShowSpinner(false);
  // };

  // const sendMessage = async (sendMessageDetails) => {
  //   try {
  //     const config = {
  //       "Content-type": "application/json"
  //     };
  //     const response = await axios.post(`${server.url.production}${SEND_MESSAGE}`,sendMessageDetails,{ headers: config });
  //     if (response.status === 201) {
  //       toast.success(response.data.message, {
  //         autoClose: 3000,
  //         position: "bottom-right",
  //       });
  //       resetFields();
  //       setTimeout(function() {
  //         navigate("/")
  //       }, 5000);
  //     } else {
  //       setDisableBtn(false);
  //       setShowSpinner(false);
  //       toast.error("Something went wrong.", {
  //         autoClose: 3000,
  //         position: "bottom-right",
  //       });
  //     }
  //   } catch (e) {
  //     setDisableBtn(false);
  //     setShowSpinner(false);
  //     if (e.response && e.response.status !== 201) {
  //       toast.error(e.response.data.message, {
  //         autoClose: 3000,
  //         position: "bottom-right",
  //       });
  //     } else {
  //       toast.error("Something went wrong, please try again later.", {
  //         autoClose: 3000,
  //         position: "bottom-right",
  //       });
  //     }
  //   }
  // }

  // const handleOnSubmit = (e) => {
  //   e.preventDefault();
  //   if(name && email && message){
  //     const sendMessageDetails = {
  //       name : name,
  //       email : email, 
  //       message : message
  //     }
  //     setDisableBtn(true);
  //     setShowSpinner(true);
  //     sendMessage(sendMessageDetails);
  //   }
  //   else{
  //     toast.error("Please fill all the fields", {
  //       autoClose: 3000,
  //       position: "bottom-right",
  //     });
  //   }
  // };  

  return (
    <div className="col-12 col-md-6 mx-auto my-2 my-md-4">
      <h4 className='text-center'>Simply leave a message</h4>
      <Form className='w-100 m-auto' name='contact' method='POST' action='/contact' data-netlify="true">
        <input type="hidden" name="form-name" value="contact"/>
        <Form.Group className="my-3">
          <Form.Control type="text" className="w-75 m-auto text-center bg-dark text-light border-dark" placeholder="Name" name="name" required/>
        </Form.Group>
        <Form.Group className="my-3">
          <Form.Control type="email" className="w-75 m-auto text-center bg-dark text-light border-dark" placeholder="Email" name="email" required/>
        </Form.Group>
        <Form.Group className="my-3">
          <Form.Control as="textarea" rows={1} className="w-75 m-auto text-center bg-dark text-light border-dark" name="message" placeholder="Message" required/>
        </Form.Group>
        <Form.Group className="mt-3 d-flex">
          {/* <Button variant="outline-warning" type="submit" size='sm' className="m-auto" disabled={disableBtn}>Send Message 
            { showSpinner ? 
              <Spinner animation="border" role="status" size="sm" className='mx-2'>
                  <span className="visually-hidden">Loading...</span>
              </Spinner>
              : null }
        </Button> */}
          <Button variant="outline-warning" type="submit" size='sm' className="m-auto">Send Message</Button>
        </Form.Group>
      </Form>
    </div>
  );
};

export default ContactForm;