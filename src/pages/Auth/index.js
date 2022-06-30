import React from 'react'
import Header from '../../components/Header'
import Login from './Login'
import Logout from './Logout'
import { useSelector } from 'react-redux'
import Breadcrumb from '../../components/Breadcrumb'

function Auth() {
  const userCurrent = useSelector(state => state.stateUser)
  const isSignedIn = userCurrent.isSignedIn

  return (
      <React.Fragment>
          <Header position={false} />
          <div className='container-fluid' style={{backgroundColor: 'var(--second-color)'}}>
            <div className='container-lg'>
                <div className='row'>
                  <Breadcrumb property='account' />  
                </div>
            </div>
          </div>
          { isSignedIn ? <Logout /> : <Login /> }
      </React.Fragment>
  )
}

export default Auth 