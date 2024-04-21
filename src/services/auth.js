import axios from '../utils/axios';

const BASE_URL = process.env.REACT_APP_BASE_URL;

export const authSignup = async (data) => {
  return await axios.post(BASE_URL + `/user/signup`, data);
};

export const authLogin = async (data) => {
  const { email, password } = data;
  return await axios.post(BASE_URL + `/user/login`, {
    email,
    password,
  });
};

export const forgotPassword = async (data) => {
  return await axios.post(BASE_URL + `/user/forgot-password`, data);
};

export const resetPassword = async (data) => {
  return await axios.post(BASE_URL + `/user/reset-password`, data);
};

export const me = async (token) => {
  return await axios.get(BASE_URL + `/user/me`, {
    headers: {
      Authorization: 'Bearer ' + token,
    },
  });
};

export const getUserById = async ({ token, id }) => {
  return await axios.get(BASE_URL + `/user/${id}`, {
    headers: {
      Authorization: 'Bearer ' + token,
    },
  });
};

export const UpdateProfile = async ({ token, data, id }) => {
  return await axios.patch(BASE_URL + `/user/update-profile/${id}`, data, {
    headers: {
      Authorization: 'Bearer ' + token,
    },
  });
};
