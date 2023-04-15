import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

const PaymentPage = () => {
  const [error, setError] = useState(null);
  const [succeeded, setSucceeded] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [clientSecret, setClientSecret] = useState('');
  const [selectedPlan, setSelectedPlan] = useState('freemium');

  const stripe = useStripe();
  const elements = useElements();

  useEffect(() => {
    // Call your backend API to create a PaymentIntent
    fetch('/api/create-payment-intent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        items: [{ id: selectedPlan }],
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setClientSecret(data.clientSecret);
      });
  }, [selectedPlan]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setProcessing(true);

    const { error, paymentMethod } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: 'Jenny Rosen',
        },
      },
    });

    if (error) {
      setError(`Payment failed: ${error.message}`);
      setProcessing(false);
    } else {
      setError(null);
      setProcessing(false);
      setSucceeded(true);
    }
  };

  const handlePlanChange = (event) => {
    setSelectedPlan(event.target.value);
  };

  const handleChange = (event) => {
    setDisabled(event.empty);
    setError(event.error ? event.error.message : '');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>
          <input
            type="radio"
            name="plan"
            value="freemium"
            checked={selectedPlan === 'freemium'}
            onChange={handlePlanChange}
          />
          Freemium
        </label>
      </div>
      <div>
        <label>
          <input
            type="radio"
            name="plan"
            value="premium"
            checked={selectedPlan === 'premium'}
            onChange={handlePlanChange}
          />
          Premium
        </label>
      </div>
      <div>
        <label>
          <input
            type="radio"
            name="plan"
            value="platinum"
            checked={selectedPlan === 'platinum'}
            onChange={handlePlanChange}
          />
          Platinum
        </label>
      </div>
      <CardElement onChange={handleChange} />
      <button disabled={processing || disabled || succeeded}>
        {processing ? 'Processing' : 'Pay'}
      </button>
      {error && <div>{error}</div>}
      {succeeded && <div>Payment succeeded!</div>}
    </form>
  );
};

export default PaymentPage;
