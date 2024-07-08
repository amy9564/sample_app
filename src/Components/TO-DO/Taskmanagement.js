import React, { useState, useCallback, useMemo } from 'react';
import { Box, Button, Typography, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { v4 as uuidv4 } from 'uuid';
import useToggle from '../../Util/Hooks/useToggle';
import TaskModal from './Utils/TaskModal';
import ConfirmDialog from '../../Util/Notification/ConfirmDialog';
import TaskCard from './Utils/TaskCard';

const Taskmanagement = ({ tasks, setTasks }) => {
  const [taskDetails, setTaskDetails] = useState({ name: "", priority: "", deadline: "" });
  const [editTaskId, setEditTaskId] = useState(null);
  const [error, setError] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);
  const [state, toggle] = useToggle();

  const handleTaskDetails = useCallback((e) => {
    const { name, value } = e.target;
    setTaskDetails(prevDetails => ({ ...prevDetails, [name]: value }));
  }, []);

  const handleTask = useCallback(() => {
    const { name, priority, deadline } = taskDetails;
    if (!name || !priority || !deadline) {
      setError("All fields are required.");
      return;
    }
    setError("");
    if (editTaskId !== null) {
      setTasks(prevTasks => prevTasks.map(task =>
        task.id === editTaskId ? { ...taskDetails, id: task.id, stage: task.stage } : task
      ));
      setEditTaskId(null);
    } else {
      setTasks(prevTasks => [...prevTasks, { ...taskDetails, id: uuidv4(), stage: 0 }]);
    }
    setTaskDetails({ name: "", priority: "", deadline: "" });
    toggle();
  }, [taskDetails, editTaskId, setTasks, toggle]);

  const moveTask = useCallback((taskId, direction) => {
    setTasks(prevTasks => prevTasks.map(task => {
      if (task.id === taskId) {
        const newStage = task.stage + direction;
        return { ...task, stage: newStage >= 0 && newStage <= 3 ? newStage : task.stage };
      }
      return task;
    }));
  }, [setTasks]);

  const editTask = useCallback((taskId) => {
    const task = tasks.find(task => task.id === taskId);
    setTaskDetails(task);
    setEditTaskId(taskId);
    toggle();
  }, [tasks, toggle]);
/**
 * To delete selected task based on the id.
 */
  const deleteTask = useCallback((taskId) => {
    setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
  }, [setTasks]);

  const onDragStart = useCallback(() => {
    setIsDragging(true);
  }, []);

  const onDragEnd = useCallback((result) => {
    setIsDragging(false);
    const { source, destination, draggableId } = result;
    if (!destination) return;

    if (destination.droppableId === "trash") {
      setTaskToDelete(draggableId);
      setIsConfirmOpen(true);
      return;
    }

    const sourceStage = parseInt(source.droppableId, 10);
    const destinationStage = parseInt(destination.droppableId, 10);

    if (sourceStage === destinationStage) {
      const stageTasks = tasks.filter(task => task.stage === sourceStage);
      const [movedTask] = stageTasks.splice(source.index, 1);
      stageTasks.splice(destination.index, 0, movedTask);

      const updatedTasks = tasks.map(task => {
        if (task.stage === sourceStage) {
          return stageTasks.shift();
        }
        return task;
      });

      setTasks(updatedTasks);
    } else {
      const sourceTasks = tasks.filter(task => task.stage === sourceStage);
      const destinationTasks = tasks.filter(task => task.stage === destinationStage);

      const [movedTask] = sourceTasks.splice(source.index, 1);
      movedTask.stage = destinationStage;
      destinationTasks.splice(destination.index, 0, movedTask);

      const updatedTasks = tasks.map(task => {
        if (task.stage === sourceStage) {
          return sourceTasks.shift() || task;
        } else if (task.stage === destinationStage) {
          return destinationTasks.shift() || task;
        }
        return task;
      });

      setTasks(updatedTasks);
    }
  }, [tasks, setTasks]);

  const confirmDeleteTask = useCallback(() => {
    deleteTask(taskToDelete);
    setTaskToDelete(null);
    setIsConfirmOpen(false);
  }, [deleteTask, taskToDelete]);

  const cancelDeleteTask = useCallback(() => {
    setTaskToDelete(null);
    setIsConfirmOpen(false);
  }, []);

  const stages = useMemo(() => ["Backlog", "To Do", "Ongoing", "Done"], []);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
      <Box sx={{ padding: 2 }}>
        <Button variant="contained" color="primary" onClick={toggle}>Create Task</Button>
      </Box>
      <TaskModal
        open={state}
        onClose={toggle}
        onSubmit={handleTask}
        taskDetails={taskDetails}
        handleTaskDetails={handleTaskDetails}
        error={error}
      />
      <DragDropContext onDragStart={onDragStart} onDragEnd={onDragEnd}>
        <Box sx={{ display: 'flex', justifyContent: 'space-around', padding: '2rem' }}>
          {stages.map((stage, index) => (
            <Droppable key={index} droppableId={index.toString()}>
              {(provided) => (
                <Box ref={provided.innerRef} {...provided.droppableProps} sx={{ border: '1px solid #ccc', borderRadius: '1rem', padding: '1rem', minWidth: '12rem', minHeight: '20rem' }}>
                  <Typography variant="h6">{stage}</Typography>
                  {tasks.filter(task => task.stage === index).map((task, i) => (
                    <Draggable key={task.id} draggableId={task.id} index={i}>
                      {(provided) => (
                        <Box ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                          <TaskCard task={task} moveTask={moveTask} editTask={editTask} deleteTask={deleteTask} />
                        </Box>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </Box>
              )}
            </Droppable>
          ))}
        </Box>
        <Droppable droppableId="trash">
          {(provided) => (
            <Box
              ref={provided.innerRef}
              {...provided.droppableProps}
              sx={{
                position: 'fixed',
                bottom: 10,
                right: 10,
                p: 2,
                border: isDragging ? '1px solid #ddd' : 'none',
                borderRadius: 1,
                backgroundColor: isDragging ? '#f9f9f9' : 'transparent',
                display: isDragging ? 'flex' : 'none',
                flexDirection: 'column',
                alignItems: 'center'
              }}
              style={{ display: 'flex' }}
            >
              {isDragging &&
                <>
                  <Typography>Drag here to delete</Typography>
                  <IconButton>
                    <DeleteIcon color='error' />
                  </IconButton>
                </>}
              {provided.placeholder}
            </Box>
          )}
        </Droppable>
      </DragDropContext>
      <ConfirmDialog open={isConfirmOpen} onCancel={cancelDeleteTask} onConfirm={confirmDeleteTask} />
    </Box>
  );
};

export default Taskmanagement;
