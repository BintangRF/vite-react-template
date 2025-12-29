import { axiosInstance } from "./axiosInstance";

export const api = {
  get: async <T>(
    endpoint: string,
    params?: Record<string, any>
  ): Promise<T> => {
    const res = await axiosInstance.get(endpoint, { params });
    return res.data;
  },

  post: async <T, P>(endpoint: string, payload?: P): Promise<T> => {
    const res = await axiosInstance.post(endpoint, payload);
    return res.data;
  },

  put: async <T, P>(endpoint: string, payload: P): Promise<T> => {
    const res = await axiosInstance.put(endpoint, payload);
    return res.data;
  },

  delete: async <T>(endpoint: string): Promise<T> => {
    const res = await axiosInstance.delete(endpoint);
    return res.data;
  },
};
