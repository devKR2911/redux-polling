import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { startPoll, stopPoll } from '../actions/mediaActions';
import PhotosPage from './PhotosPage';
import * as types from '../constants/actionTypes';

export class HomePage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      images: [],
      isPollingActive: false,
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      images: nextProps.images.data
    })
  }

  startPolling = () => {
    this.setState({isPollingActive: true});
    const pollParams = {
      url: 'cricket',                            // End point URL
      pollInterval: 5000,                        // 5 Seconds
      successAction: types.SEARCH_MEDIA_SUCCESS, // Success Action
      errorAction: types.SEARCH_MEDIA_FAILURE    // Failure action
    }
    this.props.dispatch(startPoll(pollParams));
  }

  stopPolling = () => {
    this.setState({isPollingActive: false});
    this.props.dispatch(stopPoll());
  }

  render() {
    const { images, isPollingActive } = this.state;
    return (
      <div className="jumbotron">
        <h1 className="lead">Welcome to Gallary app with redux polling </h1>
        <div>
          {
            isPollingActive ?
              (<button className="btn btn-lg btn-primary" onClick={this.stopPolling}> Stop Polling</button>) :
              (<button className="btn btn-lg btn-primary" onClick={this.startPolling}> Start Polling</button>)
          }
        </div>
        <PhotosPage images={images} />
      </div>
    );
  }
}

HomePage.propTypes = {
  images: PropTypes.array,
  dispatch: PropTypes.func.isRequired
};

/* Subscribe component to redux store and merge the state into component\s props */
const mapStateToProps = (state) => ({
  images: state.images,
});

/* connect method from react-router connects the component with redux store */
export default connect(mapStateToProps)(HomePage);
