import React from 'react'
import './App.css'
import { HashRouter, Route, NavLink, Switch } from 'react-router-dom'
import favorites from './pages/favorites/favorites.jsx'
import index from './pages/index/index.jsx'
import { connect } from 'react-redux'

const App = props => {
  const reload = () => {
    console.log(window.location.pathname)
    // location.search = ''
    window.location.href = window.location.origin + window.location.pathname
    // window.location.reload()
  }
  return (
    <HashRouter>
      <nav>
        <h1 onClick={reload}>
          Galler<span>easy</span>
        </h1>
        <NavLink exact to={'/'}>
          search
        </NavLink>
        <NavLink exact to={'/favourites'}>
          favourites (<span>{props.likeNum}</span>)
        </NavLink>
      </nav>
      <Switch>
        <Route path="/favourites" component={favorites} />
        <Route path="/" component={index} />
      </Switch>
    </HashRouter>
  )
}
const mapStateToProps = ({ likeNum }) => {
  return {
    likeNum: likeNum
  }
}
//
export default connect(mapStateToProps, null)(App)
