import React from 'react'
import { Link } from 'react-router-dom'

function Breadcrumb({ property }) {

    const listRouters = [
        {
            name: 'Home',
            path: '/'
        },
        {
            name: 'Shop',
            path: '/shop-online',
        },
        {
            name: 'Products',
            path: '/shop-online/products'
        },
        {
            name: 'Categories',
            path: '/categories',
        },
        {
            name: 'Men\'s clothing',
            path: "/categories/men"
        },
        {
            name: 'Women\'s clothing',
            path: "/categories/women"
        },
        {
            name: 'Electronics',
            path: '/categories/electronics'
        },
        {
            name: 'Jewelery',
            path: '/categories/jewelery'
        },
        {
            name: 'Cart',
            path: '/cart'
        },
        {
            name: 'Account',
            path: '/account'
        },
        {
            name: 'Checkout',
            path: '/checkout'
        }
    ]

    const directionRoutes = () => {
        let directionPaths = []
    
        const route = listRouters.find(route => route.name.toLowerCase() === property)
        const namePath = route.path.split('/')
    
        for (let i = 0; i < namePath.length; i++) {
            const paths = listRouters.find(path =>  path.path.includes(namePath[i]))
            directionPaths.push(paths)
        }

        const mainRoute = directionPaths.pop()

        return {
            directionPaths,
            mainRoute
        }
    }


  return (
    <ul className='d-flex align-items-center'>
        {directionRoutes().directionPaths.map(route => (
            <li className='me-2 fs-5 fw-normal text-black'>
                <Link className='me-2' to={route.path} style={{color: 'var(--primary-color)'}} >{route.name}</Link>
                /
            </li>
        ))}
        <li className='fs-5 fw-bold'>
            <Link style={{color: 'var(--primary-color)', cursor: 'default'}} to={directionRoutes().mainRoute.path}>{directionRoutes().mainRoute.name}</Link>
        </li>
    </ul>
  )
}

export default Breadcrumb