import ExtraLayout from '../../layouts/ExtraLayout'
import { useDispatch, useSelector } from 'react-redux'
import { useRef } from 'react'
import { useEffect, useState } from 'react'
const Request = () => {
  const dispatch = useDispatch()
  const userId = useSelector(state => state.global.user._id)
  const userCoins = useSelector(state => state.global.user.coins)
  const socket = useSelector(state => state.global.socket)
  const user = useSelector(state => state.global.user)
  const el = useRef(null)
  const [done, setDone] = useState(false)

  useEffect(() => {
    socket.on('request-successfully', () => {
      setDone(true)
    })
  }, [])
  const request = (e) => {
    e.preventDefault()

    const coins = parseInt(el.current.value)
    const newCoins = parseInt(userCoins) - coins
    if (newCoins < 0) return alert('Bạn không đủ tiền')
    socket.emit('request', { userId, coins, newCoins })

  }

  return (
    <ExtraLayout category='Yêu cầu rút tiền'>
      <div id='profile-request'>
        <div className='container'>
          <form onSubmit={request}>
            <input ref={el} placeholder='Nhập số tiền muốn rút' min={1} required type='number' />
            <h5>Tài khoản của bạn:</h5>
            <p>STK: {user.credit && user.credit.number}</p>
            <p>Ngân hàng: {user.credit && user.credit.bank}</p>
            <p><b>Lưu ý:</b> Khi rút tiền bạn sẽ mất phí là 10% số tiền bạn muốn rút.</p>
            {
              done && 
              <h4>Gửi yêu cầu thành công, hãy chờ Admin chuyển tiền tới tài khoản của bạn!</h4>
            }
          </form>
          <div>
          </div>
        </div>
      </div>
    </ExtraLayout>
  )
}

export default Request
