import React from 'react';
import {Text, ScrollView} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import styles from './styles';
import Block from '../Block';
import {CalendarButton} from '../Button';
import {Sae} from '../TextInputs';
import API from '../../api/api';
import AsyncStorage from '@react-native-community/async-storage';

class RegisterAvailabilityForm extends React.Component {
  constructor(props){
      super(props);
      this.state = {
        availData: {},
      }
  }

  componentDidMount() {
  }

  //async await needed for proper Promise handling during submit function
  handleUserSubmit = async (userEntries, nav) => {
    alert('Thank you for registering! You will receive an email regarding next steps within _ business days.')
    let token = await AsyncStorage.getItem('token')
    //parse just the token from the token object in async storage
    token = JSON.parse(token)
    console.log("avail entries: ", userEntries);
    console.log("avail nav: ", nav);
    //logout after submission complete, but this will change as registration expands to include availability, and redirect won't be to logout but to alt mainview which will display driver's approval/pending status
    API.logout(token.token)
    .then(res => {
        const loggedOut = res.json.Success;
        if (loggedOut == 'Logged Out') {
        AsyncStorage.removeItem('token');
        nav.navigate('Welcome');
        } else {
        Alert.alert('Unable to Logout', 'Please try again.');
        }
    })
    .catch(error => {
        AsyncStorage.removeItem('token');
        nav.navigate('Welcome');
    })
  }

  render(){
    const {navigation, userEntries} = this.props;
    return (
      <ScrollView>
        <KeyboardAwareScrollView>
          <Block style={styles.scrollContainer}>
            <Text style={styles.title}>Availability Info</Text>
            <Text style={styles.subTitle}>Continue with vehicle information</Text>
          </Block>
          <Block middle>
            <Sae
              label="Start Date and Time (YYYY-MM-DD HH:MM)"
              labelStyle={styles.labelStyle}
              inputPadding={16}
              labelHeight={24}
              // active border height
              borderHeight={2}
              borderColor="#475c67"
              style={[styles.saeInput]}
              inputStyle={styles.saeText}
              // TextInput props
              returnKeyType="next"
              onChangeText={text => this.props.handleChange(text, 'start_time')}
              ref={input => this.props.innerRef(input, 'StartTime')}
              onSubmitEditing={() => this.props.handleSubmitEditing('EndTime')}
              blurOnSubmit={false}
            />
            <Sae
              label="End Date and Time (YYYY-MM-DD HH:MM)"
              labelStyle={styles.labelStyle}
              inputPadding={16}
              labelHeight={24}
              // active border height
              borderHeight={2}
              borderColor="#475c67"
              style={[styles.saeInput]}
              inputStyle={styles.saeText}
              // TextInput props
              returnKeyType="next"
              onChangeText={text => this.props.handleChange(text, 'end_time')}
              ref={input => this.props.innerRef(input, 'EndTime')}
              onSubmitEditing={() => this.props.handleSubmitEditing('EndTime')}
            //   blurOnSubmit={false}
            />

            <Block style={styles.footer}>
              <CalendarButton title="Submit" onPress={() => this.handleUserSubmit(userEntries, navigation)} />
            </Block>
          </Block>
        </KeyboardAwareScrollView>
      </ScrollView>
    );
  }
};

export default RegisterAvailabilityForm;