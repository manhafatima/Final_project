import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import Home from "./pages/Home";
import CreatePost from "./pages/CreatePost";
import PostPage from "./pages/PostPage";


function App(){

  return(

    <BrowserRouter>

      <Routes>

        <Route 
          path="/" 
          element={<Home/>}
        />

        <Route 
          path="/create" 
          element={<CreatePost/>}
        />

        <Route
          path="/post/:id"
          element={<PostPage/>}
        />

      </Routes>

    </BrowserRouter>

  )

}


export default App;