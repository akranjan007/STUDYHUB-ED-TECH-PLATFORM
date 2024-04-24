const express = require('express');
const router = express.Router();

const { capturePayment, verifySignature } = require('../controllers/Payment');
const { auth, isStudent, isAdmin, isInstructor } = require('../middlewares/auth');

//capture payment route
router.post("/capturePayment", auth, isStudent, capturePayment);
//verify signature route
router.post("/verifySignature", verifySignature);



//exporting
module.exports = router;