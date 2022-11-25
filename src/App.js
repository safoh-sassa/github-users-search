import SearchBar from './components/searchBar';
import './App.css';

function App() {
  return (
    <div className="App">
      <h3>
        Search GitHub users/repositories related to a desired programing language.
      </h3>
      <SearchBar />
    </div>
  );
}

export default App;
