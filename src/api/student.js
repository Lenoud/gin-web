import request from '../utils/request';
import API from './urls';

export const getStudents = () => request.get(API.STUDENTS);

export const addStudent = (student) => request.post(API.ADD_STUDENT, student);

export const updateStudent = (id, student) => request.put(API.UPDATE_STUDENT(id), student);

export const deleteStudent = (id) => request.delete(API.DELETE_STUDENT(id));
