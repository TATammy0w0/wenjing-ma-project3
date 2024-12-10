import { Routes, Route } from "react-router-dom";

import HomePage from "./pages/home/HomePage";
import LoginPage from "./pages/auth/login/LoginPage";
import SignUpPage from "./pages/auth/signup/SignUpPage";
import ProfilePage from "./pages/profile/ProfilePage";
import MainLayout from "./components/layouts/MainLayout";

import { Toaster } from "react-hot-toast";

function App() {
  return (
    <div className="flex max-w-6xl mx-auto">
      <Routes>
        {/* Routes with NavBar */}
        <Route
          path="/"
          element={
            <MainLayout>
              <HomePage />
            </MainLayout>
          }
        />
        <Route
          path="/profile/:username"
          element={
            <MainLayout>
              <ProfilePage />
            </MainLayout>
          }
        />

        {/* Routes without NavBar */}
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;
