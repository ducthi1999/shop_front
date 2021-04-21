import ExtraLayout from '../../layouts/ExtraLayout'
import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'
import { useEffect } from 'react'
import { getRequest, removeRequest } from '../../services/global'
import { toggleLoading } from '../../redux/actions'
import request from '../../utils/request'
const MoneyRequest = () => {
  const dispatch = useDispatch()
  const [requests, setRequests] = useState([])

  useEffect(() => {
    dispatch(toggleLoading(true))
    getRequest()
      .then(res => {
        if (res.data && res.data.status) {
          setRequests(res.data.requests)
        }
      })
      .catch(err => console.log(err))
      .then(() => dispatch(toggleLoading(false)))
  }, [])

  const confirm = (item) => {
    const { _id } = item
    dispatch(toggleLoading(true))
    removeRequest(_id)
      .then(res => {
        if (res.data && res.data.status) {
          const newReqs = requests.filter(x => x._id !== _id)
          setRequests(newReqs)
        } else {
          alert('Lỗi')
        }
      })
      .catch(err => alert('error'))
      .then(() => {
        dispatch(toggleLoading(false))
      })

  }
  return (
    <ExtraLayout category='Yêu cầu rút tiền'>
      <div id='admin-request'>
        <div className='container'>
          {
            requests && requests.length > 0 &&
            <ul>
              {
                requests.map((item, index) =>
                  <li key={item._id}>
                    <div>
                      <h5>Yêu cầu {index + 1}</h5>
                      <p>Tên: {item && `${item.user.firstName} ${item.user.lastName}`}</p>
                      <p>Mã tài khoản: {item._id}</p>
                      <p>Số xu muốn rút: {item && item.coins}</p>
                      <p>STK: {item.user && `${item.user.credit.number} - ${item.user.credit.bank}`}</p>
                    </div>
                    <button onClick={() => confirm(item)}>Xác nhận đã chuyển khoản</button>
                  </li>
                )
              }
            </ul>

          }

        </div>
      </div>
    </ExtraLayout>
  )
}

export default MoneyRequest