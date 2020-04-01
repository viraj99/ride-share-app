import React, { useState } from 'react';
import { Button, View } from 'react-native';
import { Appearance } from 'react-native-appearance';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

const DatePickerView = ({ setDate }) => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = date => {
    console.warn('A date has been picked: ', date);
    new Date();
    hideDatePicker();
    setDate(date);
  };
  const colorScheme = Appearance.getColorScheme();
  return (
    <View>
      <Button title="Pick Date" onPress={showDatePicker} color="black" />
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        isDarkModeEnabled={colorScheme === 'light' ? false : true}
        mode="date"
        date={new Date()}
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
    </View>
  );
};

export default DatePickerView;
