import React from 'react'
import './App.css'
import { HashRouter, Route, NavLink, Switch } from 'react-router-dom'
import favorites from './pages/favorites.jsx'
import index from './pages/index.jsx'

function App() {
  return (
    <HashRouter>
      <nav>
        <h1>
          Galler<span>easy</span>
        </h1>
        <NavLink to={'/'}>search</NavLink>
        <NavLink to={'/favourites'}> favourites </NavLink>
      </nav>
      <Switch>
        <Route path="/favourites" component={favorites} />
        <Route path="/" component={index} />
      </Switch>
    </HashRouter>
  )
}

export default App
