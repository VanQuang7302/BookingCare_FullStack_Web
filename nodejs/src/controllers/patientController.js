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

const getSearch = async (req, res) => {
    try {
      console.log(req.query)
      let infor = await patientService.getSearch(req.query.text)
      return res.status(200).json(infor)
    } catch (error) {
      console.log(error)
      return res.status(200).json({
        errCode: -1,
        errMessage: "Error from the server",
      })
    }
  }
module.exports = {
    postBookingAppointment: postBookingAppointment,
    postVerifyBookAppointment: postVerifyBookAppointment,
    getSearch:getSearch
}