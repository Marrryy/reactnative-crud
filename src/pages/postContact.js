import React, { Component } from 'react';
import { View, StyleSheet, Text, ScrollView, Image } from 'react-native';
import { Input, CheckBox, Button, Icon } from 'react-native-elements';
import * as Permissions from 'expo-permissions'
import * as ImagePicker from 'expo-image-picker'
import * as ImageManipulator from 'expo-image-manipulator';
import { connect } from 'react-redux';

import { postData } from '../actions/contact';


const PostContact = (props) => {
  const [contact, setContact] = React.useState({
    firstName: "aaa",
    lastName: "aaaa",
    age: 1
  });
  const [photo, setPhoto] = React.useState("");
  
  const getImageFromCamera = async () => {
    const cameraPermission = await Permissions.askAsync(Permissions.CAMERA);
    const cameraRollPermission = await Permissions.askAsync(Permissions.CAMERA_ROLL);

    if (cameraPermission.status === 'granted' && cameraRollPermission.status === 'granted') {
      let capturedImage = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [4, 3]
      });
      if (!capturedImage.cancelled) {
        console.log(capturedImage);
        processImage(capturedImage.uri);
      }
    }
  }

  const getImageFromGallery = async () => {
    const cameraRollPermission = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    if (cameraRollPermission.status === 'granted') {
      let chosenImage = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3]
      });
      if (!chosenImage.cancelled) {
        console.log(chosenImage);
        processImage(chosenImage.uri);
      }
    }

  };

  const processImage = async (imageUri) => {
    let processedImage = await ImageManipulator.manipulateAsync(
      imageUri,
      [
        { resize: { width: 400 } }
      ],
      { format: 'png' }
    );
    console.log(processedImage);
    setPhoto(processedImage.uri);

  };

  const change = (i, v) => {
    setContact(c => {
      c[i] = v;
      return { ...c };
    })
  }
  const posting = async (firstName, lastName, age, photo) => {
    try {
      if (photo === "") {
        photo = "N/A"
      }
      const newData = {
        firstName, lastName, age, photo
      }
      props.postData(newData);
      // if(res)  props.history.push('/');
    }
    catch (e) {
      console.log(e)
    }
  }

  return (
    <ScrollView>
      <View >
        <View >
          <Image
            source={{ uri: photo }}
          />
          <Button
            title='Camera'
            onPress={()=>{getImageFromCamera()}}
          />
          <Button
            title='Gallery'
            onPress={()=>{getImageFromGallery()}}
          />
        </View>
        <Input
          placeholder="First Name"
          onChangeText={(data) => change('firstName', data)}
          value={contact.firstName}
        />
        <Input
          placeholder="Last Name"
          onChangeText={(data) => change('lastName', data)}
          value={contact.lastName}
        />
        <Input
          placeholder="Age"
          onChangeText={(data) => change('age', data)}
          value={contact.age}
        />
        <View >
          <Button
            onPress={() => posting(contact.firstName, contact.lastName, contact.age, photo)}
            title="Add Data"
          />
        </View>
      </View>
    </ScrollView>
  );
}

const mapDispatchToProps = dispatch => ({
  postData: (newData) => dispatch(postData(newData))
});

export default connect(null, mapDispatchToProps)(PostContact);
