import React from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const TaskCard = ({ task, moveTask, editTask, deleteTask }) => (
  <Box sx={{ marginBottom: '1rem', border: '1px solid #000', borderRadius: '4px', padding: '0.5rem', bgcolor: task.priority === 'high' ? '#00f8ff' : task.priority === 'low' ? '#31ff00e0' : task.priority === 'medium' ? '#edff00e0' : '' }}>
    <Typography>{task.name}</Typography>
    <Typography sx={task.priority === "high" ? { color: 'red' } : task.priority === "low" ? { color: 'green' } : task.priority === "medium" ? { color: 'blue' } : ""}>{task.priority}</Typography>
    <Typography>{task.deadline}</Typography>
    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
      {task.stage > 0 && (
        <IconButton onClick={() => moveTask(task.id, -1)} color="secondary">
          <ArrowBackIcon />
        </IconButton>
      )}
      {task.stage < 3 && (
        <IconButton onClick={() => moveTask(task.id, 1)} color="primary">
          <ArrowForwardIcon />
        </IconButton>
      )}
      <IconButton onClick={() => editTask(task.id)} color="primary">
        <EditIcon />
      </IconButton>
      <IconButton onClick={() => deleteTask(task.id)} color="error">
        <DeleteIcon />
      </IconButton>
    </Box>
  </Box>
);

export default TaskCard;
