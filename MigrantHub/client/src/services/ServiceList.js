import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import ServiceItem from './ServiceItem';
import Header from '../components/Header/Header';

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
  },
});

class ServiceList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      redirectToServiceForm: false,
      editMode: '',
      editOwner: '',
    };

    this.getData = this.getData.bind(this);
  }

  componentDidMount() {
    this.getData(this);
  }

  componentWillReceiveProps() {
    this.getData(this);
  }

  getData() {
    const { location } = this.props;
    let editOwnerEmail = '';

    if (location.state) {
      this.setState({
        editMode: location.state.editMode,
        editOwner: location.state.editOwner,
      });

      editOwnerEmail = location.state.editOwner;
    }
    axios.get('/api/services/view/all/', {
      params: {
        editOwner: editOwnerEmail,
      },
    }).then((response) => {
      this.setState({
        items: response.data,
      });
    });
  }

  setRedirectToServiceForm = () => {
    this.setState({
      redirectToServiceForm: true,
    });
  }

    renderRedirectToServiceForm = () => {
      const { redirectToServiceForm } = this.state;
      if (redirectToServiceForm) {
        return <Redirect to="/services/create" />;
      }
    }

    render() {
      const { classes } = this.props;
      const { items, editMode, editOwner } = this.state;
      return (
        <div>
          <Header />
          {this.renderRedirectToServiceForm()}
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            onClick={this.setRedirectToServiceForm}
          >
            Create Service
          </Button>
          <Paper className={classes.root} elevation={2}>
            {' '}
            {
              items.map(item => (
                <ServiceItem
                  serviceId={item._id}
                  serviceTitle={item.serviceTitle}
                  serviceImagePath={item.serviceImagePath}
                  serviceDescription={item.serviceDescription}
                  serviceSummary={item.serviceSummary}
                  serviceLocation={item.location}
                  serviceDate={item.serviceDate}
                  serviceHours={item.serviceHours}
                  editMode={editMode}
                  editOwner={editOwner}
                />
              ))
          }
          </Paper>
        </div>
      );
    }
}

ServiceList.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  location: PropTypes.shape({}).isRequired,
};

export default withStyles(styles)(ServiceList);
