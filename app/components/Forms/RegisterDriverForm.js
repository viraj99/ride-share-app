import React from 'react';
import { Text, ScrollView } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import styles from './styles';
import Block from '../Block';
import { CalendarButton } from '../Button';
import { Sae } from '../TextInputs';

const RegisterDriverForm = (props) => {
  const {
    subTitle, navigation, handleChange, innerRef, handleSubmitEditing,
  } = props;
  return (
    <ScrollView>
      <Block middle>
        <KeyboardAwareScrollView>
          <Block style={styles.scrollContainer}>
            <Text style={styles.title}>Sign Up</Text>
            <Text style={styles.subTitle}>{subTitle}</Text>
          </Block>
          <Sae
            label="First Name"
            labelStyle={styles.labelStyle}
            inputPadding={16}
            labelHeight={24}
            // active border height
            borderHeight={2}
            borderColor="#475c67"
            // TextInput props
            returnKeyType="next"
            style={[styles.saeInput]}
            inputStyle={styles.saeText}
            onChangeText={text => handleChange(text, 'firstName')}
            ref={input => innerRef(input, 'FirstName')}
            onSubmitEditing={() => handleSubmitEditing('LastName')}
            blurOnSubmit={false}
          />
          <Sae
            label="Last Name"
            labelStyle={styles.labelStyle}
            inputPadding={16}
            labelHeight={24}
            // active border height
            borderHeight={2}
            borderColor="#475c67"
            // TextInput props
            returnKeyType="next"
            style={[styles.saeInput]}
            inputStyle={styles.saeText}
            onChangeText={text => handleChange(text, 'lastName')}
            ref={input => innerRef(input, 'LastName')}
            onSubmitEditing={() => handleSubmitEditing('PhoneNumber')}
            blurOnSubmit={false}
          />
          <Sae
            label="Phone Number"
            labelStyle={styles.labelStyle}
            inputPadding={16}
            labelHeight={24}
            // active border height
            borderHeight={2}
            borderColor="#475c67"
            // TextInput props
            style={[styles.saeInput]}
            inputStyle={styles.saeText}
            keyboardType="phone-pad"
            returnKeyType="next"
            onChangeText={text => handleChange(text, 'phoneNumber')}
            ref={input => innerRef(input, 'PhoneNumber')}
            onSubmitEditing={() => handleSubmitEditing('EmailAddress')}
            blurOnSubmit={false}
          />
          <Sae
            label="Email Address"
            labelStyle={styles.labelStyle}
            inputPadding={16}
            labelHeight={24}
            // active border height
            borderHeight={2}
            borderColor="#475c67"
            // TextInput props
            style={[styles.saeInput]}
            inputStyle={styles.saeText}
            email
            keyboardType="email-address"
            autoCapitalize="none"
            returnKeyType="next"
            onChangeText={text => handleChange(text, 'email')}
            ref={input => innerRef(input, 'EmailAddress')}
            onSubmitEditing={() => handleSubmitEditing('Password')}
            blurOnSubmit={false}
          />
          <Sae
            label="Password"
            labelStyle={styles.labelStyle}
            inputPadding={16}
            labelHeight={24}
            // active border height
            borderHeight={2}
            borderColor="#475c67"
            // TextInput props
            style={[styles.saeInput]}
            inputStyle={styles.saeText}
            secureTextEntry
            returnKeyType="next"
            autoCapitalize="none"
            onChangeText={text => handleChange(text, 'password')}
            ref={input => innerRef(input, 'Password')}
            onSubmitEditing={() => handleSubmitEditing('City')}
            blurOnSubmit={false}
          />
          <Sae
            label="City"
            labelStyle={styles.labelStyle}
            inputPadding={16}
            labelHeight={24}
            // active border height
            borderHeight={2}
            borderColor="#475c67"
            // TextInput props
            style={[styles.saeInput]}
            inputStyle={styles.saeText}
            returnKeyType="go"
            onChangeText={text => handleChange(text, 'city')}
            ref={input => innerRef(input, 'City')}
            blurOnSubmit
          />
          <Block style={styles.footer}>
            <CalendarButton
              title="Continue"
              onPress={() => navigation.navigate('RegisterVehicle')}
            />
          </Block>
        </KeyboardAwareScrollView>
      </Block>
    </ScrollView>
  );
};

export default RegisterDriverForm;
