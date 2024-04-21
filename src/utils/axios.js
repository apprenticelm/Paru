import Axios from 'axios';

const baseurl = process.env.BACKEND_URL || 'https://invox.binarymarvels.com/';

const Token = async () => {
  try {
    const data = await localStorage.getItem('token');
    return data;
  } catch (err) {}
};

export const customAxios = Axios.create({
  // baseURL: baseurl,
});

// customAxios.interceptors.request.use(async function (config) {
//   config.headers.Authorization = `Bearer ` + (await Token());
//   return config;
// });

customAxios.interceptors.response.use(
  function (response) {
    return response;
  },
  async function (error) {
    console.log('User logged out due to 403 status');
    if (error.response && error.response.status === 403) {
      // Handle logout logic here
      await localStorage.removeItem('user');
      window.location.reload(); // Remove token from localStorage
      // Perform any additional logout actions if needed
    }
    return Promise.reject(error);
  },
);

export default customAxios;
