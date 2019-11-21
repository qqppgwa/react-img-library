import React from 'react'
import { apiSearch } from '../assets/api'
class SearchPage extends React.Component {
  componentDidMount() {
    apiSearch({
      query: 'cute',
      limit: '8'
    })
      .then(res => {
        console.log(res)
      })
      .catch(err => {
        console.log(err)
      })
    // fetch('https://api.giphy.com/v1/gifs/search?api_key=IGLOYrMAV8KRjzGzj6vvF3dGx2WlASHZ&q=cute&limit=8&offset=0&rating=G&lang=en')
  }
  render() {
    return <div></div>
  }
}
export default SearchPage
