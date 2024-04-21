import './App.css';
import Home from '../src/pages/Home';
import Register from '../src/pages/Register';
import Login from '../src/pages/Login';

import Layout from './components/home/shared/Layout/Layout';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import { ProtectedRoute } from './Protectedroute';
import { AuthProvider } from './hooks/useAuth';
import { QueryClient, QueryClientProvider } from 'react-query';
import EventRegistration from './components/events/Event-registration';
import CreateEvent from './components/events/create-event/create-event';
import SearchEvent from './components/events/search-event/search-event';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import Modules from './pages/Modules';
import EventsWithModule from './pages/EventsWithModule';
import EventDetails from './pages/EventDetails';
import AdminDashboard from './pages/admin/adminDashboard/AdminDashboard';
import EditEvent from './components/events/edit-event/EditEvent';
import EditEventAdditionalDetails from './components/events/edit-event/EditEventAdditionalDetails';
import AdminUserEdit from './components/admin/adminUser/AdminUserEdit';
import QR from './pages/QR';

export const queryClient = new QueryClient();
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <AuthProvider>
          <AppRoutes />
        </AuthProvider>
      </Router>
    </QueryClientProvider>
  );
}

const AppRoutes = () => {
  return (
    <Layout className="page-transition">
      <Routes>
        {/* public routes */}
        <Route path="/" element={<Home />} />

        {/* auth routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:email" element={<ResetPassword />} />
        <Route path="/modules" element={<Modules />} />
        <Route
          path="/event-by-module/:moduleName"
          element={<EventsWithModule />}
        />
        <Route path="/event-detail/:id" element={<EventDetails />} />

        <Route path="/search-event" element={<SearchEvent />} />

        <Route path="/register-event/:id" element={<EventRegistration />} />

        {/* <Route 
          path="/register-event/:id" 
          element={
            <ProtectedRoute roles={['user']}>
              <EventRegistration />
            </ProtectedRoute>
          }
        /> */}

        {/* Admin Routes */}
        <Route
          path="/admin-dashboard"
          element={
            <ProtectedRoute roles={['admin']}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/edit-user-by-admin/:id"
          element={
            <ProtectedRoute roles={['admin']}>
              <AdminUserEdit />
            </ProtectedRoute>
          }
        />
        <Route
          path="/event-edit/:id"
          element={
            <ProtectedRoute roles={['admin', 'user']}>
              <EditEvent />
            </ProtectedRoute>
          }
        />

        {/* Client Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute roles={['user']}>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        {/* <Route
          path="/register-event/:id"
          element={
            <ProtectedRoute roles={['user']}>
              <EventRegistration />
            </ProtectedRoute>
          }
        /> */}

        <Route
          path="/additional-event-edit/:id"
          element={
            <ProtectedRoute roles={['user', 'admin']}>
              <EditEventAdditionalDetails />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/:id"
          element={
            <ProtectedRoute roles={['user']}>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/event-creation"
          element={
            <ProtectedRoute roles={['user']}>
              <CreateEvent />
            </ProtectedRoute>
          }
        />
        <Route path="/event-qr" element={<QR />} />
        {/* <Route
          path="/event-qr"
          element={
            <ProtectedRoute roles={['user']}>
              <QR />
            </ProtectedRoute>
          }
        /> */}
        {/* <Route
          path="/search-event"
          element={
            <ProtectedRoute roles={['user', 'admin']}>
              <SearchEvent />
            </ProtectedRoute>
          }
        /> */}
      </Routes>
    </Layout>
  );
};

export default App;
