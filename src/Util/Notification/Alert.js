import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Function to show a success toast
export const showSuccessToast = (message) => {
    toast.success(message, {
        position: "top-right", // Using the string directly instead of `toast.POSITION.TOP_RIGHT`
        autoClose: 3000, // Toast will automatically close after 3 seconds
    });
};

// Function to show an error toast
export const showErrorToast = (message) => {
    toast.error(message, {
        position: "top-right",
        autoClose: 3000, // Toast will automatically close after 3 seconds
    });
};

const Alert = () => {
    return (
        <div>
            <ToastContainer />
        </div>
    );
}

export default Alert