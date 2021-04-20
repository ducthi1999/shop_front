import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { getAllProductsAsync, getAllProducts, toggleLoading } from '../../redux/actions'
import { useEffect, useState } from 'react'
import MainLayout from '../../layouts/MainLayout'
import Breadcrumb from '../../global/Breadcrumb'
import ManageFilter from '../../global/ManageFilter'
import { deleteProduct, passProduct } from '../../services/global'

const ProductMn = () => {
  const products = useSelector(state => state.global.products)
  const dispatch = useDispatch()
  console.log(products)
  const removeProduct = (item, index) => {
    const { _id, seller } = item
    const sellerId = seller._id
    dispatch(toggleLoading(true))
    deleteProduct(_id, sellerId)
      .then(res => {
        if (res.data && res.data.status) {
          const newProducts = products.filter(x => x._id !== _id)
          dispatch(getAllProducts(newProducts))
        }
      })
      .catch(err => alert('Lỗi xóa sản phẩm!'))
      .then(() => {
        dispatch(toggleLoading(false))
      })
  }

  const confirmProduct = (item, index) => {
    const { _id } = item
    dispatch(toggleLoading(true))
    passProduct(_id)
      .then(res => {
        if (res.data && res.data.status) {
          const newProducts = products.filter(x => x._id !== _id)
          dispatch(getAllProducts(newProducts))
        }
      })
      .catch(err => alert('Lỗi duyệt sản phẩm!'))
      .then(() => {
        dispatch(toggleLoading(false))
      })
  }

  return (
    <MainLayout>
      <div className='game-col'>
        <div className='container'>
          <Breadcrumb />
          <ManageFilter />
          <div style={{ marginTop: 12 }} className='game-container'>
            <div className='game-accounts'>
              <div className='row'>
                {
                  products.map((item, index) =>
                    <div key={item._id} className='col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6'>
                      <div className='admin-btns'>
                        <button className='del' onClick={() => { removeProduct(item, index) }}>Xóa</button>
                        {
                          !item.passed &&
                          <button className='pass' onClick={() => { confirmProduct(item, index) }}>Duyệt</button>
                        }
                      </div>
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
    </MainLayout >
  )
}

export default ProductMn