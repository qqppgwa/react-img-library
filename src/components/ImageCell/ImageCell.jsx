import React from 'react'
import styles from './ImageCell.module.css'
import cookie from 'react-cookies'
import { connect } from 'react-redux'
class ImageCell extends React.Component {
  constructor(props) {
    super()
    this.state = {
      islike: this.checkLike(props.list.id)
    }
  }
  render() {
    return (
      <figure className={styles.container} onClick={this.liked.bind(this)}>
        <img src={this.props.list.images.fixed_height_downsampled.url} alt={this.props.keyword + ` ${this.props.index + 1}` || `favourite ${this.props.index + 1}`} />
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

      this.setState({ islike: true })
      // this.props.addLike(likes.length)
    } else if (this.state.islike) {
      let index = likes.indexOf(likes.find(e => e === this.props.list.id))
      likes.splice(index, 1)

      this.setState({ islike: false })
    }
    cookie.save('likeList', likes, {
      path: '/',
      expires
    })
    this.props.addLike(likes.length)
    // this.props.list.images.id
  }
  checkLike(id) {
    if (cookie.load('likeList')) {
      return cookie.load('likeList').find(e => e === id) ? true : false
    }
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addLike: likeNum => {
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
