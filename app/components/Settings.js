import React, { Component } from 'react';
import { View, Text, StyleSheet, Button, Image, TextInput } from 'react-native';
import { Form, Separator, InputField, LinkField, SwitchField, PickerField} from 'react-native-form-generator';
import { connect } from 'react-redux';
import { setUserInfo } from '../Actions/Profile/ProfileAction'
import { setUserPhoto } from '../Actions/Profile/PhotoAction'
import NavigationBar from 'react-native-navbar'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import * as firebase from 'firebase'

const mapStateToProps = (state) => {
  return {
    username: state.ProfileReducer.username,
    firstname: state.ProfileReducer.firstname,
    lastname: state.ProfileReducer.lastname,
    email: state.ProfileReducer.email,
    photo: state.PhotoReducer.photo,
    bio: state.ProfileReducer.bio,
    uid: state.ProfileReducer.uid
  }
}


class Settings extends Component {
  static navigationOptions = {
    title: 'Settings'
  };
  constructor(props) {
    super(props)
    this.state={
      photo: null,
      formData: {}
    }

    this.handleOnSave = this.handleOnSave.bind(this)
    this.handleFormChange = this.handleFormChange.bind(this)
  }

  handleFormChange(formData){
    this.state.formData= formData

  }

  handleOnSave() {
    this.props.setUserInfo(this.state.formData)
    if (this.state.photo === null && this.props.photo) {
      this.setState({
        photo: this.props.photo
      })
    } else {
      this.props.setUserPhoto(this.state.photo)
    }
    firebase.database().ref(`users/${this.props.uid}`).update({
      username: this.state.formData.username || this.props.username,
      firstname: this.state.formData.firstname || this.props.firstname,
      lastname: this.state.formData.lastname || this.props.lastname,
      email: this.state.formData.email || this.props.email,
      bio: this.state.formData.bio || this.props.bio,
      photo: this.state.photo || this.props.photo
    })
  }

  render() {
    let { photo } = this.state;
    return (
      <View>
       <View style={styles.body}>
          <Image source={{ uri: photo || this.props.photo }} onPress={this._pickImage} style={styles.image} />
        <Button
            title="Change Profile Photo"
            onPress={this._pickImage}
        />
       </View>
        <Separator label="Personal Information"/>
       <Form
          style={styles.form}
          ref='personalInformation'
          onChange={this.handleFormChange}
          label="Personal Information" >

        <InputField
            ref='username'
            placeholder='Username'
            value={this.props.username}
            iconLeft={<Icon name='account-circle' size={30} style={styles.icon}/>}
          />


         <InputField
            ref='firstname'
            placeholder='First Name'
            value={this.props.firstname}
            iconLeft={<Icon name='account' size={30} style={styles.icon}/>}
          />

        <InputField
            ref='lastname'
            placeholder='Last Name'
            value={this.props.lastname}
            iconLeft={<Icon name='account' size={30} style={styles.icon}/>}
          />
        <InputField
            ref='email'
            iconLeft={<Icon name='email-outline' size={30} style={styles.icon}/>}
            placeholder='Email'
            value={this.props.email}
          />
        <InputField
            ref='bio'
            iconLeft={<Icon name='information-outline' size={30} style={styles.icon}/>}
            placeholder='Bio'
            value={this.props.bio}
          />
        <Separator label="Private Information"/>
        </Form>
        <Button
          title="Done"
          onPress={() => this.handleOnSave()}
        ></Button>

      </View>
    );
  }

  _pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
    });

    console.log(result);

    if (!result.cancelled) {
      this.setState({ photo: result.uri });
    }
  };
};

const styles = StyleSheet.create({
  body: {
    top: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    height: 100,
    borderRadius: 50,
    width: 100,
    alignItems: 'center',
    backgroundColor: '#C0C0C0'
  },
  icon: {
    marginTop: 7,
    marginLeft: 4,
    color:'gray'
  }
});

export default connect(mapStateToProps, { setUserInfo, setUserPhoto })(Settings);
