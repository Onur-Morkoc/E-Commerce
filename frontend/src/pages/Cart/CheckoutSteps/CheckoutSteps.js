import React, { Fragment } from 'react'
import { MdOutlineLocalShipping, MdOutlineLibraryAddCheck, MdOutlineAccountBalance } from "react-icons/md";
import "./CheckoutSteps.scss"
import { v4 as uuid } from 'uuid';
const CheckoutSteps = ({ activeStep }) => {

  const steps = [
    { text: "Adres Bilgileri", icon: <MdOutlineLocalShipping />, },
    { text: "Sipariş Onaylamak", icon: <MdOutlineLibraryAddCheck /> },
    { text: "Ödeme", icon: <MdOutlineAccountBalance /> }
  ]
  return (

    <div className='CheckoutSteps'>

      {steps.map((step, index) => {
        let unique_id = uuid();

        return (
          <Fragment key={unique_id.toString()}>
            <div className="step" >
              <div className={activeStep >= index ? "step-icon active" : "step-icon"}>
                {step.icon}
              </div>
              <div className={activeStep >= index ? "step-text active" : "step-text"}>{step.text}</div>
            </div>
            {index !== steps.length - 1 && <div className="step-line"></div>}
          </Fragment>

        )
      }
      )}

    </div>
  )
}

export default CheckoutSteps