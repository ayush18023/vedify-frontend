import React, { useEffect } from 'react';
const options = {
    key: 'rzp_test_rEX2nh0cy0bFAi',
    amount: '5000', //  = INR 1
    name: 'Consultant fees',
    description: 'some description',
    image: 'https://cdn.razorpay.com/logos/7K3b6d18wHwKzL_medium.png',
    handler: function(response) {
        
    },
    prefill: {
        name: 'Gaurav',
        contact: '9999999999',
        email: 'demo@demo.com'
    },
    notes: {
        address: 'some address'
    },
    theme: {
        color: '#f7f2ee',
        hide_topbar: false
    }
};

const openPayModal = () => {
    var rzp1 = new window.Razorpay(options);
    rzp1.open();
};
export const Razorpay = ( props  ) => {

    
    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.async = true;
        document.body.appendChild(script);
    }, []);

    return (
        <>
            {/* <button className='px-6 py-2 bg-blue-500 rounded-lg text-xl' onClick={l}>Pay with Razorpay</button> */}
            <span className='p-2 relative top-8 cursor-pointer rounded-lg bg-blue-700 text-white ' onClick={()=>{props.onClick();openPayModal()}}>Book Now 	&#8377; 50</span>
        </>
    );
}

export { openPayModal };