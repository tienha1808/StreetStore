import { Link } from 'react-router-dom'

function Categories() {

    const categories = [
        'men\'s clothing',
        'women\'s clothing',
        'jewelery',
        'electronics'
    ]


  return (
      <ul className='d-flex flex-wrap'>
        {categories && categories.map(category => (
            <li className='me-3'>
                <Link className='me-3 fs-4 fw-bold' to={`/categories/${category}`}>{category.toUpperCase()}</Link>
                I
            </li>
        ))}
      </ul>
  )
}

export default Categories