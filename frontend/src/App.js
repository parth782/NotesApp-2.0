import './App.css';
import Header from './components/header/Header'
import Footer from "./components/footer/Footer";
import LandingPage from './screens/LandingPage/LandingPage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MyNotes from './screens/MyNotes/MyNotes';
import LoginScreen from './screens/LoginScreen/LoginScreen';
import RegisterScreen from './screens/RegisterScreen/RegisterScreen';
import AddNote from './screens/AddNote/AddNote';
import EditNote from './screens/EditNote/EditNote';

function App() {
  const noteId = JSON.parse(localStorage.getItem("noteId"));
  return (
    <BrowserRouter>
      <Header />
      <main>
        <Routes>
          <Route exact path="/" element={<LandingPage />} />
          <Route exact path="/login" element={<LoginScreen />} />
          <Route exact path="/register" element={<RegisterScreen />} />
          <Route exact path="/mynotes" element={<MyNotes />} />
          <Route exact path="/createnote" element={<AddNote />} />
          <Route exact path={`/api/notes/${noteId}`} element={<EditNote />} />
        </Routes>
      </main>

      <Footer />
    </BrowserRouter>
  );
}

export default App;
