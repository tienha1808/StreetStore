import React from 'react'
import clsx from 'clsx'
import styles from './CartTotals.module.scss'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

function TableCartTotals() {
    const listCart = useSelector(state => state.listCart)

  return ( 
    <table className={styles.table}>
        <thead className='text-center fs-2'>
            <tr className={styles.rowTable}>
                <div className='py-1'>
                    CART TOTALS
                </div>
            </tr>
        </thead>
        <tbody>
            <tr className='d-flex justify-content-between px-3 py-2'>
                <div>
                    TOTAL
                </div>
                <div>
                    {listCart.reduce((prev, curr) => prev + curr.subtotal, 0)}$
                </div>
            </tr>
            <tr className={clsx('d-flex text-center py-3 fs-3 fw-bold', styles.wrapCheck)}>
                <Link className={clsx(styles.checkout, 'w-100 h-100')} to='/account'>PROCEED TO CHECKOUT</Link>
            </tr>
        </tbody>
    </table>
  )
}

export default TableCartTotals