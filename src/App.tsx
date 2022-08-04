import React from "react";
import { SortableList } from "./components/SortableList";
import { getInitialList } from "./data";

export default function App() {
  return (
    <div className="App">
      <SortableList data={getInitialList()} />
    </div>
  );
}