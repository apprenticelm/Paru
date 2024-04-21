import axios from '../utils/axios';

const BASE_URL = process.env.REACT_APP_BASE_URL;

export const uploadFile = async ({ data, token }) => {
  return await axios.post(BASE_URL + `/upload`, data, {
    headers: {
      Authorization: 'Bearer ' + token,
    },
  });
};

export const uploadHomeImage = async ({ data, token }) => {
  return await axios.post(BASE_URL + `/home`, data, {
    headers: {
      Authorization: 'Bearer ' + token,
    },
  });
};
export const HomeImages = async () => {
  return await axios.get(BASE_URL + `/home`);
};

// remove image by id
export const removeImage = async ({ id, token }) => {
  console.log('data', id);
  return await axios.delete(BASE_URL + `/home/${id}`, {
    headers: {
      Authorization: 'Bearer ' + token,
    },
  });
};

// remove file by id
export const removeFileById = async ({ id, token }) => {
  return await axios.delete(
    BASE_URL + `/event/delete-additional-event-file/${id}`,
    {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    },
  );
};
