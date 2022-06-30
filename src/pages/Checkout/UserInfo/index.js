import React from 'react'
import { useSelector } from 'react-redux'

function UserInfo() {
    const userCurrent = useSelector(state => state.stateUser).info

  return (
    <React.Fragment>
        <div className='container-lg p-4' style={{backgroundColor: 'var(--second-color)'}}>
            <div className='row my-3 py-4 border-top border-top-2 border-white border-bottom border-bottom-2 border-white fs-3'>
                <div className='col-3 fw-lighter'>
                    Name
                </div>
                <div className='col-8 ms-auto text-end'>
                    {userCurrent.name}
                </div>
            </div>
            <div className='row my-3 py-4 border-bottom border-bottom-2 border-white fs-3'>
                <div className='col-3 fw-lighter'>
                    Phone
                </div>
                <div className='col-8 ms-auto text-end'>
                    {userCurrent.phone}
                </div>
            </div>
            <div className='row my-3 py-4 border-bottom border-bottom-2 border-white fs-3'>
                <div className='col-3 fw-lighter'>
                    Address
                </div>
                <div className='col-8 ms-auto text-end'>
                    {userCurrent.address}
                </div>
            </div>
            
        </div>
    </React.Fragment>
  )
}

export default UserInfo