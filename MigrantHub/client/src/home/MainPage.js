import React, { Component } from 'react';
import PropTypes from "prop-types";
import MainLayout from 'home/MainLayout';
import Grid from '@material-ui/core/Grid';
import ServiceCategory from 'services/ServiceCategory';
import FriendPanel from 'components/FriendPanel/FriendPanel';

class MainPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      serviceCategoryVisibility: true,
      friendPanelVisibility: false,
    };
  }

  render() {
    const { friendPanelVisibility, serviceCategoryVisibility } = this.state;
    const { location, history } = this.props;
    return (
      <MainLayout location={location} history={history}>
        <Grid item lg={12}>
          <div className="Main-feed">
            <div className="">{serviceCategoryVisibility && <ServiceCategory location={location} />}</div>
          </div>
        </Grid>
        <Grid item lg={12}>
          <div className="Panel">{friendPanelVisibility && <FriendPanel />}</div>
        </Grid>
      </MainLayout>
    );
  }
}

MainPage.propTypes = {
  location: PropTypes.string.isRequired,
  history: PropTypes.string.isRequired,
};

export default MainPage;
