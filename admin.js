import axios from 'axios';
const BASE_URL = process.env.REACT_APP_BASE_URL;

export const getAdminUsers = async ({ token }) => {
  return await axios
    .get(BASE_URL + `/user`, {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    })
    .then((response) => response.data);
};

export const updateAdmincredentials = async ({ token, data }) => {
  return await axios
    .patch(BASE_URL + `/user/update-admin-credentials`, data, {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    })
    .then((response) => response.data);
};

export const deleteUser = async ({ token, id }) => {
  return await axios
    .delete(BASE_URL + `/user/${id}`, {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    })
    .then((response) => response.data);
};
