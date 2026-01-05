import { Clock } from "lucide-react";
import { useDraggable } from "@dnd-kit/core";

const Card = ({ id, title, company, amount, date, status, task }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({ id });
  const style = {
    transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className="bg-[#1a1d21] border border-[#283039] rounded-lg p-4 cursor-grab"
    >
      <div className="flex justify-between items-start mb-2">
        <span className="bg-blue-900/30 text-blue-300 text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">
          {status}
        </span>
      </div>
      <h4 className="text-white font-bold text-sm mb-1">{title}</h4>
      <p className="text-[#9cabba] text-xs mb-2">{company}</p>
      <p className="text-[#9cabba] text-xs mb-3">
        Date: {date ? new Date(date).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }) : "N/A"}
      </p>
      <div className="flex justify-between items-center border-t border-[#283039] pt-3 mt-2">
        <span className="text-white font-semibold text-sm">${amount}</span>
        <div className="flex items-center gap-1 text-[#9cabba] text-xs">
          <Clock size={14} />
          <p>{task}</p>
        </div>
      </div>
    </div>
  );
};

export default Card;
