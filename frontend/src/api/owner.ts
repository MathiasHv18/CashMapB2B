import axiosInstance from "./axiosInstance";

export const getBusinesses = async () => {
  const res = await axiosInstance.get("/owner/getBusinesses");
  return res.data;
};
