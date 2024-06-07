'use client'

import { useRef, useState } from "react";
import DndListItem from "./DndListItem";
import DndPreview from "./DndPreview";

const DndList = ({ items, ListItem, ItemPreview }) => {
  const dndListRef = useRef(null);
  const [listItems, setListItems] = useState(items);
  const [hoverIdx, setHoverIdx] = useState(null);
  const [hoverBorder, setHoverBorder] = useState(null);

  const handleHover = (hoverIndex, border) => {
    setHoverIdx(hoverIndex);
    setHoverBorder(border);
  };

  const handleDrop = (dragIdx, dropIdx) => {
    setListItems((prev) => {
      const newListItems = prev.slice();
      newListItems.splice(dropIdx, 0, prev[dragIdx]);
      newListItems.splice(dragIdx + (dropIdx < dragIdx ? 1 : 0), 1);
      return newListItems;
    });
  };

  return (
    <>
      <div ref={dndListRef} className="flex flex-col w-[600px]">
        <ul className="list-none py-4 bg-white">
          {listItems.map((item, idx) => (
            <li
              key={item.id}
              className={`box-border ${
                (hoverIdx === idx && hoverBorder === "top" && idx === 0)
                  ? "border-t-2 border-t-blue-500"
                  : "border-t-2 border-t-white"
              } ${
                ((hoverIdx === idx && hoverBorder === "bottom") || (hoverIdx - 1 === idx && hoverBorder === "top"))
                  ? "border-b-2 border-b-blue-500"
                  : "border-b-2 border-b-white"
              }`}
            >
              <DndListItem
                enableDnd
                index={idx}
                itemInfo={item}
                onDrop={handleDrop}
                onHover={handleHover}
              >
                <ListItem {...item} />
              </DndListItem>
            </li>
          ))}
        </ul>
      </div>
      <DndPreview ItemPreview={ItemPreview} />
    </>
  );
};

export default DndList;
