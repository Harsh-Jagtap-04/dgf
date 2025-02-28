// components/AssignCourseModal.jsx
import React, { useState } from 'react';
import {
  Modal,
  Box,
  Typography,
  TextField,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  ListItemText,
  OutlinedInput,
  FormGroup,
  FormControlLabel,
  Radio,
  RadioGroup,
  IconButton,
  InputAdornment,
  TextareaAutosize
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';

const AssignCourseModal = ({ open, onClose }) => {
  // State for form fields
  const [selectedCourse, setSelectedCourse] = useState('');
  const [learningType, setLearningType] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [courses, setCourses] = useState([
    { 
      id: 1, 
      name: 'AWS', 
      mentors: [], 
      completionDate: '', 
      courseTypes: [] 
    },
    { 
      id: 2, 
      name: 'Communication', 
      mentors: [], 
      completionDate: '', 
      courseTypes: [] 
    }
  ]);
  const [specialComments, setSpecialComments] = useState('');

  // Available options
  const mentorOptions = ['Mentor 1', 'Mentor 2', 'Mentor 3', 'Mentor 4'];
  const courseTypeOptions = ['Type 1', 'Type 2', 'Type 3', 'Type 4'];
  const learningTypeOptions = ['Full Stack', 'Upskill', 'Cross Skill'];

  // Handle mentor selection for a specific course
  const handleMentorChange = (courseId, selectedMentors) => {
    setCourses(courses.map(course => 
      course.id === courseId ? { ...course, mentors: selectedMentors } : course
    ));
  };

  // Handle course type selection for a specific course
  const handleCourseTypeChange = (courseId, selectedTypes) => {
    setCourses(courses.map(course => 
      course.id === courseId ? { ...course, courseTypes: selectedTypes } : course
    ));
  };

  // Handle completion date change
  const handleCompletionDateChange = (courseId, date) => {
    setCourses(courses.map(course => 
      course.id === courseId ? { ...course, completionDate: date } : course
    ));
  };

  // Handle row removal
  const handleRemoveRow = (courseId) => {
    setCourses(courses.filter(course => course.id !== courseId));
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="assign-course-modal"
      aria-describedby="assign-course-modal-description"
    >
      <Box sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 800,
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
        borderRadius: 2,
        maxHeight: '90vh',
        overflowY: 'auto'
      }}>
        <Typography variant="h6" sx={{ mb: 3 }}>
          Assign Course to Learners
        </Typography>

        <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
          <FormControl fullWidth>
            <Typography component="label" htmlFor="select-course" sx={{ mb: 1, display: 'block' }}>
              Select Course <span style={{ color: 'red' }}>*</span>
            </Typography>
            <TextField
              id="select-course"
              placeholder="Search course"
              fullWidth
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
              size="small"
            />
          </FormControl>

          <FormControl fullWidth>
            <Typography component="label" htmlFor="learning-type" sx={{ mb: 1, display: 'block' }}>
              Learning Type
            </Typography>
            <RadioGroup
              row
              name="learning-type"
              value={learningType}
              onChange={(e) => setLearningType(e.target.value)}
            >
              {learningTypeOptions.map((type) => (
                <FormControlLabel 
                  key={type} 
                  value={type} 
                  control={<Radio />} 
                  label={type} 
                />
              ))}
            </RadioGroup>
          </FormControl>
        </Box>

        <TableContainer component={Paper} sx={{ mb: 3 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Course Name</TableCell>
                <TableCell>Mentor</TableCell>
                <TableCell>Completion Date</TableCell>
                <TableCell>Course Type</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {courses.map((course) => (
                <TableRow key={course.id}>
                  <TableCell>{course.name}</TableCell>
                  <TableCell>
                    <FormControl fullWidth size="small">
                      <Select
                        multiple
                        displayEmpty
                        value={course.mentors}
                        onChange={(e) => handleMentorChange(course.id, e.target.value)}
                        renderValue={(selected) => {
                          if (selected.length === 0) {
                            return 'Select';
                          }
                          return selected.join(', ');
                        }}
                        input={<OutlinedInput />}
                        MenuProps={{
                          PaperProps: {
                            style: {
                              maxHeight: 224,
                              width: 250,
                            },
                          },
                        }}
                      >
                        {mentorOptions.map((mentor) => (
                          <MenuItem key={mentor} value={mentor}>
                            <Checkbox checked={course.mentors.indexOf(mentor) > -1} />
                            <ListItemText primary={mentor} />
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </TableCell>
                  <TableCell>
                    <TextField
                      type="date"
                      size="small"
                      value={course.completionDate}
                      onChange={(e) => handleCompletionDateChange(course.id, e.target.value)}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <CalendarTodayIcon fontSize="small" />
                          </InputAdornment>
                        ),
                      }}
                      sx={{ width: '100%' }}
                    />
                  </TableCell>
                  <TableCell>
                    <FormControl fullWidth size="small">
                      <Select
                        multiple
                        displayEmpty
                        value={course.courseTypes}
                        onChange={(e) => handleCourseTypeChange(course.id, e.target.value)}
                        renderValue={(selected) => {
                          if (selected.length === 0) {
                            return 'Select';
                          }
                          return selected.join(', ');
                        }}
                        input={<OutlinedInput />}
                        MenuProps={{
                          PaperProps: {
                            style: {
                              maxHeight: 224,
                              width: 250,
                            },
                          },
                        }}
                      >
                        {courseTypeOptions.map((type) => (
                          <MenuItem key={type} value={type}>
                            <Checkbox checked={course.courseTypes.indexOf(type) > -1} />
                            <ListItemText primary={type} />
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleRemoveRow(course.id)}>
                      <CloseIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Box sx={{ mb: 3 }}>
          <Typography component="label" htmlFor="special-comments" sx={{ mb: 1, display: 'block' }}>
            Add Special Comments
          </Typography>
          <TextareaAutosize
            id="special-comments"
            minRows={4}
            style={{ 
              width: '100%', 
              padding: '8px', 
              borderRadius: '4px', 
              borderColor: '#ccc' 
            }}
            value={specialComments}
            onChange={(e) => setSpecialComments(e.target.value)}
          />
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
          <Button variant="outlined" onClick={onClose}>Cancel</Button>
          <Button variant="contained" color="primary">Assign</Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default AssignCourseModal;