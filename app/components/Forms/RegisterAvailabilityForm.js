import React from "react";
import { Text, ScrollView, Picker } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import styles from "./styles";
import Block from "../Block";
import { CalendarButton } from "../Button";
import { Sae } from "../TextInputs";
import API from "../../api/api";
import AsyncStorage from "@react-native-community/async-storage";

class RegisterAvailabilityForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      availData: {}
    };;
  }

  componentDidMount() {}

  //async await needed for proper Promise handling during submit function
  handleUserSubmit = async (userEntries, recurring) => {
    console.log("in handlesubmit: ", recurring);;
    console.log('what type of info? ', typeof recurring);;

    alert(
      "Thank you for registering! You will receive an email regarding next steps within _ business days."
    );;
    let token = await AsyncStorage.getItem("token");;
    token = JSON.parse(token);;

    console.log('right before createAvail API: ', userEntries);

    let endDate = userEntries.end_date;;

    //use API file, createAvailability fx to send user's availability to database; token required
    API.createAvailability(userEntries, recurring, endDate, token.token)
      .then(
        //logout after submission complete, but this will change as registration expands to include availability, and redirect won't be to logout but to alt mainview which will display driver's approval/pending status
        API.logout(token.token)
          .then(res => {
            const loggedOut = res.json.Success;
            if (loggedOut == "Logged Out") {
              AsyncStorage.removeItem("token");
              this.props.navigation.navigate("Welcome");
            } else {
              Alert.alert("Unable to Logout", "Please try again.");
            }
          })
          .catch(error => {
            AsyncStorage.removeItem("token");
            this.props.navigation.navigate("Welcome");
          })
      )
      .catch(err => {
        this.setState({
          errorMessage: "Invalid username or password."
        });
      });;
  };

  render() {
    const { userEntries } = this.props;
    let availabilitySelectors;

    return (
      <ScrollView>
        <KeyboardAwareScrollView>
          <Block style={styles.scrollContainer}>
            <Text style={styles.title}>Availability Info</Text>
            <Text style={styles.subTitle}>
              Continue with availability information
            </Text>
          </Block>
          <Block middle>
            <Sae
              label="Start Date and Time (YYYY-MM-DD HH:MM)"
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
              onChangeText={text => this.props.handleChange(text, "start_time")}
              ref={input => this.props.innerRef(input, "StartTime")}
              onSubmitEditing={() => this.props.handleSubmitEditing("EndTime")}
              blurOnSubmit={false}
            />
            <Sae
              label="End Date and Time (YYYY-MM-DD HH:MM)"
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
              onChangeText={text => this.props.handleChange(text, "end_time")}
              ref={input => this.props.innerRef(input, "EndTime")}
              onSubmitEditing={() =>
                this.props.handleSubmitEditing("Recurring")
              }
              //   blurOnSubmit={false}
            />

            <Text style={{ marginTop: 20, marginHorizontal: 16, fontSize: 18 }}>
              Is this availability recurring?{" "}
            </Text>
            <Picker
              label="Recurring"
              key={availabilitySelectors}
              inputPadding={16}
              labelHeight={24}
              borderHeight={2}
              borderColor="#475c67"
              blurOnSubmit={false}
              selectedValue={this.state.is_recurring}
              //set the item value (which will be the radius mileage) to state so it can be passed to API post
              onValueChange={itemValue =>
                this.setState({ is_recurring: itemValue })
              }
            >
              {/* default to instruct user what to do */}
              <Picker.Item label="Select One" value="null" />
              <Picker.Item label="Yes" value="true" />
              <Picker.Item label="No" value="false" />
            </Picker>

            {this.state.is_recurring === "true" && (
              <Sae
                label="End Recurring Schedule Date (YYYY-MM-DD)"
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
                onChangeText={text => this.props.handleChange(text, "end_date")}
                ref={input => this.props.innerRef(input, "EndDate")}
                onSubmitEditing={() =>
                  this.props.handleSubmitEditing("EndDate")
                }
                //   blurOnSubmit={false}>
              />
            )}

            <Block style={styles.footer}>
              <CalendarButton
                title="Submit"
                onPress={() =>
                  this.handleUserSubmit(userEntries, this.state.is_recurring)
                }
              />
            </Block>
          </Block>
        </KeyboardAwareScrollView>
      </ScrollView>
    );
  }
}

export default RegisterAvailabilityForm;

