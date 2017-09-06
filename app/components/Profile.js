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
    bio: state.ProfileReducer.bio,
    logs: state.SavingsReducer.entries
  }
}

const rightButtonConfig = {
  title: 'Settings',
  handler() {
    Actions.Settings()
  },
  tintColor: 'black'
}

class Profile extends Component {
  constructor(props) {
    super(props)

    this.getTotal = this.getTotal.bind(this)
  }

  getTotal() {
    let total = 0;
    for(let i = 0; i < this.props.logs.length; i++) {
      total += Number(this.props.logs[i]['amount'])
    }
    return total
  }

  render() {
    return (
      <View style={styles.body}>
          <View>
            <NavigationBar statusBar={false} title={{title:'Profile'}} rightButton={rightButtonConfig} tintColor='#99ccff'/>
          </View>

          <View style={styles.text}>
            <Image source={{ uri: this.props.photo }} style={styles.image}/>
            <Text style={styles.name}>
              {this.props.firstname} {this.props.lastname}
            </Text>
            <Text>
              <Icon name='at' size={25} style={styles.icon}/> {this.props.username}
            </Text>
          <View>
          </View>
            <Text style={styles.email}><Icon name='email-outline' size={25} style={styles.icon}/> {this.props.email}</Text>
            <Text style={styles.total}><Icon name='currency-usd' size={25} style={styles.icon}/> {this.getTotal()}</Text>
            <Text style={styles.bio}><Icon name='information-outline' size={25} style={styles.icon}/> {this.props.bio}</Text>

        </View>

      </View>
    )
  }
}

const styles = StyleSheet.create({
  body: {
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  image: { 
    marginLeft: 60,
    top: 10,
    height: 250, 
    width: 250,
    borderRadius: 125, 
    backgroundColor: '#C0C0C0',
  },
  name: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 20,   
    fontSize: 30,
    fontWeight: 'bold',
    marginLeft: 15,
    top: 20
  },
  username: {
    marginLeft: 15
  },
  icon:{
    marginLeft: 30
  }
})

export default connect(mapStateToProps)(Profile)





