import http from "../http-common";

class TutorialDataService {
  getAll() {
    return http.get("/todos");
  }

  getUsers() {
    return http.get("/users");
  }

  getPosts() {
    return http.get("/posts");
  }
}

export default new TutorialDataService();