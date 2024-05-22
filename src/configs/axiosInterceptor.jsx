import privateAxios from "./privateAxios";
import { saveToken, removeToken } from "../redux/features/tokenSlice";
import store from "../redux/app/store";

export function SetPrivateAxiosResponse() {
  const interceptor = privateAxios.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (
        error.response.data.status !== 401 &&
        error.response.data.status !== 403
      ) {
        return Promise.reject(error);
      }
      privateAxios.interceptors.response.eject(interceptor);
      let refreshToken = localStorage.getItem("refreshToken");
      return privateAxios
        .post(
          "/api/auth/refresh-token",
          {},
          { headers: { "Refresh-Token": refreshToken } }
        )
        .then((response) => {
          let newToken = response.data;
          store.dispatch(saveToken(newToken));
          error.response.config.headers["Authorization"] =
            "Bearer " + response.data;
          return privateAxios(error.response.config);
        })
        .catch((error2) => {
          console.log(error2);
          store.dispatch(removeToken());
          return Promise.reject(error2);
        })
        .finally(SetPrivateAxiosResponse);
    }
  );
}
export function SetPrivateAxiosRequest() {
  privateAxios.interceptors.request.use((config) => {
    let token = localStorage.getItem("token");
    if (token != null) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });
}
