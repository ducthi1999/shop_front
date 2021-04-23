import MainLayout from "../../layouts/MainLayout"
import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getProductAsync, toggleLoading } from "../../redux/actions"
import Breadcrumb from '../../global/Breadcrumb'

const Detail = () => {
  const data = useSelector(state => state.global.product)
  const user = useSelector(state => state.global.user)
  const socket = useSelector(state => state.global.socket)
  const dispatch = useDispatch()
  const { slug } = useParams()


  useEffect(() => {
    dispatch(getProductAsync(slug))
  })

  const buyProduct = () => {
    const { _id, name, price } = data
    const { role, coins } = user
    if (role === 'admin' || data.seller._id === user._id) return
    if (coins < data.price) return alert('Bạn không đủ coin')
    const newProduct = {
      _id,
      name,
      price,
      seller: {
        _id: data.seller._id,
        coins: parseInt(data.seller.coins) + parseInt(data.price)
      }
    }

    const newUser = {
      _id: user._id,
      coins: user.coins - data.price
    }
    dispatch(toggleLoading(true))
    socket.emit('buy-product', { product: newProduct, user: newUser })
  }

  return (
    <MainLayout>
      <div id='detail'>
        <div className='container'>
          <Breadcrumb category={data?.category?.title || 'Đang cập nhật'} item={data?.name || 'Đang cập nhật'} />
          <div className='detail-banner'>
            <img src={data.image && data.image.url} />
          </div>
          <div className='info'>
            <div className='name'>
              <h1>ingame: {data.name}</h1>
            </div>
            {
              data.sold &&
              <div className='name'>
                <h1>password: {data.password}</h1>
              </div>
            }
            <div className='price'>
              {
                !data.sold &&
                <button onClick={buyProduct}>
                  <i className="fas fa-coins"></i>
                  <span>{data.price} coins</span>
                </button>
              }
              <Link to=''><i className="fas fa-user-astronaut"></i>{data.seller && `${data.seller.firstName} ${data.seller.lastName}`}</Link>
            </div>
            <div className='desc'>
              <div className='desc-container' dangerouslySetInnerHTML={{ __html: data.desc }}>

              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}

export default Detail