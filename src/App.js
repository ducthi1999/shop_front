import { Switch, Route } from 'react-router-dom'
import Home from './pages/home'
import Create from './pages/create'

import './static/style/common.css'
import './static/style/header.scss'
import './static/style/create.scss'
import './static/style/responsive.scss'

function App() {
  return (
    <div className='my-app'>
      <Switch>
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
