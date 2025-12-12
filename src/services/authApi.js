 import apiClient from './apiClient';
 
export async function signin(email, password) {
  try {
    const res = await apiClient.post('/api/auth/login', { email, password });
    return res.data;
  } catch (err) {
    const message = err?.response?.data?.message || 'Invalid email or password';
    throw new Error(message);
  }
}
  
export async function signup(email, password) {
  try {
    const res = await apiClient.post('/api/auth/signup', { email, password });
    return res.data;
  } catch (err) {
    const message = err?.response?.data?.message || 'Signup failed.';
    throw new Error(message);
  }
}

 
export async function googleSignin(idToken) {
  // backend should accept Google id token and return user/session
  try {
    const res = await apiClient.post('/api/auth/googleAuth', { idToken });
    return res.data;
  } catch (err) {
    const message = err?.response?.data?.message || 'Google sign-in failed.';
    throw new Error(message);
  }
}

export async function resetPassword(email) {
  try {
    const res = await apiClient.post('/api/auth/reset-password', { email });
    return res.data;
  } catch (err) {
    const message = err?.response?.data?.message || 'Failed to send reset email';
    throw new Error(message);
  }
}

export async function updatePassword(token, newPassword) {
  try {
    const res = await apiClient.post('/api/auth/update-password', { token, newPassword });
    return res.data;
  } catch (err) {
    const message = err?.response?.data?.message || 'Failed to update password';
    throw new Error(message);
  }
}
 
export async function addCourse(courseData) {
  try {
    const res = await apiClient.post('/api/admin/add-course', courseData);
    return res.data;
  } catch (err) {
    const message = err?.response?.data?.message || 'Failed to add course';
    throw new Error(message);
  }
}

export async function getCourses() {
  try {
    const res = await apiClient.get('/api/admin/courses');
    // return courses array when backend wraps it in { courses: [...] }
    return res.data?.courses ?? res.data;
  } catch (err) {
    const message = err?.response?.data?.message || 'Failed to fetch courses';
    throw new Error(message);
  }
}

export async function getCourseById(id) {
  try {
    const res = await apiClient.get(`/api/admin/course/${id}`);
    return res.data;
  } catch (err) {
    const message = err?.response?.data?.message || 'Failed to fetch course';
    throw new Error(message);
  }
}

export async function updateCourse(id, courseData) {
  try {
    const res = await apiClient.put(`/api/admin/update-course/${id}`, courseData);
    return res.data;
  } catch (err) {
    const message = err?.response?.data?.message || 'Failed to update course';
    throw new Error(message);
  }
}

export async function deleteCourse(id) {
  try {
    const res = await apiClient.delete(`/api/admin/delete-course/${id}`);
    return res.data;
  } catch (err) {
    const message = err?.response?.data?.message || 'Failed to delete course';
    throw new Error(message);
  }
}

export async function addQuiz(quizData) {
  try {
    const res = await apiClient.post('/api/admin/add-quiz', quizData);
    return res.data;
  } catch (err) {
    const message = err?.response?.data?.message || 'Failed to add quiz';
    throw new Error(message);
  }
}

export async function getQuiz() {
  try {
    const res = await apiClient.get('/api/admin/get-quiz');
    return res.data;
  } catch (err) {
    const message = err?.response?.data?.message || 'Failed to fetch quiz';
    throw new Error(message);
  }
}

export async function updateQuiz(id, quizData) {
  try {
    const res = await apiClient.put(`/api/admin/update-quiz/${id}`, quizData);
    return res.data;
  } catch (err) {
    const message = err?.response?.data?.message || 'Failed to update quiz';
    throw new Error(message);
  }
}

export async function deleteQuiz(id) {
  try {
    const res = await apiClient.delete(`/api/admin/delete-quiz/${id}`);
    return res.data;
  } catch (err) {
    const message = err?.response?.data?.message || 'Failed to delete quiz';
    throw new Error(message);
  }
}
  