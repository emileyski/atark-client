import axios from "axios";

const getAxiosInstance = (baseUrl: string) => {
  const getAccessToken = () => localStorage.getItem("accessToken");

  const updateTokens = (accessToken: string, refreshToken: string) => {
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
  };

  const axiosInstance = axios.create({
    baseURL: baseUrl,
  });

  axiosInstance.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${getAccessToken()}`;
    return config;
  });

  axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;

      if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        const refreshToken = localStorage.getItem("refreshToken");

        if (!refreshToken) return Promise.reject(error);

        try {
          const refreshResponse = await axios.post(
            `${baseUrl}/auth/refresh`,
            {},
            {
              headers: {
                Authorization: `Bearer ${refreshToken}`,
              },
            }
          );

          updateTokens(
            refreshResponse.data.accessToken,
            refreshResponse.data.refreshToken
          );

          return axiosInstance(originalRequest);
        } catch (refreshError) {
          // console.error("Ошибка при обновлении токена:", refreshError);
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
          alert("U are not authorized, please login again");

          const confirm = window.confirm("Do you want to login again?");
          if (confirm) {
            window.location.href = "/login";
          } else {
            window.location.href = "/";
          }
        }
      }

      return Promise.reject(error);
    }
  );

  return axiosInstance;
};

export default getAxiosInstance;
//
