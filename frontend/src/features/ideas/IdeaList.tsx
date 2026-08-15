import { useEffect, useState } from "react";
import type { Idea } from "./types";

export interface IdeaListProps {
  list: Idea[];
}

function IdeaList({ list }: IdeaListProps) {
  const [renderInfo, setRenderInfo] = useState({
    count: 0,
    timestamp: Date.now(),
  });

  useEffect(() => {
    setRenderInfo({
      count: renderInfo.count + 1,
      timestamp: Date.now(),
    });
  }, [list]);

  if (list.length === 0) {
    return (
      <p className="status-message">
        No ideas yet. Be the first to submit one!
      </p>
    );
  }

  return (
    <div>
      <div className="render-info">
        Last updated: {new Date(renderInfo.timestamp).toLocaleTimeString()}
      </div>
      <ul className="idea-list">
        {list.map((idea) => (
          <li key={idea._id} className="idea-card">
            <h3>{idea.title}</h3>
            <p>{idea.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default IdeaList;
