import React from 'react'
import Breadcrumb from '../../components/Breadcrumb'
import Header from '../../components/Header'
import TableCart from './TableCart'
import TableCartTotals from './TableCartTotals'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import clsx from 'clsx'
import styles from './Cart.module.scss'

function Cart () {

  const listCart = useSelector(state => state.listCart)

  return (
      <React.Fragment>
        <Header position={false} />
        <div className='container-fluid' style={{
        height: '2.7rem',
        backgroundColor: 'var(--second-color)'
        }}>
            <div className='container-lg'>
              <div className='row'>
                <Breadcrumb property='cart' />
              </div>
              {
                listCart.length > 0
                ?
                  <div  className='row mt-5'>
                    <div className='p-0'>
                      <TableCart />
                    </div>
                    <div className='mt-5 p-0'>
                      <div className='d-flex justify-content-end'>
                        <TableCartTotals />
                      </div>
                    </div>
                  </div>
                :
                  <div className='row mt-5'>
                    <div>
                      Your cart is currently empty.
                    </div>
                    <div className='mt-5'>
                      <Link className={clsx('py-3 px-5 fs-3 fw-bold', styles.reback)} to='/shop-online' >Return to Shop</Link>
                    </div>
                  </div>
              }
            </div>
        </div>
      </React.Fragment>
  )
}

export default Cart