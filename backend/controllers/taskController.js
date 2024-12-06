const Task = require("../models/Task");

// Create a new task
exports.createTask = async (req, res) => {
  const { title, description, dueDate, priority, user } = req.body;
  try {
    const newTask = new Task({ title, description, dueDate, priority, user });
    await newTask.save();
    res.status(201).json(newTask);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all tasks with pagination
exports.getTasks = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  try {
    const tasks = await Task.find()
      .skip((page - 1) * limit)
      .limit(limit)
      .populate("user");
    res.status(200).json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// In your backend API (controller)
// exports.getTasks = async (req, res) => {
//   try {
//     const tasks = await Task.find().populate("user"); // Get all tasks without pagination
//     res.status(200).json(tasks); // Respond with tasks
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };


//Get a single task by ID
exports.getTaskById = async (req, res) => {
  const { id } = req.params; // Extract task ID from request parameters
  try {
    // Find the task by ID
    const task = await Task.findById(id).populate("user"); // Populate user if needed
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.status(200).json(task);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};





// Update task status
// exports.updateStatus = async (req, res) => {
//   const { taskId, status } = req.body;
//   try {
//     const updatedTask = await Task.findByIdAndUpdate(taskId, { status }, { new: true });
//     res.status(200).json(updatedTask);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// Delete task
exports.deleteTask = async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Task deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Edit task
exports.editTask = async (req, res) => {
  const { title, description, dueDate, priority } = req.body;
  try {
    const updatedTask = await Task.findByIdAndUpdate(req.params.id, {
      title,
      description,
      dueDate,
      priority
    }, { new: true });
    res.status(200).json(updatedTask);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};



//Update task priority


exports.updateTaskPriority = async (req, res) => {
  const { taskId, priority } = req.body;
  try {
    const task = await Task.findByIdAndUpdate(taskId, { priority }, { new: true });
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.status(200).json(task);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// exports.updateTaskStatus = async (req, res) => {
//   const { taskId, status } = req.body;

//   try {
//     // Make sure taskId is valid
//     if (!taskId) {
//       return res.status(400).json({ message: "taskId is required" });
//     }

//     const task = await Task.findByIdAndUpdate(taskId, { status }, { new: true });
    
//     if (!task) {
//       return res.status(404).json({ message: "Task not found" });
//     }

//     res.status(200).json(task);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };


exports.updateTaskStatus = async (req, res) => {
  const { id } = req.params; // Get task ID from URL parameter
  const { status } = req.body; // Get status from request body

  // Validate the status
  if (!["pending", "completed"].includes(status)) {
    return res.status(400).json({ message: "Invalid status" });
  }

  try {
    // Find the task and update its status
    const task = await Task.findByIdAndUpdate(
      id,
      { status },
      { new: true, runValidators: true } // Return updated task
    );

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    // Send the updated task
    res.status(200).json({ message: "Task status updated successfully", task });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

