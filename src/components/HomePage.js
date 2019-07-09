import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { startPoll, stopPoll } from '../actions/mediaActions';
import PhotosPage from './PhotosPage';
import MediaFactory from '../factory/mediaFactory';
import * as types from '../constants/actionTypes';

export class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      images: [],
      lastUpdatedOn: null,
      isPollingActive: false
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      images: nextProps.images.data,
      lastUpdatedOn: nextProps.images.lastUpdatedOn
    });
  }

  startPolling = () => {
    this.setState({
      isPollingActive: true
    });
    const pollParams = {
      // url: End point URL
      url: 'cricket',

      // pollInterval: 5 Seconds this mentions the interval at which polling should happen.
      pollInterval: 5000,

      // successAction: Success Action to be triggered on polling success.
      successAction: types.SEARCH_MEDIA_SUCCESS,

      // errorAction: Failure action to be triggered on polling error.
      errorAction: types.SEARCH_MEDIA_FAILURE,

      // factory: Data formating factory. Send if any factory formating required.
      factory: MediaFactory
    };
    this.props.dispatch(startPoll(pollParams));
  };

  stopPolling = () => {
    this.setState({
      isPollingActive: false
    });
    this.props.dispatch(stopPoll());
  };

  render() {
    const { images, lastUpdatedOn, isPollingActive } = this.state;
    return (
      <div className="jumbotron">
        <h1 className="lead"> Welcome to Gallary app with redux polling </h1>
        <h4 className="lead">
          Last updated on
          <b>
            {new Date(lastUpdatedOn).getHours()}
            Hours {new Date(lastUpdatedOn).getMinutes()}
            Minutes {new Date(lastUpdatedOn).getSeconds()}
            Seconds
          </b>
        </h4>
        <div>
          {isPollingActive ? (
            <button
              className="btn btn-lg btn-primary"
              onClick={this.stopPolling}
            >
              Stop Polling
            </button>
          ) : (
            <button
              className="btn btn-lg btn-primary"
              onClick={this.startPolling}
            >
              Start Polling
            </button>
          )}
        </div>
        <PhotosPage images={images} />
      </div>
    );
  }
}

HomePage.propTypes = {
  images: PropTypes.shape({}),
  dispatch: PropTypes.func.isRequired
};

/* Subscribe component to redux store and merge the state into component\s props */
const mapStateToProps = state => ({
  images: state.images
});

/* connect method from react-router connects the component with redux store */
export default connect(mapStateToProps)(HomePage);
