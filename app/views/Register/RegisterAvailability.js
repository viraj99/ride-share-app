import React, {Component} from 'react';
import { View } from 'react-native';
import styles from './styles';
import Container from '../../components/Container';
import RegisterAvailabilityForm from '../../components/Forms/RegisterAvailabilityForm';

class RegisterAvailability extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: [],
    };
  }

  render() {
    const {navigation} = this.props;

    return(
      <Container>
        <View styles={[styles.signup, styles.headerPadding]}>
          <RegisterAvailabilityForm
            navigation={navigation}
          />
        </View>
      </Container>
    )
  }
}
   
export default RegisterAvailability;