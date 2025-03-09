import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { FluentProvider } from '@fluentui/react-components';
import { theme } from './styles/theme';
import FluentHeader from './components/FluentHeader';
import FluentSidebar from './components/FluentSidebar';
import HomePage from './pages/HomePage';
import { RealtimeAudioChat } from './pages/RealtimeAudioChat';

const App: React.FC = () => {
    return (
        <BrowserRouter>
          <FluentProvider theme={theme}>
            <FluentHeader />
            <FluentSidebar />
            <div style={{ marginLeft: '200px', paddingTop: '48px' }}>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/audio-chat" element={<RealtimeAudioChat />} />
                {/* Add more routes here */}
              </Routes>
            </div>
          </FluentProvider>
        </BrowserRouter>
    );
};

export default App;
