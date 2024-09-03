import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import "./Task.css";

export const Task = ({ id, title, imageUrl }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="task"
    >
      <div className="task-content">
        <div className="task-images">
          {imageUrl && <img src={imageUrl} alt={title} className="task-image" />}
        </div>
        <div className="task-title">
          <input type="checkbox" className="checkbox" />
          <span>{title}</span>
        </div>
      </div>
    </div>
  );
};
