import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import { Task } from "../Task/Task";

import "./Column.css";

export const Column = ({ tasks }) => {
  return (
    <div className="column">
      <SortableContext items={tasks.map(task => task.id)} strategy={verticalListSortingStrategy}>
        {tasks.map((task) => (
          <Task 
            key={task.id} 
            id={task.id} 
            title={task.title} 
            imageUrl={task.imageUrl} 
          />
        ))}
      </SortableContext>
    </div>
  );
};
