import React, { useState, useEffect } from "react";
import "./App.css";
import "./components/card-list/card-list.component";
import { CardList } from "./components/card-list/card-list.component";
import { SearchBox } from "./components/search-box/search-box.component";

const App = () => {
  const [monsters, setMonster] = useState([]);
  const [searchField, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    const results = monsters.filter((monster) =>
      monster.name.toLowerCase().includes(searchField)
    );
    setSearchResults(results);
  }, [searchField, monsters]);

  const loadData = async () => {
    const response = await fetch(`https://jsonplaceholder.typicode.com/users`);
    response.json().then((results) => setMonster(results));
  };

  return (
    <div className="App">
      <h1>Monsters Rolodex</h1>
      <SearchBox
        placeholder="search monsters"
        handleChange={(e) => {
          setSearch(e.target.value);
        }}
      />
      <CardList monsters={searchResults} />
    </div>
  );
};

export default App;
