import React from 'react';
import {Text, ScrollView} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import styles from './styles';
import Block from '../Block';
import {CalendarButton} from '../Button';
import {Sae} from '../TextInputs';
import AsyncStorage from '@react-native-community/async-storage';

class RegisterVehicleForm extends React.Component {
  constructor(props){
      super(props);
      this.state = {
        carData: {},
      }
  }

  handleUserSubmit = (userEntries, nav) => {
    let token = AsyncStorage.getItem('token');
    //use API file, createVehicle fx to send user inputs to database
    API.createVehicle(userEntries, token)
    .then(alert('Thank you for registering! You will receive an email regarding next steps within _ business days.'),
          nav.navigate('Welcome')
    )
    //if error performing API fetch for posting driver, show error
    .catch(error => {
      console.warn('There has been a problem with your operation: ' + error.message);
      throw error;
    })
  }

  render(){
    return (
      <ScrollView>
        <KeyboardAwareScrollView>
          <Block style={styles.scrollContainer}>
            <Text style={styles.title}>Vehicle Info</Text>
            <Text style={styles.subTitle}>Continue with vehicle information</Text>
          </Block>
          <Block middle>
            <Sae
              label="Make"
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
              onChangeText={text => handleChange(text, 'car_make')}
              ref={input => innerRef(input, 'Make')}
              onSubmitEditing={() => handleSubmitEditing('Model')}
              blurOnSubmit={false}
            />
            <Sae
              label="Model"
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
              onChangeText={text => handleChange(text, 'car_model')}
              ref={input => innerRef(input, 'Model')}
              onSubmitEditing={() => handleSubmitEditing('Year')}
              blurOnSubmit={false}
            />
            <Sae
              label="Year"
              labelStyle={styles.labelStyle}
              inputPadding={16}
              labelHeight={24}
              // active border height
              borderHeight={2}
              borderColor="#475c67"
              style={[styles.saeInput]}
              inputStyle={styles.saeText}
              // TextInput props
              keyboardType="numeric"
              returnKeyType="next"
              onChangeText={number => handleChange(number, 'car_year')}
              ref={input => innerRef(input, 'Year')}
              onSubmitEditing={() => handleSubmitEditing('SeatBelts')}
              blurOnSubmit={false}
            />
            <Sae
              label="Number of seatbelts"
              labelStyle={styles.labelStyle}
              inputPadding={16}
              labelHeight={24}
              // active border height
              borderHeight={2}
              borderColor="#475c67"
              style={[styles.saeInput]}
              inputStyle={styles.saeText}
              // TextInput props
              keyboardType="numeric"
              returnKeyType="next"
              onChangeText={number => handleChange(number, 'seat_belt_num')}
              ref={input => innerRef(input, 'SeatBelts')}
              onSubmitEditing={() => handleSubmitEditing('Color')}
              blurOnSubmit={false}
            />
            <Sae
              label="Color"
              labelStyle={styles.labelStyle}
              inputPadding={16}
              labelHeight={24}
              // active border height
              borderHeight={2}
              borderColor="#475c67"
              style={[styles.saeInput]}
              inputStyle={styles.saeText}
              // TextInput props
              returnKeyType="done"
              onChangeText={text => handleChange(text, 'car_color')}
              ref={input => innerRef(input, 'Color')}
              onSubmitEditing={() => handleSubmitEditing('Plate')}
              blurOnSubmit={false}
            />
            <Sae
              label="License Plate"
              labelStyle={styles.labelStyle}
              inputPadding={16}
              labelHeight={24}
              // active border height
              borderHeight={2}
              borderColor="#475c67"
              style={[styles.saeInput]}
              inputStyle={styles.saeText}
              // TextInput props
              returnKeyType="done"
              onChangeText={text => handleChange(text, 'car_plate')}
              ref={input => innerRef(input, 'Plate')}
              blurOnSubmit
            />
            <Block style={styles.footer}>
              <CalendarButton title="Submit" onPress={() => this.handleUserSubmit(this.props.userEntries, this.props.navigation)} />
            </Block>
          </Block>
        </KeyboardAwareScrollView>
      </ScrollView>
    );
  }
};

export default RegisterVehicleForm;
