import axiosInstance from "./axiosInstance";

export interface Category {
  idCategoryBusiness: number;
  name: string;
}

interface CategoriesResponse {
  data: Category[];
}

export const getCategories = async () => {
  const res = await axiosInstance.get<CategoriesResponse>(
    "/business/getCategories",
  );
  return res.data;
};

export const createBusiness = async (data: {
  idCategoryBusiness: string;
  name: string;
  description: string;
  email: string;
  foundationYear: number;
}) => {
  const res = await axiosInstance.post("/business/create", data);
  return res.data;
};

export const setInitialBusinessBalance = async (data: {
  idBusiness: number;
  digitalBalance: number;
  cashBalance: number;
}) => {
  const res = await axiosInstance.patch(
    `/business/${data.idBusiness}/set-initial-balance`,
    data,
  );
  return res.data;
};
