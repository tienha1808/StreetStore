import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import styles from './Products.module.scss'
import clsx from 'clsx'
import Spinner from '../../../components/Spinner'

function Products() {

    const [products, getProducts] = useState()

    useEffect(() => {
        axios.get('/api/products')
            .then(res => res.data)
            .then(data => getProducts(data.products))
    }, [])
    console.log(products)

  return (
    <ul className='row row-cols-2 row-cols-lg-3 row-cols-xxl-4'>
        {products
        ?
        products.map(product => (
            <li className={clsx('col d-flex flex-column justify-content-between mb-5', styles.card)}>
                <Link className='w-100 h-50 pb-3' to={`/products/${product.id}`}>
                    <img className={clsx('h-100 w-100' ,styles.img)} src={product.image} alt="" />
                </Link>
                <div className='flex-grow-1 d-flex flex-column justify-content-between p-3 border border-1'>
                    <div className='fs-5 fw-bold'>
                        {product.title}
                    </div>
                    <div className='text-end'>
                        {product.price}$
                    </div>
                </div>
            </li>
        ))
        :
        <Spinner position />
        }
    </ul>
  )
}

export default Products