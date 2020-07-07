import React, { useState } from 'react';
import { Button, View } from 'react-native';
import { Appearance } from 'react-native-appearance';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

const DatePickerView = ({ setDate, mode, title, dateProp }) => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  console.log('these are the props', mode);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = date => {
    console.log('date', date);
    console.warn('A date has been picked: ', date);
    setDate(date);
    hideDatePicker();
  };

  // If is a string means comes from the backend, we should convert it to a Date.
  let date = dateProp;
  if (typeof date === 'string') {
    console.log('INSIDE edit of string DATE');
    date = new Date(dateProp);
  }

  const colorScheme = Appearance.getColorScheme();
  return (
    <View>
      <Button
        title={title || 'Pick Date'}
        onPress={showDatePicker}
        color="#475c67"
      />
      <DateTimePickerModal
        headerTextIOS={title}
        isVisible={isDatePickerVisible}
        isDarkModeEnabled={colorScheme === 'light' ? false : true}
        mode={mode}
        date={date}
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
    </View>
  );
};

export default DatePickerView;
