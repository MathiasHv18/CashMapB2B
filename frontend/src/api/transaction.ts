import axiosInstance from "./axiosInstance";

export const registerSale = async (data: any) => {
  const response = await axiosInstance.post("/transaction/sale", data);
  return response.data;
};
