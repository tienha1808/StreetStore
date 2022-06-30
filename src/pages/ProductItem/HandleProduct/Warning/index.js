import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons'

function Warning() {
  return (
    <div className='d-flex justify-content-center align-items-center fs-5 mx-auto p-2 border-bottom border-top'>
        <FontAwesomeIcon className='me-4 text-danger fs-3' icon={faCircleExclamation} />
        <div>
            You cannot add that amount to the cart. You already have in your cart.
        </div>
    </div>
  )
}

export default Warning