import axios from '../utils/axios';

const BASE_URL = process.env.REACT_APP_BASE_URL;

export const addCoupons = async ({ data, token }) => {
  return await axios.post(BASE_URL + `/coupon/create`, data, {
    headers: {
      Authorization: 'Bearer ' + token,
    },
  });
};

export const getAllCoupons = async ({ token }) => {
  return await axios.get(BASE_URL + `/coupon/get-coupons`, {
    headers: {
      Authorization: 'Bearer ' + token,
    },
  });
};

export const deleteCoupon = async ({ id, token }) => {
  return await axios.delete(BASE_URL + `/coupon/delete-coupon/${id}`, {
    headers: {
      Authorization: 'Bearer ' + token,
    },
  });
};

export const getCouponByCode = async ({ code, token }) => {
  return await axios.get(BASE_URL + `/coupon/coupon-by-code/${code}`, {
    headers: {
      Authorization: 'Bearer ' + token,
    },
  });
};
