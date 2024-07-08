import React from 'react';
import { Box, Button, Modal, Typography, TextField, Select, MenuItem, InputLabel, FormControl } from '@mui/material';

const TaskModal = ({ open, onClose, onSubmit, taskDetails, handleTaskDetails, error }) => (
  <Modal open={open} onClose={onClose} aria-labelledby="modal-title" aria-describedby="modal-description">
    <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', border: '2px solid #000', boxShadow: 24, p: 4 }}>
      <Typography id="modal-title" variant="h6" component="h2">
        {taskDetails.id ? 'Update Task' : 'Create Task'}
      </Typography>
      <TextField fullWidth size="small" label="Task Name" name="name" value={taskDetails.name} onChange={handleTaskDetails} margin="normal" />
      <FormControl fullWidth margin="normal" size="small">
        <InputLabel id="priority-label">Priority</InputLabel>
        <Select labelId="priority-label" size="small" name="priority" value={taskDetails.priority} onChange={handleTaskDetails}>
          <MenuItem value=""><em>None</em></MenuItem>
          <MenuItem value="high">High</MenuItem>
          <MenuItem value="medium">Medium</MenuItem>
          <MenuItem value="low">Low</MenuItem>
        </Select>
      </FormControl>
      <TextField fullWidth size="small" type="date" name="deadline" value={taskDetails.deadline} onChange={handleTaskDetails} margin="normal" InputLabelProps={{ shrink: true }} />
      {error && <Typography color="error">{error}</Typography>}
      <Button onClick={onSubmit} variant="contained" color="primary" sx={{ mt: 2 }}>
        {taskDetails.id ? 'Update Task' : 'Create Task'}
      </Button>
    </Box>
  </Modal>
);

export default TaskModal;
