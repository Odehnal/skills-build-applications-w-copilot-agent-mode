import mongoose from 'mongoose';
import { Activity, LeaderboardEntry, Team, User, Workout } from '../models';

const mongoUri = 'mongodb://localhost:27017/octofit_db';

async function seedDatabase() {
  console.log('Seed the octofit_db database with test data');

  await mongoose.connect(mongoUri);

  await Promise.all([
    Activity.deleteMany({}),
    LeaderboardEntry.deleteMany({}),
    Team.deleteMany({}),
    User.deleteMany({}),
    Workout.deleteMany({}),
  ]);

  const users = await User.insertMany([
    { name: 'Maya Chen', email: 'maya.chen@mergington.edu', role: 'student', grade: 10 },
    { name: 'Jordan Rivera', email: 'jordan.rivera@mergington.edu', role: 'student', grade: 11 },
    { name: 'Avery Patel', email: 'avery.patel@mergington.edu', role: 'student', grade: 9 },
    { name: 'Sam Taylor', email: 'sam.taylor@mergington.edu', role: 'student', grade: 12 },
    { name: 'Paul Octo', email: 'paul.octo@mergington.edu', role: 'coach', grade: 12 },
  ]);

  const teams = await Team.insertMany([
    { name: 'Cardio Crew', coach: 'Paul Octo', members: [users[0]._id, users[1]._id] },
    { name: 'Strength Squad', coach: 'Paul Octo', members: [users[2]._id, users[3]._id] },
  ]);

  await Activity.insertMany([
    {
      user: users[0]._id,
      type: 'running',
      durationMinutes: 35,
      date: new Date('2026-05-20T15:30:00Z'),
      points: 70,
    },
    {
      user: users[1]._id,
      type: 'cycling',
      durationMinutes: 45,
      date: new Date('2026-05-21T16:00:00Z'),
      points: 75,
    },
    {
      user: users[2]._id,
      type: 'strength training',
      durationMinutes: 30,
      date: new Date('2026-05-22T14:45:00Z'),
      points: 65,
    },
    {
      user: users[3]._id,
      type: 'walking',
      durationMinutes: 50,
      date: new Date('2026-05-23T13:15:00Z'),
      points: 55,
    },
  ]);

  await LeaderboardEntry.insertMany([
    { user: users[1]._id, team: teams[0]._id, points: 240, rank: 1 },
    { user: users[0]._id, team: teams[0]._id, points: 220, rank: 2 },
    { user: users[2]._id, team: teams[1]._id, points: 205, rank: 3 },
    { user: users[3]._id, team: teams[1]._id, points: 190, rank: 4 },
  ]);

  await Workout.insertMany([
    {
      name: 'Beginner Cardio Builder',
      description: 'A steady 20-minute walk-jog interval session for building endurance.',
      difficulty: 'beginner',
      activityType: 'running',
    },
    {
      name: 'Core Strength Circuit',
      description: 'Three rounds of planks, squats, pushups, and lunges with short rests.',
      difficulty: 'intermediate',
      activityType: 'strength training',
    },
    {
      name: 'Recovery Walk',
      description: 'A low-impact walk focused on consistency, mobility, and active recovery.',
      difficulty: 'beginner',
      activityType: 'walking',
    },
  ]);

  console.log('Seed data inserted successfully');
}

seedDatabase()
  .catch((error) => {
    console.error('Seed failed:', error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await mongoose.disconnect();
  });