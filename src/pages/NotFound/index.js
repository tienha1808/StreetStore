import React from 'react'
import Header from '../../components/Header'

function NotFound() {
  return (
      <React.Fragment>
        <Header position={false} />
        <div className='container-lg mt-5 fs-1 fw-bold'>
            PAGE NOT FOUND
        </div>
      </React.Fragment>
  )
}

export default NotFound