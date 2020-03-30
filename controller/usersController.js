const bcrypt = require("bcryptjs");

class UserController
{
    constructor(db) {
        this.db = db;
        this.model = db.users;

        this.checkUserPassword = this.checkUserPassword.bind(this);
        this.deserializeUser = this.deserializeUser.bind(this);
    }

    async getUserCreds(username) {
        return await this.db.user_credentials.findOne({
            where: {
                login: username
            }
        })
    }

    async getUserById(id) {
        try {
            let user = await this.model.findByPk(id, {
                raw: true,
                include: [{
                    model: this.db.user_credentials,
                    as: "user_credential",
                    attributes: [],
                }],
                attributes: {
                    include: ["user_credential.login"]
                },
            });
            return user;
        } catch (e) {
            return null;
        }
    }

    // Function used by passport js
    async checkUserPassword(username, password, cb) {
        try {
            let user_creds = await this.getUserCreds(username);
            let user = await this.getUserById(user_creds.user_id);
            if (!user_creds || !user) {
                // there is no user
                return cb(null, false);
            }
            if (!(await this.checkPassword(password, user_creds.password))) {
                // password is incorrect
                console.log("password is incorrect");
                return cb(null, false);
            }
            return cb(null, user);
        } catch (e) {
            console.log("error occured " + e.message);
            return cb(e, false);
        }
    }

    serializeUser(user, cb) {
        cb(null, user.id);
    }

    async deserializeUser(id, cb) {
        let user = await this.model.findByPk(id, {
            raw: true,
            include: [{
                model: this.db.user_credentials,
                as: "user_credential",
                attributes: [],
            }],
            attributes: {
                include: ["user_credential.login"]
            },
        });
        cb(null, user);
    }

    async createUser(options) {
        // create transaction
        const t = await this.db.sequelize.transaction();

        try {
            const user = await this.model.create(options, { transaction: t });
            // add user id to the form data
            options.user_id = user.id;
            this.checkPasswordIntegrity(options.password, options.r_password);
            // hash the password
            options.password = await this.getHashedPassword(options.password);
            const credentuals = await this.db.user_credentials.create(options, { transaction: t });
            // all created successfully, commit
            await t.commit();
        } catch (e) {
            console.log(`Error catched ${e}`);
            t.rollback();
            throw e;
        }
    }

    // gets a password and returns a hash
    async getHashedPassword(password) {
        return bcrypt.genSalt(10)
            .then(async res => { 
                return await bcrypt.hash(password, res)
            });
    }

    /* Just to be sure that user didn't find a way to break client form validation */
    checkPasswordIntegrity(password, repeated_password) {
        if (password !== repeated_password) {
            throw new Error("Passwords are not the same");
        } else {
            return true;
        }
    }

    checkPassword(password, hash) {
        return bcrypt.compare(password, hash);
    }
}

module.exports = UserController;