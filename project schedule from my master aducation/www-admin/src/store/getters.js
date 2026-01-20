export function alerts(state) {
  return state.alerts.items;
}


export function audiences(state) {
  return state.audiences.items;
}


export function auth(state) {
  return state.auth.status;
}


export function conflicts(state) {
  return state.conflicts.items;
}


export function grades(state) {
  return state.grades.items;
}


export function groups(state, getters) {
  return getters['groups/itemsOrdered'];
}

export function groupsByGrade(state, getters) {
  return getters['groups/itemsByGrade'];
}


export function lessonsByGroup(state, getters) {
  return getters['lessons/itemsByGroup'];
}


export function subjects(state) {
  return state.subjects.items;
}


export function teachers(state) {
  return state.teachers.items;
}


export function week(state) {
  return state.settings.week;
}


export function times(state) {
  return state.times.items;
}
