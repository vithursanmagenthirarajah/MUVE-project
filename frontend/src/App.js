import React from 'react';
import { BrowserRouter as Router, Route, Switch ,Routes} from "react-router-dom";
import TaskList from './components/TaskList';
import TaskDetails from './components/TaskDetails';

function App() {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<TaskList />}></Route>
      <Route path="/task/:id" component={TaskDetails} />
      </Routes>
    </Router>
   
  );
}

export default App;
