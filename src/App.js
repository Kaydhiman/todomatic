import React, { useState } from 'react';
import Todo from './components/Todo';
import Form from './components/Form';
import FilterButton from './components/FilterButton';
import { nanoid } from 'nanoid';

function App(props) {

  const [tasks, setTask] = useState(props.tasks);

  const toggleTaskCompleted = id => {
    const updatedTasks = tasks.map(task => {
      if(id === task.id) {
        return { ...task, completed: !task.completed }
      }

      return task;
    });

    setTask(updatedTasks);
  }

  const deleteTask = id => {
    const deleteTasks = tasks.filter(task => id !== task.id);

    setTask(deleteTasks);
  }

  const editTask = (id, newName) => {
    const newTaskList = tasks.map(task => {
      if(id === task.id) {
        return { ...task, name: newName }
      }

      return task;
    });

    setTask(newTaskList);
  }

  const taskList = tasks.map(task => (
    <Todo 
      name={task.name}
      id={task.id}
      completed={task.completed}
      key={task.id}
      toggleTaskCompleted={toggleTaskCompleted}
      deleteTask={deleteTask}
      editTask={editTask}
    />
  ));

  const taskNoun = taskList.length !== 1 ? 'tasks' : 'task';
  const headingText = `${taskList.length} ${taskNoun} remaining`;

  const addTask = name => {
    const newTask = { name: name, completed: false, id: 'todo-' + nanoid() };
    setTask([...tasks, newTask]);
  }

  return (
    <div className="todoapp stack-large">
      <h1>TodoMatic</h1>

      <Form addTask={addTask} />

      <div className="filters btn-group stack-exception">
        <FilterButton />
        <FilterButton />
        <FilterButton />
      </div>
      <h2 id="list-heading">
        {headingText}
      </h2>
      <ul
        role="list"
        className="todo-list stack-large stack-exception"
        aria-labelledby="list-heading"
      >
      {taskList}
      </ul>
    </div>
  );
}

export default App;
