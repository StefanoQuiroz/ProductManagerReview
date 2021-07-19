const express = require('express');
const router = express();
const {findUser, findOneUser, createUser, updateUser, deleteUser, login} = require('../controllers/users.controllers');
const { authenticate } = require('../config/jwt.config');

router.get(`/user`, authenticate, findUser);
router.get(`/user/:id`, authenticate, findOneUser);
router.post(`/user/create`, createUser);
router.put(`/user/update/:id`, authenticate, updateUser);
router.delete(`/user/delete/:id`, authenticate, deleteUser);
router.post(`/login`, login);

module.exports = router;

