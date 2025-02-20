import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import StartPage from '@/pages/StartPage';
import QuizPage from '@/pages/QuizPage';
import ResultsPage from '@/pages/ResultPage';
import { ROUTES } from '@/utils/routes';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path={ROUTES.HOME} element={<StartPage />} />
        <Route path={ROUTES.QUIZ} element={<QuizPage />} />
        <Route path={ROUTES.RESULT} element={<ResultsPage />} />
      </Routes>
    </Router>
  );
};

export default App;
