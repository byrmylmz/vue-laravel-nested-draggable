import * as API from "./API";

export default {
  sync() {
    return API.apiClient.get("/sync");
  },
};
