export async function pushAlert({ dispatch }, { variant, message }) {
  await dispatch('alerts/push', { variant, message }, { root: true });
}


export async function fetchAudiences({ dispatch }) {
  await dispatch('audiences/fetchAll', null, { root: true });
}


export async function fetchAuth({ dispatch }) {
  await dispatch('auth/fetchStatus', null, { root: true });
}


export async function fetchConflicts({ dispatch }) {
  await dispatch('conflicts/fetchAll', null, { root: true });
}


export async function fetchGrades({ dispatch }) {
  await dispatch('grades/fetchAll', null, { root: true });
}


export async function fetchGroups({ dispatch }) {
  await dispatch('groups/fetchAll', null, { root: true });
}

export function clearGroups({ dispatch }) {
  dispatch('groups/clearAll', null, { root: true });
}

export async function fetchGroupsByGrade({ dispatch }, { gradeId }) {
  await dispatch('groups/fetchByGrade', { gradeId }, { root: true });
}


export function clearLessons({ dispatch }) {
  dispatch('lessons/clearAll', null, { root: true });
}

export async function fetchLessonsByGroup({ dispatch }, { groupId }) {
  await dispatch('lessons/fetchByGroup', { groupId }, { root: true });
}


export async function fetchSubjects({ dispatch }) {
  await dispatch('subjects/fetchAll', null, { root: true });
}


export async function fetchTeachers({ dispatch }) {
  await dispatch('teachers/fetchAll', null, { root: true });
}


export async function fetchWeek({ dispatch }) {
  await dispatch('settings/fetchWeek', null, { root: true });
}

export async function updateWeek({ dispatch }, { week }) {
  await dispatch('settings/updateWeek', { week }, { root: true });
}


export async function fetchTimes({ dispatch }) {
  await dispatch('times/fetchAll', null, { root: true });
}
