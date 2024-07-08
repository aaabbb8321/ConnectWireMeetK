import React, { useState, useEffect, useRef } from "react";

const Draggable = ({ initialPos = { x: 0, y: 0 }, children }) => {
  const [pos, setPos] = useState(initialPos);
  const [dragging, setDragging] = useState(false);
  const [rel, setRel] = useState(null);
  const nodeRef = useRef(null);
  const parentRef = useRef(null);

  useEffect(() => {
    if (dragging) {
      document.addEventListener("mousemove", onMouseMove);
      document.addEventListener("mouseup", onMouseUp);
    } else {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    }
    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    };
  }, [dragging]);

  const onMouseDown = (e) => {
    if (e.button !== 0) return;
    const pos = nodeRef.current.getBoundingClientRect();
    const parentPos = parentRef.current.getBoundingClientRect();
    setDragging(true);
    setRel({
      x: e.pageX - pos.left + parentPos.left,
      y: e.pageY - pos.top + parentPos.top,
    });
    e.stopPropagation();
    e.preventDefault();
  };

  const onMouseUp = (e) => {
    setDragging(false);
    e.stopPropagation();
    e.preventDefault();
  };

  const onMouseMove = (e) => {
    if (!dragging) return;
    const parentPos = parentRef.current.getBoundingClientRect();
    const newX = e.pageX - rel.x;
    const newY = e.pageY - rel.y;
    const maxX = parentPos.width - nodeRef.current.offsetWidth;
    const maxY =
      (parentPos.height || window.innerHeight) - nodeRef.current.offsetHeight;

    setPos({
      x: Math.max(0, Math.min(newX, maxX)),
      y: Math.max(0, Math.min(newY, maxY)),
    });
    e.stopPropagation();
    e.preventDefault();
  };

  return (
    <div
      ref={parentRef}
      style={{ position: "relative", width: "100%", height: "100%" }}
    >
      <div
        ref={nodeRef}
        onMouseDown={onMouseDown}
        style={{
          position: "absolute",
          left: pos.x + "px",
          top: pos.y + "px",
          cursor: "move",
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default Draggable;
