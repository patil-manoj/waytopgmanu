import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";
const HomePage = lazy(() => import("./components/home"));
const LoginPage = lazy(() => import( "./components/login"));
const SignupPage = lazy(() => import( "./components/signup"));
const AdminLoginPage = lazy(() => import( "./components/adminloginpage"));
const OwnerLoginPage = lazy(() => import( "./components/ownerloginpage"));
const AdminDashboard = lazy(() => import( "./components/admindashboard"));
const OwnerDashboard = lazy(() => import( "./components/ownerdashboard"));
const UserDashboard = lazy(() => import( "./components/userdashboard"));
const AccommodationListPage = lazy(() => import( "./components/accommodationlistpage"));
const AccommodationDetailPage = lazy(() => import( "./components/accommodationdetailpage"));
const AboutPage = lazy(() => import( "./components/about"));
const AddAccommodationPage = lazy(() => import( "./components/addaccommodation"));
const ProtectedRoute = lazy(() => import( "./components/ProtectedRoute"));
// import SignupPage from "./components/signup";
// import AdminLoginPage from "./components/adminloginpage";
// import OwnerLoginPage from "./components/ownerloginpage";
// import AdminDashboard from "./components/admindashboard";
// import OwnerDashboard from "./components/ownerdashboard";
// import UserDashboard from "./components/userdashboard";
// import AccommodationListPage from "./components/accommodationlistpage";
// import AccommodationDetailPage from "./components/accommodationdetailpage";
// import AboutPage from "./components/about";
// import AddAccommodationPage from "./components/addaccommodation";
// import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <>
      <Router>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/admin-login" element={<AdminLoginPage />} />
            <Route path="/owner-login" element={<OwnerLoginPage />} />
            <Route
              path="/add-accommodation"
              element={
                <ProtectedRoute allowedRoles={["owner"]}>
                  <AddAccommodationPage />
                </ProtectedRoute>
              }
            />
            <Route path="/admin-dashboard" element={<AdminDashboard />} />
            <Route
              path="/owner-dashboard"
              element={
                <ProtectedRoute allowedRoles={["owner"]}>
                  <OwnerDashboard />
                </ProtectedRoute>
              }
            />
            <Route path="/user-dashboard" element={<UserDashboard />} />
            <Route path="/accommodations" element={<AccommodationListPage />} />
            <Route
              path="/accommodation/:id"
              element={<AccommodationDetailPage />}
            />
            <Route path="/about" element={<AboutPage />} />
          </Routes>
        </Suspense>
      </Router>
    </>
  );
}

export default App;
