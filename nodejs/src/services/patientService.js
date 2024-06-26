import db from '../models/index';
require('dotenv').config();
import emailService from './emailService';
import { v4 as uuidv4 } from 'uuid';
const Sequelize = require("sequelize")
const Op = Sequelize.Op

let buildUrlEmail = (doctorId, token) => {
    let result = `${process.env.URL_REACT}/verify-booking?token=${token}&doctorId=${doctorId}`
    return result;
}

let postBookAppointment = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.email) {
                resolve({
                    errCode: 1,
                    errMessage: "Missing required params"
                })
            } else {
                let token = uuidv4(); // ⇨ '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'
                await emailService.sendSimpleEmail({
                    receiverEmail: data.email,
                    patientName: data.fullName,
                    time: data.timeString,
                    doctorName: data.doctorName,
                    language: data.language,
                    redirectLink: buildUrlEmail(data.doctorId, token)
                    // receiverEmail: data.email,
                    // patientName: 'Benh nhan cua quan beo',
                    // time: '10am 12am Thu 7 9/3/2024',
                    // doctorName: "quangbeo",
                    //redirectLink: 'https://bookingcare.vn/'
                })

                // await emailService.sendSimpleEmail(data.email)

                let user = await db.User.findOrCreate({
                    where: { email: data.email },
                    defaults: {
                        email: data.email,
                        roleId: 'R3',
                        gender: data.selectedGender,
                        address: data.address,
                        firstName: data.fullName
                    },
                });


                if (user && user[0]) {
                    await db.Booking.findOrCreate({
                        where: { patientId: user[0].id },
                        defaults: {
                            statusId: 'S1',
                            doctorId: data.doctorId,
                            patientId: user[0].id,
                            date: data.date,
                            timeType: data.timeType,
                            token: token
                        }
                    })
                }
                console.log('****************** check user', user[0])
                //create a booking record
                resolve({
                    errCode: 0,
                    errMessage: 'Save infor patient success'
                });
            }
        } catch (e) {
            reject(e);
        }
    })
}

let postVerifyBookAppointment = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.token || !data.doctorId) {
                resolve({
                    errCode: 1,
                    errMessage: "Missing required params"
                })
            } else {
                let appointment = await db.Booking.findOne({
                    where: {
                        doctorId: data.doctorId,
                        token: data.token,
                        statusId: 'S1'
                    },
                    raw: false
                })

                if (appointment) {
                    appointment.statusId = 'S2';
                    await appointment.save();
                    resolve({
                        errCode: 0,
                        errMessage: 'Update the appointment success'
                    });
                } else {
                    resolve({
                        errCode: 2,
                        errMessage: 'Appointment has been activated or does not exist'
                    });
                }

            }
        } catch (e) {
            reject(e);
        }
    })
}

const getSearch = (text) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!text) {
                resolve({
                    errCode: 1,
                    errMessage: "Missing required parameters",
                })
            } else {
                let result = {}
                let doctors = await db.User.findAll({
                    where: {
                        [Op.or]: [
                            { firstName: { [Op.like]: `%${text}%` } },
                            { lastName: { [Op.like]: `%${text}%` } }
                        ],
                        roleId: "R2",
                    },
                    attributes: ["id", "firstName", "lastName", "roleId"],
                    raw: true,
                })
                // doctors = doctors.filter(item => item.roleId === 'R2')
                let clinics = await db.Clinic.findAll({
                    where: {
                        name: { [Op.like]: `%${text}%` },
                    },
                    attributes: ["id", "name"],
                    raw: true,
                })
                let specialtys = await db.Specialty.findAll({
                    where: {
                        name: { [Op.like]: `%${text}%` },
                    },
                    attributes: ["id", "name"],
                    raw: true,
                })

                result.specialty = specialtys
                result.doctors = doctors
                result.clinics = clinics
                resolve({
                    errCode: 0,
                    errMessage: "OK",
                    result,
                })

                // let appointment = await db.Clinic.findAll({
                //   where: {
                //     doctorId: data.doctorId,
                //     token: data.token,
                //     statusId: "S1",
                //   },
                //   raw: false,
                // })

                // if (appointment) {
                //   appointment.statusId = "S2"
                //   await appointment.save()

                // } else {
                //   resolve({
                //     errCode: 2,
                //     errMessage: "Appointment has been activeted or does not exist!",
                //   })
                // }
            }
        } catch (error) {
            reject(error)
        }
    })
}

module.exports = {
    postBookAppointment: postBookAppointment,
    postVerifyBookAppointment: postVerifyBookAppointment,
    getSearch: getSearch
}