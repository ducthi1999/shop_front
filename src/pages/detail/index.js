import MainLayout from "../../layouts/MainLayout"
import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getProductAsync } from "../../redux/actions"
import Breadcrumb from '../../global/Breadcrumb'

const Detail = () => {
  const data = useSelector(state => state.global.product)
  const dispatch = useDispatch()
  const { slug } = useParams()

  useEffect(() => {
    dispatch(getProductAsync(slug))
  })
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
              <button>
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