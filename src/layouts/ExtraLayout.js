import { Link } from 'react-router-dom'

const ExtraLayout = ({ children, category }) => {
  return (
    <div id='extra-layout'>
      <div className='layout-container'>
        <div className='header'>
          <h1>
            <a href='/'>
              <i className="fas fa-home"></i>
            </a>
            <span>{category}</span>
          </h1>
        </div>
        {children}
      </div>
    </div>
  )
}

export default ExtraLayout