const express = require("express");
const router = express.Router();
const controller = require("../../controller");

router.post("/add", async function(req, res) {
    try {
        await controller.organizations.createOrganization(req.body);
        // if above function ran, we're fine
        res.status(200).json({message: "Organization created."}); 
    } catch (e) {
        console.log(e);
        // request generated an error, reply with 400 (Bad request)
        res.status(400).json(e);
    }
})

module.exports = router;