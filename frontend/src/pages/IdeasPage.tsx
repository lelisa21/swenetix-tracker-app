import IdeaForm from '../features/ideas/IdeaForm';
import IdeaList from '../features/ideas/IdeaList';
import { useEffect, useState } from 'react';
import type { IdeaListProps } from '../features/ideas/IdeaList';

import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../app/store';
import { fetchIdeasRequested } from '../features/ideas/ideasSlice';

function IdeasPage() {  
  const dispatch = useDispatch<AppDispatch>();
  const ideas = useSelector(
    (state:RootState) => state.ideas.list
  )

  useEffect(() => {
 dispatch(fetchIdeasRequested())
  }, [dispatch])

  return (
    <div className="app-shell">
      <header className="app-header">
        <h1>Idea Tracker</h1>
        <p>Capture and browse ideas from the whole team.</p>
      </header>
      <main className="app-main">
        <IdeaForm />
        <IdeaList list={ideas} />
      </main>
    </div>
  );
}

export default IdeasPage;
