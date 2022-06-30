import React from 'react'

function Spinner({ position }) {
  return (
    <div style={{
        position: position,
        top: '0',
        bottom: '0',
        left: '0',
        right: '0',
        width: '100%',
        height: '100%',
    }}
        className='d-flex align-items-center justify-content-center'
    >
        <div className='d-flex align-items-center'>
            <div className='fs-1 me-2'>
                Loading
            </div>
            <div class="spinner-grow spinner-grow-sm me-2" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
            <div class="spinner-grow spinner-grow-sm me-2" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
            <div class="spinner-grow spinner-grow-sm" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
        </div>
    </div>
  )
}

export default Spinner