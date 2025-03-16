import Interceptor from "./Interceptor";

export function GetAllEmployeeList() {
    return Interceptor.get(`/`);
}

export function GetEmpById(id) {
    return Interceptor.get(`/${id}`);
}

export function PostEmpData(body) {
    return Interceptor.post(`/`, body);
}

export function UpdateEmpData(id, body) {
    return Interceptor.put(`/${id}`, body);
}

export function DeleteEmpData(id) {
    return Interceptor.delete(`/${id}`);
}