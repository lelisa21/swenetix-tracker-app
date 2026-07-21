import IdeaForm from '../features/ideas/IdeaForm';
import IdeaList from '../features/ideas/IdeaList';
import { useEffect, useState } from 'react';
import type { IdeaListProps } from '../features/ideas/IdeaList';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../app/store';

function IdeasPage() {
  const [globalState, setGlobalState] = useState<IdeaListProps>({ list: [] });
  
  const dispatch = useDispatch<AppDispatch>();

  // this not finished i am just stack with redux i only did one application with it even i did a lot of great app without it,  due to that may be ....
  const fetchIdeas = async () => {
// setGlobalState()
  }
// useEffect(() => {
// dispatch(fetchIdeas())

// }, [dispatch])

  return (
    <div className="app-shell">
      <header className="app-header">
        <h1>Idea Tracker</h1>
        <p>Capture and browse ideas from the whole team.</p>
      </header>
      <main className="app-main">
        <IdeaForm />
        <IdeaList list={globalState.list} />
      </main>
    </div>
  );
}

export default IdeasPage;
