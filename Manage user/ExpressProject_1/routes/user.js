const express = require('express');
const router = express.Router();
const userController = require('../controller/userController')

router.use('/list',userController.getUserList)


router.get('/add', userController.showAddUserForm);


router.post('/add', userController.addUser);


router.put('/update/:_id', userController.editUser);


router.delete('/delete/:_id', userController.deleteUser);


module.exports = router;