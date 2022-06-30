import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons'

function Success({ name }) {
  return (
    <div className='d-flex justify-content-center align-items-center fs-5 mx-auto p-2 border-bottom border-top'>
        <FontAwesomeIcon className='me-4 text-success fs-3' icon={faCircleCheck} />
        <div>
            <div className='fw-bold'>
                "{name}"
            </div>
            has been added to your cart.
        </div>
    </div>
  )
}

export default Success