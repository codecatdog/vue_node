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
        return '/api/'
    } else {
        return '/api/'
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

export default ax;