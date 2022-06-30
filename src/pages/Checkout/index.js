import React from 'react'
import Breadcrumb from '../../components/Breadcrumb'
import Header from '../../components/Header'
import UserInfo from './UserInfo'
import UserOrder from './UserOrder'

function Checkout () {
  return (
    <React.Fragment>
      <Header position={false} />
      <div className='container-fluid' style={{backgroundColor: 'var(--second-color)'}}>
        <div className='container-lg'>
            <div className='row'>
              <Breadcrumb property='checkout' />  
            </div>
        </div>
      </div>
      <div className='container-lg mt-5'>
        <div className='row'>
            <div className='col-12 col-lg-8'>
              <UserInfo />
            </div>
            <div className='col-12 mt-5 mt-lg-0 col-lg-4'>
              <UserOrder />
            </div>
        </div>
      </div>
    </React.Fragment>
  )
}

export default Checkout 