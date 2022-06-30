import React from 'react'
import Breadcrumb from '../../components/Breadcrumb'
import Header from '../../components/Header'
import Categories from '../CategoriesItems/Categories'
import Products from './Products'

function ShopOnline() {

  return (
      <React.Fragment>
          <Header position={false} />
          <div className='container-fluid' style={{
            height: '2.7rem',
            backgroundColor: 'var(--second-color)'
          }}>
            <div className='container-lg'>
              <div className='row'>
                <Breadcrumb property='products' />
              </div>
              <div className='row mt-5'>
                <Categories url='https://fakestoreapi.com/products/categories' />
              </div>
            </div>
            <div className='mt-5 container-lg px-0'>
              <Products />
            </div>
          </div>
      </React.Fragment>
  )
}

export default ShopOnline