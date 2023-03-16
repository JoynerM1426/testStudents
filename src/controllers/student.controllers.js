const catchError = require('../utils/catchError');
const student = require('../models/student');
const Course = require('../models/Couse');
const Student = require('../models/student');

const getAll = catchError(async(req, res) => {
    const results = await student.findAll({include: [Course]});
    return res.json(results);
});

const create = catchError(async(req, res) => {
    const result = await student.create(req.body);
    return res.status(201).json(result);
});

const getOne = catchError(async(req, res) => {
    const { id } = req.params;
    const result = await student.findByPk(id);
    if(!result) return res.sendStatus(404);
    return res.json(result);
});

const remove = catchError(async(req, res) => {
    const { id } = req.params;
    await student.destroy({ where: {id} });
    return res.sendStatus(204);
});

const update = catchError(async(req, res) => {
    const { id } = req.params;
    const result = await student.update(
        req.body,
        { where: {id}, returning: true }
    );
    if(result[0] === 0) return res.sendStatus(404);
    return res.json(result[1][0]);
});

const setStudentsCourses = catchError(async(res,req) => {
    const {id}= req.params;
    const student = await Student.findByPk(id)
    await student.setCourses (req.body);
const courses = await student.getCourses();
return res.json(courses)
})

module.exports = {
    getAll,
    create,
    getOne,
    remove,
    update,
    setStudentsCourses
}