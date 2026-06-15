import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./login";
import Header from "./Header";
import Signup from "./signup";
import Tasks from "./Tasks";
import SubmitTask from "./SubmitTask";
import About from "./About";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Header />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/tasks" element={<Tasks />} />
        <Route path="/submit-task" element={<SubmitTask />} />
        <Route path="/about" element={<About />} />

        {/* <Route path="/about" element={<About />} />
        <Route path="/more-pages" element={<MorePages />} />
        <Route path="/ranking" element={<Ranking />} />
        <Route path="/boss-query" element={<BossQuery />} />
        <Route path="/boss-info" element={<BossInfo />} />
        <Route path="/tasks" element={<Tasks />} />
       <Route path="/client-meetings" element={<ClientMeetings />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;

