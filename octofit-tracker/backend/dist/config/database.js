"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DATABASE_URI = exports.DATABASE_NAME = void 0;
exports.connectDatabase = connectDatabase;
exports.disconnectDatabase = disconnectDatabase;
const mongoose_1 = __importDefault(require("mongoose"));
exports.DATABASE_NAME = 'octofit_db';
exports.DATABASE_URI = `mongodb://localhost:27017/${exports.DATABASE_NAME}`;
async function connectDatabase() {
    await mongoose_1.default.connect(exports.DATABASE_URI);
}
async function disconnectDatabase() {
    await mongoose_1.default.disconnect();
}
