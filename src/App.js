import { Switch, Route } from 'react-router-dom'

function App() {
  return (
    <div className='my-app'>
      <Switch>
        <Route path='/posts/:postId/update'>

        </Route>
        <Route path='/posts/create'>

        </Route>
        <Route path='/posts/:title'>

        </Route>
        <Route path='/posts'>

        </Route>
        <Route path='/:username'>

        </Route>
        <Route path='/'>
          <h1>home page</h1>
        </Route>
      </Switch>
    </div>
  );
}

export default App
