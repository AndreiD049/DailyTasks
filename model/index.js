const db = require("../db/models");

class User {
    _modelName = "users";
    /*  Get's a user from database by his ID 
        If the user cannot be found, @dbUserModel is set to null 
    */
    constructor(id) {
        this.id = id;
        this.dbUserModel = null;
        this.teamModel = null;
        this.tasks = []
    }

    fetchUser() {
        // Check if connection is ok
        return db.sequelize.authenticate()
                // Connection is ok
                .then(() => {
                    return db[this._modelName].findByPk(this.id, {
                        attributes: ["first_name", "last_name"],
                        include: [db["teams"]]
                    });
                })
                .then(val => {
                    return this.dbUserModel = val;
                })
                // error occured durring execution
                .catch((e) => {
                    console.log(e);
                    this.dbUserModel = null;
                })
    }
}

class Task {

}

class CheckList {

}

class CheckListItem {

}

let u = new User(1);
u.fetchUser()
    .then(() => {
        console.log(u.dbUserModel.team);
    });