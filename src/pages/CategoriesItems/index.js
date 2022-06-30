import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Header from '../../components/Header'
import Breadcrumb from '../../components/Breadcrumb'
import Categories from './Categories'
import { Link } from 'react-router-dom'
import clsx from 'clsx'
import styles from './CategoriesItems.module.scss'
import Spinner from '../../components/Spinner'

function CategoriesItems() {

    const { categories } = useParams()
    const [ products, getProducts ] = useState()
    let categoriesProducts

    useEffect(() => {
        axios.get('/api/products')
            .then(res => res.data)
            .then(data => getProducts(data.products))
        }, [])
        
    if (products) {
        categoriesProducts = products.filter(items => items.category === categories)
    }

  return (
    <React.Fragment>
        <Header />
        <div className='container-fluid' style={{
            position: 'absolute',
            top: '90px',
            height: '2.7rem',
            backgroundColor: 'var(--second-color)'
        }}>
            <div className='container-lg'>
                <div className='row'>
                    <Breadcrumb property={categories} />
                </div>
                <div className='row mt-5'>
                    <Categories />
                </div>
            </div>
            <div className='mt-5 container-lg px-0'>
                <ul className='row row-cols-2 row-cols-lg-3 row-cols-xxl-4'>
                    {categoriesProducts
                    ?
                    categoriesProducts.map(categoriesProducts => (
                        <li className={clsx('col d-flex flex-column justify-content-between mb-5', styles.card)}>
                            <Link className='w-100 h-50 pb-3' to={`/products/${categoriesProducts.id}`}>
                                <img className={clsx('h-100 w-100' ,styles.img)} src={categoriesProducts.image} alt="" />
                            </Link>
                            <div className='flex-grow-1 d-flex flex-column justify-content-between p-3 border border-1'>
                                <div className='fs-5 fw-bold'>
                                    {categoriesProducts.title}
                                </div>
                                <div className='text-end'>
                                    {categoriesProducts.price}$
                                </div>
                            </div>
                        </li>
                    ))
                    :
                    <Spinner position />
                    }
                </ul>
            </div>
        </div>
    </React.Fragment>
  )
}

export default CategoriesItems