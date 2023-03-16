const sequelize = require('../utils/connection');
require('../models/Student')
require('../models/Couse')
const main = async() => {
    try{
        await sequelize.sync({ force: true });
        // funciones de create...
        process.exit();
    } catch(error){
        console.log(error);
    }
}

main();