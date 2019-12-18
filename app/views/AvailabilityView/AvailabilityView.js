import React from 'react';
import { View, Text, Button } from 'react-native';
import Availability from '../../components/ScheduleItems/Availability/Availability';
import RegisterAvailabilityForm from '../../components/Forms/RegisterAvailabilityForm';
import AddAvailability from '../../components/Forms/AddAvailability'

class AvailabilityView extends React.Component {
  constructor(props){
    super(props);
    this.state={

    }
  }

  redirect = () => {
    this.props.navigation.navigate('')
  }

  render(){
    return(
      <View>
        <Text>Testing</Text>
        <Button
          title="Add Availability"
          onPress={() => this.redirect()}
        />
      </View>
    )
  }
}

export default AvailabilityView;