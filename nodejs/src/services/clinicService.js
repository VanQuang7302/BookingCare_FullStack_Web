import db from '../models/index';
require('dotenv').config();

let createClinic = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.name || !data.descriptionHTML || !data.image || !data.descriptionMarkdown || !data.address) {
                resolve({
                    errCode: 1,
                    errMessage: "Missing required params"
                })
            } else {
                await db.Clinic.create({
                    name: data.name,
                    descriptionHTML: data.descriptionHTML,
                    descriptionMarkdown: data.descriptionMarkdown,
                    image: data.image,
                    address: data.address
                })
                //create a booking record
                resolve({
                    errCode: 0,
                    errMessage: 'Create clinic success'
                });
            }
        } catch (e) {
            reject(e);
        }
    })
}

let getAllClinic = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = await db.Clinic.findAll();
            if (data && data.length > 0) {
                data.map(item => {
                    item.image = new Buffer(item.image, 'base64').toString('binary');
                    return item;
                })
                resolve({
                    errCode: 0,
                    errMessage: 'oke',
                    data: data
                });
            } else {
                resolve({
                    errCode: 1,
                    errMessage: 'data not found'
                });
            }

        } catch (e) {
            reject(e);
        }
    })
}


let getClinicById = (inputId, location) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!inputId) {
                resolve({
                    errCode: 1,
                    errMessage: "Missing required params"
                })
            } else {
                let data = await db.Clinic.findOne({
                    where: {
                        id: inputId
                    },
                    attributes: ['descriptionHTML', 'descriptionMarkdown', 'name', 'address']
                });
                if (data) {
                    let doctorClinic = [];

                    doctorClinic = await db.Doctor_Infor.findAll({
                        where: {
                            clinicId: inputId,
                        },
                        attributes: ['doctorId', 'provinceId'],
                    })

                    data.doctorClinic = doctorClinic;
                } else {
                    data = {}
                }

                resolve({
                    errCode: 0,
                    data: data
                });
            }

        } catch (e) {
            reject(e);
        }
    })
}

module.exports = {
    createClinic: createClinic,
    getAllClinic: getAllClinic,
    getClinicById: getClinicById
}
