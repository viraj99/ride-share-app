import React, {Component} from 'react';
import { NavigationEvents } from 'react-navigation';
import { View } from 'react-native';
import styles from './styles';
import Container from '../../components/Container';
import AddAvailability from '../../components/Forms/AddAvailability';

class AvailabilityView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: [],
    };
  }

  render() {    
    return (
      <Container>
        <View style={[styles.signup, styles.headerPadding]}>
          <AddAvailability />
        </View>
      </Container>
    );
  }
}

export default AvailabilityView;


// import React from 'react';
// import { View, Text, Button } from 'react-native';

// class AvailabilityView extends React.Component {
//   constructor(props){
//     super(props);
//     this.state={

//     }
//   }


//   render(){
//     return(
//       <View>
//         <Text>Testing</Text>
//         <Button
//           title="Add Availability"
//           onPress={() => this.redirect()}
//         />
//       </View>
//     )
//   }
// }

// export default AvailabilityView;