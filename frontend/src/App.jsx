import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Unauthorized from "./pages/Unauthorized";
import DashboardLayout from "./layouts/DashboardLayout";
import Home from "./pages/Home";
import Expense from "./pages/Expense";
import Categories from "./pages/Categories";
import PrivateRoute from "./routes/PrivateRoute";
import { AuthProvider } from "./context/AuthContext";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound"; // Importa el nuevo componente
import { Toaster } from 'react-hot-toast';
import ErrorBoundary from "./components/ErrorBoundary"; // Importa el Error Boundary

function App() {
  return (
    <AuthProvider>
      <Router>
        <ErrorBoundary>
          <div>
            <Toaster position="bottom-right" reverseOrder={false} />
            <Routes>
              <Route path="/" element={<Navigate to="/login" />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/unauthorized" element={<Unauthorized />} />
    
              {/* Rutas protegidas */}
              <Route
                path="/dashboard"
                element={
                  <PrivateRoute>
                    <DashboardLayout>
                      <Home />
                    </DashboardLayout>
                  </PrivateRoute>
                }
              />

              <Route
                path="/expense"
                element={
                  <PrivateRoute>
                    <DashboardLayout>
                      <Expense />
                    </DashboardLayout>
                  </PrivateRoute>
                }
              />

              <Route
                path="/categories"
                element={
                  <PrivateRoute>
                    <DashboardLayout>
                      <Categories />
                    </DashboardLayout>
                  </PrivateRoute>
                }
              />

              <Route
                path="/profile"
                element={
                  <PrivateRoute>
                    <DashboardLayout>
                      <Profile />
                    </DashboardLayout>
                  </PrivateRoute>
                }
              />
              
              {/* Ruta 404 - debe ser la última */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </ErrorBoundary>
      </Router>
    </AuthProvider>
  );
}

export default App;