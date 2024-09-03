import { useState } from "react";
import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  closestCorners,
} from "@dnd-kit/core";
import { arrayMove, sortableKeyboardCoordinates } from "@dnd-kit/sortable";

import { Column } from "./components/Column/Column";
import { Input } from "./components/Input/Input";

import "./App.css";

export default function App() {
  const [tasks, setTasks] = useState([
    { id: '1', title: "Add tests to homepage", imageUrl: 'https://wallpapercave.com/wp/wp3365565.jpg' },
    { id: '2', title: "Fix styling in about section", imageUrl: 'https://th.bing.com/th/id/OIP.nM7rzrbFk-T2mn-usGVTDQHaE8?pid=ImgDet&w=474&h=316&rs=1' },
    { id: '3', title: "Learn how to center a div", imageUrl: 'https://th.bing.com/th/id/OIP.1fuSDizuH1AhHs0ocWJMQAHaHa?w=512&h=512&rs=1&pid=ImgDetMain' },
  ]);

  const addTask = (title) => {
    setTasks((tasks) => [...tasks, { id: (tasks.length + 1).toString(), title }]);
  };

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const getTaskPos = (id) => tasks.findIndex((task) => task.id === id);

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (active.id === over.id) return;

    setTasks((tasks) => {
      const originalPos = getTaskPos(active.id);
      const newPos = getTaskPos(over.id);

      return arrayMove(tasks, originalPos, newPos);
    });
  };

  return (
    <div className="App">
      <h1>My Tasks ✅</h1>
      <Input onSubmit={addTask} />
      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragEnd={handleDragEnd}
      >
        <Column tasks={tasks} />
      </DndContext>
    </div>
  );
}
