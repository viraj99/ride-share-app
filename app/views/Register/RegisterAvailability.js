import React, {Component} from 'react';
import { View, Keyboard } from 'react-native';
import styles from './styles';
import Container from '../../components/Container';
import RegisterAvailabilityForm from '../../components/Forms/RegisterAvailabilityForm';

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
    if (id === 'Recurring') {
      Keyboard.dismiss()
    } else {
      this.inputs[id].focus();
    }

    const availInfo = {
        "start_time": this.state.start_time,
        "end_time": this.state.end_time,
        "is_recurring": this.state.is_recurring, 
        "end_date": this.state.end_date,
        //below values need to be changed, place-holding for now
        "location_id": 1,
    }
    console.log("avail data input is: ", availInfo)
    this.setState({availData: availInfo});
  };

  handleInnerRef = (input, id) => {
    this.inputs[id] = input;
  };

  render() {
    const {navigation} = this.props;

    return(
      <Container>
        <View styles={[styles.signup, styles.headerPadding]}>
          <RegisterAvailabilityForm
            navigation={navigation}
            handleChange={this.handleChange}
            innerRef={this.handleInnerRef}
            handleSubmitEditing={this.handleSubmitEditing}
            userEntries={this.state.availData}
          />
        </View>
      </Container>
    )
  }
}
   
export default RegisterAvailability;
