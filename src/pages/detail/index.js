import MainLayout from "../../layouts/MainLayout"
import { useEffect, useRef } from 'react'
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
      },
      winner_id: user._id,
    }

    const newUser = {
      _id: user._id,
      coins: user.coins - data.price
    }
    dispatch(toggleLoading(true))
    socket.emit('buy-product', { product: newProduct, user: newUser })
  }

  const endBidProduct = () => {
    const { _id, name, price } = data
    const { role, coins } = user
    const newProduct = {
      _id,
      name,
      price,
      seller: {
        _id: data.seller._id,
        coins: parseInt(data.seller.coins) + parseInt(data.price)
      },
      winner_id: data.winner_id,
    }

    const newUser = {
      _id: data.winner_id,
      coins: data.winner_coins - data.price
    }

    dispatch(toggleLoading(true))
    socket.emit('end-bid-product', { product: newProduct, user: newUser })
  }

  const bidProduct = () => {
    const { _id, name, price } = data
    const { role, coins, username } = user
    if (role === 'admin' || data.seller._id === user._id) return
    if (coins < data.price + parseInt(data.price/10)) return alert('Bạn không đủ coin')
    const newProduct = {
      _id,
      name,
      price: data.price + parseInt(data.price/10),
      winner: user.username,
      winner_id: user._id,
      winner_coins: user.coins,
    }

    dispatch(toggleLoading(true))
    socket.emit('bid-product', { product: newProduct })
  }

  const reload = () => {
    setTimeout(dispatch(toggleLoading(true)), 5000)
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
              data.sold && user._id === data.winner_id &&
              <div className='name'>
                <h1>password: {data.password}</h1>
              </div>
            }
            {
              (data.mode) &&
              <div className='p-5'>
                <div className='name'>
                  <h4><i class="fas fa-money-bill-wave"></i> Giá nick hiện tại: {data.price}</h4>
                </div>
                <div className='name'>
                  <h4><i class="fas fa-crown"></i> Người đang chiến thắng: {data.winner}</h4>
                </div>
              </div>
            }

            {
              (data.mode) && (data.seller._id === user._id) && (data.winner_id) &&
              <button style={{padding: '15px'}} onClick={endBidProduct}>
                <i class="fas fa-calendar-times"></i>
                <span>Kết thúc phiên đấu giá</span>
              </button>
            }
              

            <div className='price'>
              {
                (data.mode) ?
                  <div>
                    <input 
                      type='number'
                      style={{padding: '10px'}} 
                      value={ data.price + parseInt(data.price / 10)} 
                      min={ data.price + parseInt(data.price / 10)}
                    />
                    <button style={{margin: '10px'}} onClick={bidProduct}>
                      <i class="fas fa-gavel"></i>
                      <span>Đấu giá</span>
                    </button>
                  </div>
                :
                !data.sold &&
                <button onClick={buyProduct}>
                  <i className="fas fa-coins"></i>
                  <span>{data.price} coins</span>
                </button>

              }
              {
                data.sold && reload()
              }
              
              
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