import { Switch, Route } from 'react-router-dom'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Home from './pages/home'
import Login from './pages/sign/login'
import Register from './pages/sign/register'
import Create from './pages/create'

import { getCategoriesAsync, auth } from './redux/actions/index'

import './static/style/common.css'
import './static/style/header.scss'
import './static/style/footer.scss'
import './static/style/create.scss'
import './static/style/home.scss'
import './static/style/sign.scss'
import './static/style/detail.scss'
import './static/style/responsive.scss'
import Loading from './global/Loading'
import Update from './pages/update'
import Detail from './pages/detail'

function App() {
  const dispatch = useDispatch()
  const socket = useSelector(state => state.global.socket)
  
  socket.on('connection', 'hello')
  useEffect(() => {
    dispatch(getCategoriesAsync())
  }, [])

  useEffect(() => {
    dispatch(auth())
  })
  return (
    <div className='my-app'>
      <Loading />
      <Switch>
        <Route path='/login'>
          <Login />
        </Route>
        <Route path='/register'>
          <Register />
        </Route>
        <Route path='/products/:slug/update'>
          <Update />
        </Route>
        <Route path='/products/create'>
          <Create />
        </Route>
        <Route path='/products/:slug'>
          <Detail />
        </Route>
        <Route path='/products'>

        </Route>
        <Route path='/:username'>

        </Route>
        <Route path='/'>
          <Home />
        </Route>
      </Switch>
    </div>
  );
}

export default App
