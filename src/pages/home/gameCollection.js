import { useEffect, useState } from 'react'

import { Link } from 'react-router-dom'
const arr = [1, 2, 3, 4]
const GameCollection = ({ category }) => {
  return (
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
            <img src={category && category.image} />
          </div>
          <div className='game-accounts'>
            <div className='row'>
              {
                arr.map(() =>
                  <div className='col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6'>
                    <div className='account-container'>
                      <div className='cover'>
                        <Link to=''>
                          <img src={category && category.image} />
                        </Link>
                      </div>
                      <div className='info'>
                        <Link to=''>Account LoL Level 400</Link>
                        <div className='wrap'>
                          <span><i className="fas fa-coins"></i>320000đ</span>
                          <Link to=''>Chủ tài khoản</Link>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default GameCollection