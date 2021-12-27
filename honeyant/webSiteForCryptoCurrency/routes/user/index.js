const express = require('express');
const router = express.Router();
const userController = require('./user.controller');


router.get('/signup/agree',userController.signUp);
router.post('/signup/idCheck',userController.idCheck);
router.post('/signup/form',userController.signupForm);
router.post('/signup/success',userController.signSuccess);
router.post('/findpw/success',userController.pwSuccess);
router.get('/findpw',userController.findPw);
router.get('/info',userController.info);
router.post('/loginCheck',userController.loginCheck);
router.get('/logout',userController.logout);
router.get('/',userController.login);

module.exports=router;
