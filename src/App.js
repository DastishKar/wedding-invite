import { useEffect } from 'react';
import Invitation from './components/Invitation';
import invitation from './config/invitation';
import './App.css';

function App() {
  useEffect(() => {
    document.title = invitation.meta.title;
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', invitation.meta.description);
    }
  }, []);

  return <Invitation />;
}

export default App;
