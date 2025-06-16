import api from '../services/api';
import React, { useEffect } from 'react';

const Subscribe = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script); // Cleanup
    };
  }, []);
  const handleSubscribe = async () => {
    try {
      const { data } = await api.post('/payment/createOrder', { amount: `${Math.floor(Math.random() * 100)}` });
      const options = {
        key: 'rzp_test_S06aM7WKIo9eYl', // Replace with your Razorpay key
        amount: data.amount,
        currency: data.currency,
        order_id: data.orderId,
        handler: async function (response) {
          // alert('Payment successful!');
          // const { data } = await api.post('/payment/verifyPayment', {
          //   razorpay_order_id: response.razorpay_order_id,
          //   razorpay_payment_id: response.razorpay_payment_id,
          //   razorpay_signature: response.razorpay_signature,
          // });

          // console.log(data);
          // send response data to backend for verification
        }
      };
      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error(err);
      alert('Failed to create order');
    }
  };

  return (
    <div className="flex justify-center mt-20">
      <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={handleSubscribe}>
        Subscribe
      </button>
    </div>
  );
};

export default Subscribe;
