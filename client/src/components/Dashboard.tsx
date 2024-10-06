import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  Tooltip,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts";

type ComplianceData = {
  complianceScore: number;
  scoreTrends: number[];
  controlsImplemented: number;
  pendingTasks: number;
  riskAssessment: { high: number; medium: number; low: number };
  auditHistory: { passed: number; failed: number };
  upcomingDeadlines: { task: string; dueDate: string }[];
};

const Dashboard: React.FC = () => {
  const [data, setData] = useState<ComplianceData | null>(null);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/compliance-metrics")
      .then((response) => setData(response.data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <div className="p-8 bg-gray-800 text-white rounded-lg shadow-lg max-w-5xl mx-auto">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-center">
        Compliance Dashboard
      </h1>
      {data ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Compliance Score Trend */}
          <div className="bg-gray-900 p-4 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">
              Compliance Score & History
            </h2>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart
                data={data.scoreTrends.map((score, index) => ({
                  score,
                  day: index + 1,
                }))}
              >
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1f2937",
                    borderColor: "#4caf50",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="score"
                  stroke="#4caf50"
                  strokeWidth={3}
                  dot={{ r: 3 }}
                />
              </LineChart>
            </ResponsiveContainer>
            <div className="text-green-500 text-lg font-bold text-center">
              Current: {data.complianceScore}%
            </div>
          </div>

          {/* Risk Assessment */}
          <div className="bg-gray-900 p-4 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Risk Assessment</h2>
            <PieChart width={300} height={200}>
              <Pie
                data={[
                  { name: "High Risk", value: data.riskAssessment.high },
                  { name: "Medium Risk", value: data.riskAssessment.medium },
                  { name: "Low Risk", value: data.riskAssessment.low },
                ]}
                dataKey="value"
                outerRadius={80}
                fill="#8884d8"
              >
                <Cell fill="#ff6361" />
                <Cell fill="#ffa600" />
                <Cell fill="#3cb371" />
              </Pie>
              <Tooltip />
            </PieChart>
            <div className="flex justify-around items-center">
              <div className="text-red-500 text-lg font-bold">
                High: {data.riskAssessment.high}
              </div>
              <div className="text-yellow-500 text-lg font-bold">
                Medium: {data.riskAssessment.medium}
              </div>
              <div className="text-green-500 text-lg font-bold">
                Low: {data.riskAssessment.low}
              </div>
            </div>
          </div>

          {/* Audit History */}
          <div className="bg-gray-900 p-4 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Audit History</h2>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart
                data={[
                  {
                    name: "Audits",
                    passed: data.auditHistory.passed,
                    failed: data.auditHistory.failed,
                  },
                ]}
              >
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1f2937",
                    borderColor: "#4caf50",
                  }}
                />
                <Bar dataKey="passed" fill="#4caf50" name="Passed" />
                <Bar dataKey="failed" fill="#f44336" name="Failed" />
              </BarChart>
            </ResponsiveContainer>
            <div className="flex justify-evenly items-center">
              <div className="text-green-500 text-lg font-bold">
                Passed: {data.auditHistory.passed}
              </div>
              <div className="text-red-500 text-lg font-bold">
                Failed: {data.auditHistory.failed}
              </div>
            </div>
          </div>

          {/* Controls Implemented & Pending Tasks */}
          <div className="bg-gray-900 p-4 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">
              Controls Implemented & Pending Tasks
            </h2>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart
                data={[
                  {
                    name: "Controls",
                    implemented: data.controlsImplemented,
                    pending: data.pendingTasks,
                  },
                ]}
              >
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1f2937",
                    borderColor: "#ffb74d",
                  }}
                />
                <Bar dataKey="implemented" fill="#4caf50" name="Implemented" />
                <Bar dataKey="pending" fill="#ffb74d" name="Pending" />
              </BarChart>
            </ResponsiveContainer>
            <div className="flex justify-evenly items-center">
              <div className="text-green-500 text-lg font-bold">
                Implemented: {data.controlsImplemented}
              </div>
              <div className="text-yellow-500 text-lg font-bold">
                Pending: {data.pendingTasks}
              </div>
            </div>
          </div>

          {/* Upcoming Deadlines */}
          <div className="bg-gray-900 p-4 rounded-lg sm:col-span-2">
            <h2 className="text-xl font-semibold mb-4">Upcoming Deadlines</h2>
            <ul>
              {data.upcomingDeadlines.map((deadline, index) => (
                <li key={index} className="mb-2">
                  <span className="font-semibold">{deadline.task}:</span> Due by{" "}
                  {deadline.dueDate}
                </li>
              ))}
            </ul>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Dashboard;
