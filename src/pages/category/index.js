import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Link, useParams } from 'react-router-dom'
import Breadcrumb from '../../global/Breadcrumb'
import MainLayout from '../../layouts/MainLayout'

const Category = () => {
  const { category } = useParams()
  const dispatch = useDispatch()
  const products = useSelector(state => state.global.products)
  const categories = useSelector(state => state.global.categories)
  const [currentCategory, setCurrentCategory] = useState({})
  const currentProducts = products.filter(x => ((x.category && x.category._id) === category))

  useEffect(() => {
    const currentCate = categories && categories.find(x => x._id = category)
    setCurrentCategory(currentCate)
  }, [categories])
  return (
    <MainLayout>
      {
        currentProducts && currentProducts.length > 0 &&
        <div className='game-col'>
          <div className='container'>
            <Breadcrumb category={currentCategory.title || 'Đang cập nhật'} />
            <h1 className='mb-title'>
              {currentCategory && currentCategory.title}
            </h1>
            <div className='game-container'>
              <div className='game-banner'>
                <img src={currentCategory && currentCategory.image} />
              </div>
              <div className='game-accounts'>
                <div className='row'>
                  {
                    currentProducts.map((item) =>
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
                </div>
              </div>
            </div>
          </div>
        </div>
      }
    </MainLayout>
  )
}

export default Category