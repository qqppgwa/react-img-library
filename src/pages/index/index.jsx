import React from 'react'
import ImageCell from '../../components/ImageCell/ImageCell.jsx'
import { apiSearch } from '../../assets/api'
class SearchPage extends React.Component {
  constructor() {
    super()
    this.state = {
      keyword: '',
      status: '',
      list: []
    }
  }
  render() {
    let s
    console.log(this.state.list)
    if (this.state.status === 'loading') {
      s = <p>loading</p>
    } else if (this.state.list.length > 0) {
      s = []
      for (let i = 0; i < this.state.list.length; i++) {
        s.push(<ImageCell list={this.state.list[i]} key={i} index={i} />)
      }
      console.log(s)
    } else if (this.state.status === 'none') {
      s = <p>no result</p>
    } else {
      s = <p>error</p>
    }
    return (
      <div>
        <InputArea keying={this.keying.bind(this)} changeStatus={this.changeStatus.bind(this)} list={this.list.bind(this)} state={this.state} />
        <div className="imgList">{this.state.status === '' ? null : s}</div>
      </div>
    )
  }
  keying(v) {
    this.setState({ keyword: v })
  }
  changeStatus(s) {
    this.setState({ status: s })
    console.log(this.state)
  }
  list(l) {
    this.setState({ list: l })
    console.log(this.state)
  }
}
// class Results extends React.Component {}
class InputArea extends React.Component {
  render() {
    return <input type="text" placeholder="Start searching for images!" onChange={this.keying.bind(this)} onKeyPress={this.search.bind(this)} value={this.props.state.keyword} />
  }
  keying(e) {
    console.log(e.target.value)
    this.props.keying(e.target.value)
  }
  search(e) {
    if (e.nativeEvent.keyCode === 13) {
      this.props.changeStatus('loading')
      // this.setState({ status: 'loading' })
      apiSearch({
        query: this.props.state.keyword,
        limit: '8'
      })
        .then(res => {
          console.log(res)
          if (res.data.data.length > 0) {
            this.props.changeStatus('showlist')
            this.props.list(res.data.data)
            // this.setState({ status: 'showList' })
          } else {
            this.props.changeStatus('none')
            // this.setState({ status: 'null' })
          }
        })
        .catch(err => {
          console.log(err)
          this.props.changeStatus('error')
          // this.setState({ status: 'error' })
        })
    }
  }
}
export default SearchPage
