import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableHighlight, Image, Button } from 'react-native'
import { Actions } from 'react-native-router-flux'
import { connect } from 'react-redux'
import NavigationBar from 'react-native-navbar'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'


const mapStateToProps = (state) => {
  return {
    username: state.ProfileReducer.username,
    firstname: state.ProfileReducer.firstname,
    lastname: state.ProfileReducer.lastname,
    email: state.ProfileReducer.email,
    photo: state.PhotoReducer.photo,
    bio: state.ProfileReducer.bio
  }
}

const rightButtonConfig = {
  title: 'Settings',
  handler() {
    Actions.Settings()
  },
  tintColor: 'black'
}

const leftButtonConfig = {
  title: 'Add Card',
  handler() {
    Actions.AddCard()
  },
  tintColor: 'black'
}

class Profile extends Component {

  render() {
    return (
      <View style={styles.body}>
          <View>
            <NavigationBar title={{title:'Profile'}} rightButton={rightButtonConfig} tintColor='#99ccff' leftButton={leftButtonConfig}/>
          </View>
        <View style={styles.text}>
          <Text style={styles.name}>
            <Image source={{ uri: this.props.photo }} style={styles.image}/>
          </Text>
          {/* <Text>
            <Icon name='account-circle' size={25} style={styles.icon}/> {this.props.username? <Text style={styles.username}>@{this.props.username}</Text> : null}
          </Text>
          <Text><Icon name='email-outline' size={25} style={styles.icon}/> {this.props.email}</Text>
          <Text><Icon name='information-outline' size={25} style={styles.icon}/> {this.props.bio}</Text> */}
            <View style={styles.namewrap}>
              <Text style={styles.name}>
                {this.props.firstname} {this.props.lastname}
              </Text>
            </View>
          <View style={styles.info}>
            <Text><Icon name='at' size={25} style={styles.icon}/> {this.props.username}</Text>
            <Text style={styles.email}><Icon name='email-outline' size={25} style={styles.icon}/> {this.props.email}</Text>
            <Text style={styles.total}><Icon name='currency-usd' size={25} style={styles.icon}/>total</Text>
          </View>
            <Text style={styles.about}><Icon name='information-outline' size={25} style={styles.icon}/> A B O U T  M E</Text>
            <Text style={styles.bio}>{this.props.bio}</Text>
        </View>
          <Button title="Invest" onPress={() => {}}>Invest</Button>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  about: {
    paddingTop: 15,
    marginLeft: 10,
    fontSize: 20
  },
  bio:{
    marginTop: 10,
    marginLeft: 15
  },
  image: { 
    marginLeft: 80,
    top: 10,
    height: 200, 
    width: 200,
    borderRadius: 100, 
    backgroundColor: '#C0C0C0',
  },
  namewrap: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  name: {
    paddingBottom: 20,   
    fontSize: 30,
    fontWeight: 'bold',
    top: 20,
    fontFamily: 'Roboto-Light'
  },
  icon:{
    marginLeft: 30
  },
  info:{
    fontFamily: 'Roboto-Light',    
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 10,
    borderBottomWidth: 0.5,
    fontFamily: 'Roboto-Light'
    
  }
})


export default connect(mapStateToProps)(Profile)
