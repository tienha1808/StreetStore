import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import clsx from 'clsx'
import styles from './UserOrder.module.scss'
import axios from 'axios'
import { clearCart } from '../../Cart/listCartSlice'

function UserOrder () {
    const listCart = useSelector(state => state.listCart)
    const userCurrent = useSelector(state => state.stateUser)
    const uid = userCurrent.info.id
    
    const dispatch = useDispatch()

    const [ note, setNote ] = useState()
    const [ success, setSuccess] = useState()
    const [ error, setError ] = useState()

    const handlePayment = async () => {
        try {
            await axios.patch(`/api/users/${uid}`, {
                payment: {
                    cartIds: listCart.map(item => item.id),
                    total: `${listCart.reduce((prev, curr) => prev + curr.subtotal, 0)}$`,
                    note: note
                }
            })
            setSuccess(true)
            setError(false)
            setNote('')
            dispatch(clearCart())
            await axios.patch(`/api/users/${uid}/cart`, [])
        } catch {
            setSuccess(false)
            setError(true)
        }
    }

  return (
      <React.Fragment>
          <div className='container-lg p-4' style={{backgroundColor: 'var(--second-color)'}}>
            <div className='row my-3 py-4 border-top border-top-2 border-white border-bottom border-bottom-2 fs-5'>
                <div className='col-4'>
                    PRODUCT
                </div>
                <div className='col-8 text-end'>
                    SUBTOTAL
                </div>
            </div>
            <div className='row my-3 py-4 fs-5 border-bottom border-bottom-2 border-white'>
                {listCart.map(item => (
                    <>
                        <div className='col-8 fw-light my-1'>
                            {item.title}
                        </div>
                        <div className='col-4 text-end'>
                            {item.price}$
                        </div>
                    </>
                ))}
            </div>
            <div className='row my-3 py-4 border-top border-top-2 border-white border-bottom border-bottom-2 fs-4 fw-bold'>
                <div className='col-6'>
                    TOTAL
                </div>
                <div className='col-6 text-end'>
                    {listCart.reduce((prev, curr) => prev + curr.subtotal, 0)}$
                </div>
            </div>
            <div className='row my-4 px-4'>
                <input
                    className='w-100 px-3 py-2'
                    type="text"
                    placeholder='Note'
                    value={note}
                    onChange={e => setNote(e.target.value)}
                />
            </div>
            <div className='row my-2 px-5 py-2 fs-2'>
                <button
                    className={clsx('fw-bold py-3 shadow-sm w-100', styles.btn)}
                    onClick={handlePayment}
                >
                    Payment
                </button>
            </div>
            {success && <div className='mt-3 py-3 text-success fs-4 text-center'>Đơn hàng đã được tiếp nhận.<div>Xin cảm ơn quý khách !!!</div></div>}
            {error && <div className='mt-3 py-3 text-danger fs-4 text-center'>Có lỗi xảy ra</div>}
          </div>
      </React.Fragment>
  )
}

export default UserOrder