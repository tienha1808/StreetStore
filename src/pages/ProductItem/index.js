import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Header from '../../components/Header'
import Spinner from '../../components/Spinner'
import HandleProduct from './HandleProduct'

function ProductItem () {
    const { id } = useParams()
    const [product, getProduct] = useState()

    useEffect(() => {
        axios.get(`/api/products/${id}`)
            .then(res => res.data)
            .then(data => getProduct(data.product))
    }, [id])

  return (
      <React.Fragment>
        <Header position={false} />
        {product
        ? 
        (<div className='container-fluid mt-5'>
            <div className='container-lg'>
                <div className='row p-0'>
                    <div className='col-12 col-lg-7 mx-auto border border-2 p-5 d-flex justify-content-center'>
                        <img className='w-50' src={product.image} style={{objectFit: 'contain'}} alt="" />
                    </div>
                    <div className='col-12 col-lg-4 d-flex flex-column justify-content-center'>
                        <div className='fs-2 fw-bold mb-3'>
                            {product.title}
                        </div>
                        <div className='fs-4 fw-light my-3'>
                            {product.description}
                        </div>
                        <div className='text-end my-3 fs-2 fw-bolder'>
                            {product.price}$
                        </div>
                        <HandleProduct productItem={product} />
                        <div className='d-flex fs-5 align-items-center mt-3'>
                            Categories:
                            <div className='ms-4 fs-4 fw-bold'>
                                <Link to={`/categories/${product.category}`}>
                                    {product.category.toUpperCase()}
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>)
        :
        <Spinner position='absolute' />
        }
      </React.Fragment>
  )
}

export default ProductItem 