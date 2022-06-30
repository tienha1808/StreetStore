import React from 'react'
import clsx from 'clsx'
import styles from './MenuItems.module.scss'
import { Link } from 'react-router-dom'

function MenuItems () {  
  const menuItems = [
    {
      name: 'shop',
      path: '/shop-online'
    },
    {
      name: 'journal',
      path: '/instagram'
    },
    {
      name: 'brands',
      path: '/brands'
    },
    {
      name: 'about',
      path: '/about'
    },
    {
      name: 'contact',
      path: '/contact'
    }
  ]
  return (
    <div className={clsx('d-flex flex-column justify-content-between h-100')}>
      <ul className={clsx(
        'd-flex flex-grow-1 flex-wrap flex-column justify-content-center align-items-center',
        'flex-lg-nowrap flex-lg-row justify-content-lg-between'
      )}>
          {menuItems.map(item => (
              <li className='fs-5'>
                  <Link className={clsx(styles.itemmenu)} to={item.path}>{item.name.toUpperCase()}</Link>
              </li>
          ))}
      </ul>
      <ul className={clsx(
        'd-block d-lg-none text-center fs-5 fw-normal mb-5',
        {

        }
      )}>
        <li><hr className='drop-down-divider' /></li>
        <li>Tien Ha</li>
        <li>Da Nang - Viet Nam</li>
        <li>Tel +84 905 905 ***</li>
        <li><strong>viettien****@gmail.com</strong></li>
      </ul>
    </div>
  )
}

export default MenuItems 