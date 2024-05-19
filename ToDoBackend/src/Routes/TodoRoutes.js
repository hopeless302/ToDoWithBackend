const express = require('express');
const router = express.Router();
const { getTodos, saveTodo, updateTodo, deleteTodo } = require('../controller/Todocontroller');

router.get('/get',getTodos);
router.post('/save',saveTodo);
router.put('/update/:id',updateTodo);
router.delete('/delete/:id',deleteTodo);

module.exports = router;