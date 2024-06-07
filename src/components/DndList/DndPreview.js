'use client'

import { useDragLayer } from "react-dnd";

const DndPreview = ({ ItemPreview }) => {
  const { isDragging, item, clientOffset } = useDragLayer((monitor) => ({
    item: monitor.getItem(),
    itemType: monitor.getItemType(),
    clientOffset: monitor.getClientOffset(),
    isDragging: monitor.isDragging(),
  }));

  if (!item || !isDragging || !clientOffset) {
    return null;
  }

  const { itemRef, itemInfo } = item;

  if (!itemRef) {
    return null;
  }

  const { x: clientX, y: clientY } = clientOffset;
  const width = itemRef.current.offsetWidth / 2;
  const height = itemRef.current.offsetHeight / 2;
  const left = clientX - width / 2;
  const top = clientY - height / 2;

  return (
    <div
      className={`fixed z-[7890] border border-[rgba(0,0,0,0.1)] shadow-[0_8px_16px_0_rgba(6,31,48,0.08)] bg-white rounded-lg flex items-center pointer-events-none cursor-grabbing`}
      style={{
        top: `${top}px`,
        left: `${left}px`,
        width: `${width}px`,
        height: `${height}px`,
      }}
    >
      <ItemPreview {...itemInfo} />
    </div>
  );
};

export default DndPreview;