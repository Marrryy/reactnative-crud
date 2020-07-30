import axios from "axios"; 
import * as url from '../enums/url';

export default  axios.create({
  baseURL: url.BASE_URL,
  timeout: 5000
});
