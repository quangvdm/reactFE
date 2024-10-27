import { delay } from "@/js/utils";
import axi from "axios";

const axios = axi.create({
  baseURL: "https://giveandtake.starci.net" + "/api/v1",
  headers: {
    "Content-Type": "application/json",
    // Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});
// const token = localStorage.getItem("token");
// if (token) axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
// delay 500 help user better user
const request = {
  user: {
    login: async (email: string, password: string) => {
      await delay(500);
      return await axios.post("/login", {}, { params: { email, password } });
    },
    register: async (email: string, password: string) => {
      return await axios.post("/register", { email, password });
    },
    getAll: async (params: any) => {
      await delay(500);
      return await axios.get(`/accounts`, { params });
    },
    getById: async (id: any) => {
      await delay(500);
      return await axios.get(`/accounts/${id}`);
    },
    getByEmail: async (email: any) => {
      await delay(500);
      return await axios.get(`/accounts/${email}/info`);
    },
    create: async (user: any) => {
      return await axios.post("/accounts", user);
    },
    update: async (userId: number, user: any) => {
      return await axios.put(`/accounts/${userId}`, user);
    },
  },
  category: {
    getAll: async () => {
      return await axios.get("/categories");
    },
    create: async (category: any) => {
      return await axios.post("/categories", category);
    },
    update: async (category: any) => {
      return await axios.put(`/categories/${category.categoryId}`, category);
    },
    delete: async (categoryId: number) => {
      return await axios.delete(`/categories/${categoryId}`);
    },
  },
  donation: {
    getAll: async () => {
      return await axios.get("/donations");
    },
    create: async (donation: any) => {
      return await axios.post("/donations", donation);
    },
    update: async (donation: any) => {
      return await axios.put(`/donations/${donation.donationId}`, donation);
    },
    delete: async (donationId: number) => {
      return await axios.delete(`/donations/${donationId}`);
    },
  },
  reward: {
    getAll: async () => {
      await delay(500);
      return await axios.get("/rewards");
    },
    create: async (reward: any) => {
      return await axios.post("/rewards", reward);
    },
    update: async (id: any, reward: any) => {
      return await axios.put(`/rewards/${id}`, reward);
    },
    delete: async (rewardId: number) => {
      return await axios.delete(`/rewards/${rewardId}`);
    },
  },
};

export { axios, request };
