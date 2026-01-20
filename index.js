const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Mock Database (for hackathon speed)
let users = [];
let projects = [];
let applications = [];

// Sample data
const sampleSkills = [
  'React', 'Node.js', 'Python', 'UI/UX Design', 'Flutter', 'MongoDB',
  'Machine Learning', 'Figma', 'JavaScript', 'Java', 'Swift', 'Kotlin'
];

const sampleProjects = [
  {
    id: 1,
    title: 'EcoTrack - Carbon Footprint App',
    description: 'Building a mobile app to help students track and reduce their carbon footprint',
    skillsNeeded: ['Flutter', 'UI/UX Design', 'Node.js'],
    timeline: '3 months',
    createdBy: 'Priya Sharma',
    college: 'IIT Delhi',
    applications: 5,
    matchPercentage: 85
  },
  {
    id: 2,
    title: 'StudyBuddy - AI Study Planner',
    description: 'AI-powered study scheduler that adapts to your learning patterns',
    skillsNeeded: ['Machine Learning', 'React', 'Python'],
    timeline: '2 months',
    createdBy: 'Arjun Patel',
    college: 'BITS Pilani',
    applications: 8,
    matchPercentage: 92
  }
];

// Routes
app.get('/api/health', (req, res) => {
  res.json({ message: 'SkillSync API is running!' });
});

// Auth Routes
app.post('/api/auth/signup', (req, res) => {
  const { name, email, college, skills } = req.body;
  
  const user = {
    id: users.length + 1,
    name,
    email,
    college,
    skills: skills || [],
    projects: [],
    trustScore: 0,
    createdAt: new Date()
  };
  
  users.push(user);
  res.json({ success: true, user, token: 'mock-jwt-token' });
});

app.post('/api/auth/login', (req, res) => {
  const { email } = req.body;
  const user = users.find(u => u.email === email);
  
  if (user) {
    res.json({ success: true, user, token: 'mock-jwt-token' });
  } else {
    res.status(401).json({ success: false, message: 'User not found' });
  }
});

// Projects Routes
app.get('/api/projects', (req, res) => {
  res.json({ projects: sampleProjects });
});

app.post('/api/projects', (req, res) => {
  const { title, description, skillsNeeded, timeline } = req.body;
  
  const project = {
    id: projects.length + 1,
    title,
    description,
    skillsNeeded,
    timeline,
    createdBy: 'Current User',
    college: 'Your College',
    applications: 0,
    createdAt: new Date()
  };
  
  projects.push(project);
  res.json({ success: true, project });
});

app.post('/api/projects/:id/apply', (req, res) => {
  const { id } = req.params;
  const { message } = req.body;
  
  const application = {
    id: applications.length + 1,
    projectId: parseInt(id),
    applicantName: 'Current User',
    message,
    status: 'pending',
    appliedAt: new Date()
  };
  
  applications.push(application);
  res.json({ success: true, application });
});

// Skills Routes
app.get('/api/skills', (req, res) => {
  res.json({ skills: sampleSkills });
});

// User Routes
app.get('/api/users/profile', (req, res) => {
  // Mock current user
  const mockUser = {
    id: 1,
    name: 'Alex Kumar',
    email: 'alex@college.edu',
    college: 'IIT Bombay',
    skills: ['React', 'Node.js', 'UI/UX Design'],
    trustScore: 4.2,
    projectsCompleted: 3,
    availability: 'Available'
  };
  
  res.json({ user: mockUser });
});

app.listen(PORT, () => {
  console.log(`🚀 SkillSync server running on port ${PORT}`);
});