import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ComicProvider } from './context/ComicContext';
import { Toaster } from 'react-hot-toast';

import Home from './pages/Home';
import Creator from './pages/Creator';
import Viewer from './pages/Viewer';
import Gallery from './pages/Gallery';
import NotFound from './pages/NotFound';

import Header from './components/shared/Header';
import Footer from './components/shared/Footer';
import ErrorBoundary from './components/shared/ErrorBoundary';

function App() {
  return (
    <ErrorBoundary>
      <ComicProvider>
        <BrowserRouter>
          <div className="min-h-screen flex flex-col bg-slate-50">
            <Header />

            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/create" element={<Creator />} />
                <Route path="/comic/:id" element={<Viewer />} />
                <Route path="/gallery" element={<Gallery />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>

            <Footer />
          </div>

          <Toaster
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: '#363636',
                color: '#fff',
              },
              success: {
                iconTheme: {
                  primary: '#10b981',
                  secondary: '#fff',
                },
              },
              error: {
                iconTheme: {
                  primary: '#ef4444',
                  secondary: '#fff',
                },
              },
            }}
          />
        </BrowserRouter>
      </ComicProvider>
    </ErrorBoundary>
  );
}

export default App;
