import './App.css'
import HomePage from "./pages/home";
import {Route, Routes} from "react-router-dom";
import ProfilePage from "./pages/profile";

function App() {
    return (
        <Routes>
            <Route path="/" element={<HomePage />} >
                <Route path="/profile/:profileName" element={<ProfilePage/>} />
            </Route>
            <Route path="/:postsMode" element={<HomePage />} >
                <Route path="/:postsMode/profile/:profileName" element={<ProfilePage/>} />
            </Route>
        </Routes>
    )
}

export default App
