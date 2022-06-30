import React, { useLayoutEffect, useState, useEffect } from 'react'
import clsx from 'clsx'
import styles from './HandleProduct.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleUp, faAngleDown } from '@fortawesome/free-solid-svg-icons'
import { useDispatch, useSelector } from 'react-redux'
import { cartAdd } from '../../Cart/listCartSlice'
import Success from './Success'
import Warning from './Warning'
import axios from 'axios'

function HandleProduct({ productItem }) {
    const [ countItems, setCountItems ] = useState(1)
    const [ success, setSuccess ] = useState()
    const [ warning, setWarning ] = useState()

    const listCart = useSelector(state => state.listCart)
    const userCurrent = useSelector(state => state.stateUser)
    const userId = userCurrent.info.id
    
    const dispatch = useDispatch()

    const handleAdd = () => {
        if (listCart.some(itemCart => itemCart.id === productItem.id )) {
            setSuccess(false)
            setWarning(true)
        } else {
            setSuccess(true)
            setWarning(false)
            dispatch(cartAdd({
                ...productItem,
                price: productItem.price,
                quantity: countItems,
                subtotal: countItems*productItem.price,
            }))
        }
    }

    useEffect( () => {
        axios.patch(`/api/users/${userId}/cart`,
            listCart.map(item => item.id)
        )
    }, [listCart])

    useLayoutEffect(() => {
        if (countItems < 1) {
            setCountItems(1)
        } else if (countItems > productItem.count) {
            setCountItems(productItem.count)
        }
    }, [countItems])

  return (
      <div>
        <div className='d-flex my-3 align-items-center' style={{position: 'relative'}}>
            <input
                className={clsx(styles.input, 'me-3 text-center')}
                type="number"
                value={countItems}
                onChange={e => setCountItems(e.target.value)}
                min={0}
                max={productItem.count}
            />
            <div className='d-flex flex-column' style={{position: 'absolute', left: '4.7rem'}}>
                <button
                    style={{height: '25px'}}
                    onClick={() => setCountItems(countItems + 1)}
                >
                    <FontAwesomeIcon icon={faAngleUp} style={{color: 'var(--primary-color)', fontSize: '1.6rem'}} />
                </button>
                <button
                    onClick={() => setCountItems(countItems - 1)}
                >
                    <FontAwesomeIcon icon={faAngleDown} style={{color: 'var(--primary-color)', fontSize: '1.6rem'}} />
                </button>
            </div>
            <button
                className={clsx(styles.button, 'flex-grow-1 fs-4 fw-bold')}
                onClick={handleAdd}
            >
                ADD TO CART
            </button>
        </div>
        <div>
            {success && <Success name={productItem.title} />}
            {warning && <Warning />}
        </div>
      </div>
  )
}

export default HandleProduct