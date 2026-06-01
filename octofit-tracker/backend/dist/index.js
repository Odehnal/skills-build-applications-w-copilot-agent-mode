"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const routes_1 = __importDefault(require("./routes"));
const database_1 = require("./config/database");
const app = (0, express_1.default)();
const PORT = 8000;
const codespaceName = process.env.CODESPACE_NAME;
const baseUrl = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev`
    : 'http://localhost:8000';
app.use((0, cors_1.default)());
app.use(express_1.default.json());
(0, database_1.connectDatabase)()
    .then(() => console.log(`Connected to MongoDB (${database_1.DATABASE_NAME})`))
    .catch((err) => console.error('MongoDB connection error:', err));
app.get('/api', (_req, res) => {
    res.json({ message: 'OctoFit Tracker API is running', baseUrl });
});
app.use('/api', routes_1.default);
app.use((err, _req, res, _next) => {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
});
app.listen(PORT, () => {
    console.log(`Backend running on port ${PORT}`);
    console.log(`Base URL: ${baseUrl}`);
});
