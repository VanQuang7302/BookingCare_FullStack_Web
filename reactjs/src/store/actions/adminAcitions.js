import actionTypes from './actionTypes';
import {
    getAllCodeService, createNewUserService, getAllUsers,
    deleteUserService, editUserService, getTopDoctorHomeService,
    getAllDoctors, saveDetailDoctorService, getAllSpecialtyService, getAllClinicService
} from '../../services/userService';
import { toast } from "react-toastify";

// export const fetchGenderStart = () => ({
//     type: actionTypes.FETCH_GENDER_START
// })

export const fetchGenderStart = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({
                type: actionTypes.FETCH_GENDER_START
            })
            let res = await getAllCodeService("GENDER");
            if (res && res.errCode === 0) {
                dispatch(fetchGenderSuccess(res.data));
            } else {
                dispatch(fetchGenderFailed());
            }
        } catch (e) {
            dispatch(fetchGenderFailed());
            console.log(e)
        }
    }

}

export const fetchGenderSuccess = (genderData) => ({
    type: actionTypes.FETCH_GENDER_SUCCESS,
    data: genderData
})

export const fetchGenderFailed = () => ({
    type: actionTypes.FETCH_GENDER_FAILDED
})

export const fetchPositionSuccess = (positionData) => ({
    type: actionTypes.FETCH_POSITION_SUCCESS,
    data: positionData
})

export const fetchPositionFailed = () => ({
    type: actionTypes.FETCH_POSITION_FAILDED
})

export const fetchRoleSuccess = (roleData) => ({
    type: actionTypes.FETCH_ROLE_SUCCESS,
    data: roleData
})

export const fetchRoleFailed = () => ({
    type: actionTypes.FETCH_ROLE_FAILDED
})

export const fetchPositionStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllCodeService("POSITION");
            if (res && res.errCode === 0) {
                dispatch(fetchPositionSuccess(res.data));
            } else {
                dispatch(fetchPositionFailed());
            }
        } catch (e) {
            dispatch(fetchPositionFailed());
            console.log(e)
        }
    }

}

export const fetchRoleStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllCodeService("ROLE");
            if (res && res.errCode === 0) {
                dispatch(fetchRoleSuccess(res.data));
            } else {
                dispatch(fetchRoleFailed());
            }
        } catch (e) {
            dispatch(fetchRoleFailed());
            console.log(e)
        }
    }

}

export const createNewUser = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await createNewUserService(data);
            console.log('quangbeo check create user', res)
            if (res && res.errCode === 0) {
                toast.success("Create a new user success");
                dispatch(saveUserSuccess());
                dispatch(fetchAllUsersStart());
            } else {
                dispatch(saveUserFailed());
            }
        } catch (e) {
            dispatch(saveUserFailed());
            console.log(e)
        }
    }
}

export const saveUserSuccess = () => ({
    type: 'SAVE_USER_SUCCESS'
})

export const saveUserFailed = () => ({
    type: 'SAVE_USER_FAILED'
})

export const fetchAllUsersStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllUsers("ALL");
            let res1 = await getTopDoctorHomeService(3);
            console.log(res1)
            if (res && res.errCode === 0) {
                dispatch(fetchAllUsersSuccess(res.users.reverse()));
            } else {
                toast.error("fetch all users error");
                dispatch(fetchAllUsersFailed());
            }
        } catch (e) {
            toast.error("fetch all users error");
            dispatch(fetchAllUsersFailed());
            console.log(e)
        }
    }

}

export const fetchAllUsersSuccess = (data) => ({
    type: 'FETCH_ALL_USERS_SUCCESS',
    users: data
})

export const fetchAllUsersFailed = () => ({
    type: 'FETCH_ALL_USERS_FAILDED',
})

export const deleteAUser = (userId) => {
    return async (dispatch, getState) => {
        try {
            let res = await deleteUserService(userId);
            console.log('quangbeo check create user', res)
            if (res && res.errCode === 0) {
                toast.success("Delete user success");
                dispatch(saveUserSuccess());
                dispatch(fetchAllUsersStart());
            } else {
                toast.error("Delete user error");
                dispatch(deleteUsersFailed());
            }
        } catch (e) {
            toast.error("Delete user error ");
            dispatch(deleteUsersFailed());
            console.log(e)
        }
    }
}

export const deleteUsersSuccess = () => ({
    type: actionTypes.DELETE_USERS_SUCCESS,
})

export const deleteUsersFailed = () => ({
    type: actionTypes.DELETE_USERS_FAILDED,
})

export const editAUser = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await editUserService(data);
            console.log('quangbeo check create user', res)
            if (res && res.errCode === 0) {
                toast.success("Update user success");
                dispatch(editUserSuccess());
                dispatch(fetchAllUsersStart());
            } else {
                toast.error("Update user error");
                dispatch(editUsersFailed());
            }
        } catch (e) {
            toast.error("Update user error ");
            dispatch(editUsersFailed());
            console.log(e)
        }
    }
}

export const editUserSuccess = () => ({
    type: actionTypes.EDIT_USERS_SUCCESS,
})

export const editUsersFailed = () => ({
    type: actionTypes.EDIT_USERS_FAILDED,
})

//doctor
export const fetchTopDoctor = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getTopDoctorHomeService('');
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.FETCH_TOP_DOCTOR_SUCCESS,
                    dataDoctors: res.data
                })
            } else {
                dispatch({
                    type: actionTypes.FETCH_TOP_DOCTOR_FAILDED,
                })
            }
        } catch (e) {
            console.log('FETCH_TOP_DOCTOR_FAILDED', e)
            dispatch({
                type: actionTypes.FETCH_TOP_DOCTOR_FAILDED,
            })
        }
    }
}
export const fetchAllDoctors = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllDoctors();
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.FETCH_ALL_DOCTORS_SUCCESS,
                    dataDr: res.data
                })
            } else {
                dispatch({
                    type: actionTypes.FETCH_ALL_DOCTORS_FAILDED,
                })
            }
        } catch (e) {
            console.log('FETCH_ALL_DOCTORS_FAILDED', e)
            dispatch({
                type: actionTypes.FETCH_ALL_DOCTORS_FAILDED,
            })
        }
    }
}

export const saveDetailDoctor = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await saveDetailDoctorService(data);
            if (res && res.errCode === 0) {
                toast.success("Save infor doctor success");
                dispatch({
                    type: actionTypes.SAVE_DETAIL_DOCTOR_SUCCESS,
                })
            } else {
                toast.error("Save infor doctor error");
                dispatch({
                    type: actionTypes.SAVE_DETAIL_DOCTOR_FAILDED,
                })
            }
        } catch (e) {
            console.log('SAVE_DETAIL_DOCTOR_FAILDED', e)
            toast.error("Save infor doctor error");
            dispatch({
                type: actionTypes.SAVE_DETAIL_DOCTOR_FAILDED,
            })
        }
    }
}

export const fetchAllScheduleTime = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllCodeService("TIME");
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_SUCCESS,
                    dataTime: res.data
                })
            } else {
                dispatch({
                    type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_FAILDED,
                })
            }
        } catch (e) {
            console.log('FETCH_ALLCODE_SCHEDULE_TIME_FAILDED', e)
            dispatch({
                type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_FAILDED,
            })
        }
    }
}

// //doctor Price
// export const getDoctorPrices = () => {
//     return async (dispatch, getState) => {
//         try {
//             let res = await getAllCodeService("PRICE");
//             if (res && res.errCode === 0) {
//                 dispatch(getDoctorPriceSuccess(res.allcodes))
//             } else {
//                 dispatch(getDoctorPriceFailed());
//             }
//         } catch (e) {
//             dispatch(getDoctorPriceFailed())
//             console.log('fetchDoctorStart error', e)
//         }
//     }
// }

// export const getDoctorPriceSuccess = (priceData) => ({
//     type: actionTypes.GET_DOCTOR_PRICE_SUCCESS,
//     data: priceData
// })
// export const getDoctorPriceFailed = () => ({
//     type: actionTypes.GET_DOCTOR_PRICE_FAILED
// })

// // payment

// export const getPayments = () => {
//     return async (dispatch, getState) => {
//         try {
//             let res = await getAllCodeService("PAYMENT");
//             if (res && res.errCode === 0) {
//                 dispatch(getPaymentSuccess(res.allcodes))
//             } else {
//                 dispatch(getPaymentFailed());
//             }
//         } catch (e) {
//             dispatch(getPaymentFailed())
//             console.log('fetch Payment error', e)
//         }
//     }
// }

// export const getPaymentSuccess = (paymentData) => ({
//     type: actionTypes.GET_PAYMENT_SUCCESS,
//     data: paymentData
// })
// export const getPaymentFailed = () => ({
//     type: actionTypes.GET_PAYMENT_FAILED
// })

// //province

// export const getProvinces = () => {
//     return async (dispatch, getState) => {
//         try {
//             let res = await getAllCodeService("PROVINCE");
//             if (res && res.errCode === 0) {
//                 dispatch(getProvinceSuccess(res.allcodes))
//             } else {
//                 dispatch(getProvinceFailed());
//             }
//         } catch (e) {
//             dispatch(getProvinceFailed())
//             console.log('fetch Payment error', e)
//         }
//     }
// }

// export const getProvinceSuccess = (provinceData) => ({
//     type: actionTypes.GET_PROVINCE_SUCCESS,
//     data: provinceData
// })
// export const getProvinceFailed = () => ({
//     type: actionTypes.GET_PROVINCE_FAILED
// })

export const getRequiredDoctorInfor = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_START })
            let resPrice = await getAllCodeService("PRICE");
            let resPayment = await getAllCodeService("PAYMENT");
            let resProvince = await getAllCodeService("PROVINCE");
            let resSpecialty = await getAllSpecialtyService();
            let resClinic = await getAllClinicService();

            if (resPrice && resPrice.errCode === 0 &&
                resPayment && resPayment.errCode === 0 &&
                resProvince && resProvince.errCode === 0 &&
                resSpecialty && resSpecialty.errCode === 0 &&
                resClinic && resClinic.errCode === 0) {
                let data = {
                    resPrice: resPrice.data,
                    resPayment: resPayment.data,
                    resProvince: resProvince.data,
                    resSpecialty: resSpecialty.data,
                    resClinic: resClinic.data
                }
                dispatch(fetchRequiredDoctorInforSuccess(data))
            } else {
                dispatch(fetchRequiredDoctorInforFailed());
            }
        } catch (e) {
            dispatch(fetchRequiredDoctorInforFailed());
            console.log('fetchRequiredDoctorInforFailed error', e)
        }
    }
}

export const fetchRequiredDoctorInforSuccess = (allRequiredData) => ({
    type: actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_SUCCESS,
    data: allRequiredData
})
export const fetchRequiredDoctorInforFailed = () => ({
    type: actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_FAILED
})


