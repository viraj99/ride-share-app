import React from 'react';
import {Text, ScrollView} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import styles from './styles';
import Block from '../Block';
import {CalendarButton} from '../Button';
import {Sae} from '../TextInputs';

const RegisterVehicleForm = props => {
  const {handleChange, innerRef, handleSubmit, handleSubmitEditing} = props;

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
            onChangeText={text => handleChange(text, 'carMake')}
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
            onChangeText={text => handleChange(text, 'carModel')}
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
            onChangeText={number => handleChange(number, 'carYear')}
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
            onChangeText={number => handleChange(number, 'seatBelts')}
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
            onChangeText={text => handleChange(text, 'carColor')}
            ref={input => innerRef(input, 'Color')}
            blurOnSubmit
          />
          <Block style={styles.footer}>
            <CalendarButton title="Submit" onPress={() => handleSubmit()} />
          </Block>
        </Block>
      </KeyboardAwareScrollView>
    </ScrollView>
  );
};

export default RegisterVehicleForm;
