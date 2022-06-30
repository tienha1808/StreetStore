import React, { useState, useEffect } from 'react'
import clsx from 'clsx'
import styles from './Login.module.scss'
import Register from '../Register'
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth'
import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { getState, getInfo } from '../authSlice'
import { getCart } from '../../Cart/listCartSlice'

const uiConfig = {
    signInFlow: 'redirect',
    signInSuccessUrl: '/',
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    ]
};

function Login() {
    const dispatch = useDispatch()
    
    const [ users, setUsers ] = useState()
    const [ cart, setCart ] = useState()
    const [ signInName, setSignInName ] = useState()
    const [ password, setPassword ] = useState()
    const [ error, setError ] = useState(false)
    const [ errorPass, setErrorPass ] = useState(false)
    const [ modal, setModal ] = useState(false)
    
    useEffect(() => {
        axios.get('/api/users')
            .then(res => res.data)
            .then(data => setUsers(data.users))
    }, [])

    const handleSignIn = async () => {
        if (users.some(user => user.signInName.toLowerCase() === signInName)) {
            setError(false)
            const user = users.find(user => user.signInName.toLowerCase() === signInName)
            const passwordUser = user.password
            if (passwordUser === password) {
                setErrorPass(false)
                dispatch(getState({
                    isSignedIn: true
                }))
                dispatch(getInfo({
                    id: user.id,
                    name: user.name,
                    phone: user.phone,
                    address: user.address,
                    avatar: user.avatar,
                }))
                dispatch(getCart({
                    cart: cart,
                }))
            } else {
                setErrorPass(true)
            }
        } else {
            setError(true)
        }
    }

  return (
    <div className='container-lg'>
        <div className='row my-5 py-3 px-5 fs-2 fw-light border-bottom border-bottom-2'>
            Login
        </div>
        <form className='row mt-3 d-flex flex-column'>
            <div className='col-12 col-lg-8 mx-auto'>
                <label className='col-12 col-lg-4' for='username'>
                    Email and username
                </label>
                <input
                    className='col-12 col-lg-8 px-2'
                    name='username'
                    type="text"
                    onChange={e => setSignInName(e.target.value)}   
                />
            </div>
            <div className='col-12 col-lg-8 mx-auto my-2'>
                <label className='col-12 col-lg-4' for='password'>
                    Password
                </label>
                <input
                    className='col-12 col-lg-8 px-2'
                    name='password'
                    type="password"
                    onChange={e => setPassword(e.target.value)}
                />
            </div>
        </form>
        {error && 
            <div className='row d-flex justify-content-center mt-5 text-danger'>
                Tài khoản chưa được đăng ký
            </div>
        }
        {errorPass && 
            <div className='row d-flex justify-content-center mt-5 text-danger'>
                Mật khẩu chưa chính xác
            </div>
        }
        <div className='row d-flex justify-content-center mt-5'>
            <button
                className={clsx('col-12 col-lg-3 py-2 fs-2 m-3', styles.btn)}
                onClick={handleSignIn}
            >
                Log in
            </button>
            <button
                className={clsx('col-12 col-lg-3 py-2 fs-2 m-3', styles.btn)}
                onClick={() => setModal(true)}
            >
                Register
            </button>
        </div>
        <Register modal={modal} setModal={setModal} />
        <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} /> 
    </div>
  )
}

export default Login