import React from 'react';
import { Text, ScrollView, View, Picker, TextInput } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import styles from './styles';
import Block from '../Block';
import { CalendarButton } from '../Button';
import API from '../../api/api';
import AsyncStorage from '@react-native-community/async-storage';
import ModalDropdown from 'react-native-modal-dropdown';

class RegisterDriverForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      orgs: [],
      orgNum: 1,
      radius: 0
    };
  }

  componentDidMount() {
    //make sure there aren't any orgs in cache that will duplicate list
    this.setState({
      orgs: []
    });
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
        });
      })
      //if error performing API fetch for getting orgs, show error
      .catch(error => {
        console.log(
          'There has been a problem with your fetch operation: ' + error.message
        );
        throw error;
      });
  }

  handleUserSubmit = () => {
    let userData = {
      driver: {
        organization_id: parseInt(this.state.orgNum),
        email: this.state.email,
        password: this.state.password,
        first_name: this.state.first_name,
        last_name: this.state.last_name,
        phone: this.state.phone,
        is_active: true,
        radius: parseInt(this.state.radius),
        admin_sign_up: false
      }
    };
    // console.log('isEditing', this.props.navigation.state.params.isEditing);
    //use API file, createDriver fx to send user inputs to database
    if (this.props.navigation.state.params === undefined) {
      API.createDriver(userData)
        .then(res => {
          this.autoLogin(userData);
        })
        //if error performing API fetch for posting driver, show error
        .catch(error => {
          console.warn(
            'There has been a problem with your operation: ' + error.message
          );
          throw error;
        });
    } else {
      console.log('params defined', this.props.navigation.state.params);
      AsyncStorage.getItem('token', (err, result) => {
        const obj = JSON.parse(result);
        const { token } = obj;

        API.updateSettingsDriver(userData, token)
          .then(result => {
            console.log('inside the APIupdate');
            this.autoLogin(userData);
          })
          .catch(err => {
            console.log(err);
          });
      });
    }
  };

  autoLogin = userEntries => {
    console.log('testing in driver form: ', this.props.navigation);
    //use API file, login fx to create a token in order to add vehicle data to driver
    //login fx requries email and password as params
    API.login(userEntries.driver.email, userEntries.driver.password)
      //after sending email and pword, get auth_token
      .then(res => {
        const obj = {
          token: res.json.auth_token
        };
        if (obj.token === undefined) {
          this.setState({
            errorMessage: 'Invalid username or password.'
          });
        } else {
          //if API call for autologin upon driver data submit successful, store auth_token in local storage
          AsyncStorage.setItem('token', JSON.stringify(obj));
          console.log('in autoLogin: ', AsyncStorage.getItem('token'));
          //redirect to vehicle registation
          this.props.navigation.navigate('MainView', {
            isRegistering: true,
          });
        }
      })
      .catch(err => {
        this.setState({
          errorMessage: 'Invalid username or password.'
        });
      });
  };

  getOrganizationId = name => {
    const selectedOrg = this.state.orgs.find(org => org.name === name);
    console.log(selectedOrg);
    this.setState({ orgNum: selectedOrg.id });
  };

  render() {
    //take array of org names list retrieved from API call getOrgs function that was performed on did mount
    //then map through each org name in list, create a Picker Item, use split to show only org name as label
    //and store id number of corresponding org in the value
    // console.log('isEditing: ', this.props.navigation.state.params);
    const orgsList = this.state.orgs.map(eachOrg => (
      <Picker.Item label={eachOrg.name} value={eachOrg.id} key={eachOrg} />
    ));
    let mileage;

    return (
      <ScrollView>
        <Block middle>
          <KeyboardAwareScrollView>
            <View style={styles.section}>
              <View style={styles.sectionTitleContainer}>
                <Text style={styles.sectionTitle}>Sign Up</Text>
              </View>
            </View>
            <View>
              {/* Input for Volunteer Driver's First Name */}
              <Text style={styles.labelStyleAlt}>First Name:</Text>
              <TextInput
                onChangeText={text => this.setState({ first_name: text })}
                placeholderTextColor="#C0C0C0"
                placeholder="First Name"
                returnKeyType={'next'}
                onSubmitEditing={() => {
                  this.lastName.focus();
                }}
                blurOnSubmit={false}
                style={[styles.saeInputAlt]}
                inputStyle={styles.saeTextAlt}
              />

              {/* Input for Volunteer Driver's Last Name */}
              <Text style={styles.labelStyleAlt}>Last Name:</Text>
              <TextInput
                onChangeText={text => this.setState({ last_name: text })}
                placeholderTextColor="#C0C0C0"
                placeholder="Last Name"
                ref={input => {
                  this.lastName = input;
                }}
                returnKeyType={'next'}
                onSubmitEditing={() => {
                  this.phone.focus();
                }}
                blurOnSubmit={false}
                style={[styles.saeInputAlt]}
                inputStyle={styles.saeTextAlt}
              />

              {/* Input for Volunteer Driver's Phone Number */}
              <Text style={styles.labelStyleAlt}>Phone Number:</Text>
              <TextInput
                onChangeText={text => this.setState({ phone: text })}
                placeholderTextColor="#C0C0C0"
                placeholder="9195551234"
                ref={input => {
                  this.phone = input;
                }}
                returnKeyType={'next'}
                onSubmitEditing={() => {
                  this.email.focus();
                }}
                blurOnSubmit={false}
                style={[styles.saeInputAlt]}
                inputStyle={styles.saeTextAlt}
              />

              {/* Input for Volunteer Driver's Email Address; 
            NOTE: IF AN EMAIL IS A DUPLICATE TO ONE ALREADY IN ANY ORG, IT WILL NOT SUBMIT! */}
              <Text style={styles.labelStyleAlt}>Email:</Text>
              <TextInput
                onChangeText={text => this.setState({ email: text })}
                placeholderTextColor="#C0C0C0"
                placeholder="example@example.com"
                ref={input => {
                  this.email = input;
                }}
                returnKeyType={'next'}
                onSubmitEditing={() => {
                  this.password.focus();
                }}
                blurOnSubmit={false}
                style={[styles.saeInputAlt]}
                inputStyle={styles.saeTextAlt}
              />

              {/* Input for Volunteer Driver's Password */}
              <Text style={styles.labelStyleAlt}>Create a Password:</Text>
              <TextInput
                onChangeText={text => this.setState({ password: text })}
                placeholderTextColor="#C0C0C0"
                placeholder="password"
                ref={input => {
                  this.password = input;
                }}
                returnKeyType={'done'}
                style={[styles.saeInputAlt]}
                inputStyle={styles.saeTextAlt}
                autoCapitalize="none"
                secureTextEntry
              />
            </View>
            <View>
              <View style={styles.section}>
                <View style={styles.sectionTitleContainer}>
                  <Text style={styles.sectionTitle}>Volunteering for:</Text>
                </View>
              </View>
              <ModalDropdown
                defaultValue="Select an organization"
                onSelect={(i, val) => this.getOrganizationId(val)}
                options={this.state.orgs.map(org => org.name)}
                textStyle={[styles.sectionTitle, { color: '#475c67' }]}
                dropdownStyle={styles.dropdownStyle}
                dropdownTextStyle={styles.dropdownTextStyle}
                style={styles.modalStyle}
              />
            </View>
            <View>
              <View style={styles.section}>
                <View style={styles.sectionTitleContainer}>
                  <Text style={styles.sectionTitle}>
                    Distance available to drive:
                  </Text>
                </View>
              </View>
              <ModalDropdown
                defaultValue="Select a Mileage"
                onSelect={i => this.setState({ radius: (Number(i) + 1) * 10 })}
                options={['10 Miles', '20 Miles', '30 Miles']}
                textStyle={[styles.sectionTitle, { color: '#475c67' }]}
                dropdownStyle={styles.dropdownStyle}
                dropdownTextStyle={styles.dropdownTextStyle}
                style={styles.modalDropdown}
              />
            </View>
            <Block style={styles.footer}>
              <CalendarButton
                title="Continue"
                onPress={
                  //pass the data (user inputs including orgID and radius), nav info for redirect to handleUserInput fx above
                  this.handleUserSubmit
                }
              />
            </Block>
          </KeyboardAwareScrollView>
        </Block>
      </ScrollView>
    );
  }
}

export default RegisterDriverForm;

{
  /* <Sae
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
            /> */
}

// <Sae
//   //displays label for input field
//   label="First Name"
//   labelStyle={styles.labelStyle}
//   inputPadding={16}
//   labelHeight={24}
//   // active border height
//   borderHeight={2}
//   borderColor="#475c67"
//   // TextInput props
//   returnKeyType="next"
//   style={[styles.saeInput]}
//   inputStyle={styles.saeText}
//   /* As user types, use the handleChange fx in Register Component to update state with what is being typed, second param is the object key, first param is the value */
//   onChangeText={text => this.props.handleChange(text, 'first_name')}
//   /* Use the handleInnerRef fx in Register Component to use the next button on keyboard to advance to next field */
//   ref={input => this.props.innerRef(input, 'FirstName')}
//   /* Use the handleSubmitEditing fx in Register Component to change focus to next field and commit what was typed in current field to local state in Register Component */
//   onSubmitEditing={() => this.props.handleSubmitEditing('LastName')}
//   blurOnSubmit={false}
// />

// <Sae
//   label="Last Name"
//   labelStyle={styles.labelStyle}
//   inputPadding={16}
//   labelHeight={24}
//   // active border height
//   borderHeight={2}
//   borderColor="#475c67"
//   // TextInput props
//   returnKeyType="next"
//   style={[styles.saeInput]}
//   inputStyle={styles.saeText}
//   onChangeText={text => this.props.handleChange(text, 'last_name')}
//   ref={input => this.props.innerRef(input, 'LastName')}
//   onSubmitEditing={() => this.props.handleSubmitEditing('PhoneNumber')}
//   blurOnSubmit={false}
// />

// <Sae
//   label="Phone Number"
//   labelStyle={styles.labelStyle}
//   inputPadding={16}
//   labelHeight={24}
//   // active border height
//   borderHeight={2}
//   borderColor="#475c67"
//   // TextInput props
//   style={[styles.saeInput]}
//   inputStyle={styles.saeText}
//   keyboardType="phone-pad"
//   returnKeyType="next"
//   onChangeText={text => this.props.handleChange(text, 'phone')}
//   ref={input => this.props.innerRef(input, 'PhoneNumber')}
//   onSubmitEditing={() => this.props.handleSubmitEditing('EmailAddress')}
//   blurOnSubmit={false}
// />

// <Sae
//   label="Email Address"
//   labelStyle={styles.labelStyle}
//   inputPadding={16}
//   labelHeight={24}
//   // active border height
//   borderHeight={2}
//   borderColor="#475c67"
//   // TextInput props
//   style={[styles.saeInput]}
//   inputStyle={styles.saeText}
//   email
//   keyboardType="email-address"
//   autoCapitalize="none"
//   returnKeyType="next"
//   onChangeText={text => this.props.handleChange(text, 'email')}
//   ref={input => this.props.innerRef(input, 'EmailAddress')}
//   onSubmitEditing={() => this.props.handleSubmitEditing('Password')}
//   blurOnSubmit={false}
// />

// <Sae
//   label="Password"
//   labelStyle={styles.labelStyle}
//   inputPadding={16}
//   labelHeight={24}
//   // active border height
//   borderHeight={2}
//   borderColor="#475c67"
//   // TextInput props
//   style={[styles.saeInput]}
//   inputStyle={styles.saeText}
//   //this code shows asterisks in place of characters in field as user types
//   secureTextEntry
//   returnKeyType="next"
//   autoCapitalize="none"
//   onChangeText={text => this.props.handleChange(text, 'password')}
//   ref={input => this.props.innerRef(input, 'Password')}
//   onSubmitEditing={() => this.props.handleSubmitEditing('OrgName')}
//   blurOnSubmit={false}
// />
