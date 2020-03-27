const sequelize = require("sequelize");
const { Op, DataTypes } = sequelize;
const db = require("../db/models");
const userController = require("./usersController");

class DailyTasksController
{
    constructor(db) {
        this.db = db;
        this.users = new userController(db);
    }
}

const controller = new DailyTasksController(db); 

module.exports = controller;
