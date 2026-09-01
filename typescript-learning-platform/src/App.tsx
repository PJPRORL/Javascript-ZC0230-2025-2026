import { HashRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Theory from './pages/Theory';
import Exercise from './pages/Exercise';
import Playground from './pages/Playground';

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="theory/:lecture" element={<Theory />} />
          <Route path="exercise/:lecture" element={<Exercise />} />
          <Route path="playground" element={<Playground />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}

export default App;
