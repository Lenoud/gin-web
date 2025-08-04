// src/api/urls.js

const API = {
    LOGIN: "/api/login",
    REGISTER: `/api/register`,
  
    STUDENTS: "/api/students",
    ADD_STUDENT: "/api/addstu",
    UPDATE_STUDENT: (id) => `/api/updatestu/${id}`,
    DELETE_STUDENT: (id) => `/api/delstu/${id}`,
  };
  
  export default API;
  