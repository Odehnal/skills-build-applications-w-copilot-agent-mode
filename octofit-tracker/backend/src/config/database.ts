import mongoose from 'mongoose';

export const DATABASE_NAME = 'octofit_db';
export const DATABASE_URI = `mongodb://localhost:27017/${DATABASE_NAME}`;

export async function connectDatabase(): Promise<void> {
  await mongoose.connect(DATABASE_URI);
}

export async function disconnectDatabase(): Promise<void> {
  await mongoose.disconnect();
}
