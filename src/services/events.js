import axios from '../utils/axios';

const BASE_URL = process.env.REACT_APP_BASE_URL;

export const registrationEvents = async ({ data, token }) => {
  return await axios.post(BASE_URL + `/event/registration`, data, {
    headers: {
      Authorization: 'Bearer ' + token,
    },
  });
};
export const proceedWithPayment = async ({ data, token }) => {
  return await axios.post(BASE_URL + `/event/proceed-with-payment`, data, {
    headers: {
      Authorization: 'Bearer ' + token,
    },
  });
};

export const creationEvent = async ({ data, token }) => {
  return await axios.post(BASE_URL + `/event/create`, data, {
    headers: {
      Authorization: 'Bearer ' + token,
    },
  });
};

export const updateEvent = async ({ data, token, eventId }) => {
  return await axios.post(BASE_URL + `/event/update/${eventId}`, data, {
    headers: {
      Authorization: 'Bearer ' + token,
    },
  });
};

export const addAdditionalEvent = async ({ data, token }) => {
  return await axios.post(BASE_URL + `/event/create-additional`, data, {
    headers: {
      Authorization: 'Bearer ' + token,
    },
  });
};
export const editAdditionalEvent = async ({ data, token, eventId }) => {
  return await axios.post(
    BASE_URL + `/event/edit-additional-event/${eventId}`,
    data,
    {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    }
  );
};

export const getAllEvents = async ({ token, params }) => {
  const nowDate = new Date().toISOString();
  return await axios.get(BASE_URL + `/event/` + nowDate, {
    headers: {
      Authorization: 'Bearer ' + token,
    },
    params: { ...params, format: params?.format ? params.format : 'all' },
  });
};

export const getAllModules = async () => {
  const nowDate = new Date().toISOString();

  return await axios.get(BASE_URL + `/event/modules/` + nowDate);
};

export const getAlreadyRegisteredEvent = async ({ id, token }) => {
  return await axios.get(BASE_URL + `/event/is-already-registered/${id}`, {
    headers: {
      Authorization: 'Bearer ' + token,
    },
  });
};
export const getRegisteredEventDetails = async ({ id, token }) => {
  return await axios.get(BASE_URL + `/event/registered-event-details/${id}`, {
    headers: {
      Authorization: 'Bearer ' + token,
    },
  });
};

export const getAllEventWithModules = async ({ moduleName }) => {
  return await axios.get(BASE_URL + `/event/event-by-module/${moduleName}`);
};

export const getEventDetailById = async ({ id, token }) => {
  return await axios.get(BASE_URL + `/event/event-by-id/${id}`);
};

export const getModulesAndInstructors = async ({ token }) => {
  return await axios.get(BASE_URL + `/event/instructors-modules/`, {
    headers: {
      Authorization: 'Bearer ' + token,
    },
  });
};

export const deleteEvents = async ({ data, token }) => {
  return await axios.delete(BASE_URL + `/event/delete`, {
    headers: {
      Authorization: 'Bearer ' + token,
    },
    data,
  });
};

export const deleteAdminEvents = async ({ data, token }) => {
  return await axios.delete(BASE_URL + `/event/admin-event-delete`, {
    headers: {
      Authorization: 'Bearer ' + token,
    },
    data,
  });
};

export const updateEventRegistrationPayment = async ({ data, token }) => {
  const response = await axios.post(
    BASE_URL + `/payment/event/callback`,
    data,
    {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    }
  );

  return response.data;
};

// --------------------------- ADMIN ------------------------

export const getAllAdminEvents = async ({ token }) => {
  return await axios.get(BASE_URL + `/event/admin-events`, {
    headers: {
      Authorization: 'Bearer ' + token,
    },
  });
};

export const getAllAdminEventsRegistered = async ({ token }) => {
  return await axios.get(BASE_URL + `/event/admin-register-events`, {
    headers: {
      Authorization: 'Bearer ' + token,
    },
  });
};
