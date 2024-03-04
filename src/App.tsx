import { AppProvider } from './context/AppContext';
import User from './components/User';
import Listings from './components/Listings';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import './styles/tailwind.css'; 
import ListingDetail from './components/ListingDetail';

const queryClient = new QueryClient();

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AppProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<User />} />
            <Route path="/listings" element={<Listings />} />
            <Route path="/listing/:id" element={<ListingDetail />} />
          </Routes>
        </BrowserRouter>
      </AppProvider>
    </QueryClientProvider>
  );
}

export default App;
