import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faCartShopping } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import styles from './MenuUsers.module.scss'
import clsx from 'clsx'
import { useSelector } from 'react-redux'

function MenuUsers () {
    const listCart = useSelector(state => state.listCart)

    const userItems = [
        {
            name: 'user-account',
            path: '/account',
            icon: faUser
        },
        {
            name: 'cart',
            path: '/cart',
            icon: faCartShopping,
            badge: listCart.length
        }
    ]

  return (
        <ul className={clsx(
            'd-flex',
            styles.wrap
            )}>
            {userItems.map(item => (
                <li className='flex-grow-1 position-relative' key={item.name}>
                    <Link
                        className={clsx(
                            'd-flex align-items-center justify-content-center',
                            styles.userbutton
                        )}
                        to={item.path}
                    >
                        <FontAwesomeIcon icon={item.icon} />
                        {item.badge > 0 && 
                            <div className={clsx(styles.badge, 'bg-danger text-white d-flex justify-content-center fs-5 fw-bold')}>
                                {item.badge}
                            </div>
                        }
                    </Link>
                </li>
            ))}
        </ul>
  )
    
}

export default MenuUsers