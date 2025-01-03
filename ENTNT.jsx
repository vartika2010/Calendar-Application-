import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AdminModule from './components/AdminModule';
import UserModule from './components/UserModule';
import AnalyticsModule from './components/AnalyticsModule';
import Layout from './components/Layout';

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<UserModule />} />
        <Route path="admin" element={<AdminModule />} />
        <Route path="analytics" element={<AnalyticsModule />} />
      </Route>
    </Routes>
  </BrowserRouter>
);

export default App;

import React, { useState } from 'react';
import { Outlet, Link } from 'react-router-dom';
import { Calendar, Users, BarChart2, Settings, Bell } from 'lucide-react';

const Layout = () => {
  const [notifications, setNotifications] = useState(5);

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm p-4">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <h1 className="text-2xl font-bold text-gray-800">Communication Tracker</h1>
          <div className="flex items-center space-x-4">
            <button className="p-2 hover:bg-gray-100 rounded-full relative">
              <Bell className="w-6 h-6 text-gray-600" />
              {notifications > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {notifications}
                </span>
              )}
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-full">
              <Settings className="w-6 h-6 text-gray-600" />
            </button>
          </div>
        </div>
      </nav>

      <div className="flex">
        <aside className="w-64 min-h-screen bg-white shadow-sm">
          <nav className="p-4 space-y-2">
            <Link to="/" className="flex items-center space-x-2 p-3 rounded-lg hover:bg-gray-100">
              <Calendar className="w-5 h-5" />
              <span>Dashboard</span>
            </Link>
            <Link to="/admin" className="flex items-center space-x-2 p-3 rounded-lg hover:bg-gray-100">
              <Users className="w-5 h-5" />
              <span>Admin</span>
            </Link>
            <Link to="/analytics" className="flex items-center space-x-2 p-3 rounded-lg hover:bg-gray-100">
              <BarChart2 className="w-5 h-5" />
              <span>Analytics</span>
            </Link>
          </nav>
        </aside>

        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;

// src/components/AdminModule.jsx
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const AdminModule = () => {
  const [companies, setCompanies] = useState([]);
  const [newCompany, setNewCompany] = useState({
    name: '',
    location: '',
    linkedIn: '',
    emails: [''],
    phones: [''],
    comments: '',
    periodicity: 14
  });

  const handleAddCompany = (e) => {
    e.preventDefault();
    setCompanies([...companies, { ...newCompany, id: Date.now() }]);
    setNewCompany({
      name: '',
      location: '',
      linkedIn: '',
      emails: [''],
      phones: [''],
      comments: '',
      periodicity: 14
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Add Company</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleAddCompany} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Company Name</label>
              <input
                type="text"
                value={newCompany.name}
                onChange={(e) => setNewCompany({ ...newCompany, name: e.target.value })}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Location</label>
              <input
                type="text"
                value={newCompany.location}
                onChange={(e) => setNewCompany({ ...newCompany, location: e.target.value })}
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">LinkedIn Profile</label>
              <input
                type="url"
                value={newCompany.linkedIn}
                onChange={(e) => setNewCompany({ ...newCompany, linkedIn: e.target.value })}
                className="w-full p-2 border rounded"
              />
            </div>
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
              Add Company
            </button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Companies</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr>
                  <th className="text-left p-2">Name</th>
                  <th className="text-left p-2">Location</th>
                  <th className="text-left p-2">LinkedIn</th>
                  <th className="text-left p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {companies.map((company) => (
                  <tr key={company.id}>
                    <td className="p-2">{company.name}</td>
                    <td className="p-2">{company.location}</td>
                    <td className="p-2">{company.linkedIn}</td>
                    <td className="p-2">
                      <button className="text-red-500 hover:text-red-700">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminModule;

// src/components/UserModule.jsx
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const UserModule = () => {
  const [communications, setCommunications] = useState([
    {
      company: "TechCorp",
      lastFive: [
        { type: "LinkedIn Post", date: "2025-01-02" },
        { type: "Email", date: "2024-12-28" }
      ],
      nextScheduled: { type: "Phone Call", date: "2025-01-05" },
      status: "due" // "overdue", "due", "normal"
    }
  ]);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Communications Dashboard</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr>
                  <th className="text-left p-2">Company</th>
                  <th className="text-left p-2">Last Communications</th>
                  <th className="text-left p-2">Next Scheduled</th>
                  <th className="text-left p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {communications.map((comm, index) => (
                  <tr
                    key={index}
                    className={`${
                      comm.status === 'overdue'
                        ? 'bg-red-50'
                        : comm.status === 'due'
                        ? 'bg-yellow-50'
                        : ''
                    }`}
                  >
                    <td className="p-2">{comm.company}</td>
                    <td className="p-2">
                      {comm.lastFive.map((c, i) => (
                        <div key={i} className="text-sm">
                          {c.type} - {c.date}
                        </div>
                      ))}
                    </td>
                    <td className="p-2">
                      {comm.nextScheduled.type} - {comm.nextScheduled.date}
                    </td>
                    <td className="p-2">
                      <button className="bg-blue-500 text-white px-3 py-1 rounded text-sm">
                        Log Communication
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Today's Tasks</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {communications
              .filter((comm) => comm.status === 'due')
              .map((comm, index) => (
                <div
                  key={index}
                  className="p-3 bg-yellow-50 rounded-lg flex justify-between items-center"
                >
                  <div>
                    <h3 className="font-medium">{comm.company}</h3>
                    <p className="text-sm text-gray-600">
                      {comm.nextScheduled.type} due {comm.nextScheduled.date}
                    </p>
                  </div>
                  <button className="bg-blue-500 text-white px-3 py-1 rounded text-sm">
                    Complete
                  </button>
                </div>
              ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserModule;

// src/components/AnalyticsModule.jsx
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const AnalyticsModule = () => {
  const communicationData = [
    { name: 'LinkedIn Post', count: 25 },
    { name: 'Email', count: 40 },
    { name: 'Phone Call', count: 15 },
    { name: 'Visit', count: 5 },
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Communication Methods Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            <BarChart width={600} height={300} data={communicationData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill="#3b82f6" />
            </BarChart>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Communication Effectiveness</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {communicationData.map((data, index) => (
              <div key={index} className="flex items-center justify-between">
                <span>{data.name}</span>
                <div className="w-64 bg-gray-200 rounded-full h-2.5">
                  <div
                    className="bg-blue-500 h-2.5 rounded-full"
                    style={{ width: `${(data.count / 40) * 100}%` }}
                  ></div>
                </div>
                <span>{((data.count / 40) * 100).toFixed(1)}%</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AnalyticsModule;