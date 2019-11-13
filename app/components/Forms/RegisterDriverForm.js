import React from 'react';
import {Text, ScrollView, Picker} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import styles from './styles';
import Block from '../Block';
import {CalendarButton} from '../Button';
import {Sae} from '../TextInputs';
import API from '../../api/api';

class RegisterDriverForm extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      orgs: [],
      organization: '',
    };
  };

  componentDidMount() {
    this.setState({
      orgs: [],
    })
    this.getOrganizations();
  }

  getOrganizations() {
    API.getOrgs()
      .then(res => {
        let orgArray = [];
        for (var i=0; i < res.organization.length; i++) {
          console.warn("an org is: ", res.organization[i].id, res.organization[i].name);
          orgArray.push(res.organization[i].name);
        }
        console.warn("the list is: ", orgArray);
        this.setState({
          orgs: orgArray
        })
      })
      .catch(error => {
        console.log('There has been a problem with your fetch operation: ' + error.message);
        throw error;
      })
  };
  
  render() {
    // const {
    //   subTitle,
    //   navigation,
    //   handleChange,
    //   innerRef,
    //   handleSubmitEditing,
    // } = props;

    const orgsList = this.state.orgs.map((eachOrg) =>       
        <Picker.Item label={eachOrg} value={eachOrg} />
    );

    return (
      <ScrollView>
        <Block middle>
          <KeyboardAwareScrollView>
            <Block style={styles.scrollContainer}>
              <Text style={styles.title}>Sign Up</Text>
              <Text style={styles.subTitle}>{this.props.subTitle}</Text>
            </Block>
            <Text style={{marginTop: 20, marginHorizontal: 16, fontSize: 18,}}>Volunteering for:</Text>
            <Picker
              label="Organization Name"
              // style={}
              inputPadding={16}
              labelHeight={24}
              borderHeight={2}
              borderColor="#475c67"
              blurOnSubmit={false}
              selectedValue={this.state.organization}
              onValueChange={(itemValue) =>
                  this.setState({organization: itemValue})
              }
            >
              {orgsList}
            </Picker>
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
              onChangeText={text => this.props.handleChange(text, 'firstName')}
              ref={input => this.props.innerRef(input, 'FirstName')}
              onSubmitEditing={() => this.props.handleSubmitEditing('LastName')}
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
              onChangeText={text => this.props.handleChange(text, 'lastName')}
              ref={input => this.props.innerRef(input, 'LastName')}
              onSubmitEditing={() => this.props.handleSubmitEditing('PhoneNumber')}
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
              onChangeText={text => this.props.handleChange(text, 'phoneNumber')}
              ref={input => this.props.innerRef(input, 'PhoneNumber')}
              onSubmitEditing={() => this.props.handleSubmitEditing('EmailAddress')}
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
              onChangeText={text => this.props.handleChange(text, 'email')}
              ref={input => this.props.innerRef(input, 'EmailAddress')}
              onSubmitEditing={() => this.props.handleSubmitEditing('Password')}
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
              onChangeText={text => this.props.handleChange(text, 'password')}
              ref={input => this.props.innerRef(input, 'Password')}
              onSubmitEditing={() => this.props.handleSubmitEditing('City')}
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
              onChangeText={text => this.props.handleChange(text, 'city')}
              ref={input => this.props.innerRef(input, 'City')}
              blurOnSubmit
            />
            <Block style={styles.footer}>
              <CalendarButton
                title="Continue"
                onPress={() => this.props.navigation.navigate('RegisterVehicle')}
              />
            </Block>
          </KeyboardAwareScrollView>
        </Block>
      </ScrollView>
    )
  };
};

export default RegisterDriverForm;
