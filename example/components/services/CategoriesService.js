import * as API from "./API";

export default {
  getCategories() {
    return API.apiClient.get("/categories-with-boards");
  },
  postCommands(data) {
    return API.apiClient.post("/sync", { data })}
};
