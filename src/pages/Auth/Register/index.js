import React, { useEffect, useState } from 'react'
import clsx from 'clsx'
import styles from './Register.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { useDispatch } from 'react-redux'
import axios from 'axios'
import { getState, getInfo } from '../authSlice'

function Register({ modal, setModal }) {
    const dispatch = useDispatch()

    const [ users, setUsers ] = useState()
    const [ signInName, setSignInName ] = useState('')
    const [ minLength, setMinLength ] = useState()
    const [ loopSignIn, setLoopSignIn ] = useState()
    const [ password, setPassword ] = useState('')
    const [ errorPassword, setErrorPassword ] = useState()
    const [ error, setError ] = useState()
    
    useEffect(() => {
        axios.get('/api/users')
            .then(res => res.data)
            .then(data => setUsers(data.users))
    }, [])


    // Handle sign in Username  
    const handleErrorName = e => {
        if (e.target.value.length > 1) {
            setMinLength(false)
        } else {
            setMinLength(true)
        }
        if (users.some(user => user.signInName.toLowerCase() === e.target.value.toLowerCase())) {
            setLoopSignIn(true)
        } else {
            setLoopSignIn(false)
        }
    }

    // Handle password
    const handleErrorPass = e => {
        if (e.target.value.length < 6) {
            setErrorPassword(true)
        } else {
            setErrorPassword(false)
        }
    }

    // Handle Register
    const handleRegister = async () => {
        if (!minLength && !loopSignIn && !errorPassword) {
            try {
                await axios.post('/api/users', {
                    name: signInName,
                    signInName: signInName,
                    password: password
                })
                dispatch(getState({
                    isSignedIn: true,
                }))
                dispatch(getInfo({
                    name: signInName
                }))
            } catch {
                setError(true)
            }
        }
    }

  return (
    <div className={clsx(styles.wrap, 'w-100 h-100 d-flex justify-content-center align-items-center', {
        [styles.positionZ]: modal
    })}>
        <div className={clsx('container-lg bg-white')}>
            <div className='row d-flex justify-content-between align-items-center py-3 px-3'>
                <div className='col fs-2'>
                    Register
                </div>
                <div className='col text-end'>
                    <button
                        className={styles.btnClose}
                        onClick={() => setModal(false)}
                    >
                        <FontAwesomeIcon icon={faXmark} />
                    </button>
                </div>
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
                        onBlur={handleErrorName}
                    />
                    {loopSignIn && <div className='col-12 col-lg-8 ms-auto text-danger fs-5 mb-3 mt-2'>Tên đăng nhập đã được sử dụng</div>}
                    {minLength && <div className='col-12 col-lg-8 ms-auto text-danger fs-5 mb-3 mt-2'>Vui lòng nhập tên đăng nhập</div>}
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
                        onBlur={handleErrorPass}
                    />
                    {errorPassword && <div className='col-12 col-lg-8 ms-auto text-danger fs-5 mb-3 mt-2'>Password phải có ít nhất 6 ký tự</div>}
                </div>
            </form>
            {error &&
                <div className="text-center text-danger">
                    Có lỗi xảy ra
                </div>
            }
            <div className='row d-flex justify-content-center mt-3 mb-5'>
                <button
                    className={clsx('col-5 col-lg-3 py-2 fs-2 me-4', styles.btnRegister)}
                    onClick={handleRegister}
                >
                    Register
                </button>
            </div>
        </div>
    </div>
  )
}

export default Register