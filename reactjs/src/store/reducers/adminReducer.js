import actionTypes from '../actions/actionTypes';

const initialState = {
    isLoadingGender: false,
    genders: [],
    roles: [],
    positions: [],
    users: [],
    topDoctors: [],
    allDoctors: [],
    allScheduleTime: [],
    // allDoctorPrices: [],
    // allPayments: [],
    // allProvinces: [],
    allRequiredDoctorInfor: [],
}

const adminReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_GENDER_START:
            let copyState = { ...state };
            copyState.isLoadingGender = true;
            console.log("check start", action)
            return {
                ...copyState
            }
        case actionTypes.FETCH_GENDER_SUCCESS:
            state.genders = action.data;
            state.isLoadingGender = false;
            return {
                ...state
            }
        case actionTypes.FETCH_GENDER_FAILDED:
            state.isLoadingGender = false;
            state.genders = [];
            return {
                ...state
            }

        //Position
        case actionTypes.FETCH_POSITION_SUCCESS:
            state.positions = action.data;
            return {
                ...state
            }
        case actionTypes.FETCH_POSITION_FAILDED:
            state.positions = [];
            return {
                ...state
            }

        //Role
        case actionTypes.FETCH_ROLE_SUCCESS:
            state.roles = action.data;
            return {
                ...state
            }
        case actionTypes.FETCH_ROLE_FAILDED:
            state.roles = [];
            return {
                ...state
            }

        //user
        case actionTypes.FETCH_ALL_USERS_SUCCESS:
            state.users = action.users;
            return {
                ...state
            }
        case actionTypes.FETCH_ALL_USERS_FAILDED:
            state.users = [];
            return {
                ...state
            }

        //doctor
        case actionTypes.FETCH_TOP_DOCTOR_SUCCESS:
            state.topDoctors = action.dataDoctors;
            return {
                ...state
            }
        case actionTypes.FETCH_TOP_DOCTOR_FAILDED:
            state.topDoctors = [];
            return {
                ...state
            }

        case actionTypes.FETCH_ALL_DOCTORS_SUCCESS:
            state.allDoctors = action.dataDr;
            return {
                ...state
            }
        case actionTypes.FETCH_ALL_DOCTORS_FAILDED:
            state.allDoctors = [];
            return {
                ...state
            }
        //Time
        case actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_SUCCESS:
            state.allScheduleTime = action.dataTime;
            return {
                ...state
            }
        case actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_FAILDED:
            state.allScheduleTime = [];
            return {
                ...state
            }
        //infor system
        case actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_SUCCESS:
            state.allRequiredDoctorInfor = action.data;
            return {
                ...state
            }
        case actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_FAILED:
            state.allRequiredDoctorInfor = [];
            return {
                ...state
            }
        // case actionTypes.GET_DOCTOR_PRICE_SUCCESS:
        //     state.allDoctorPrices = action.data
        //     return {
        //         ...state
        //     }
        // case actionTypes.GET_PAYMENT_SUCCESS:
        //     state.allPayments = action.data
        //     return {
        //         ...state
        //     }
        // case actionTypes.GET_PROVINCE_SUCCESS:
        //     state.allProvinces = action.data
        //     return {
        //         ...state
        //     }
        default:
            return state;

    }
}

export default adminReducer;