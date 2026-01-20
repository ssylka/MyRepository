import Axios from 'axios';
import _ from 'lodash';

import * as helpers from 'services/helpers';


const axios = Axios.create({
  params: {
    APIKey: localStorage.APIKey,
  },
});


export const audiences = {
  async list() {
    const response = await axios.get('/APIv1/room/list');

    return response.data.map(({ id, name }) => ({
      id: String(id),
      name,
    }));
  },

  async create({ name }) {
    const response = await axios.put('/APIv1/room', { name });

    return String(response.data.res);
  },

  async update(id, { name }) {
    await axios.post(`/APIv1/room/${id}`, { name });
  },

  async remove(id) {
    await axios.delete(`/APIv1/room/${id}`);
  },

  async getForTimeCached(dd, bh, bm, eh, em) {
    const response = await axios.get(`/APIv1/room/v2/${dd}/${bh}/${bm}/${eh}/${em}`);
    return response;
  },

  async getForTimeQuery(dd, bh, bm, eh, em) {
    const response = await axios.get(`/APIv1/room/v1/${dd}/${bh}/${bm}/${eh}/${em}`);
    return response;
  },


  async Usage() {
    const response = await axios.get('/APIv1/room/usage');
    return response.data.map(({
      roomid, name, dayofweek, usagebyday, totalusage,
    }) => ({
      roomId: String(roomid),
      name,
      dayofweek,
      usagebyday,
      totalusage,
    }));
    // return response;
  },
};


export const auth = {
  async status() {
    const response = await axios.get('/APIv1/auth/status');

    return response.data.status === 'manager';
  },

  async login({ login, password }) {
    const response = await axios.get('/APIv1/auth/login', {
      params: {
        login,
        pass: password,
      },
    });

    localStorage.APIKey = response.data.APIKey;
    window.location.reload();
  },

  async logout() {
    delete localStorage.APIKey;
    window.location.reload();
  },
};


export const grades = {
  async list() {
    const response = await axios.get('/APIv1/grade/list');

    return response.data.map(({ id, num, degree }) => ({
      id: String(id),
      num: String(num),
      degree,
    }));
  },

  async create({ num, degree }) {
    const response = await axios.put('/APIv1/grade', { num, degree });

    return String(response.data.res);
  },

  async update(id, { num, degree }) {
    await axios.post(`/APIv1/grade/${id}`, { num, degree });
  },

  async remove(id) {
    await axios.delete(`/APIv1/grade/${id}`);
  },
};


export const groups = {
  async listByGrade(gradeId) {
    const response = await axios.get(`/APIv1/group/forGrade/${gradeId}`);

    return response.data.map(({
      id,
      num,
      name,
      gradeid: gradeId,
    }) => ({
      id: String(id),
      num: String(num),
      name,
      gradeId: String(gradeId),
    }));
  },

  async create({ num, name, gradeId }) {
    const response = await axios.put('/APIv1/group', { num, name, gradeID: gradeId });

    return String(response.data.res);
  },

  async update(id, { num, name, gradeId }) {
    await axios.post(`/APIv1/group/${id}`, { num, name, gradeid: gradeId });
  },

  async remove(id) {
    await axios.delete(`/APIv1/group/${id}`);
  },
};


export const lessons = {
  async listByGroup(groupId) {
    const response = await axios.get(`/APIv1/schedule/group/${groupId}`);

    const subjects = response.data.curricula.reduce((curricula, {
      lessonid: lessonId,
      subjectname: name,
      teachername: teacher,
      roomname: audience,
    }) => {
      curricula[lessonId] = curricula[lessonId] || [];
      curricula[lessonId].push({
        name,
        teacher,
        audience,
      });

      return curricula;
    }, {});

    const lessons = response.data.lessons.map(({
      id,
      timeslot: timeSlot,
    }) => ({
      id: String(id),
      ...helpers.time.parseTimeSlot(timeSlot),
      groups: [],
      subjects: subjects[id] || [],
    }));

    return lessons;
  },

  async listConflicts() {
    const response = await axios.get('/APIv1/lesson/list_conflicts');

    let lessons = response.data.map(({
      id,
      timeslot: timeSlot,
      degree: groupDegree,
      gradenum: groupGrade,
      groupnum: groupNum,
      groupname: groupName,
      subjectname: subjectName,
      teachername: subjectTeacher,
      roomname: subjectAudience,
    }) => ({
      id: String(id),
      ...helpers.time.parseTimeSlot(timeSlot),
      group: {
        degree: groupDegree,
        grade: groupGrade,
        num: groupNum,
        name: groupName,
      },
      subject: {
        name: subjectName,
        teacher: subjectTeacher,
        audience: subjectAudience,
      },
    }));

    lessons = _.map(_.groupBy(lessons, 'id'), lessons => ({
      ...lessons[0],
      groups: _.sortBy(_.uniqWith(lessons.map(lesson => lesson.group), _.isEqual), ['degree', 'grade', 'num']),
      subjects: _.sortBy(_.uniqWith(lessons.map(lesson => lesson.subject), _.isEqual), ['name', 'teacher', 'audience']),
    }));

    return lessons;
  },

  async create({
    weekDay, beginTime, endTime, week,
    groupIds,
    subjects,
  }) {
    const response = await axios.put('/APIv1/lesson', {
      lesson: {
        day: weekDay,
        beg: beginTime,
        end: endTime,
        split: week,
        subcount: subjects.length,
      },
      groups: groupIds,
      curricula: subjects.reduce((subjects, {
        empty,
        subjectId,
        teacherId,
        audienceId,
      }, index) => {
        if (!empty) {
          subjects.push({
            subnum: index + 1,
            subject: subjectId,
            teacher: teacherId,
            room: audienceId,
          });
        }

        return subjects;
      }, []),
    });

    return String(response.data.res);
  },

  async remove(id) {
    await axios.delete(`/APIv1/lesson/${id}`);
  },
};


export const settings = {
  async getWeek() {
    const response = await axios.get('/APIv1/week');

    return helpers.week.fromNum(response.data.week);
  },

  async setWeek(week) {
    await axios.post('/APIv1/week', helpers.week.buildDate(week));
  },
};


export const subjects = {
  async list() {
    const response = await axios.get('/APIv1/subject/list');

    return response.data.map(({ id, name, abbr }) => ({
      id: String(id),
      name,
      abbr,
    }));
  },

  async create({ name, abbr }) {
    const response = await axios.put('/APIv1/subject', { name, abbr });

    return String(response.data.res);
  },

  async update(id, { name, abbr }) {
    await axios.post(`/APIv1/subject/${id}`, { name, abbr });
  },

  async remove(id) {
    await axios.delete(`/APIv1/subject/${id}`);
  },
};


export const teachers = {
  async list() {
    const response = await axios.get('/APIv1/teacher/list');

    return response.data.map(({ id, name, degree }) => ({
      id: String(id),
      name,
      degree,
    }));
  },

  async create({ name, degree }) {
    const response = await axios.put('/APIv1/teacher', { name, degree });

    return String(response.data.res);
  },

  async update(id, { name, degree }) {
    await axios.post(`/APIv1/teacher/${id}`, { name, degree });
  },

  async remove(id) {
    await axios.delete(`/APIv1/teacher/${id}`);
  },
};


export const times = {
  async list() {
    const response = await axios.get('/APIv1/time/list');

    return response.data.map(({
      id,
      cbeg: begin,
      cend: end,
    }) => ({
      id: String(id),
      begin: helpers.time.parseCTime(begin),
      end: helpers.time.parseCTime(end),
    }));
  },
};
