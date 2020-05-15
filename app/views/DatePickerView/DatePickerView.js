import React, { useState } from 'react';
import { Button, View } from 'react-native';
import { Appearance } from 'react-native-appearance';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

const DatePickerView = ({ setDate, mode, title }) => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = date => {
    console.warn('A date has been picked: ', date);
    setDate(date);
    hideDatePicker();
  };
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
        date={new Date()}
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
    </View>
  );
};

export default DatePickerView;
