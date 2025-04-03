import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import GlobalPage from './pages/GlobalPage';
import PostDetails from './pages/PostDetails';

function App() {
  return (
    <Router basename="/Test_Posts">
      <Routes>
        <Route path="/" element={<GlobalPage />} />
        <Route path="/post/:id" element={<PostDetails />} />
      </Routes>
    </Router>
  );
}

export default App;