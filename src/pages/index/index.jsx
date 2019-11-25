import React from 'react'
import queryString from 'query-string'
import ImageCell from '../../components/ImageCell/ImageCell.jsx'
import { apiSearch } from '../../assets/api'
import styles from './index.module.css'
class SearchPage extends React.Component {
  constructor() {
    super()
    this.state = {
      keyword: '',
      status: '',
      list: [],
      btnDisabled: false
    }
  }

  render() {
    let content
    if (this.state.status === 'loading') {
      content = <p>loading</p>
    } else if (this.state.list.length > 0) {
      content = []
      for (let i = 0; i < this.state.list.length; i++) {
        content.push(<ImageCell list={this.state.list[i]} key={i} index={i} keyword={this.state.keyword} />)
      }
    } else if (this.state.status === 'none') {
      content = <p>no result</p>
    } else {
      content = <p>error</p>
    }
    return (
      <div>
        <InputArea keying={this.keying.bind(this)} changeStatus={this.changeStatus.bind(this)} list={this.list.bind(this)} state={this.state} query={queryString.parse(this.props.location.search)} />
        <div className="imgList">{this.state.status === '' ? null : content}</div>
        {this.state.pagination && this.state.pagination.total_count - (this.state.pagination.offset + 8) > 0 && this.state.status === 'showlist' ? (
          <button className={styles.more + (this.state.btnDisabled ? ` ${styles.dis}` : '')} onClick={this.nextPage.bind(this)} disabled={this.state.btnDisabled}>
            load more
          </button>
        ) : null}
      </div>
    )
  }
  keying(v) {
    this.setState({ keyword: v })
  }
  changeStatus(s) {
    if (s === 'loading') {
      this.setState({ list: [] })
    } else {
      // if (this.state.keyword.trim().length > 0) {
      this.props.history.push(`?keyword=${this.state.keyword}`)
      // }
    }
    this.setState({ status: s })
  }
  list(l) {
    this.setState({ list: this.state.list.concat(l.data), pagination: l.pagination })
  }
  nextPage() {
    this.setState({ btnDisabled: true })
    apiSearch({
      query: this.state.keyword,
      limit: '8',
      offset: this.state.pagination.offset + 8
    })
      .then(res => {
        this.list(res.data)
        this.setState({ btnDisabled: false })
      })
      .catch(err => {
        console.log(err)
        this.setState({ btnDisabled: false })
        alert('error')
        // this.props.changeStatus('error')
        // this.setState({ status: 'error' })
      })
  }
}
// class Results extends React.Component {}
class InputArea extends React.Component {
  render() {
    return <input type="text" placeholder="Start searching for images!" onChange={this.keying.bind(this)} onKeyPress={this.search.bind(this)} value={this.props.state.keyword} />
  }
  componentDidMount() {
    if (this.props.query.keyword) {
      this.keying(this.props.query.keyword)
      this.search(this.props.query.keyword)
    }
  }
  keying(e) {
    if (e === this.props.query.keyword) {
      this.props.keying(e)
    } else {
      this.props.keying(e.target.value.trim())
    }
  }
  search(e) {
    if ((this.props.state.keyword.length > 0 && e.nativeEvent && e.nativeEvent.keyCode === 13) || e === this.props.query.keyword) {
      this.props.changeStatus('loading')
      // this.setState({ status: 'loading' })
      apiSearch({
        query: this.props.state.keyword || this.props.query.keyword,
        limit: '8',
        offset: '0'
      })
        .then(res => {
          if (res.data.data.length > 0) {
            this.props.changeStatus('showlist')

            // this.setState({ status: 'showList' })
          } else {
            this.props.changeStatus('none')
            // this.setState({ status: 'null' })
          }
          this.props.list(res.data)
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
