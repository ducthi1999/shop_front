import ExtraLayout from '../../layouts/ExtraLayout'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { useState } from 'react'
const BoughtProduct = () => {
  const dispatch = useDispatch()
  const products = useSelector(state => state.global.user.userBought)
  const [boughts, setBoughts] = useState([])
  
  useEffect(() => {
    const newProducts = products.map(item => item.product)
    setBoughts(newProducts)
  }, [products])

  return (
    <ExtraLayout category='Nick đã mua'>
      <div id='admin-request'>
        <div className='container'>
          {
            boughts && boughts.length > 0 &&
            <ul>
              {
                boughts.map((item, index) =>
                  <li>
                    <div>
                      <h5>Tên tài khoản: {item.name}</h5>
                      <h6>Giá: {item.price}</h6>
                    </div>
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

export default BoughtProduct