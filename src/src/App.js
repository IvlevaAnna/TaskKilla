import './App.css';
import { SignIn } from "./components/SignIn/SignIn";
import { BoardPage } from "./components/BoardPage/BoardPage";
import AddCardForm from './components/AddCardForm/AddCardForm';


function App() {
  return (
    <div className='App'>
      <AddCardForm />
      <BoardPage />
    </div>
  );
}

export default App;
