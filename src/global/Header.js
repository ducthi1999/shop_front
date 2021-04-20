import { Link } from 'react-router-dom'
import { useState, useContext, useEffect } from 'react'
import Notify from './Notify'
import SearchModal from './SearchModal'
import { useDispatch, useSelector } from 'react-redux'

const Header = () => {
  const dispatch = useDispatch()
  const login = useSelector(state => state.global.login)
  const user = useSelector(state => state.global.user)
  const socket = useSelector(state => state.global.socket)
  const {
    username,
    firstName,
    lastName,
    role,
    userNotif,
    userBought,
    userImage,
    phone,
    coins
  } = user

  const [childMenu, setChildMenu] = useState(false)
  const [manageMenu, setManageMenu] = useState(false)
  const [mbMenu, setMbMenu] = useState(false)
  const [notify, setNotify] = useState(false)
  const [triggerNotif, setTriggerNotif] = useState(false)
  const [searchModal, setSearchModal] = useState(false)
  const [adminNotif, setAdminNotif] = useState(false)
  const [productNotif, setProductNotif] = useState(false)

  useEffect(() => {
    socket.on('buy-product-notif', notif => {
      setTriggerNotif(true)
      dispatch({
        type: 'UPDATE_NOTIF',
        payload: notif
      })
    })
  }, [])
  return (
    <>
      <SearchModal status={searchModal} setSearchModal={setSearchModal} />
      <div id='header'>
        <div className='container'>
          <div id='desktop'>
            <div className='header-container'>
              <div className='avt-wrapper'>
                <a href='/'>
                  <img src='/images/logo.png' alt='' />
                </a>
              </div>
              <div className='header-right-wrapper'>
                <div className='search'>
                  <i onClick={() => setSearchModal(true)} style={{ color: 'black', fontSize: '1.1rem', marginRight: 12, cursor: 'pointer' }} className="fas fa-search"></i>
                </div>
                <Link to='/products/create'>
                  <i className="fas fa-gamepad"></i>
                  <span>
                    Đăng bán tài khoản
                </span>
                </Link>
                {
                  login &&
                  <>
                    {
                      role === 'user' &&
                      <>
                        <div className='header-notify'>
                          <button onClick={() => { setNotify(!notify); setTriggerNotif(false) }} className='notify-btn'>
                            <i className="fas fa-bell"></i>
                            {
                              triggerNotif &&
                              <span style={{ color: 'white' }}></span>
                            }
                          </button>
                          {
                            notify &&
                            <Notify notifyList={userNotif || []} />
                          }
                        </div>
                        <div className='user-coins'>
                          <i style={{ marginRight: 6, marginLeft: 8, color: 'yellow' }} className="fas fa-coins"></i>
                          <span>{coins}</span>
                        </div>
                      </>
                    }
                    <button onClick={() => setChildMenu(!childMenu)}>
                      <img src='/images/user_default_img.png' />
                      <span>
                        {user.username}
                      </span>
                      {
                        childMenu &&
                        <i className="fas fa-sort-up"></i>
                        ||
                        <i className="fas fa-caret-down"></i>
                      }
                      <div className='child-menu' hidden={!childMenu}>
                        <div className='child-menu-container'>
                          <ul>
                            <li>
                              <Link to={`/profile/1`}>
                                <i className="fas fa-user"></i>
                                <span>
                                  Cá nhân
                                </span>
                              </Link>
                            </li>
                            <li>
                              <Link to='/credit/topup'>
                                <i className="fas fa-coins"></i>
                                <span>
                                  Nạp tiền
                                </span>
                              </Link>
                            </li>
                            <li>
                              <Link to='/credit/withdrawals'>
                                <i className="fas fa-money-bill-wave"></i>
                                <span>
                                  Rút tiền
                                </span>
                              </Link>
                            </li>
                            <li>
                              <Link to='/login'>
                                <i className="fas fa-sign-out-alt"></i>
                                <span>
                                  Đăng xuất
                            </span>
                              </Link>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </button>
                  </>
                  ||
                  <div className='sign-container'>
                    <Link to='/login' className='login-btn'>
                      <i className="fas fa-sign-in-alt"></i>
                      <span>
                        Đăng nhập
                      </span>
                    </Link>
                    <Link style={{ marginLeft: '0px !important' }} to='/register' className='login-btn'>
                      <i className="fas fa-user-plus"></i>
                      <span>
                        Đăng kí
                      </span>
                    </Link>
                  </div>
                }
                {
                  role === 'admin' &&
                  <button className='admin-btn' onClick={() => { setManageMenu(!manageMenu); setAdminNotif(false) }} style={{ marginLeft: 16 }}>
                    {
                      adminNotif &&
                      <span className='manage-notif'></span>
                    }
                    <i style={{ marginRight: 8 }} className="fas fa-tasks"></i>
                    <span>
                      Quản lý
                    </span>
                    {
                      manageMenu &&
                      <i className="fas fa-sort-up"></i>
                      ||
                      <i className="fas fa-caret-down"></i>
                    }
                    <div className='child-menu' hidden={!manageMenu}>
                      <div className='child-menu-container'>
                        <ul>
                          <li>
                            <a onClick={() => setProductNotif(false)} className='manage-product' href='/admin/products'>
                              {
                                productNotif &&
                                <span className='manage-notif'></span>
                              }
                              <i className="fas fa-shopping-bag"></i>
                              <span>
                                Sản phẩm
                              </span>
                            </a>
                          </li>
                          <li>
                            <Link to='/admin/users'>
                              <i className="fas fa-users"></i>
                              <span>
                                Người dùng
                            </span>
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </button>
                }
              </div>
            </div>
          </div>
          <div id='mobile'>
            <div className='mobile-menu' hidden={!mbMenu}>
              <div className='menu-overlay' onClick={() => setMbMenu(false)}>
              </div>
              <div className='menu-container'>
                <ul>
                  <li>
                    <Link to='/products/create'>
                      <i className="fas fa-gamepad"></i>
                      <span>
                        Đăng bán tài khoản
                      </span>
                    </Link>
                  </li>
                  {
                    true &&
                    <>
                      <li>
                        <Link to={`/profile/1`}>
                          <i className="fas fa-user"></i>
                          <span>
                            Cá nhân
                      </span>
                        </Link>
                      </li>
                      {
                        'manh' === 'admin' &&
                        <>
                          <li className='mb-product-manage'>
                            <a onClick={() => setProductNotif(false)} href='/admin/products'>
                              <i className="fas fa-shopping-bag"></i>
                              <span>
                                Quản lý sản phẩm
                              </span>
                              {
                                productNotif &&
                                <span className='manage-notif'></span>
                              }
                            </a>
                          </li>
                          <li>
                            <a href='/admin/users'>
                              <i className="fas fa-users"></i>
                              <span>
                                Quản lý người dùng
                              </span>
                            </a>
                          </li>
                        </>
                      }
                      <li>
                        <Link to='/login'>
                          <i className="fas fa-sign-out-alt"></i>
                          <span>
                            Đăng xuất
                      </span>
                        </Link>
                      </li>
                    </>
                    ||
                    <>
                      <li>
                        <Link to={`/login`}>
                          <i className="fas fa-sign-in-alt"></i>
                          <span>
                            Đăng nhập
                          </span>
                        </Link>
                      </li>
                      <li>
                        <Link to={`/register`}>
                          <i className="fas fa-user-plus"></i>
                          <span>
                            Đăng kí
                          </span>
                        </Link>
                      </li>
                    </>
                  }
                </ul>
              </div>
            </div>
            <div className='header-container'>
              <div className='avt-wrapper'>
                <a href='/'>
                  <img src='/images/logo.png' alt='' />
                </a>
              </div>
              <div className='btn-wrapper'>
                <button className='mb-search' onClick={() => setSearchModal(true)}>
                  <i className="fas fa-search"></i>
                </button>
                {
                  user.role !== 'admin' &&
                  <button onClick={() => { setNotify(!notify); setTriggerNotif(false) }} className='notify-btn'>
                    <i className="fas fa-bell"></i>
                    {
                      triggerNotif &&
                      <span></span>
                    }
                    {
                      notify &&
                      <Notify notifyList={[]} />
                    }
                  </button>
                }
                <button className='menu-btn' onClick={() => { setMbMenu(true); setAdminNotif(false) }}>
                  <i className="fas fa-bars"></i>
                  {
                    adminNotif &&
                    <span className='manage-notif'></span>
                  }
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Header