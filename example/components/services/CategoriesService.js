import * as API from "./API";

export default {
  getCategories() {
    return API.apiClient.get("/categories-with-boards");
  },

  postCommands(payload) {
    //object related if else loop apply here.
    //according to the payload.
    const data={
      collaborators_timestamp: "",
      commands: payload,
      day_orders_timestamp: "",
      limit_notes: 1,
      max_notes: 5,
      resource_types: ["all"],
      full_sync: true,
      with_dateist_version: 1,
      with_web_static_version: true,
    }
    
    return API.apiClient.post("/syncA", data );
  }
};
