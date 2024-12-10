import { Navigate, Routes, Route } from "react-router-dom";

import HomePage from "./pages/home/HomePage";
import LoginPage from "./pages/auth/login/LoginPage";
import SignUpPage from "./pages/auth/signup/SignUpPage";
import ProfilePage from "./pages/profile/ProfilePage";
import MainLayout from "./components/layouts/MainLayout";
import LoadingSpinner from "./components/common/LoadingSpinner";

import { Toaster } from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";

function App() {
  const { data: authUser, isLoading } = useQuery({
    // use queryKey to give a unique name to our query and refer to it later
    queryKey: ["authUser"],
    queryFn: async () => {
      try {
        const res = await fetch("/api/auth/me");
        const data = await res.json();
        if (data.error) return null; // make authUser to null when logged out
        if (!res.ok) {
          throw new Error(data.error || "Something went wrong");
        }
        console.log("authUser:", data);
        return data;
      } catch (error) {
        throw new Error(error);
      }
    },
    retry: false,
  });

  if (isLoading) {
    return (
      <div className="h-screen flex justify-center items-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

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

        {/* Prevent logged in user to login page and sign up page */}
        <Route
          path="/signup"
          element={!authUser ? <SignUpPage /> : <Navigate to="/" />}
        />
        <Route
          path="/login"
          element={!authUser ? <LoginPage /> : <Navigate to="/" />}
        />
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;
