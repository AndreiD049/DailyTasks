
class OrganizationController {
    constructor(db) {
        this.db = db;
        this.model = db.organizations;
    }


    // create an organization based on the supplied data
    async createOrganization(data) {
       let transaction;
       // try to insert the org. if error, abort creation
       try {
           // create a transaction
           transaction = await this.db.sequelize.transaction();
           // create the organization in the database
           const org = await this.model.create(data, {transaction}); // same as {transaction: transaction}
           // all good, commit
           await transaction.commit();
           return org;
       } catch (e) {
           // error occured, rollback and throw it further
           transaction.rollback();
           throw e;
       }
    }
}

module.exports = OrganizationController;