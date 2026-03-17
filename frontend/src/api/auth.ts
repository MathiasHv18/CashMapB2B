import axiosInstance from "./axiosInstance";

export const login = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const res = await axiosInstance.post("/auth/login", { email, password });
  localStorage.setItem("access_token", res.data.access_token);
  return res.data;
};

export const register = async ({
  name,
  lastname,
  age,
  sex,
  email,
  password,
}: {
  name: string;
  lastname: string;
  age: number;
  sex: string;
  email: string;
  password: string;
}) => {
  const res = await axiosInstance.post("/owner/createOwner", {
    name,
    lastname: lastname,
    age,
    sex,
    email,
    password,
  });

  localStorage.setItem("access_token", res.data.access_token);
  return res.data;
};
