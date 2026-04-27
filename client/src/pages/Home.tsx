
import { Navigate } from "react-router";
import { useAuth } from '../context/AuthContext';

export function Home() {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (user?.role === 'Admin') {
    console.log("PASSED", user)
    return <Navigate to="/admin/dashboard" replace />;
  }
  console.log("skipped")
  return <Navigate to="/employee/dashboard" replace />;
}