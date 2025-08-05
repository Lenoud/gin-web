// src/api/score.js
import request from '../utils/request';
import API from './urls';

// 获取学生所有成绩
export const getScores = (studentId) => request.get(API.SCORES(studentId));

// 给学生添加成绩
export const addScores = (studentId, score) => request.post(API.ADD_SCORES(studentId), score);

// 更新成绩
export const updateScores = (scoreId, score) => request.put(API.UPDATE_SCORES(scoreId), score);

// 删除成绩
export const deleteScores = (scoreId) => request.delete(API.DELETE_SCORES(scoreId));
