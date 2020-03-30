const express = require('express');
const router = express.Router();
const controller = require("../../controller");

router.get('/add', function(req, res) {
  res.redirect('/');
})

router.post("/add", async function(req, res) {
  try {
    await controller.users.createUser(req.body);
    res.status(200).json({message: "User created successfully"});
  } catch (e) {
    res.status(403).json({
      error: e.message, 
      message: "Failed to create the user"
    });
  }
});

/* 
API call to check if user is logged in.
Returns status 200 on success.
Returns status 200 on failure
*/
router.post("/check/login", async function(req, res) {
  if (req.user) {
    res.status(200).json(req.user);
  } else {
    res.status(200).json({error: "User session not found"});
  }
});

router.post("/logout", function(req, res) {
  if (req.session && req.user) {
    // destroy the session
    req.session.destroy(function(err) {
      if (err) {
        res.status(500).json({error: err.message});
      } else {
        res.status(200).end();
      }
    });
  } else {
    res.status(500).json({error: "User not logged in"});
  } 
});

router.get("/current", async function(req, res) {
  if (!req.user) {
    res.status(401).end();
  } else {
    res.status(200).json(req.user);
  }
})

module.exports = router;
