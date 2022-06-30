import React, { useEffect } from 'react'
import styles from './Cart.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { delItem } from '../listCartSlice'
import axios from 'axios'

function TableCart() {

  const listCart = useSelector(state => state.listCart)
  const userCurrent = useSelector(state => state.stateUser)
  const uid = userCurrent.info.id

  const dispatch = useDispatch()

  const handleDelItem = async (id) => {
    const delIndexItem = listCart.indexOf(listCart.find(itemCart => itemCart.id === id))
    dispatch(delItem({
      delIndexItem
    }))
  }

  useEffect( () => {
    axios.patch(`/api/users/${uid}/cart/`,
        listCart.map(item => item.id)
    )
  }, [listCart])
    
  return (
    <table>
    <thead className='fs-4'>
      <tr>
        <th className={styles.delBtn}></th>
        <th className={styles.img}></th>
        <th className={styles.product}>Product</th>
        <th className={styles.price}>Price</th>
        <th className={styles.quantity}>Quantity</th>
        <th className={styles.subtotal}>Subtotal</th>
      </tr>
    </thead>
    <tbody className='border-top border-bottom border-top-1 border-bottom-1'>
      {listCart.map(itemCart => (
        <tr>
          <td className={styles.delBtn}>
            <div className='d-flex justify-content-center m-auto'>
              <button
                className={styles.iconDel}
                onClick={() => handleDelItem(itemCart.id)}
              >
                <FontAwesomeIcon
                  icon={faTrashCan} style={{color: 'var(--primary-color)'}}
                />
              </button>
            </div>
          </td>
          <td className={styles.img}>
            <Link to={`/products/${itemCart.id}`}>
              <img className='w-100 h-100 p-2' src={itemCart.image} alt="" style={{objectFit: 'contain'}} />
            </Link>
          </td>
          <td className={styles.product}>
            {itemCart.title}
          </td>
          <td className={styles.price}>
            {itemCart.price}$
          </td>
          <td className={styles.quantity}>
              {itemCart.quantity}
          </td>
          <td className={styles.subtotal}>
            {itemCart.subtotal}$
          </td>
        </tr>
      ))}
    </tbody>
  </table>
  )
}

export default TableCart