const Student = require("./Student");
const Course = require("./Couse");


Student.belongsToMany(Course, { through: 'StudentCourse' });
Course.belongsToMany(Student, { through: 'StudentCourse' });
