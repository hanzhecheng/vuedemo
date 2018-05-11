const BASE_URL=process.env.NODE_ENV === 'production'?"http://localhost:":"http://localhost:";
const API_URL={
    "BigData":BASE_URL+"8989/api/BigDataMain/"
}
export default API_URL;