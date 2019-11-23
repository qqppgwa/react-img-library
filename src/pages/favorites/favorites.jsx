import React from 'react'
import cookie from 'react-cookies'
import ImageCell from '../../components/ImageCell/ImageCell.jsx'
import { apiImgId, apiSearch } from '../../assets/api'
class Favorites extends React.Component {
  constructor() {
    super()
    this.state = {
      status: '',
      list: []
    }
  }
  componentDidMount() {
    if (cookie.load('likeList') && cookie.load('likeList').length > 0) {
      this.setState({
        status: 'loading'
      })
      apiImgId({
        ids: cookie.load('likeList').join()
      })
        .then(res => {
          // console.log(res.data.data)
          let data = res.data.data
          if (data.length > 0) {
            // console.log('uu')
            this.setState({
              status: 'showList',
              list: data
            })
            console.log(this.state.list)
            // for (let i = 0; i < data.length; i++) {
            // imgData.push(<ImageCell list={data.length[i]} key={i} index={i} />)
            // content = imgData
            // }
          } else {
            this.setState({
              status: 'none'
            })
            // content = <p>error</p>
          }
        })
        .catch(err => {
          this.setState({
            status: 'error'
          })
          // content = <p>error</p>
        })
      // apiImgId({
      //   ids: cookie.load('likeList').join(),
      //   limit: 8
      // }).then(res => {
      //   console.log(res)
      // })
    } else {
      this.setState({
        status: 'none'
      })
    }
  }
  render() {
    let content
    let imgData = []
    console.log(this.state)
    if (this.state.status === 'showList') {
      for (let i = 0; i < this.state.list.length; i++) {
        imgData.push(<ImageCell list={this.state.list[i]} key={i} index={i} />)
        // console.log(imgData)
        content = imgData
      }
    }
    // if (cookie.load('likeList') && cookie.load('likeList').length > 0) {
    //   apiImgId({
    //     ids: cookie.load('likeList').join()
    //   })
    //     .then(res => {
    //       console.log(res.data.data)
    //       let data = res.data.data
    //       if (data.length > 0) {
    //         console.log('uu')
    //         for (let i = 0; i < data.length; i++) {
    //           imgData.push(<ImageCell list={data.length[i]} key={i} index={i} />)
    //           content = imgData
    //         }
    //       } else {
    //         content = <p>error</p>
    //       }
    //     })
    //     .catch(err => {
    //       console.log(err)
    //       content = <p>error</p>
    //     })
    //   // apiImgId({
    //   //   ids: cookie.load('likeList').join(),
    //   //   limit: 8
    //   // }).then(res => {
    //   //   console.log(res)
    //   // })
    // } else {
    //   content = <p>No favorite image</p>
    // }
    // for (let i = 0; i < cookie.load('likeList').length; i++) {
    //   console.log(cookie.load('likeList')[i])
    // imgList.push(<ImageCell list={cookie.load('likeList')[i]} key={i} index={i} />)
    // }
    // console.log(content)
    return <div className="imgList">{content}</div>
  }
}
export default Favorites
