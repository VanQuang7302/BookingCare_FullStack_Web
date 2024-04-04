import axios from '../axios'

const handleLoginApi = (email, password) => {
    return axios.post('api/login', { email, password });
}

const getAllUsers = (inputId) => {
    return axios.get(`/api/get-all-users?id=${inputId}`, { id: inputId })
}

const createNewUserService = (data) => {
    return axios.post('/api/creatr-new-user', data)
}

const deleteUserService = (userId) => {
    return axios.delete('/api/delete-user', {
        data: { id: userId }
    })
}

const editUserService = (inputData) => {
    return axios.put('/api/edit-user', inputData)
}

const getAllCodeService = (inputType) => {
    return axios.get(`/api/allcode?type=${inputType}`)
}

const getTopDoctorHomeService = (limit) => {
    return axios.get(`/api/top-doctor-home?limit=${limit}`)
}

const getAllDoctors = () => {
    return axios.get(`/api/get-all-doctors`)
}

const saveDetailDoctorService = (data) => {
    return axios.post('/api/save-infor-doctors', data)
}

const getDetailInforDoctor = (inputId) => {
    return axios.get(`/api/get-detail-doctor-by-id?id=${inputId}`)
}

const saveBulkScheduleDoctor = (data) => {
    return axios.post('/api/bulk-create-schedule', data)
}

const getScheduleDoctorByDate = (doctorId, date) => {
    return axios.get(`/api/get-schedule-doctor-by-date?doctorId=${doctorId}&date=${date}`)
}

const getExtraInforDoctorById = async (doctorId) => {
    return axios.get(`/api/get-extra-infor-doctor-by-id?doctorId=${doctorId}`)
}

const getProfileDoctorById = async (doctorId) => {
    return axios.get(`/api/get-profile-doctor-by-id?doctorId=${doctorId}`)
}

const postPatientBookingAppointment = (data) => {
    return axios.post('/api/patient-book-appointment', data)
}

const postVerifyBookAppointmentService = async (data) => {
    return axios.post(`/api/verify-book-appointment`, data)
}

const createSpecialtyService = async (data) => {
    return axios.post('/api/create-specialty', data);
}

const getAllSpecialtyService = async () => {
    return axios.get('/api/get-all-specialty');
}

const getSpecialtyByIdService = async (data) => {
    return axios.get(`/api/get-specialty-by-id?id=${data.id}&location=${data.location}`)
}

const createClinicService = async (data) => {
    return axios.post('/api/create-clinic', data);
}

const getAllClinicService = async () => {
    return axios.get('/api/get-all-clinic');
}

const getClinicByIdService = async (data) => {
    return axios.get(`/api/get-clinic-by-id?id=${data.id}&location=${data.location}`)
}

const getListPatientForDoctorService = async (data) => {
    return axios.get(`/api/get-list-patient-for-doctor?doctorId=${data.doctorId}&date=${data.date}`)
}

const sendRemedyService = async (data) => {
    return axios.post(`/api/send-remedy`, data)
}

const search = (text) => {
    return axios.get(`/api/search?text=${text}`)
}

const editSpecialty = (id, data) => {
    return axios.put(`/api/edit-specialty?id=${id}`, data)
}
export {
    handleLoginApi, getAllUsers, createNewUserService, deleteUserService,
    editUserService, getAllCodeService, getTopDoctorHomeService, getAllDoctors,
    saveDetailDoctorService, getDetailInforDoctor, saveBulkScheduleDoctor, getScheduleDoctorByDate,
    getExtraInforDoctorById, getProfileDoctorById, postPatientBookingAppointment, postVerifyBookAppointmentService,
    createSpecialtyService, getAllSpecialtyService, getSpecialtyByIdService, createClinicService, getAllClinicService,
    getClinicByIdService, getListPatientForDoctorService, sendRemedyService, search, editSpecialty
};