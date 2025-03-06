
import React from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, ResponsiveContainer, XAxis, YAxis, Bar, PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

const AnalyticsDashboard = () => {
  const { getStudents } = useAuth();
  const students = getStudents();
  
  // Calculate placement statistics
  const totalStudents = students.filter(s => s.isApproved).length;
  const placedStudents = students.filter(s => s.isApproved && s.isPlaced).length;
  const placementRate = totalStudents > 0 ? Math.round((placedStudents / totalStudents) * 100) : 0;

  // Department statistics
  const departments = students.reduce((acc, student) => {
    if (student.isApproved) {
      const dept = student.department;
      if (!acc[dept]) {
        acc[dept] = { total: 0, placed: 0 };
      }
      acc[dept].total += 1;
      if (student.isPlaced) {
        acc[dept].placed += 1;
      }
    }
    return acc;
  }, {} as Record<string, { total: number; placed: number }>);

  const departmentChartData = Object.entries(departments).map(([name, data]) => ({
    name,
    total: data.total,
    placed: data.placed,
    rate: data.total > 0 ? Math.round((data.placed / data.total) * 100) : 0
  }));

  // Batch statistics
  const batches = students.reduce((acc, student) => {
    if (student.isApproved) {
      const batch = student.batch;
      if (!acc[batch]) {
        acc[batch] = { total: 0, placed: 0 };
      }
      acc[batch].total += 1;
      if (student.isPlaced) {
        acc[batch].placed += 1;
      }
    }
    return acc;
  }, {} as Record<string, { total: number; placed: number }>);

  const batchChartData = Object.entries(batches).map(([name, data]) => ({
    name,
    value: data.total,
    placed: data.placed
  }));

  // Placement status for pie chart
  const placementStatusData = [
    { name: "Placed", value: placedStudents },
    { name: "Not Placed", value: totalStudents - placedStudents }
  ];

  const COLORS = ["#4CAF50", "#FFC107", "#2196F3", "#F44336", "#9C27B0", "#FF9800"];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Analytics Dashboard</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Students</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalStudents}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Placed Students</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{placedStudents}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Placement Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{placementRate}%</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Placement Status</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={placementStatusData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {placementStatusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Department-wise Placement</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={departmentChartData}
                  margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 60,
                  }}
                >
                  <XAxis 
                    dataKey="name" 
                    angle={-45} 
                    textAnchor="end" 
                    height={70}
                    fontSize={12}
                  />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="total" name="Total Students" fill="#8884d8" />
                  <Bar dataKey="placed" name="Placed Students" fill="#82ca9d" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Batch-wise Placement Rate</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-96">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={batchChartData}
                margin={{
                  top: 20,
                  right: 30,
                  left: 20,
                  bottom: 60,
                }}
              >
                <XAxis 
                  dataKey="name" 
                  angle={-45} 
                  textAnchor="end" 
                  height={70}
                  fontSize={12}
                />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" name="Total Students" fill="#3b82f6" />
                <Bar dataKey="placed" name="Placed Students" fill="#10b981" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AnalyticsDashboard;
