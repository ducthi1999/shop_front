import ExtraLayout from '../../layouts/ExtraLayout'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { useState } from 'react'
import { getUser } from '../../services/global'
import { toggleLoading } from '../../redux/actions'

const Topup = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.global.user)

  const [admin, setAdmin] = useState({})

  useEffect(() => {
    dispatch(toggleLoading(true))
    getUser(null, 'admin')
      .then(res => {
        if (res.data && res.data.status) {
          setAdmin(res.data.userData)
        } else {
          alert('Error')
        }
      })
      .catch(err => alert('error'))
      .then(() => {
        dispatch(toggleLoading(false))
      })
  }, [])

  return (
    <ExtraLayout category="Nạp tiền">
      <div id='topup'>
        <div className='container'>
          <div className='topup-container'>
            <h4>THÔNG TIN CHUYỂN KHOẢN:</h4>
            <p>Chủ tài khoản: {`${admin.firstName} ${admin.lastName}`}</p>
            <p>Ngân hàng: {admin.credit?.bank}</p>
            <p>STK: {admin.credit?.number}</p>
            <hr />
            <h5>Nội dung CK: </h5>
            <p>{`"<Số coin> ${user._id}"`}</p>
            <p>Ví dụ: {`500000 ${user._id}`}</p>

            <i>Sau khi bạn chuyển khoản, admin sẽ xác nhận thông tin và cộng coin vào tài khoản.</i>
          </div>
        </div>
      </div>
    </ExtraLayout>
  )
}

export default Topup