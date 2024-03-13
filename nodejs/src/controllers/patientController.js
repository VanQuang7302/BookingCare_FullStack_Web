import patientService from "../services/patientService"


let postBookingAppointment = async (req, res) => {
    try {
        let message = await patientService.postBookAppointment(req.body);
        return res.status(200).json(message);
    } catch (e) {
        console.log('get all code error', e)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server'
        })
    }
}

let postVerifyBookAppointment = async (req, res) => {
    try {
        let message = await patientService.postVerifyBookAppointment(req.body);
        return res.status(200).json(message);
    } catch (e) {
        console.log('get all code error', e)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server'
        })
    }
}
module.exports = {
    postBookingAppointment: postBookingAppointment,
    postVerifyBookAppointment: postVerifyBookAppointment

}