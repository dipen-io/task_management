import { Sidebar } from './Sidebar';
import { BarChart3, Users, ClipboardCheck, TrendingUp } from 'lucide-react';
import { useState } from 'react';
import { CreateTaskModal } from "./CreateTaskModal";

export function AdminDashboard() {
  console.log("Dashboard Admin");

  const [isModalOpen, setIsModalOpen] = useState(false);

  const stats = [
    { label: 'Total Tasks', value: '48', change: '+12%', icon: ClipboardCheck, color: 'text-[#14b8a6]' },
    { label: 'Active Users', value: '24', change: '+5%', icon: Users, color: 'text-blue-600' },
    { label: 'Completion Rate', value: '87%', change: '+3%', icon: TrendingUp, color: 'text-purple-600' },
    { label: 'Pending Approvals', value: '7', change: '-2', icon: BarChart3, color: 'text-orange-600' },
  ];

  const recentActivity = [
    { user: 'Sarah K.', action: 'completed "Onboard New Hire: John D."', time: '5 min ago' },
    { user: 'Mike C.', action: 'requested approval for "Budget Review Q2"', time: '23 min ago' },
    { user: 'Lisa W.', action: 'updated status on "Client Contract"', time: '1 hour ago' },
    { user: 'Admin Team', action: 'created 3 new tasks', time: '2 hours ago' },
    { user: 'John D.', action: 'joined the organization', time: '3 hours ago' },
  ];

  const teamMembers = [
    { name: 'Sarah K.', role: 'Employee', tasks: 8, status: 'active' },
    { name: 'Mike C.', role: 'Employee', tasks: 12, status: 'active' },
    { name: 'Lisa W.', role: 'Employee', tasks: 6, status: 'active' },
    { name: 'John D.', role: 'Employee', tasks: 2, status: 'new' },
  ];


  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar role="Admin" />

      <main className="flex-1 pt-16 lg:pt-0">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-gray-900 mb-1">Admin Dashboard</h1>
              <p className="text-gray-600">Manage your team and monitor progress</p>
            </div>
            <div className="hidden sm:flex items-center gap-3">
              <button className="px-4 py-2 bg-[#14b8a6] text-white rounded-lg hover:bg-[#14b8a6]/90 transition-colors" onClick={() => setIsModalOpen(true)}>
                Create Task
              </button>
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center text-white">
                AD
              </div>
            </div>
          </div>

          {/* Render the Modal conditionally */}

          {/*  */}
          {isModalOpen && (
            <CreateTaskModal onClose={() => setIsModalOpen(false)} />
          )}
        </header>

        {/* Content */}
        <div className="px-6 lg:px-8 py-8">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 rounded-lg ${stat.color} bg-opacity-10 flex items-center justify-center`}>
                    <stat.icon className={stat.color} size={24} />
                  </div>
                  <span className="text-sm text-green-600">{stat.change}</span>
                </div>
                <div className="text-3xl text-gray-900 mb-1">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-8">
            {/* Team Overview */}
            <div className="space-y-6">
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <h2 className="text-gray-900 mb-6">Team Members</h2>
                <div className="space-y-4">
                  {teamMembers.map((member, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#14b8a6] to-[#0d9488] flex items-center justify-center text-white text-sm">
                          {member.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <div className="text-gray-900">{member.name}</div>
                          <div className="text-sm text-gray-600">{member.role}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <div className="text-gray-900">{member.tasks} tasks</div>
                          <div className={`text-sm ${member.status === 'new' ? 'text-blue-600' : 'text-green-600'}`}>
                            {member.status === 'new' ? 'New' : 'Active'}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="space-y-6">
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <h3 className="text-gray-900 mb-6">Recent Activity</h3>
                <div className="space-y-4">
                  {recentActivity.map((activity, index) => (
                    <div key={index} className="pb-4 border-b border-gray-100 last:border-0 last:pb-0">
                      <p className="text-sm text-gray-700 mb-1">
                        <span className="text-gray-900">{activity.user}</span> {activity.action}
                      </p>
                      <p className="text-xs text-gray-500">{activity.time}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
