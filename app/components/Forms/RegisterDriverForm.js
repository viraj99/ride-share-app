import React from 'react';
import {Text, ScrollView, Picker} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import styles from './styles';
import Block from '../Block';
import {CalendarButton} from '../Button';
import {Sae} from '../TextInputs';
import API from '../../api/api';
import AsyncStorage from '@react-native-community/async-storage';

class RegisterDriverForm extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      orgs: [],
      radius: '',
      orgNum: 0,
      data: {},
    };
  };

  componentDidMount() {
    //make sure there aren't any orgs in cache that will duplicate list
    this.setState({
      orgs: [],
    })
    //call getOrganizations fx which handles API call and retrieves list of orgs
    this.getOrganizations();
  }

  getOrganizations() {
    //using API file, getOrgs function, which fetches list of orgs
    API.getOrgs()
      .then(res => {              
        //store full list of all orgs in local state
        this.setState({
          orgs: res.organization
        })
      })
      //if error performing API fetch for getting orgs, show error
      .catch(error => {
        console.log('There has been a problem with your fetch operation: ' + error.message);
        throw error;
      })
  };

  handleUserInput = (userEntries, radius, orgID) => {
    //use API file, createDriver fx to send user inputs to database
    API.createDriver(userEntries, radius, orgID)
    .then(this.autoLogin(userEntries))
    //if error performing API fetch for posting driver, show error
    .catch(error => {
      console.warn('There has been a problem with your operation: ' + error.message);
      throw error;
    });
  };

  autoLogin = (userEntries) => {
    console.log("testing in driver form: ", this.props.navigation)
    //use API file, login fx to create a token in order to add vehicle data to driver
              //login fx requries email and password as params
    API.login(userEntries.driver.email, userEntries.driver.password)
      //after sending email and pword, get auth_token
      .then(res => {
        const obj = {
          token: res.json.auth_token,
        };
        if (obj.token === undefined) {
          this.setState({
            errorMessage: 'Invalid username or password.',
          });
        } else {
          //if API call for autologin upon driver data submit successful, store auth_token in local storage
          AsyncStorage.setItem('token', JSON.stringify(obj));
          console.log("in autoLogin: ", AsyncStorage.getItem('token'));
          //redirect to vehicle registation
          this.props.navigation.navigate('RegisterVehicle');
        }
      })
      .catch(err => {
        this.setState({
          errorMessage: 'Invalid username or password.',
        });
      })
  }  
  
  render() {
    //take array of org names list retrieved from API call getOrgs function that was performed on did mount 
    //then map through each org name in list, create a Picker Item, use split to show only org name as label
    //and store id number of corresponding org in the value
    const orgsList = this.state.orgs.map((eachOrg) =>       
        <Picker.Item 
          label={eachOrg.name} 
          value={eachOrg.id} 
          key={eachOrg}
        />
    );
    let mileage;

    return (
      <ScrollView>
        <Block middle>
          <KeyboardAwareScrollView>
            <Block style={styles.scrollContainer}>
              <Text style={styles.title}>Sign Up</Text>
              <Text style={styles.subTitle}>{this.props.subTitle}</Text>
            </Block>
            
            {/* Input for Volunteer Driver's First Name */}
            <Sae
              //displays label for input field
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
              /* As user types, use the handleChange fx in Register Component to update state with what is being typed, second param is the object key, first param is the value */
              onChangeText={text => this.props.handleChange(text, 'first_name')}
              /* Use the handleInnerRef fx in Register Component to use the next button on keyboard to advance to next field */
              ref={input => this.props.innerRef(input, 'FirstName')}
              /* Use the handleSubmitEditing fx in Register Component to change focus to next field and commit what was typed in current field to local state in Register Component */
              onSubmitEditing={() => this.props.handleSubmitEditing('LastName')}
              blurOnSubmit={false}
            />

            {/* Input for Volunteer Driver's Last Name */}
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
              onChangeText={text => this.props.handleChange(text, 'last_name')}
              ref={input => this.props.innerRef(input, 'LastName')}
              onSubmitEditing={() => this.props.handleSubmitEditing('PhoneNumber')}
              blurOnSubmit={false}
            />

            {/* Input for Volunteer Driver's Phone Number */}
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
              onChangeText={text => this.props.handleChange(text, 'phone')}
              ref={input => this.props.innerRef(input, 'PhoneNumber')}
              onSubmitEditing={() => this.props.handleSubmitEditing('EmailAddress')}
              blurOnSubmit={false}
            />

            {/* Input for Volunteer Driver's Email Address; 
            NOTE: IF AN EMAIL IS A DUPLICATE TO ONE ALREADY IN ANY ORG, IT WILL NOT SUBMIT! */}
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
              onChangeText={text => this.props.handleChange(text, 'email')}
              ref={input => this.props.innerRef(input, 'EmailAddress')}
              onSubmitEditing={() => this.props.handleSubmitEditing('Password')}
              blurOnSubmit={false}
            />

            {/* Input for Volunteer Driver's Password */}
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
              //this code shows asterisks in place of characters in field as user types
              secureTextEntry
              returnKeyType="next"
              autoCapitalize="none"
              onChangeText={text => this.props.handleChange(text, 'password')}
              ref={input => this.props.innerRef(input, 'Password')}
              onSubmitEditing={() => this.props.handleSubmitEditing('OrgName')}
              blurOnSubmit={false}
            />

            <Text style={{marginTop: 20, marginHorizontal: 16, fontSize: 18,}}>Volunteering for:</Text>

            {/* Picker selector for org volunteer works with */}
            <Picker
              label="OrgName"
              key={orgsList}
              inputPadding={16}
              labelHeight={24}
              borderHeight={2}
              borderColor="#475c67"
              blurOnSubmit={false}
              //shows which item in list user has selected
              selectedValue={this.state.orgNum}
              //set the item value (which will be the org_id number) to state so it can be passed to API post
              onValueChange={(itemValue) =>
                  this.setState({orgNum: itemValue})
              }
            >
              {/* default to instruct user what to do */}
              <Picker.Item label="Select an organization" value="0" />
              {/* uses the orgsList const at beginning of render to display a picker item for each org*/}
              {orgsList}
            </Picker>

            <Text style={{marginTop: 20, marginHorizontal: 16, fontSize: 18,}}>Distance available to drive:</Text>
            <Picker
              label="Radius"
              key={mileage}
              inputPadding={16}
              labelHeight={24}
              borderHeight={2}
              borderColor="#475c67"
              blurOnSubmit={false}
              selectedValue={this.state.radius}
              //set the item value (which will be the radius mileage) to state so it can be passed to API post
              onValueChange={(itemValue) =>
                this.setState({radius: itemValue})
              }
            >
              {/* default to instruct user what to do */}
              <Picker.Item label="Select a mileage" value="0"/>
              <Picker.Item label="10 miles" value="10"/>
              <Picker.Item label="25 miles" value="25"/>
              <Picker.Item label="50 miles" value="50"/>
            </Picker>

            <Block style={styles.footer}>
              <CalendarButton
                title="Continue"
                onPress={() => 
                  //pass the data (user inputs), nav info for redirect, driver radius, driver's org_id to handleUserInput fx above
                  this.handleUserInput(this.props.data, this.state.radius, this.state.orgNum)}
              />
            </Block>
          </KeyboardAwareScrollView>
        </Block>
      </ScrollView>
    )
  };
};

export default RegisterDriverForm;

{/* <Sae
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
              onChangeText={text => this.props.handleChange(text, 'city')}
              ref={input => this.props.innerRef(input, 'City')}
              blurOnSubmit
            /> */}