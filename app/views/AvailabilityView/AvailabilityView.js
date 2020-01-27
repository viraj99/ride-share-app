import React, { Component } from 'react';
import Container from '../../components/Container';
import RegisterAvailabilityForm from '../../components/Forms/RegisterAvailabilityForm';

class AvailabilityView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: []
    };
  }

  componentDidMount() {
    console.log('in avail view: ', JSON.stringify(this.props.item));
  }

  backButton = () => {
    const { navigation } = this.props;
    navigation.navigate('AgendaView');
  };

  render() {
    const { item, navigation } = this.props;
    return (
      <Container>
        <RegisterAvailabilityForm navigation={navigation} />
      </Container>
    );
  }
}

export default AvailabilityView;
