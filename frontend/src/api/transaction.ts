import axiosInstance from "./axiosInstance";

export const registerSale = async (data: any) => {
  const response = await axiosInstance.post("/transaction/sale", data);
  return response.data;
};

export const registerExpense = async (data: any) => {
  const response = await axiosInstance.post("/transaction/expense", data);
  return response.data;
};

export const getEconomyByDayByTime = async (data: any) => {
  const response = await axiosInstance.post("/dashboard/total_range", data);
  return response.data;
};

export const getSummaryByPaymentMethod = async (idBusiness: any) => {
  const response = await axiosInstance.get(
    `/dashboard/get_payment_summary/${idBusiness}`,
  );
  return response.data;
};
