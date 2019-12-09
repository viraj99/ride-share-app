import React from 'react';
import {Text, ScrollView, View, TextInput, Button} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import styles from './styles';
import Block from '../Block';
import {CalendarButton} from '../Button';
import {Sae} from '../TextInputs';
import API from '../../api/api';
import AsyncStorage from '@react-native-community/async-storage';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';

class RegisterVehicleForm extends React.Component {
  constructor(props){
    super(props);
    this.state={
      picker1: false,
      picker2: false,
      data: {
      }
    }
  }

  setStartDate = (event, date) => {
    this.setState({
      startDate: date,
      picker1: false,
    })
    this.hidePicker1();
  }

  setEndDate = (event, date) => {
    this.setState({
      endDate: date,
      picker2: false,
    })
    this.hidePicker2();
  }

  showPicker1 = () => {
    this.setState({picker1: true})
  }

  showPicker2 = () => {
    this.setState({picker2: true})
  }

  hidePicker1 = () => {
    this.setState({picker1: false})
  }

  hidePicker2 = () => {
    this.setState({picker2: false})
  }

    //async await needed for proper Promise handling during submit function
    handleUserSubmit = async (userEntries) => {
      console.log("testing in vehicle form: ", this.props.navigation);
      let token = await AsyncStorage.getItem('token')
      //parse just the token from the token object in async storage
      token = JSON.parse(token)
      //use API file, createVehicle fx to send user inputs to database, must pass token.token so only the token value itself and not the key:value pair of token is passed to api call for creating vehicle
      API.createVehicle(userEntries, token.token)
      .then(
        this.props.navigation.navigate('RegisterAvailability'))
      //if error performing API fetch for posting driver, show error
      .catch(error => {
        console.warn('There has been a problem with your operation: ' + error.message);
        throw error;
      })
    }

  render() {
    let userEntries = {
      "vehicle": {
        "car_make": this.state.item1,
        "car_model": this.state.item2,
        "car_year": parseInt(this.state.item3),
        "car_color": this.state.item5,
        "car_plate": this.state.item6,
        "seat_belt_num": this.state.item4,
        "insurance_provider": this.state.item7,
        "insurance_start": moment(this.state.startDate).format("YYYY-MM-DD"),
        "insurance_stop": moment(this.state.endDate).format("YYYY-MM-DD"),
      }
    }

    const { picker1, picker2 } = this.state;

    console.log("in render: ", this.state.startDate)

    return (
      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.subTitle}>
            Car Make:
          </Text>
          <TextInput
            onChangeText={(text) => this.setState({item1: text})}
          ></TextInput>

          <Text style={styles.subTitle}>
            Car Model:
          </Text>
          <TextInput
            onChangeText={(text) => this.setState({item2: text})}
          ></TextInput>

          <Text style={styles.subTitle}>
            Car Year:
          </Text>
          <TextInput
            onChangeText={(text) => this.setState({item3: text})}
          ></TextInput>

          <Text style={styles.subTitle}>
            Number of Seatbelts:
          </Text>
          <TextInput
            onChangeText={(text) => this.setState({item4: text})}
          ></TextInput>

          <Text style={styles.subTitle}>
            Color:
          </Text>
          <TextInput
            onChangeText={(text) => this.setState({item5: text})}
          ></TextInput>

          <Text style={styles.subTitle}>
            License Plate:
          </Text>
          <TextInput
            onChangeText={(text) => this.setState({item6: text})}
          ></TextInput>

          <Text style={styles.subTitle}>
            Insurance Provider:
          </Text>
          <TextInput
            onChangeText={(text) => this.setState({item7: text})}
          ></TextInput>

          <Text style={styles.subTitle}>
            Insurance Coverage Start Date:
          </Text>
          <Button title="Pick a Date" onPress={this.showPicker1} />
          {picker1 && <DateTimePicker
            value={ new Date()}
            display="default"
            onChange={this.setStartDate}
          />}
          <Text style={styles.subTitle}>Selected date: {moment(this.state.startDate).format("YYYY-MM-DD")}</Text>

            <Text></Text>

          <Text style={styles.subTitle}>
            Insurance Coverage End Date:
          </Text>
          <Button title="Pick a Date" onPress={this.showPicker2} />
          {picker2 && <DateTimePicker
            value={ new Date()}
            display="default"
            onChange={this.setEndDate}
          />}
          <Text style={styles.subTitle}>Selected date: {moment(this.state.endDate).format("YYYY-MM-DD")}</Text>

            <Text></Text>

          <CalendarButton title="Continue" onPress={() => this.handleUserSubmit(userEntries, this.props.navigation)} />
        </View>
      </ScrollView>
    )
  }
}
        
export default RegisterVehicleForm;

  //       startInsur: 
  //       "",
  //       isDateTimePickerVisible: false,
  //       startInsur: "YYYY-MM-DD",
  //       moment(new Date()).format("YYYY-MM-DD"),
  //       stopInsur: moment(new Date()).format("YYYY-MM-DD"),
  //       showFirstCal: this.props.showFirstCal,
  //       showSecondCal: this.props.showSecondCal,
  //     }
  //   }
  
  //   componentDidMount() {
  //     // this.setState({isDateTimePickerVisible: false})
  //   }
  
  //   handleChange = (text, name) => {
  //     console.log("in registervehicle, handleChg: ", text);
  //     this.setState({[name]: text});
  //   };
  
  //   showDateTimePicker = () => {
  //       this.setState({isDateTimePickerVisible: true})
  //   }
  
  //   hideDateTimePicker = () => {
  //     this.setState({isDateTimePickerVisible: false})
  //   }
  
  //   handleDatePick = (pickedDate, id) => {
  //     console.log("date selected: ", pickedDate)
  //     this.props.handleChange(pickedDate, id);
  //     this.setState({
  //       startInsur: moment(pickedDate.nativeEvent.timestamp).format("YYYY-MM-DD"),
  //       isDateTimePickerVisible: false,
  //     });
  //   }
  
  //   tryingSomething = () => {
  //     if (this.state.startInsur === "") {
  //       console.log("in trying something, if null: ", this.state.startInsur)
  //       return this.state.startInsur
  //     } else {
  //       console.log("in trying something, if not null: ", this.state.startInsur)
  //       return this.state.startInsur
  //     }
  //   }
  
  //   //async await needed for proper Promise handling during submit function
  //   handleUserSubmit = async (userEntries) => {
  //     console.log("testing in vehicle form: ", this.props.navigation);
  //     let token = await AsyncStorage.getItem('token')
  //     //parse just the token from the token object in async storage
  //     token = JSON.parse(token)
  //     //use API file, createVehicle fx to send user inputs to database, must pass token.token so only the token value itself and not the key:value pair of token is passed to api call for creating vehicle
  //     API.createVehicle(userEntries, token.token)
  //     .then(
  //       this.props.navigation.navigate('RegisterAvailability'))
  //     //if error performing API fetch for posting driver, show error
  //     .catch(error => {
  //       console.warn('There has been a problem with your operation: ' + error.message);
  //       throw error;
  //     })
  //   }
  
  //   render(){
  //     const {navigation, userEntries} = this.props;
  //     // let placeholder = this.tryingSomething();
  
  //     return (
  //       <ScrollView>
  //         <KeyboardAwareScrollView>
  //           <Block style={styles.scrollContainer}>
  //             <Text style={styles.title}>Vehicle Info</Text>
  //             <Text style={styles.subTitle}>Continue with vehicle information</Text>
  //           </Block>
  //           <Block middle>
  //           <Sae
  //             label="Make"
  //             labelStyle={styles.labelStyle}
  //             inputPadding={16}
  //             labelHeight={24}
  //             // active border height
  //             borderHeight={2}
  //             borderColor="#475c67"
  //             style={[styles.saeInput]}
  //             inputStyle={styles.saeText}
  //             // TextInput props
  //             returnKeyType="next"
  //             onChangeText={text => this.props.handleChange(text, 'car_make')}
  //             ref={input => this.props.innerRef(input, 'Make')}
  //             onSubmitEditing={() => this.props.handleSubmitEditing('Model')}
  //             blurOnSubmit={false}
  //           />
  //           <Sae
  //             label="Model"
  //             labelStyle={styles.labelStyle}
  //             inputPadding={16}
  //             labelHeight={24}
  //             // active border height
  //             borderHeight={2}
  //             borderColor="#475c67"
  //             style={[styles.saeInput]}
  //             inputStyle={styles.saeText}
  //             // TextInput props
  //             returnKeyType="next"
  //             onChangeText={text => this.props.handleChange(text, 'car_model')}
  //             ref={input => this.props.innerRef(input, 'Model')}
  //             onSubmitEditing={() => this.props.handleSubmitEditing('Year')}
  //             blurOnSubmit={false}
  //           />
  //           <Sae
  //             label="Year"
  //             labelStyle={styles.labelStyle}
  //             inputPadding={16}
  //             labelHeight={24}
  //             // active border height
  //             borderHeight={2}
  //             borderColor="#475c67"
  //             style={[styles.saeInput]}
  //             inputStyle={styles.saeText}
  //             // TextInput props
  //             keyboardType="numeric"
  //             returnKeyType="next"
  //             onChangeText={number => this.props.handleChange(number, 'car_year')}
  //             ref={input => this.props.innerRef(input, 'Year')}
  //             onSubmitEditing={() => this.props.handleSubmitEditing('SeatBelts')}
  //             blurOnSubmit={false}
  //           />
  //           <Sae
  //             label="Number of seatbelts"
  //             labelStyle={styles.labelStyle}
  //             inputPadding={16}
  //             labelHeight={24}
  //             // active border height
  //             borderHeight={2}
  //             borderColor="#475c67"
  //             style={[styles.saeInput]}
  //             inputStyle={styles.saeText}
  //             // TextInput props
  //             keyboardType="numeric"
  //             returnKeyType="next"
  //             onChangeText={number => this.props.handleChange(number, 'seat_belt_num')}
  //             ref={input => this.props.innerRef(input, 'SeatBelts')}
  //             onSubmitEditing={() => this.props.handleSubmitEditing('Color')}
  //             blurOnSubmit={false}
  //           />
  //           <Sae
  //             label="Color"
  //             labelStyle={styles.labelStyle}
  //             inputPadding={16}
  //             labelHeight={24}
  //             // active border height
  //             borderHeight={2}
  //             borderColor="#475c67"
  //             style={[styles.saeInput]}
  //             inputStyle={styles.saeText}
  //             // TextInput props
  //             returnKeyType="next"
  //             onChangeText={text => this.props.handleChange(text, 'car_color')}
  //             ref={input => this.props.innerRef(input, 'Color')}
  //             onSubmitEditing={() => this.props.handleSubmitEditing('Plate')}
  //             blurOnSubmit={false}
  //           />
  //           <Sae
  //             label="License Plate"
  //             labelStyle={styles.labelStyle}
  //             inputPadding={16}
  //             labelHeight={24}
  //             // active border height
  //             borderHeight={2}
  //             borderColor="#475c67"
  //             style={[styles.saeInput]}
  //             inputStyle={styles.saeText}
  //             // TextInput props
  //             returnKeyType="next"
  //             onChangeText={text => this.props.handleChange(text, 'car_plate')}
  //             ref={input => this.props.innerRef(input, 'Plate')}
  //             onSubmitEditing={() => this.props.handleSubmitEditing('Insurance')}
  //             blurOnSubmit={false}
  //           />

  //           <Sae
  //             label="Insurance Provider"
  //             labelStyle={styles.labelStyle}
  //             inputPadding={16}
  //             labelHeight={24}
  //             // active border height
  //             borderHeight={2}
  //             borderColor="#475c67"
  //             style={[styles.saeInput]}
  //             inputStyle={styles.saeText}
  //             // TextInput props
  //             returnKeyType="next"
  //             onChangeText={text => this.props.handleChange(text, 'insurance_provider')}
  //             ref={input => this.props.innerRef(input, 'Insurance')}
  //             onSubmitEditing={() => this.props.handleSubmitEditing('Insur Start')}
  //             blurOnSubmit={false}
  //           />

  //           <Sae
  //             label="Insurance Coverage Start Date"
  //             labelStyle={styles.labelStyle}
  //             inputPadding={16}
  //             labelHeight={24}
  //             // active border height
  //             borderHeight={2}
  //             borderColor="#475c67"
  //             style={[styles.saeInput]}
  //             inputStyle={styles.saeText}
  //             // TextInput props
  //             returnKeyType="next"
  //             // onChangeText={}
  //             ref={input => this.props.innerRef(input, 'Insur Start')}
  //             onSubmitEditing={() => this.props.handleSubmitEditing('Insur Stop')}
  //             blurOnSubmit={false}
  //           > 
            
  //           <View>
  //             <Text>{this.state.startInsur}</Text>

  //               {showFirstCal && <DateTimePicker 
  //                 mode='date'
  //                 format="YYYY-MM-DD"
  //                 display='calendar'
  //                 onChange={(startDate) => this.handleDatePick(startDate, 'insurance_start')}
  //               />}

  //           </View> 

  //           <Sae
  //             label="Insurance Coverage End Date"
  //             labelStyle={styles.labelStyle}
  //             inputPadding={16}
  //             labelHeight={24}
  //             // active border height
  //             borderHeight={2}
  //             borderColor="#475c67"
  //             style={[styles.saeInput]}
  //             inputStyle={styles.saeText}
  //             // TextInput props
  //             returnKeyType="done"
  //             // onChangeText={text => this.props.handleChange(text, 'insurance_stop')}
  //             ref={input => this.props.innerRef(input, 'Insur Stop')}
  //             // value={this.state.stopInsur}
  //             onSubmitEditing={() => this.props.handleSubmitEditing('Done')}
  //             blurOnSubmit={false}
  //           >

  //           {showSecondCal && <DateTimePicker
  //             value={new Date()}
  //             date={this.state.stopInsur}
  //             mode='date'
  //             format="YYYY-MM-DD"
  //             display='calendar'
  //             onChange={(stopDate) => this.handleDatePick(stopDate, 'insurance_stop')}
  //           />}

  //           </Sae>

  //           <Sae
  //             ref={input => this.props.innerRef(input, 'Done')}
  //             blurOnSubmit={false}
  //           />

  
              
  
  //             <Block style={styles.footer}>
  //               <CalendarButton title="Continue" onPress={() => this.handleUserSubmit(userEntries, navigation)} />
  //             </Block>
  //           </Block>
  //         </KeyboardAwareScrollView>
  //       </ScrollView>
  //     );
  //   }
  // };
            





// alert('Thank you for registering! You will receive an email regarding next steps within _ business days.'),
//         //logout after submission complete, but this will change as registration expands to include availability, and redirect won't be to logout but to alt mainview which will display driver's approval/pending status
//         API.logout(token.token)
//         .then(res => {
//           const loggedOut = res.json.Success;
//           if (loggedOut == 'Logged Out') {
//             AsyncStorage.removeItem('token');
//             nav.navigate('Welcome');
//           } else {
//             Alert.alert('Unable to Logout', 'Please try again.');
//           }
//         })
//         .catch(error => {
//           AsyncStorage.removeItem('token');
//           nav.navigate('Welcome');
//         })