// import React from 'react';
// import {Text, ScrollView, Picker, View, Button} from 'react-native';
// import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
// // import styles from './styles';
// import Block from '../../components/Block';
// import {CalendarButton} from '../../components/Button';
// import API from '../../api/api';
// import AsyncStorage from '@react-native-community/async-storage';
// import DateTimePicker from '@react-native-community/datetimepicker';
// import moment from 'moment';

// class Availability extends React.Component {
//   constructor(props){
//       super(props);
//       this.state = {
//         stDatePicker: false,
//         stTimePicker: false,
//         endTimePicker: false,
//         endDatePicker: false,
//       }
//   }

//   componentDidMount() {
//   }

//   setStartDate = (event, date) => {
//     this.setState({
//       startDate: date,
//       stDatePicker: false,
//     })
//     this.hideStDatePicker();
//   }

//   setStartTime = (event, time) => {
//     this.setState({
//       startTime: time,
//       stTimePicker: false,
//     })
//     this.hideStTimePicker();
//   }

//   setEndTime = (event, time) => {
//     this.setState({
//       endTime: time,
//       endTimePicker: false,
//     })
//     this.hideEndTimePicker();
//   }

//   setEndDate = (event, date) => {
//     this.setState({
//       endDate: date,
//       endDatePicker: false,
//     })
//     this.hideEndDatePicker();
//   }

//   showStDatePicker = () => {
//     this.setState({stDatePicker: true})
//   }

//   showStTimePicker = () => {
//     this.setState({stTimePicker: true})
//   }

//   showEndTimePicker = () => {
//     this.setState({endTimePicker: true})
//   }

//   showEndDatePicker = () => {
//     this.setState({endDatePicker: true})
//   }

//   hideStDatePicker = () => {
//     this.setState({stDatePicker: false})
//   }

//   hideStTimePicker = () => {
//     this.setState({stTimePicker: false})
//   }

//   hideEndTimePicker = () => {
//     this.setState({endTimePicker: false})
//   }

//   hideEndDatePicker = () => {
//     this.setState({endDatePicker: false})
//   }

//   //async await needed for proper Promise handling during submit function
//   handleUserSubmit = async (userEntries, recurring) => {
//     alert('Thank you for registering! You will receive an email regarding next steps within __ business days.')
//     let token = await AsyncStorage.getItem('token')
//     token = JSON.parse(token)
    
//     console.log("in RegAvail, handleUserSub: ", userEntries);

//     let endDate = userEntries.end_date

//     //use API file, createAvailability fx to send user's availability to database; token required
//     API.createAvailability(userEntries, recurring, endDate, token.token)
//     .then(
//         //logout after submission complete, but this will change as registration expands to include availability, and redirect won't be to logout but to alt mainview which will display driver's approval/pending status
//         API.logout(token.token)
//         .then(res => {
//             const loggedOut = res.json.Success;
//             if (loggedOut == 'Logged Out') {
//             AsyncStorage.removeItem('token');
//             this.props.navigation.navigate('Welcome');
//             } else {
//             Alert.alert('Unable to Logout', 'Please try again.');
//             }
//         })
//         .catch(error => {
//             AsyncStorage.removeItem('token');
//             this.props.navigation.navigate('Welcome');
//         })
//     )
//     .catch(err => {
//       this.setState({
//         errorMessage: 'Invalid username or password.',
//       });
//     })
//   }

//   render() {
//     const userEntries = {
//       "start_time": moment(this.state.startDate).format("YYYY-MM-DD") + " " + moment(this.state.startTime).format("HH:mm"),
//       "end_time": moment(this.state.startDate).format("YYYY-MM-DD") + " " + moment(this.state.endTime).format("HH:mm"),
//       "is_recurring": this.state.is_recurring,
//       "end_date": moment(this.state.endDate).format("YYYY-MM-DD"),
//       //below values need to be changed, place-holding for now
//       "location_id": 1,
//     };

//     let availabilitySelectors;
//     let { stDatePicker, stTimePicker, endTimePicker, endDatePicker } = this.state;
    
//     return (
//       <ScrollView>
//         <Block middle>
//            <KeyboardAwareScrollView>
//               <Block 
//                         // style={styles.scrollContainer}
//               >
//                 <Text 
//                         // style={styles.titleAvail}
//                 >Availability Info</Text>
//                 <Text 
//                         // style={styles.subTitleAvail}
//                 >Please complete the following to add availability to your schedule...</Text>
//               </Block>

//               <Text></Text>
//               <Text 
//                         // style={styles.labelStyleAvail}
//               >
//                 Availability Start Date:
//               </Text>
              
//               <Button title="Pick a Date" onPress={this.showStDatePicker} color='#475c67'/>
//               {stDatePicker && <DateTimePicker
//                 value={ new Date()}
//                 display="default"
//                 mode="date"
//                 onChange={this.setStartDate}
//               />}
              
//               <Text 
//                         // style={styles.displaySelection}
//               >Selected date: {moment(this.state.startDate).format("YYYY-MM-DD")}</Text>

//               <Text></Text>

//               <Text 
//                         // style={styles.labelStyleAvail}
//               >
//                 Availability Start Time:
//               </Text>

//               <Button title="Pick a Time" onPress={this.showStTimePicker} color='#475c67'/>
//               {stTimePicker && <DateTimePicker
//                 value={ new Date()}
//                 display="default"
//                 mode="time"
//                 display="spinner"
//                 onChange={this.setStartTime}
//               />}

//               <Text 
//                         // style={styles.displaySelection}
//               >Selected time: {moment(this.state.startTime).format("HH:mm")}</Text>

//               <Text></Text>

//               <Text 
//                         // style={styles.labelStyleAvail}
//               >
//                 Availability End Time:
//               </Text>

//               <Button title="Pick a Time" onPress={this.showEndTimePicker} color='#475c67'/>
//               {endTimePicker && <DateTimePicker
//                 value={ new Date()}
//                 display="default"
//                 mode="time"
//                 display="spinner"
//                 onChange={this.setEndTime}
//               />}
//               <Text 
//                         // style={styles.displaySelection}
//               >Selected time: {moment(this.state.endTime).format("HH:mm")}</Text>

//               <Text></Text>

//               <Text 
//                         // style={styles.labelStyleAvail}
//               >Is this availability recurring? </Text>
//               <Picker
//                 label="Recurring"
//                 key={availabilitySelectors}
//                 inputPadding={16}
//                 labelHeight={24}
//                 borderHeight={2}
//                 borderColor="#475c67"
//                 blurOnSubmit={false}
//                 selectedValue={this.state.is_recurring}
//                 //set the item value (which will be the radius mileage) to state so it can be passed to API post; default to instruct user what to do
//                 onValueChange={(itemValue) =>
//                   this.setState({is_recurring: itemValue})
//                 }
//               >                
//                 <Picker.Item label="Select One" value="null"/>
//                 <Picker.Item label="Yes" value="true"/>
//                 <Picker.Item label="No" value="false"/>
//               </Picker>

//               {this.state.is_recurring === 'true' && 
//               <View>
//               <Text 
//                         // style={styles.labelStyleAvail}
//               >
//                 Date to End Recurring Availability:
//               </Text>
//               <Button title="Pick a Date" onPress={this.showEndDatePicker} color='#475c67'/>
//               {endDatePicker && <DateTimePicker
//                 value={ new Date()}
//                 display="default"
//                 onChange={this.setEndDate}
//               />}
//               <Text 
//                         // style={styles.displaySelection}
//               >Selected date: {moment(this.state.endDate).format("YYYY-MM-DD")}</Text>

//                 <Text></Text>
//               </View>}

//             <Block 
//                         // style={styles.footer}
//             >
//               <CalendarButton title="Submit" onPress={() => this.handleUserSubmit(userEntries, this.state.is_recurring)} />
//             </Block>
          
//         </KeyboardAwareScrollView>
//         </Block>
//       </ScrollView>
//     );
//   }
// };

// export default Availability;


import React from 'react';
import {View, Text} from 'react-native';
// import PropTypes from 'prop-types';
import moment from 'moment';
import styles from './styles';

const Availability = ({startTime, endTime, location, iterated}) => (
  <View style={iterated ? styles.adjustedContainer : styles.contentContainer}>
    <View style={styles.textContainer}>
      <Text style={styles.text}>{`${moment(startTime).format(
        'h:mm a',
      )} - ${moment(endTime).format('h:mm a')}`}</Text>
      <Text style={styles.text}>{location}</Text>
    </View>
  </View>
);

export default Availability;
