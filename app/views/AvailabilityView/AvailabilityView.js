import React, {Component} from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Container from '../../components/Container';
import AddAvailability from '../../components/Forms/AddAvailability';
import styles from '../AvailabilityView/styles'
import RegisterAvailabilityForm from '../../components/Forms/RegisterAvailabilityForm';

class AvailabilityView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: [],
    };
  }

  componentDidMount() {
    console.log("in avail view: ", JSON.stringify(this.props.item))
  }

  backButton = () => {
    const { navigation } = this.props;
    navigation.navigate('AgendaView');
  }

  render() {    
    const { item, navigation } = this.props
    return (
      <Container>
      {/*  <View style={styles.mainContainer}>
             <View style={styles.componentsContainer}>
               <View style={styles.backButtonContainer}>
                 <TouchableOpacity onPress={() => this.props.navigation.navigate('MainView')}>
                   <Icon name="chevron-left" size={36} color="#ffffff" />
                 </TouchableOpacity>
               </View>

               <View style={styles.headerTextContainer}>
                 <Text style={styles.headerText}>Add Availability</Text>
               </View>
             </View>
           </View> */}

        <RegisterAvailabilityForm navigation={navigation}/>
      </Container>
    );
  }
}

export default AvailabilityView;

{/* <View style={styles.header}>
          <View style={styles.backButtonContainer}>
            <TouchableOpacity onPress={this.backButton}>
              <Icon color={`white`} name="close" size={30} />
            </TouchableOpacity>
          </View>
          <View style={styles.pageTitle}>
            <Text style={styles.headerTitle}>Availability Page</Text>
          </View>
        </View>  */}