import axios from "axios";
import store from "../store";
import Toasted from "vue-toasted";
import Vue from "vue";

Vue.use(Toasted);

export function createInstance() {
  const instance = axios.create({
    //baseURL: "https://epapanapis.malaysia.coway.do", //
    baseURL: "http://localhost:3000", //
  });

  instance.interceptors.request.use(
    function (config) {
      // Do something before request is sent
      // 토큰값 설정 한다. set token
      config.headers.Authorization = store.state.token;

      return config;
    },
    function (error) {
      // Do something with request error
      return Promise.reject(error);
    }
  );

  // Add a response interceptor
  instance.interceptors.response.use(
    function (response) {
      // Any status code that lie within the range of 2xx cause this function to trigger
      // Do something with response data
      return response;
    },
    function (error) {
      // Any status codes that falls outside the range of 2xx cause this function to trigger
      // Do something with response error

      Vue.toasted
        .error("There is an API issue [" + error + "]", {
          icon: "error",
          position: "bottom-right",
          action: {
            text: "Close",
            onClick: (e, toastObject) => {
              toastObject.goAway(0);
            },
          },
        })
        .goAway(3500);

      //return Promise.reject('1');
    }
  );

  return instance;
}

export function createRPTInstance() {
  const instance = axios.create({
    baseURL: "http://172.16.252.100:8080/report/", //
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });

  return instance;
}


export function createFileDwnInstance() {
  const instance = axios.create({
    baseURL: "https://epapanapis.malaysia.coway.do", //
    responseType: 'blob'
  });

  instance.interceptors.request.use(
    function (config) {
      // Do something before request is sent
      // 토큰값 설정 한다. set token
      config.headers.Authorization = store.state.token;

      return config;
    },
    function (error) {
      // Do something with request error
      return Promise.reject(error);
    }
  );

  // Add a response interceptor
  instance.interceptors.response.use(
    function (response) {
      // Any status code that lie within the range of 2xx cause this function to trigger
      // Do something with response data
      return response;
    },
    function (error) {
      // Any status codes that falls outside the range of 2xx cause this function to trigger
      // Do something with response error

      Vue.toasted
        .error("There is an API issue [" + error + "]", {
          icon: "error",
          position: "bottom-right",
          action: {
            text: "Close",
            onClick: (e, toastObject) => {
              toastObject.goAway(0);
            },
          },
        })
        .goAway(3500);

      //return Promise.reject('1');
    }
  );

  return instance;
}