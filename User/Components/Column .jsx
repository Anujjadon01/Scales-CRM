import { useDroppable } from "@dnd-kit/core";
import Card from "./Card";

const Column = ({ id, title, cards }) => {
  const { setNodeRef, isOver } = useDroppable({ id });

  return (
    <div ref={setNodeRef} className={`flex-shrink-0 w-64 ${isOver ? "bg-[#1f2937]" : ""}`}>
      <h3 className="text-sm font-bold text-white flex items-center gap-2 mb-4">
        {title}
      </h3>
      <div className="space-y-3">
        {cards.map((card) => (
          <Card
            key={card.id}
            id={card.id}
            title={card.title}
            company={card.company}
            amount={card.amount}
            date={card.date}
            status={card.status}
            task={card.task}
          />
        ))}
      </div>
    </div>
  );
};

export default Column;
