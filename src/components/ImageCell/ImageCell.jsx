import React from 'react'
import styles from './ImageCell.module.css'
import cookie from 'react-cookies'
import { connect } from 'react-redux'
class ImageCell extends React.Component {
  constructor(props) {
    super()
    // console.log(cookie)
    console.log(props)
    this.state = {
      islike: this.checkLike(props.list.id)
    }
  }
  render() {
    let photo = this.props.list.images.fixed_height_downsampled
    // console.log(document.getElementsByClassName('figure')[0])
    return (
      <figure className={styles.container + ` figure${this.props.index}`} onClick={this.liked.bind(this)}>
        <img src={this.props.list.images.fixed_height_downsampled.url} alt="" />
        <div className={this.state.islike ? styles.liked : ''}></div>
      </figure>
    )
  }
  liked() {
    const expires = new Date()
    expires.setDate(Date.now() + 1000 * 60 * 60 * 24 * 14)
    let likes = cookie.load('likeList') ? cookie.load('likeList') : []
    // let likes = this.checkLike(this.props.list.id)
    if (!this.state.islike || likes.length === 0) {
      likes.push(this.props.list.id)
      cookie.save('likeList', likes, {
        path: '/',
        expires
      })
      this.setState({ islike: true })
      this.props.addLike(likes.length)
    } else if (this.state.islike) {
      let index = likes.indexOf(likes.find(e => e === this.props.list.id))
      likes.splice(index, 1)
      cookie.save('likeList', likes, {
        path: '/',
        expires
      })
      this.setState({ islike: false })
      this.props.addLike(likes.length)
    }

    console.log(cookie.loadAll())

    // this.props.list.images.id
  }
  checkLike(id) {
    if (cookie.load('likeList')) {
      return cookie.load('likeList').find(e => e === id) ? true : false
    }
  }
}
const mapStateToProps = state => {
  return {
    name: state.name
  }
}
const mapDispatchToProps = dispatch => {
  return {
    addLike: likeNum => {
      console.log(likeNum)
      return dispatch({
        type: 'ADD_Like',
        payload: {
          likeNum: likeNum
        }
      })
    }
  }
}
export default connect(null, mapDispatchToProps)(ImageCell)

// style={{ left: `calc((22vw - ${photo.width}px))` }}
