import db from '../models/index';
require('dotenv').config();

let createSpecialty = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.name || !data.descriptionHTML || !data.image || !data.descriptionMarkdown) {
                resolve({
                    errCode: 1,
                    errMessage: "Missing required params"
                })
            } else {
                await db.Specialty.create({
                    name: data.name,
                    descriptionHTML: data.descriptionHTML,
                    descriptionMarkdown: data.descriptionMarkdown,
                    image: data.image
                })
                //create a booking record
                resolve({
                    errCode: 0,
                    errMessage: 'Create specialty success'
                });
            }
        } catch (e) {
            reject(e);
        }
    })
}

let getAllSpecialty = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = await db.Specialty.findAll();
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


let getSpecialtyById = (inputId, location) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!inputId || !location) {
                resolve({
                    errCode: 1,
                    errMessage: "Missing required params"
                })
            } else {
                //let data = {};
                let data = await db.Specialty.findOne({
                    where: {
                        id: inputId
                    },
                    attributes: ['descriptionHTML', 'descriptionMarkdown']
                });

                if (data) {
                    let doctorSpecialty = [];
                    if (location === 'ALL') {
                        doctorSpecialty = await db.Doctor_Infor.findAll({
                            where: { specialtyId: inputId },
                            attributes: ['doctorId', 'provinceId'],
                        })
                    } else {
                        doctorSpecialty = await db.Doctor_Infor.findAll({
                            where: {
                                specialtyId: inputId,
                                provinceId: location,
                            },
                            attributes: ['doctorId', 'provinceId'],
                        })
                    }

                    data.doctorSpecialty = doctorSpecialty;
                } else {
                    data = {}
                }

                resolve({
                    errCode: 0,
                    data
                });
            }

        } catch (e) {
            reject(e);
        }
    })
}

let editSpecialty = (id, data) => {
    console.log(id, data)
    return new Promise(async (resolve, reject) => {
        try {
            if (
                !data.name ||
                !data.image ||
                !data.descriptionHTML ||
                !data.descriptionMarkdown
            ) {
                resolve({
                    errCode: 1,
                    errMessage: "Missing parameter",
                })
            } else {
                let specialty = await db.Specialty.findOne({
                    where: {
                        id: id,
                    },
                    raw: false,
                })
                console.log("Tim ra specialty: ", specialty)
                specialty.image = data.image
                specialty.name = data.name
                specialty.descriptionHTML = data.descriptionHTML
                specialty.descriptionMarkdown = data.descriptionMarkdown

                await specialty.save()

                resolve({
                    errCode: 0,
                    errMessage: "OK",
                })
            }
        } catch (error) {
            reject(error)
        }
    })
}

module.exports = {
    createSpecialty: createSpecialty,
    getAllSpecialty: getAllSpecialty,
    getSpecialtyById: getSpecialtyById,
    editSpecialty: editSpecialty
}
