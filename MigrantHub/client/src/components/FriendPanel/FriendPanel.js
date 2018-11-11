
import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import axios from 'axios';
import yes from './yes.svg';
import no from './no.svg';

const qs = require('qs');

class FriendPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      addFriendTextValue: '',
      addFriendError: false,
      addFriendMessage: '',
      friendRequests: [],
      friendsList: [],
    };
    this.getFriendRequests = this.getFriendRequests.bind(this);
    this.getFriendsList = this.getFriendsList.bind(this);
  }

  componentDidMount() {
    this.getFriendRequests(this);
    this.getFriendsList(this);
  }

  getFriendsList(ev) {
    axios.get('/api/friend/getfriendslist')
    .then((response) => {
        ev.setState({ friendsList: response.data });
    }).catch((error) => {});
  }

  acceptFriendRequest(event, _id, requestFromP, requestToP, index) {
    event.handleDeleteRow(index);
    axios.post('/api/friend/acceptfriendrequest',
      qs.stringify({
          _id,
          requestFrom: requestFromP,
          requestTo: requestToP,
      })).then((response) => {
      // call getFriendRequests() to update list
      event.getFriendRequests(event);
    });
  }

  rejectFriendRequest(event, _id, index) {
    event.handleDeleteRow(index);
    axios.post('/api/friend/rejectfriendrequest',
        qs.stringify({
            _id,
        })).then((response) => {
    });
    // call getFriendRequests() to update list
    event.getFriendRequests(event);
  }


  getFriendRequests(ev) {
    axios.get('/api/friend/getrequests')
    .then((response) => {
        ev.setState({ friendRequests: response.data });
    }).catch((error) => {});
  }

  handleDeleteRow(index) {
    const rows = [...this.state.friendRequests];
    rows.splice(index, 1);
    this.setState({
      friendRequests: rows,
    });
  }

  handleAddFriendTextChange(e) {
    this.setState({
      addFriendTextValue: e.target.value,
    });
  }

  handleAddFriend = () => {
    axios.post('/api/friend/add',
      qs.stringify({
        requestTo: this.state.addFriendTextValue,
      }))
      .then((response) => {
        this.setState({
          addFriendMessage: response.data.message,
          addFriendError: response.data.isError,
        });
      });
  }

  render(props) {
    return (
      <div>
        <Card className="Card-friend-panel">
          <CardContent>
            <p>Your list of friends:</p>
            <ul>
              {this.state.friendsList.map(request => (
                <li key={request.friendName}>
                  <img src={request.pic} alt="profile pic" className="User-avatar" />
                  {request.friendName}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
        <Card className="Card-friend-panel">
          <CardContent>
            <p>Your friend requests:</p>
            <ul>
              {this.state.friendRequests.map((request, index) => (
                  <li key={request.id}>
                    <img src={request.pic} alt="profile pic" className="User-avatar" />
                    {request.requestFrom}
                    <Grid container spacing={24}>
                      <Grid
                        item
                        xs={12}
                        sm={4}
                        id="friendRequest"
                        name="friendRequest"
                        value={request.requestFrom}
                        fullWidth
                      />
                      <Button onClick={() => { this.acceptFriendRequest(this, request._id, request.requestFrom, request.requestTo, index); }} variant="contained" color="primary"><img src={yes} alt="yes" /></Button>
                      <Button onClick={() => { this.rejectFriendRequest(this, request._id, index); }} variant="contained" color="primary"><img src={no} alt="no" /></Button>
                    </Grid>
                  </li>
              ))}
            </ul>
          </CardContent>
        </Card>
        <Card className="Card-friend-panel">
          <CardContent>
            <p>Add Friends:</p>
            <TextField
              id="addFriendTextbox"
              label="User Email"
              value={this.state.addFriendTextValue}
              onChange={event => this.handleAddFriendTextChange(event)}
              margin="normal"
              variant="outlined"
              helperText={this.state.addFriendMessage}
              error={this.state.addFriendError}
            />
            <Button variant="contained" color="primary" onClick={event => this.handleAddFriend()}>Add Friend</Button>
          </CardContent>
        </Card>
      </div>
    );
  }
}
export default FriendPanel;
