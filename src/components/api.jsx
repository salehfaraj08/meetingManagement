import axios from 'axios'
const meeting = 'https://6180f5218bfae60017adfcf0.mockapi.io/meeting'
const users = 'https://6180f5218bfae60017adfcf0.mockapi.io/users'

export const getMeetings = () => {
    return axios.get(meeting);
}
export const delMeeting = (id) => {
    return axios.delete(meeting + `/${id}`)
}
export const addMeeting = (data) => {
    return axios.post(meeting, data);
}
export const editMeeting = (id,data) => {
    return axios.put(`${meeting}/${id}`, data);
}
export const getUsers = () => {
    return axios.get(users);
}
