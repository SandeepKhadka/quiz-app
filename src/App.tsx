import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import QuizPage from './pages/QuizPage';
import ResultsPage from './pages/ResultsPage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<QuizPage />} />
        <Route path="/results" element={<ResultsPage />} />
      </Routes>
    </Router>
  );
};

export default App;
