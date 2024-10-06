"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const PORT = 5000;
app.use((0, cors_1.default)());
app.get('/api/compliance-metrics', (req, res) => {
    const data = {
        complianceScore: 88,
        scoreTrends: [80, 82, 84, 85, 88],
        controlsImplemented: 15,
        pendingTasks: 5,
        riskAssessment: {
            high: 20,
            medium: 40,
            low: 40
        },
        auditHistory: {
            passed: 3,
            failed: 1
        },
        upcomingDeadlines: [
            { task: 'Data Protection Review', dueDate: '2024-10-20' },
            { task: 'Access Control Audit', dueDate: '2024-11-15' }
        ]
    };
    res.json(data);
});
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
