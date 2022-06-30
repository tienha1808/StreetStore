import React, { useState } from 'react'
import styles from './Header.module.scss'
import clsx from 'clsx'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import MenuItems from './MenuItems'
import MenuUsers from './MenuUsers'

function Header({ position = true }) {

  const [tabMenu, setTabMenu] = useState(false)

  const handleClick = () => {
    setTabMenu(!tabMenu)
  }

  return (
    <header className={clsx(
      'container-fluid bg-white shadow-sm',
      {
        [styles.zindex]: !position,
        [styles.header]: position
      }
    )}
    >
      <div className='container-lg'>
        <div
          className='row align-items-center'
          style={{height: '90px'}}
        >
          <button className='d-lg-none col-1'
            onClick={handleClick}
          >
            <FontAwesomeIcon
              style={{fontSize: '2.4rem', color: '#5d524c'}}
              icon={faBars}
            />
          </button>
          <div className='col-4 col-lg-2 d-flex align-items-center mx-auto mx-lg-0 me-lg-auto'>
            <Link className={clsx(styles.logo)} to='/'>
              StreetStore
            </Link>
          </div>
          <div
            className={clsx(
              'col-lg-5 mx-auto',
              styles.menucontainer,
              tabMenu ? styles.openMenu : null
            )}>
            <MenuItems />
          </div>
          <div className='col-4 col-lg-2'>
              <MenuUsers />
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header