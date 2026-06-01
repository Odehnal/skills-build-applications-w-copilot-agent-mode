"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const models_1 = require("./models");
const router = (0, express_1.Router)();
router.get('/users/', async (_req, res, next) => {
    try {
        const users = await models_1.User.find().sort({ name: 1 });
        res.json(users);
    }
    catch (error) {
        next(error);
    }
});
router.get('/teams/', async (_req, res, next) => {
    try {
        const teams = await models_1.Team.find().populate('members', 'name email grade').sort({ name: 1 });
        res.json(teams);
    }
    catch (error) {
        next(error);
    }
});
router.get('/activities/', async (_req, res, next) => {
    try {
        const activities = await models_1.Activity.find().populate('user', 'name email').sort({ date: -1 });
        res.json(activities);
    }
    catch (error) {
        next(error);
    }
});
router.get('/leaderboard/', async (_req, res, next) => {
    try {
        const leaderboard = await models_1.LeaderboardEntry.find()
            .populate('user', 'name email')
            .populate('team', 'name')
            .sort({ rank: 1 });
        res.json(leaderboard);
    }
    catch (error) {
        next(error);
    }
});
router.get('/workouts/', async (_req, res, next) => {
    try {
        const workouts = await models_1.Workout.find().sort({ difficulty: 1, name: 1 });
        res.json(workouts);
    }
    catch (error) {
        next(error);
    }
});
exports.default = router;
