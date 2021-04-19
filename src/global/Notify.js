import { Link } from 'react-router-dom'

const Notify = ({ notifyList }) => {
  const newNotifyList = [...notifyList]
  newNotifyList.reverse()
  return (
    <>
      <div className='notification'>
        <div className='desktop notif-container'>
          <div className='notif-list'>
            {
              newNotifyList && newNotifyList.length > 0 &&
              <ul>
                {
                  newNotifyList.map(item =>
                    <li>
                      <span>
                        {item.content}
                      </span>
                    </li>
                  )
                }
              </ul>
              ||
              <p style={{ paddingLeft: 12 }}>Chưa có thông báo</p>
            }
          </div>
        </div>
      </div>
      <div className='mb-notif'>
        <div className='overlay'>
        </div>
        <div className='mb-notif-container'>
          {
            newNotifyList && newNotifyList.length > 0 &&
            <ul>
              {
                newNotifyList.map(item =>
                  <li>
                    <span>
                      {item.content}
                    </span>
                  </li>
                )
              }
            </ul>
            ||
            <p className='notif-warn'>Chưa có thông báo</p>
          }
        </div>
      </div>
    </>

  )
}

export default Notify