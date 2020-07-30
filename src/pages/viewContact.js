
import React, { useEffect } from 'react';
import { ScrollView, View, Picker, TouchableHighlight, Alert } from 'react-native';
import { connect } from 'react-redux';
import { Card } from 'react-native-elements';

import {
  deleteData
} from "../actions/contact";

import * as url from '../enums/url';

const ViewContact = (props) => {
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
  const { navigate } = this.props.navigation;

  let urlphoto = "";
  if (data.photo == "N/A" || data.photo== "") {
    urlphoto = "../../public/no-image.jpg"
  } else {
    urlphoto = data.photo
  }

  return (
    <ScrollView>
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
          image={{ uri: urlphoto }}
        >
          <Text style={{ marginBottom: 10 }}>
            Age {data.age}
          </Text>
          <Button title='Edit' onPress={() => 
            navigation.dispatch(
              CommonActions.navigate({
                name: 'Edit',
                params: {
                  contact: data
                }
              })
            )
            // navigate('Edit', { contact: data })
            } />
          <Button title='Delete' onPress={() => deleting(data.id)} />
        </Card>

      </View>
    </ScrollView>
  );
}

const mapDispatchToProps = dispatch => ({
  deleteData: (id) => dispatch(deleteData(id))
});
export default connect(null, mapDispatchToProps)(ViewContact);