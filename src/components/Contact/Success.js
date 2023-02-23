import React, { useEffect } from 'react';
import { Alert } from 'react-bootstrap';
import { toast } from 'react-toastify';

const Success = () => {

    useEffect(() => {
        const timer = setTimeout(() => {
            toast.success("Sucees");
        }, 1000);
        return () => clearTimeout(timer);
      }, []);

    return (
        <div>
            <Alert key="warning" variant="warning">
            This is a alert—check it out!
            </Alert>
        </div>
    )
};

export default Success;