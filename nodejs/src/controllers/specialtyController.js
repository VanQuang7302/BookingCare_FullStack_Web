import specialtyService from '../services/specialtyService'

let createSpecialty = async (req, res) => {
    try {
        let message = await specialtyService.createSpecialty(req.body);
        return res.status(200).json(message);
    } catch (e) {
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server'
        })
    }
}

let getAllSpecialty = async (req, res) => {
    try {
        let message = await specialtyService.getAllSpecialty();
        return res.status(200).json(message);
    } catch (e) {
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server'
        })
    }
}

let getSpecialtyById = async (req, res) => {
    try {
        let message = await specialtyService.getSpecialtyById(req.query.id, req.query.location);
        return res.status(200).json(message);
    } catch (e) {
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server'
        })
    }
}

module.exports = {
    createSpecialty: createSpecialty,
    getAllSpecialty: getAllSpecialty,
    getSpecialtyById: getSpecialtyById,
}
