import axios from "axios"

function buildHeader() {
    return {
        "Content-Type": "application/json;charset=UTF-8;multipart/form-data"
    }
}

let ax = axios.create({
    baseURL: host(),
    headers: buildHeader(),
    timeout: 10000,
    responseType: 'json',
    withCredentials: false,
    transformRequest: [
        function(data) {
            if(data instanceof FormData) return data;
            return JSON.stringify(data);
            
        }
    ],
    transformResponse: [
        function(data) {
            if(data) {
                return data;
            } else {
                throw new Error('error');
            }
        }
    ]
})

function host() {
    if(window.location.hostname == 'localhost') {
        return '/device/'
    } else {
        return '/device/'
    }
}

ax.interceptors.request.use(
    config => {
        return config;
    },
    err => {
        return Promise.reject(err)
    }
)

ax.interceptors.response.use(
    response => {
        if(response.data.success) return response.data;
    },
    error => {
        if (error.response) {
            console.log("error", error);
          }
    }
)
/* 手动取消请求的不显示报错 */
function handleError(err) {
    // 如果是手动取消的请求，不显示错误信息
    console.log("handleError1", err);
  }
/* GET  */
export function Get<T = any>(url, params = {}): Promise<T> {
    // `params`是要与请求一起发送的URL参数
    // 必须是纯对象或URLSearchParams对象
    return ax
      .get(url, { params })
      .then(res => {
        return res.data;
      })
      .catch(err => {
        handleError(err);
        throw err;
      });
  }

  /* POST */
export function Post<T = any>(url, data): Promise<T> {
    return ax
      .post(url, data)
      .then(res => {
        return res.data;
      })
      .catch(err => {
        handleError(err);
        throw err;
      });
  }

export default ax;