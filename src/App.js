import "./App.css";
import { useState } from "react";
import Draggable from "./commonComponent/DraggableComponent/DraggableComponent";

const NestedDraggableComponent = ({ children }) => {
  return children > 0 ? (
    <Draggable initialPos={{ x: 50, y: 50 }}>
      <div className="draggable-content">Title {children}</div>

      <div
        className={`recursive-container`}
        style={{
          height: `${(children + 1) * 100}px`,
          width: `${(children + 1) * 180}px`,
        }}
      >
        {children > 0 && <NestedDraggableComponent children={children - 1} />}
      </div>
    </Draggable>
  ) : null;
};

function App() {
  const [count, setCount] = useState(0);

  const addParent = () => {
    setCount(count + 1);
  };

  return (
    <div className="App">
      <span>Meet Kachhadiya</span>
      <button onClick={addParent} className="parent-button">
        Add Parent{" "}
      </button>
      <NestedDraggableComponent children={count} />
    </div>
  );
}

export default App;
