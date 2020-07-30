
import React from 'react';
import {  View, Alert, Button, Text } from 'react-native';
import { connect } from 'react-redux';
import { Card } from 'react-native-elements';
import { CommonActions } from '@react-navigation/native';
import noImg from "../../public/no-image.jpg";
import {
  deleteData
} from "../actions/contact";


const ViewContact = (props) => {
  console.log(props)
  const deleteContact = async (id) =>{
    await props.deleteData(id)
  }
  const deleting = (id) => {
    Alert.alert(
      'Delete',
      'Delete the item?',
      [
        {
          text: 'Cancel',
          style: 'cancel'
        },
        {
          text: 'Ok',
          onPress: () => { deleteContact(id); }
        }
      ],
      { cancelable: false }
    )
  }

  const data = props.route.params.contact;


  const img = data.photo ? {uri: data.photo} : noImg;
  return (
      <View style={{
        justifyContent: "space-between",
        alignItems: "center"
      }}>
        <Card
          containerStyle={{ width: "90%" }}
          imageWrapperStyle={{ height: 300 }}
          imageStyle={{ height: 300 }}
          titleStyle={{ textTransform: "capitalize", fontSize: 20 }}
          title={data.firstName + " " + data.lastName}
          image={img}
        >
          <Text style={{ marginBottom: 10 }}>
            Age {data.age}
          </Text>
        </Card>

        <View 
          style={{width:"100%", marginTop:40}}
          >

        <Button title='Edit' 
          onPress={() => {
            props.navigation.dispatch(
              CommonActions.navigate({
                name: 'Edit',
                params: {
                  contact: data
                }
              })
              )
            }
            } />
          <Button title='Delete' onPress={() => deleting(data.id)} />

        </View>
        
      </View>
  );
}

const mapDispatchToProps = dispatch => ({
  deleteData: (id) => dispatch(deleteData(id))
});
export default connect(null, mapDispatchToProps)(ViewContact);