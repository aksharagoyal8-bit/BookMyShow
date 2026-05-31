import { axiosInstance } from "./index";

const BASE_URL = "http://localhost:8080/api/booking";

export const makePayment = async ({ showId, seats, userId, amount }) => {
  try {
    const resp = await axiosInstance.post(`${BASE_URL}/make-payment`, {
      showId,
      seats,
      userId,
      amount,
    });
    return resp.data;
  } catch (err) {
    console.log(err);
  }
};

export const bookShow = async (values) => {
  try {
    const resp = await axiosInstance.post(`${BASE_URL}/book-show`, values);
    return resp.data;
  } catch (err) {
    console.log(err);
  }
};