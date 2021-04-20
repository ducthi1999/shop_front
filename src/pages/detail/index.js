import MainLayout from "../../layouts/MainLayout"
import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getProductAsync } from "../../redux/actions"
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
    const { _id, name } = data
    const newProduct = {
      _id,
      name,
      seller: {
        _id: data.seller._id,
        coins: data.seller.coins + data.price
      }
    }

    const newUser = {
      _id: user._id,
      coins: user.coins - data.price
    }
    socket.emit('buy-product', { product: newProduct, user: newUser } )
  }

  return (
    <MainLayout>
      <div id='detail'>
        <div className='container'>
          <Breadcrumb />
          <div className='detail-banner'>
            <img src={data.image && data.image.url} />
          </div>
          <div className='info'>
            <div className='name'>
              <h1>{data.name}</h1>
            </div>
            <div className='price'>
              <button onClick={buyProduct}>
                <i className="fas fa-coins"></i>
                <span>{data.price} coins</span>
              </button>
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