import React from 'react'
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import styles from './Logout.module.scss'
import clsx from 'clsx';
import UpdateProfile from '../UpdateProfile';
import { useDispatch } from 'react-redux'
import { getState } from '../authSlice';
import { clearCart } from '../../Cart/listCartSlice';

function Logout() {
  const dispatch = useDispatch()

  const handleSignOut = () => {
    firebase.auth().signOut()
    dispatch(getState({
      isSignedIn: false
    }))
    dispatch(clearCart())
  }

  return (
    <div className='container-lg mt-4'>
        <div className='row d-flex align-items-center'>
          <div className={clsx(styles.path, 'col d-none d-lg-block me-3')}></div>
          <button
              className={clsx(styles.btnlogout, 'fs-3 fw-light p-2 col col-lg-3')}
              onClick={handleSignOut}
          >
              LOG OUT
          </button>
        </div>
        <div className='row mt-5'>
          <UpdateProfile />
        </div>
    </div>
  )
}

export default Logout