import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Link } from 'react-router-dom'
const GameCollection = ({ category }) => {
  const dispatch = useDispatch()
  const products = useSelector(state => state.global.products)

  const currentProducts = products.filter(x => ((x.category && x.category._id) === (category && category._id)))
  return (
    <>
      {
        currentProducts && currentProducts.length > 0 &&
        <div className='game-col'>
          <div className='container'>
            <h1 className='mb-title'>
              {category && category.title}
            </h1>
            <div className='game-container'>
              <h1>
                {category && category.title}
              </h1>
              <div className='game-banner'>
                <Link to={`/category/${category._id}`}>
                  <img src={category && category.image} />
                </Link>
              </div>
              <div className='game-accounts'>
                <div className='row'>
                  {
                    currentProducts.map((item, index) => {
                      if (index < 4) return (
                        <div key={item._id} className='col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6'>
                          <div className='account-container'>
                            <div className='cover'>
                              <Link to={`/products/${item.slug}`}>
                                <img src={item.image && item.image.url} />
                              </Link>
                            </div>
                            <div className='info'>
                              <Link to={`/products/${item.slug}`}>{item.name || 'Đăng cập nhật...'}</Link>
                              <div className='wrap'>
                                <span><i className="fas fa-coins"></i>{item.price}</span>
                                <Link to=''><i style={{ marginRight: 6 }} className="fas fa-user-astronaut" />{item.seller && `${item.seller.firstName} ${item.seller.lastName}`}</Link>
                              </div>
                            </div>
                          </div>
                        </div>
                      )
                    }
                    )
                  }
                </div>
              </div>
            </div>
            {
              currentProducts.length >= 4 &&
              < div className='see-more'>
                <Link to={`/category/${category._id}`} className='see-more-btn'>Xem tất cả ({currentProducts.length})</Link>
              </div>
            }
          </div>
        </div>
      }
    </>
  )
}

export default GameCollection