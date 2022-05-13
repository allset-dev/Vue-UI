import { API } from "@/utils";

export const appApi = {
  loggin(email: string) {
    return API.get(`/users?email=${email}`);
  },
};
