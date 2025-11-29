import React from 'react';
import { Card, Button } from '../components/UI';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, LineChart, Line } from 'recharts';
import { Trophy, Clock, BookOpen, Star } from 'lucide-react';

const activityData = [
  { name: 'Mon', hours: 2.5, quizScore: 80 },
  { name: 'Tue', hours: 1.5, quizScore: 75 },
  { name: 'Wed', hours: 3.0, quizScore: 90 },
  { name: 'Thu', hours: 2.0, quizScore: 85 },
  { name: 'Fri', hours: 4.5, quizScore: 95 },
  { name: 'Sat', hours: 1.0, quizScore: 70 },
  { name: 'Sun', hours: 2.0, quizScore: 88 },
];

const progressStats = [
  { label: 'Courses Completed', value: '3', icon: Trophy, color: 'text-yellow-500' },
  { label: 'Learning Hours', value: '24.5', icon: Clock, color: 'text-blue-500' },
  { label: 'Tools Generated', value: '12', icon: Star, color: 'text-purple-500' },
  { label: 'Modules Active', value: '2', icon: BookOpen, color: 'text-green-500' },
];

const Dashboard: React.FC = () => {
  return (
    <div className="container mx-auto px-6 py-10">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white">My Dashboard</h1>
          <p className="text-slate-400">Welcome back, Aspiring Executive.</p>
        </div>
        <Button variant="primary">Download Report</Button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {progressStats.map((stat, idx) => (
          <Card key={idx} className="p-6 flex items-center gap-4 border-slate-800">
            <div className={`p-3 rounded-full bg-slate-800/50 ${stat.color}`}>
              <stat.icon size={24} />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">{stat.value}</p>
              <p className="text-sm text-slate-500">{stat.label}</p>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
        {/* Learning Activity Chart */}
        <Card className="p-6 bg-slate-900/80">
          <h3 className="text-lg font-semibold text-white mb-6">Learning Activity (Hours)</h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={activityData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                <XAxis dataKey="name" stroke="#64748b" tick={{fontSize: 12}} tickLine={false} axisLine={false} />
                <YAxis stroke="#64748b" tick={{fontSize: 12}} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px', color: '#fff' }}
                  cursor={{ fill: '#334155', opacity: 0.2 }}
                />
                <Bar dataKey="hours" fill="#3550e0" radius={[4, 4, 0, 0]} barSize={30} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Quiz Performance Chart */}
        <Card className="p-6 bg-slate-900/80">
          <h3 className="text-lg font-semibold text-white mb-6">Quiz Performance History</h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={activityData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                <XAxis dataKey="name" stroke="#64748b" tick={{fontSize: 12}} tickLine={false} axisLine={false} />
                <YAxis stroke="#64748b" tick={{fontSize: 12}} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px', color: '#fff' }}
                />
                <Line type="monotone" dataKey="quizScore" stroke="#10b981" strokeWidth={3} dot={{r: 4, fill: '#10b981'}} activeDot={{r: 6}} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      {/* Recent Saved Items */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Recent Generated Plans</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-400">
            <thead className="border-b border-slate-800 text-xs uppercase font-semibold text-slate-500">
              <tr>
                <th className="pb-3 px-2">Document Name</th>
                <th className="pb-3 px-2">Type</th>
                <th className="pb-3 px-2">Date</th>
                <th className="pb-3 px-2 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              <tr>
                <td className="py-3 px-2 text-white font-medium">Tech Startup Launch Q3</td>
                <td className="py-3 px-2"><span className="bg-blue-500/10 text-blue-400 py-1 px-2 rounded text-xs">Business Plan</span></td>
                <td className="py-3 px-2">Oct 24, 2023</td>
                <td className="py-3 px-2 text-right"><Button variant="ghost" size="sm" className="text-royal-400">View</Button></td>
              </tr>
              <tr>
                <td className="py-3 px-2 text-white font-medium">Competitor Analysis: Retail</td>
                <td className="py-3 px-2"><span className="bg-purple-500/10 text-purple-400 py-1 px-2 rounded text-xs">Market Research</span></td>
                <td className="py-3 px-2">Oct 22, 2023</td>
                <td className="py-3 px-2 text-right"><Button variant="ghost" size="sm" className="text-royal-400">View</Button></td>
              </tr>
              <tr>
                <td className="py-3 px-2 text-white font-medium">Q4 Marketing Strategy</td>
                <td className="py-3 px-2"><span className="bg-green-500/10 text-green-400 py-1 px-2 rounded text-xs">Strategy</span></td>
                <td className="py-3 px-2">Oct 20, 2023</td>
                <td className="py-3 px-2 text-right"><Button variant="ghost" size="sm" className="text-royal-400">View</Button></td>
              </tr>
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

export default Dashboard;