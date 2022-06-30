import React from 'react'
import Header from '../../components/Header'
import styles from './Home.module.scss'
import clsx from 'clsx'
import ManPhoto from '../../app/images/Man.jpg'
import WomanPhoto from '../../app/images/Woman.jpg'
import JewelryPhoto from '../../app/images/Jewelry.jpg'
import GamingPhoto from '../../app/images/Gaming.jpg'
import { Link } from 'react-router-dom'

function Home() {

  const photosLink = [
    {
      name: 'Men',
      path: '/categories/men\'s clothing',
      img: ManPhoto
    },
    {
      name: 'Women',
      path: '/categories/women\'s clothing',
      img: WomanPhoto
    },
    {
      name: 'Jewelery',
      path: '/categories/jewelery',
      img: JewelryPhoto
    },
    {
      name: 'Gaming',
      path: '/categories/electronics',
      img: GamingPhoto
    }
  ]

  return (
    <React.Fragment >
      <Header />
      <div className={clsx('d-flex flex-column justify-content-between align-items-center', styles.imgbackground)}>
        <div></div>
        <div className={styles.logo}>
          StreetStore
        </div>
        <a
          href='#categories'
          className='d-flex flex-column align-items-center fs-3 fw-bold'
          style={{color: '#fff'}}
        >
          Shop Online
          <div className={styles.path}></div>
        </a>
      </div>
      <div id='categories' className='container-lg mt-5'>
        <div className='row row-cols-1 row-cols-md-2 justify-content-between'>
          {photosLink.map(photo => (
            <div className={clsx('col mb-4 p-3')}>
                <Link to={photo.path}>
                  <div className={styles.imgProduct}>
                      <img className={clsx('w-100 h-100', styles.img)} src={photo.img} alt="" />
                      <div className={styles.overlay}>
                        <div className={styles.text}>{photo.name.toUpperCase()}</div>
                      </div>
                  </div>
                </Link>
            </div>
          ))}
        </div>
      </div>
    </React.Fragment>
  )
}

export default Home