const ToDoModel = require('../Models/ToDoModel');


module.exports.getTodos = async (req, res) => {
    try {
        const todos = await ToDoModel.find();
        res.status(200).json(todos);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


module.exports.saveTodo = async (req, res) => {
    const { todo } = req.body;
    try {
        const newTodo = new ToDoModel({ todo });
        await newTodo.save();
        res.status(201).json(newTodo);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

module.exports.updateTodo = async (req, res) => {
    const { todo } = req.body;
    const { id } = req.params;
    try {
        await ToDoModel.findByIdAndUpdate(id, {todo});
        res.send("Updated success");
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

module.exports.deleteTodo = async (req, res) => {
    const { id } = req.params;
    try {
        await ToDoModel.findByIdAndDelete(id);
        res.send("Delete success");
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

