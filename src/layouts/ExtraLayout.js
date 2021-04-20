import { Link } from 'react-router-dom'

const ExtraLayout = ({ children, category }) => {
  return (
    <div id='extra-layout'>
      <div className='layout-container'>
        <div className='header'>
          <h1>
            <Link to='/'>
              <i className="fas fa-home"></i>
            </Link>
            <span>{category}</span>
          </h1>
        </div>
        {children}
      </div>
    </div>
  )
}

export default ExtraLayout