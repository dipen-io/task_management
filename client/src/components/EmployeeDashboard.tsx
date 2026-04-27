import { Sidebar } from './Sidebar';
import { useAuth } from '../context/AuthContext';


export function EmployeeDashbaord() {
  const { user } = useAuth();
  console.log("EmployeeDashbaord")

  const tasks = [
    {
      title: 'Onboard New Hire: John D.',
      status: 'pending' as const,
      assignee: { name: 'Sarah K.', initials: 'SK', color: 'bg-[#14b8a6]' },
      comments: 3,
    },
    {
      title: 'Update Client Contract - Acme Corp',
      status: 'in-progress' as const,
      assignee: { name: 'Mike C.', initials: 'MC', color: 'bg-blue-500' },
      comments: 7,
    },
    {
      title: 'Review Q2 Financial Report',
      status: 'review' as const,
      assignee: { name: 'Admin Team', initials: 'AT', color: 'bg-purple-500' },
      comments: 12,
    },
    {
      title: 'Submit Expense Report - March',
      status: 'done' as const,
      assignee: { name: 'Lisa W.', initials: 'LW', color: 'bg-pink-500' },
      comments: 2,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar role="Employee" />

      <main className="flex-1 pt-16 lg:pt-0">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-gray-900 mb-1">Welcome back, {user?.name}!</h1>
              <p className="text-gray-600">Here's what's happening with your tasks today</p>
            </div>
            <div className="hidden sm:block">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#14b8a6] to-[#0d9488] flex items-center justify-center text-white">
                {user?.name.charAt(0).toUpperCase() + user?.name.charAt(1).toUpperCase()}
              </div>
            </div>
          </div>
        </header>
      </main>
    </div>
  );
}
