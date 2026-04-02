import axiosInstance from "./axiosInstance";

export const getItemsByBusinessId = async (idBusiness: number) => {
  const response = await axiosInstance.get(`/item/list/${idBusiness}`);
  return response.data;
};

export const addItem = async (data: any) => {
  const response = await axiosInstance.post("/item/add", data);
  return response.data;
};
