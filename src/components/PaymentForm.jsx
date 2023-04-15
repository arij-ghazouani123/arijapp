import React, { useState } from 'react';

function PaymentForm() {
  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zip, setZip] = useState('');
  const [cardName, setCardName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expMonth, setExpMonth] = useState('');
  const [expYear, setExpYear] = useState('');
  const [cvv, setCvv] = useState('');
  const [sameAddress, setSameAddress] = useState(false);

  const handleFormSubmit = (event) => {
    event.preventDefault();
    // handle form submit logic here
  };

  const handleSameAddressChange = (event) => {
    setSameAddress(event.target.checked);
    if (event.target.checked) {
      setState('');
      setZip('');
    }
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <div className="stripe-card">
        <div className="stripe-card__section stripe-card__section--header">
          <h3 className="stripe-card__header">Payment</h3>
        </div>
        <div className="stripe-card__section">
          <label htmlFor="cname" className="stripe-card__label">
            Name on Card
          </label>
          <input
            type="text"
            id="cname"
            name="cardname"
            placeholder="John More Doe"
            value={cardName}
            onChange={(event) => setCardName(event.target.value)}
            className="stripe-card__input"
          />
        </div>
        <div className="stripe-card__section">
          <label htmlFor="ccnum" className="stripe-card__label">
            Card Number
          </label>
          <input
            type="text"
            id="ccnum"
            name="cardnumber"
            placeholder="4242 4242 4242 4242"
            value={cardNumber}
            onChange={(event) => setCardNumber(event.target.value)}
            className="stripe-card__input"
          />
        </div>
        <div className="stripe-card__section stripe-card__section--row">
          <div className="stripe-card__exp-date">
            <label htmlFor="expmonth" className="stripe-card__label">
              Expiry Month
            </label>
            <input
              type="text"
              id="expmonth"
              name="expmonth"
              placeholder="MM"
              value={expMonth}
              onChange={(event) => setExpMonth(event.target.value)}
              className="stripe-card__input stripe-card__input--inline"
            />
          </div>
          <div className="stripe-card__exp-date">
            <label htmlFor="expyear" className="stripe-card__label">
              Expiry Year
            </label>
            <input
              type="text"
              id="expyear"
              name="expyear"
              placeholder="YY"
              value={expYear}
              onChange={(event) => setExpYear(event.target.value)}
              className="stripe-card__input stripe-card__input--inline"
            />
          </div>
          <div className="stripe-card__cvc">
            <label htmlFor="cvv" className="stripe-card__label">
              CVC
            </label>
            <input
              type="text"
              id="cvv"
              name="cvv"
              placeholder="123"
              value={cvv}
              onChange={(event) => setCvv(event.target.value)}
              className="stripe-card__input"
            />
          </div>
        </div>
      </div>
      <div className="billing-address">
        <div className="billing-address__header">
          <h3 className="billing-address__title">Billing Address</h3>
          <div className="billing-address__same">
            <input
              type="checkbox"
              id="sameadr"
              name="sameadr"
              checked={sameAddress}
              onChange={handleSameAddressChange}
            />
            <label htmlFor="sameadr">Same as shipping address</label>
          </div>
        </div>
        <div className="billing-address__section">
          <label htmlFor="fname" className="billing-address__label">
            First Name
          </label>
          <input
            type="text"
            id="fname"
            name="firstname"
            placeholder="John"
            value={firstName}
            onChange={(event) => setFirstName(event.target.value)}
            className="billing-address__input"
          />
        </div>
        <div className="billing-address__section">
          <label htmlFor="email" className="billing-address__label">
            Email
          </label>
          <input
            type="text"
            id="email"
            name="email"
            placeholder="john@example.com"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="billing-address__input"
          />
        </div>
        <div className="billing-address__section">
          <label htmlFor="adr" className="billing-address__label">
            Address
          </label>
          <input
            type="text"
            id="adr"
            name="address"
            placeholder="542 W. 15th Street"
            value={address}
            onChange={(event) => setAddress(event.target.value)}
            className="billing-address__input"
          />
        </div>
        <div className="billing-address__section">
          <label htmlFor="city" className="billing-address__label">
            City
          </label>
          <input
            type="text"
            id="city"
            name="city"
            placeholder="New York"
            value={city}
            onChange={(event) => setCity(event.target.value)}
            className="billing-address__input"
          />
        </div>
        <div className="billing-address__section billing-address__section--row">
          <div className="billing-address__state">
            <label htmlFor="state" className="billing-address__label">
              State
            </label>
            <input
              type="text"
              id="state"
              name="state"
              placeholder="NY"
              value={state}
              onChange={(event) => setState(event.target.value)}
              className="billing-address__input"
            />
          </div>
          <div className="billing-address__zip">
            <label htmlFor="zip" className="billing-address__label">
              Zip
            </label>
            <input
              type="text"
              id="zip"
              name="zip"
              placeholder="10001"
              value={zip}
              onChange={(event) => setZip(event.target.value)}
              className="billing-address__input"
            />
          </div>
        </div>
      </div>
      <button type="submit" className="submit-btn">
        Submit Payment
      </button>
    </form>
  );
}

export default PaymentForm;