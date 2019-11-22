import React from 'react'
import styles from './ImageCell.module.css'
class ImageCell extends React.Component {
  constructor(props) {
    super()
    console.log(props)
  }
  render() {
    let photo = this.props.list.images.fixed_height_downsampled
    // console.log(document.getElementsByClassName('figure')[0])
    return (
      <figure className={styles.container + ` figure${this.props.index}`}>
        <img src={this.props.list.images.fixed_height_downsampled.url} alt="" style={{ left: `calc((22vw - ${photo.width}px))` }} />
      </figure>
    )
  }
}
export default ImageCell
