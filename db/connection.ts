import { Sequelize } from 'sequelize';

const db = new Sequelize('Curso-ts-node', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    // logging: false

});


export default db;