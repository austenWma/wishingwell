import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableHighlight, Image } from 'react-native'
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
            {this.props.firstname} {this.props.lastname}
          </Text>
          <Text>
            <Icon name='account-circle' size={25} style={styles.icon}/> {this.props.username? <Text style={styles.username}>@{this.props.username}</Text> : null}
          </Text>
          <Text><Icon name='email-outline' size={25} style={styles.icon}/> {this.props.email}</Text>
          <Text><Icon name='information-outline' size={25} style={styles.icon}/> {this.props.bio}</Text>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({

  text: {
    top: 30,
  },
  body: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  body: {
  },
  image: { 
    top: 28,
    height: 100, 
    borderRadius: 50, 
    width: 100,
    backgroundColor: '#C0C0C0',
  },
  name: {
    fontSize: 30,
    fontWeight: 'bold',
    marginLeft: 15,
  },
  username: {
    marginLeft: 15
  },
  icon:{
    marginLeft: 30
  }
})


export default connect(mapStateToProps)(Profile)
