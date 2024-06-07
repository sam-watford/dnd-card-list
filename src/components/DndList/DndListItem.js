'use client'

import { useEffect, useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import { getEmptyImage } from "react-dnd-html5-backend";

const DndListItem = ({ index, itemInfo, onDrop, onHover, enableDnd = false, children }) => {
  const itemRef = useRef(null);

  const [{ opacity }, drag, preview] = useDrag({
    type: "dnd-list-item",
    canDrag: enableDnd,
    item: () => {
      return { index, itemInfo, itemRef };
    },
    collect: (monitor) => ({
      opacity: monitor.isDragging() ? 30 : 100,
    }),
    end: (item, monitor) => {
      onHover(null, null);
      const didDrop = monitor.didDrop();
      const dropResult = monitor.getDropResult();
      if (didDrop && dropResult && dropResult.dropIdx !== item.index) {
        onDrop(item.index, dropResult.dropIdx);
      }
    },
  });

  const [, drop] = useDrop({
    accept: "dnd-list-item",
    canDrop: () => enableDnd,
    hover: (item, monitor) => {
      if (itemRef.current) {
        const hoverRect = itemRef.current.getBoundingClientRect();
        const hoverMiddleY = (hoverRect.bottom + hoverRect.top) / 2;
        const hoverClientY = monitor.getClientOffset()?.y || 0;

        if (hoverClientY < hoverMiddleY) {
          onHover(index, "top");
        }
        if (hoverClientY > hoverMiddleY) {
          onHover(index, "bottom");
        }
      }
    },
    drop: (item, monitor) => {
      if (itemRef.current) {
        const hoverRect = itemRef.current.getBoundingClientRect();
        const hoverMiddleY = (hoverRect.bottom + hoverRect.top) / 2;
        const hoverClientY = monitor.getClientOffset()?.y || 0;

        if (hoverClientY < hoverMiddleY) {
          return { dropIdx: index };
        }
        if (hoverClientY > hoverMiddleY) {
          return { dropIdx: index + 1 };
        }
      }
    },
  });

  useEffect(() => {
    preview(getEmptyImage(), { captureDraggingState: false });
  }, [preview]);

  drag(drop(itemRef));

  return (
    <div
      ref={itemRef}
      className={`
        relative
        bg-white
        text-black
        cursor-pointer
        select-none
        opacity-${opacity}
      `}
    >
      {children}
    </div>
  );
};

export default DndListItem;