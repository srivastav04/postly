import './App.css'
import { Route, Routes, useLocation } from "react-router-dom";
import CreatePage from "./pages/CreatePage";
import { SignedIn, SignedOut, SignInButton } from "@clerk/clerk-react";
import HomePage from './pages/HomePage';
import { useUser } from '@clerk/clerk-react';
import { useEffect } from 'react';
import useStore from './store';
import EditPage from './pages/EditPage';
import MyPostsPage from './pages/MyPostsPage';
import NavBar from './components/NavBar';
import LandingPage from './pages/LandingPage';
import Footer from './components/Footer';
import SignUpPage from './pages/SignUpPage';
import AdminPage from './pages/AdminPage';

function App() {
  const location = useLocation()
  const { user, isLoaded } = useUser();
  const setUserName = useStore((state) => state.setUserName);
  const setUserId = useStore((state) => state.setUserId);
  const setUserAvatar = useStore((state) => state.setUserAvatar);
  const setIsAdmin = useStore((state) => state.setIsAdmin);
  useEffect(() => {
    if (isLoaded && user) {
      console.log("User metadata:", user.publicMetadata);
      setUserName(user.username);
      setUserId(user.id);
      setUserAvatar(user.imageUrl);
      if ((user.publicMetadata?.role || '').toLowerCase().trim() === 'admin') {
        setIsAdmin(true);
      }
      else {
        setIsAdmin(false);
      }
    }
  }, [isLoaded, user, setUserId, setUserName, setUserAvatar, setIsAdmin]);


  return (

    <div className='min-h-screen bg-gradient-to-br from-[#FBFBFB] to-[#dcc5c5] p-6 '>
      {location.pathname !== "/" && <NavBar />}
      <Routes>
        <Route path="/" element={
          <>
            <SignedIn><LandingPage /></SignedIn>
            <SignedOut><SignUpPage /></SignedOut>
          </>} />
        <Route path="/home" element={
          <>
            <SignedIn><HomePage /></SignedIn>
            <SignedOut><SignInButton forceRedirectUrl={"/home"} /></SignedOut>
          </>
        } />
        <Route path="/create" element={
          <>
            <SignedIn><CreatePage /></SignedIn>
            <SignedOut><SignUpPage /></SignedOut>
          </>
        } />
        <Route path="/myPosts" element={
          <>
            <SignedIn><MyPostsPage /></SignedIn>
            <SignedOut><SignUpPage /></SignedOut>
          </>
        } />
        <Route path="/edit/:id" element={<>
          <SignedIn><EditPage /></SignedIn>
          <SignedOut><SignUpPage /></SignedOut>
        </>} />
        <Route path='/admin' element={<>
          <SignedIn><AdminPage /></SignedIn>
          <SignedOut><SignUpPage /></SignedOut>
        </>} />

      </Routes>
      {location.pathname !== "/" && <Footer />}
    </div>
  );
}

export default App
