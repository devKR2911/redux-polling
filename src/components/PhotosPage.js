import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';

export class PhotosPage extends Component {
  render() {
    const { images } = this.props;
    return (
      <div className="row">
        {images.map(image => {
          return (<div className="col-sm-3" key={image.id}>
            <img src={image.mediaUrl} alt="thumbnail" className="img-thumbnail"/>
          </div>)
        })}
      </div>
    );
  }
}

PhotosPage.propTypes = {
  images: PropTypes.array
};

/* Subscribe component to redux store and merge the state into component\s props */
const mapStateToProps = ({ images }) => ({
  images: images,
});

/* connect method from react-router connects the component with redux store */
export default connect(mapStateToProps)(PhotosPage);
