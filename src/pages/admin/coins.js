import { useRef, useState } from 'react'
import ExtraLayout from '../../layouts/ExtraLayout'
import { getUser, giveCoins } from '../../services/global'
import { useHistory } from 'react-router-dom'

const Coin = () => {
  const history = useHistory()
  const [user, setUser] = useState({})
  const el = useRef(null)
  const el2 = useRef(null)

  const getUserInfo = (e) => {
    e.preventDefault()

    let userId = el.current.value.trim()
    getUser(userId, null)
      .then(res => {
        if (res.data && res.data.status) {
          setUser(res.data.userData)
        }
      })
  }

  const giveUserCoins = (e) => {
    e.preventDefault()

    const userId = user._id
    let coins = el2.current.value
    const newCoins = parseInt(user.coins) + parseInt(coins)

    giveCoins(userId, newCoins)
      .then(res => {
        if (res.data && res.data.status) {
          alert(res.data.message)
          history.replace('/')
        } else {
          alert(res.data.message)
        }
      })
      .catch(err => alert('Lỗi!'))

  }

  return (
    <ExtraLayout category='Giao dịch'>
      <div id='coin'>
        <div className='container'>
          <div className='search-user'>
            <form onSubmit={getUserInfo}>
              <p>TÌM KIẾM USER</p>
              <input ref={el} required placeholder='Nhập mã user' />
            </form>
          </div>
          {
            user._id &&
            <div className='user-info'>
              <p className='title'>THÔNG TIN USER:</p>
              <p>Tên: {`${user.firstName} ${user.lastName}`}</p>
              <p>Số TK: {user.credit.number}</p>
              <p>Ngân hàng: {user.credit.bank}</p>
              <p>Coins: {user.coins}</p>
              <div className='trade'>
                <form onSubmit={giveUserCoins}>
                  <div className='abc'>
                    <label htmlFor='coins'>
                      Nhập số coins:
                    </label>
                    <input required type='number' min={1} ref={el2} id='coins' />
                  </div>
                  <button type='submit'>Chuyển</button>
                </form>
              </div>
            </div>
          }
        </div>
      </div>
    </ExtraLayout>
  )
}

export default Coin
