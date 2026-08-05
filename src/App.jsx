import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import EditPost from "./pages/EditPost";
import CreatePost from "./pages/CreatePost";
import PostPage from "./pages/PostPage";
import "./App.css";


function App() {
  return (
    <BrowserRouter>

      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<CreatePost />} />
        <Route path="/post/:id" element={<PostPage />} />
        <Route path="/edit/:id" element={<EditPost />} />
      </Routes>

    </BrowserRouter>
  );
}


export default App;