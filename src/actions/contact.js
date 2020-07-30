import axios from '../config/axios';
// import * as url from '../enums/url';
import {
  GET_CONTACT
} from '../enums/mutations'

export const getData = () =>{
  return async dispatch => {
    const {data} = (await axios.get(`contact`)).data;
    dispatch({
      type: GET_CONTACT,
      payload: { data }
    })
  }
}
export const postData = (newData) =>{
  return async dispatch => {
  try{
    await axios.post(`contact`,newData);
    dispatch(getData());
    return true;
  }catch(e){
    console.log(e)
  }}
};

export const editData = (id,newData) => {
  return async dispatch => {
  try{
    await axios.put(`contact/${id}`,newData);
    dispatch(getData());
    return true;
  }catch(e){
    console.log(e)
  }
}}
export const deleteData = (id) => {
  return async dispatch => {
  try{
    await axios.delete(`contact/${id}`);
    dispatch(getData());
  }catch(e){
    console.log(e)
  }
  }
}