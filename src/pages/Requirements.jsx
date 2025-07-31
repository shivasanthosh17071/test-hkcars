import React from "react";

function Requirements() {
  return (
    <>
      <h6 className="mt-4 mb-2">Booking Requirements & Policies</h6>
      <ul>
        <li>Minimum age to rent: 21 years</li>
        <li>Valid driving license for 4-wheelers (LMV or above)</li>
        <li>
          Original documents required: Aadhaar + original DL (2-wheeler DL not
          accepted), or Passport + original DL
        </li>
        <li>No security deposit required</li>
        <li>International tourists are welcome</li>
        <li>Pre-verification is mandatory</li>
      </ul>

      <h6 className="mt-4 mb-2">Pricing & Booking Process</h6>
      <p>
        Rates vary by car type — please contact us for a customized quote.
        Fuel is managed by the customer; the vehicle must be returned with the same fuel level.
        We accept payments via UPI, credit/debit cards, net banking, or cash.
        Booking is confirmed through WhatsApp or email upon payment completion.
        Cancellations and refunds are handled on a case-by-case basis.
      </p>
    </>
  );
}

export default Requirements;
