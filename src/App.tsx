import { AppProvider } from './context/AppContext';
import User from './components/User';
import UsedCarListings from './components/UsedCarListings';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import './styles/tailwind.css'; 

const queryClient = new QueryClient();

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AppProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<UsedCarListings />} />
            <Route path="/usedcarlisting" element={<UsedCarListings />} />
          </Routes>
        </BrowserRouter>
      </AppProvider>
    </QueryClientProvider>
  );
}

export default App;
