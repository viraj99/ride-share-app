import React, {Component} from 'react';
import { View } from 'react-native';
import styles from './styles';
import Container from '../../components/Container';
import {Availability} from '../../components/ScheduleItems/Availability';

class RegisterAvailability extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: [],
      availData: {},
    };
    this.inputs = {};
  }

  handleChange = (text, name) => {
    this.setState({[name]: text});
  };

  handleSubmitEditing = id => {
    this.inputs[id].focus();

    const availInfo = {
        "startTime": "2019-11-22 08:00",
        "endTime": "2019-11-22 10:00",
        "isRecurring": false, 
    }
    console.log("avail data input is: ", availInfo)
    this.setState({availData: availInfo});
  };

  handleInnerRef = (input, id) => {
    this.inputs[id] = input;
  };

  render() {
    const {navigation} = this.props;
    
    return (
      <Container>
        <View style={[styles.signup, styles.headerPadding]}>
          <Availability
            navigation={navigation}
            // handleSubmit={this.handleSubmit}
            handleChange={this.handleChange}
            innerRef={this.handleInnerRef}
            handleSubmitEditing={this.handleSubmitEditing}
            userEntries={this.state.availData}
          />
        </View>
      </Container>
    );
  }
}

export default RegisterAvailability;
