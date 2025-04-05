import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/home';
import LoginPage from './components/login';
import SignupPage from './components/signup';
import AdminLoginPage from './components/adminloginpage';
import OwnerLoginPage from './components/ownerloginpage';
import AdminDashboard from './components/admindashboard';
import OwnerDashboard from './components/ownerdashboard';
import UserDashboard from './components/userdashboard';
import AccommodationListPage from './components/accommodationlistpage';
import AccommodationDetailPage from './components/accommodationdetailpage';
import AboutPage from './components/about';

function App() {

  return (
    <>
      <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />        
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/admin-login" element={<AdminLoginPage />} />
        <Route path="/owner-login" element={<OwnerLoginPage />} />
        {/* <Route path="/add-accommodation" element={<AddAccommodationPage />} /> */}
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/owner-dashboard" element={<OwnerDashboard />} />
        <Route path="/user-dashboard" element={<UserDashboard />} />
        <Route path="/accommodations" element={<AccommodationListPage />} />
        <Route path="/accommodation/:id" element={<AccommodationDetailPage />} />
        <Route path="/about" element={<AboutPage />} />
      </Routes>
    </Router>
    </>
  )
}

export default App
