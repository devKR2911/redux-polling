import React, { PropTypes, Component } from 'react';

export class PhotosPage extends Component {
  render() {
    const { images } = this.props;
    return (
      <div className="row">
        {images.map(image => {
          return (
            <div className="col-sm-3" key={image.id}>
              <img
                src={image.mediaUrl}
                alt="thumbnail"
                className="img-thumbnail"
              />
            </div>
          );
        })}
      </div>
    );
  }
}

PhotosPage.propTypes = {
  images: PropTypes.array
};

export default PhotosPage;
