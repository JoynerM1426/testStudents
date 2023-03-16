const catchError = require('../utils/catchError');
const Couser = require('../models/Couse');
const Student = require('../models/student');

const getAll = catchError(async(req, res) => {
    const results = await Couser.findAll({include: [Student]});
    return res.json(results);
});

const create = catchError(async(req, res) => {
    const result = await Couser.create(req.body);
    return res.status(201).json(result);
});

const getOne = catchError(async(req, res) => {
    const { id } = req.params;
    const result = await Couser.findByPk(id);
    if(!result) return res.sendStatus(404);
    return res.json(result);
});

const remove = catchError(async(req, res) => {
    const { id } = req.params;
    await Couser.destroy({ where: {id} });
    return res.sendStatus(204);
});

const update = catchError(async(req, res) => {
    const { id } = req.params;
    const result = await Couser.update(
        req.body,
        { where: {id}, returning: true }
    );
    if(result[0] === 0) return res.sendStatus(404);
    return res.json(result[1][0]);
});

module.exports = {
    getAll,
    create,
    getOne,
    remove,
    update
}