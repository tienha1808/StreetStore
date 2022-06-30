import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Avatar from '../../../app/images/Avatar.ico'
import clsx from 'clsx'
import styles from './UpdateProfile.module.scss'
import axios from 'axios'
import { updateInfo, getInfo } from '../authSlice'
import { Link } from 'react-router-dom'
import { getCart } from '../../Cart/listCartSlice'

function UpdateProfile() {
    const dispatch = useDispatch()
    const userCurrent = useSelector(state => state.stateUser)

    const [ cart, setCart ] = useState()
    const [ user, setUser ] = useState()
    const [ id, setId ] = useState()
    const [ username, setUsername ] = useState()
    const [ phone, setPhone ] = useState()
    const [ address, setAddress ] = useState()
    const [ avatar, setAvatar ] = useState()
    const [ error, setError ] = useState()
    const [ success, setSuccess ] = useState()
    
    useEffect(() => {
        axios.get('/api/users')
            .then(res => res.data)
            .then(data => data.users)
            .then(users => setUser(users.find(user => userCurrent.info.name.toLowerCase() === user.name.toLowerCase())))
    }, [])
    
    useEffect(() => {
        if (user) {
            setId(user.id)
            setUsername(user.name)
            setPhone(user.phone)
            setAddress(user.address)
            setAvatar(user.avatar)
            dispatch(getInfo({
                id: user.id
            }))
            axios.get(`/api/users/${user.id}/cart`)
                .then(res => res.data)
                .then(data => setCart(data.products))
        }
    }, [user])

    useEffect(() => {
        if (cart) {
            dispatch(getCart({
                cart
            }))
        }
    }, [cart])

    const handleAvatar = e => {
        const file = e.target.files[0]
        file.preview = URL.createObjectURL(file)

        setAvatar(file)
    }

    const handleUpdate = async () => {
        try {
            await axios.patch(`/api/users/${id}`, {
                name: username,
                phone: phone,
                address: address,
                avatar: avatar
            })
            dispatch(updateInfo({
                name: username,
                phone: phone,
                address: address,
                avatar: avatar
            }))
            setError(false)
            setSuccess(true)
        } catch {
            setError(true)
            setSuccess(false)
        }
    }

  return (
    <React.Fragment>
        <div className='col-12 col-lg-4'>
            <div className='col-4 col-lg-6 mx-auto'>
                {
                    avatar
                    ?
                    <img className='w-100' src={avatar.preview || avatar} alt="" />
                    : 
                    <img className='w-100' src={Avatar} alt="" />
                }  
            </div>
            <div className={clsx(styles.wrapfile,'col-4 d-flex align-items-center justify-content-center mx-auto mt-3 position-relative')}>
                <div className={clsx('text-center w-100 col-6', styles.text)}>
                    Upload
                </div>
                <input
                    className={clsx(styles.avatarFile, 'border-0')}
                    name='avatar'
                    id='avatar'
                    type="file"
                    onChange={handleAvatar}
                />
            </div>
        </div>
        <div className='col-12 col-lg-8 border-start border-start-2 px-5 py-3'>
            <form className='container-lg'>
                <div className='row mb-3'>
                    <label className='col-12 col-lg-4' for='uid'>
                        UID
                    </label>
                    <input
                        className='col-12 col-lg-6 px-2'
                        name='uid'
                        type="text"
                        value={id}
                        disabled
                    />
                </div>
                <div className='row mb-3'>
                    <label className='col-12 col-lg-4' for='username'>
                        Username
                    </label>
                    <input
                        className='col-12 col-lg-6 px-2'
                        name='username'
                        type="text"
                        value={username}
                        placeholder='Họ và tên'
                        onChange={e => setUsername(e.target.value)}
                    />
                </div>
                <div className='row mb-3'>
                    <label className='col-12 col-lg-4' for='phone'>
                        Phone
                    </label>
                    <input
                        className='col-12 col-lg-6 px-2'
                        name='phone'
                        type="text"
                        value={phone}
                        onChange={e => setPhone(e.target.value)}
                    />
                </div>
                <div className='row'>
                    <label className='col-12 col-lg-4' for='address'>
                        Adress
                    </label>
                    <input
                        className='col-12 col-lg-6 px-2'
                        name='address'
                        type="text"
                        value={address}
                        onChange={e => setAddress(e.target.value)}
                    />
                </div>
                {error && <div className='row d-flex justify-content-center fs-4 my-4 text-danger'>Cập nhật không thành công</div>}
                {success && <div className='row d-flex justify-content-center fs-3 my-4 text-success'>Cập nhật thành công</div>}
            </form>
            <div className='container-lg text-end'>
                <button
                    className={clsx('col-4 px-2 py-3 fs-3 fw-bold mt-4 me-5', styles.btn)}
                    onClick={handleUpdate}
                >
                    Update
                </button>
            </div>
        </div>
        <div className='container-lg mt-5'>
            <div className={clsx('col-9 col-lg-4 mx-auto fs-1 fw-bold d-flex text-center py-3', styles.wrapCheck)}>
                <Link className={clsx(styles.checkout, 'w-100 h-100')} to='/checkout'>Go to Checkout</Link>
            </div>
        </div>
    </React.Fragment>
  )
}

export default UpdateProfile