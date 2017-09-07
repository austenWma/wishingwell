import React, { Component } from 'react'
import { View, Text, StyleSheet, FlatList, ScrollView } from 'react-native'
import NavigationBar from 'react-native-navbar'
import * as firebase from 'firebase'
import moment from 'moment'
import { connect } from 'react-redux'
import { setSavings } from '../Actions/Savings/SavingsAction'
const db = firebase.database()


const mapStateToProps = (state) => {
  return {
    logs: state.SavingsReducer.entries,
    uid: state.ProfileReducer.uid
  }
}

class LogHistory extends Component {

  componentWillMount(){
    db.ref(`users/${this.props.uid}/logs`).on('value', (snapshot) => {
      (snapshot.val()) ? this.props.setSavings(Object.values(snapshot.val())) : null;
    })
  }

  render() {

    return (
      <View>
        <View>
          <NavigationBar title={{title:'Savings'}} tintColor='#99ccff'/>
        </View>
            <ScrollView style={styles.log}>
              <FlatList 
                removeClippedSubviews={false}
                data={this.props.logs.reverse()}
                renderItem={({item}) =>
                  <View style={styles.list}>
                    <Text style={styles.description}>{item.description}</Text>
                    <Text style={styles.date}>{item.date}</Text>
                    <Text style={styles.amount}>${item.amount}</Text>
                    <Text style={styles.amount}>${item.amount}</Text>
                  </View>
                }
                style={{height:'100%'}}
              />
              </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  list: {
    borderBottomWidth: 0.5,
    borderColor: 'black',
    width: '100%',
    height: 80,
    fontFamily: 'Roboto-Light'    
  },
  description: {
    fontSize: 20,
    top: 5,
    marginLeft: 10,
    fontFamily: 'Roboto-Light'
  },
  amount: {
    fontFamily: 'Roboto-Light'    
  },
  time: {
    marginRight: 10,
    color: 'gray',
    top: 10,    
  },
  firstline: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%'
  },
  amount: {
    textAlign: 'right',
    alignSelf: 'stretch',
    fontSize: 20,
    marginBottom: 3,
    marginRight: 10,
    marginTop: 4
  },
  date: {
    marginLeft: 7,
    top: 5,
    color: 'gray'
  },
  log : {
    marginBottom: '55%'
  },
  total: {
    height: 40,
    borderBottomWidth: 0.5,
    borderColor: 'gray',
  }, 
  savings: {
    fontSize: 25,
    marginLeft: 7,
    fontFamily: ''
    
  },
  number: {
    fontSize: 25,
    textAlign: 'right',
    marginRight: 10    
  },
})

export default connect(mapStateToProps, { setSavings })(LogHistory)
