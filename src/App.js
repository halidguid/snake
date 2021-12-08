import React from "react";
import Snake from "./components/Snake";

const App = () => {
  return (
    <div className="App">
      <Snake
        colorSnake="#00FF00"
        colorFood="#FF0000" 
        border="1px solid black"
      />
    </div>
  );
};

export default App;
