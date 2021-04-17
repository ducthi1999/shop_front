import { Switch, Route } from 'react-router-dom'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import Home from './pages/home'
import Login from './pages/sign/login'
import Register from './pages/sign/register'
import Create from './pages/create'
import { getAllProductsAsync, getCategoriesAsync } from './redux/actions/index'

import './static/style/common.css'
import './static/style/header.scss'
import './static/style/footer.scss'
import './static/style/create.scss'
import './static/style/home.scss'
import './static/style/sign.scss'
import './static/style/responsive.scss'

function App() {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getCategoriesAsync())
  }, [])
  return (
    <div className='my-app'>
      <Switch>
        <Route path='/login'>
          <Login />
        </Route>
        <Route path='/register'>
          <Register />
        </Route>
        <Route path='/posts/:postId/update'>

        </Route>
        <Route path='/products/create'>
          <Create />
        </Route>
        <Route path='/posts/:title'>

        </Route>
        <Route path='/posts'>

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
