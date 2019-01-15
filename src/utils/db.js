const Sequelize = require('sequelize');

const CONNECTION_STRING = process.env.DATABASE || "postgres://postgres:secret@localhost:5432/lwhh";

const db = new Sequelize(CONNECTION_STRING);

const User = db.define('users',{
    name:Sequelize.TEXT,
    email:Sequelize.TEXT,
    password:Sequelize.TEXT
});

const Direction = db.define('directions',{
    destination:Sequelize.TEXT,
    hash:Sequelize.TEXT
});

module.exports = {
    db,User,Direction
}