import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import api from '../../api/api';
import AsyncStorage from '@react-native-community/async-storage';
import { FlatList } from 'react-native-gesture-handler';
import moment from 'moment';
import styles from '../../views/AgendaView/AgendaStyles';
import Container from '../../components/Container';
class AgendaView extends React.Component {
  constructor(props){
    super(props);
    this.state={
    }
  }
  componentDidMount = async () => {
    const value = await AsyncStorage.getItem('token');
    const parsedValue = JSON.parse(value);
    const realToken = parsedValue.token;
    this.setState({
      token: realToken
    });
    this.getAvailability();
  }
  getAvailability = async() => {
    let token = await AsyncStorage.getItem('token')
    token = JSON.parse(token)
    let avails = await api.getAvailabilities(token.token)
    console.log("response maybe? ", avails.json)
    
    const result = []
    const map = new Map()
    for (const item of avails.json) {
      if (!map.has(item.eventId)){
        map.set(item.eventId, true);
        result.push({
          id: item.eventId,
          startTime: item.startTime,
          endTime: item.endTime,
          isRecurring: item.isRecurring,
          day: moment(item.startTime).format("dddd")
        })
      }
      console.log("testing this: ", result)
      this.setState({
        response: result
      })
    }
  }
  editAvail = () => {
  }
  deleteAvail = (eventId) => {
    let token = this.state.token
    console.log("in deleteAvail fx: ", token)
    console.log("in deleteAvail fx: ", eventId)
    api.deleteAvailability(token, eventId)
  }
  renderItem = (item) => {
    let token = this.state.token
    console.log("token is: ", token)
    console.log("each item: ", item)
    let id = item.id
    let date = moment(item.startTime).format("MMMM D, YYYY")
    let start = moment.utc(item.startTime).format("h:mm A")
    let end = moment.utc(item.endTime).format("h:mm A")
    let day = moment(item.startTime).format("dddd")+"s"
    let endDate = moment(item.endTime).format("MMMM D, YYYY")
    let driverToken = this.state.token
    console.log("in return, id is: ", id)
    console.log("in return, token is: ", driverToken)
    if (item.isRecurring === true) {
      return(
        <View
          style={[styles.availListItem]}>
          <View style={styles.leftContainer}>
            <Text style={styles.flatListText}>{day}</Text> 
            <Text style={styles.flatListText}>{start} to {end}</Text>
            {/* <Text>until {endDate}</Text> */}
          </View>
          <View style={styles.rightContainer}>
          <TouchableOpacity onPress={() => this.editAvail}>
            <Icon color={`gray`} name="pencil" size={30} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.deleteAvail(id)}>
            <Icon color={`gray`} name="delete" size={30} />
          </TouchableOpacity>
          </View>
        </View>
      )
    } else {
      
      return(
        <View
          style={[styles.availListItem]}>
          <View style={styles.leftContainer}>
            <Text style={styles.flatListText}>{date}</Text> 
            <Text style={styles.flatListText}>{start} to {end}</Text>
          </View>
          <View style={styles.rightContainer}>
          <TouchableOpacity onPress={this.redirectToAddAvail}>
            <Icon color={`gray`} name="pencil" size={30} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.deleteAvail(id)}>
            <Icon color={`gray`} name="delete" size={30} />
          </TouchableOpacity>
          </View>
        </View>
      )
    }
  }
  redirectToAddAvail = () => {
    const { navigation } = this.props;
    navigation.navigate('AvailabilityView');
  }
  backButton = () => {
    const { navigation } = this.props;
    navigation.navigate('MainView');
  }
  render(){
    return(
      <Container>
        {/* <RegisterHeader
          onPress={() => navigation.navigate('MainView')}
          iconColor="#475c67"
        /> */}
        <View
          style={[styles.headerContainer]}>
          <View style={styles.leftContainer}>
            <TouchableOpacity onPress={this.backButton}>
              <Icon color={`gray`} name="arrow-left" size={30} />
            </TouchableOpacity>
          </View>
          <View style={styles.rightContainer}>
            <Text style={styles.title}>Your current availability schedule: </Text>
          </View>
        </View>
        <ScrollView>
          {this.state.response && 
            <FlatList
              data={this.state.response}
              renderItem={({ item }) => this.renderItem(item)}
              keyExtractor={item => item.eventId}
            />
          }
          <View style={styles.footer}>
            <TouchableOpacity style={styles.buttonContainer} onPress={this.redirectToAddAvail}>
              <View style={styles.buttonWrapper}>
                <Text style={styles.buttonText}>Add Availability</Text>
              </View>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </Container>
    )
  }
}
export default AgendaView;