// App.js
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import LandingPage from './Components/LandingPage';
import DemoBookingPage from './Components/DemoBookingPage';

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "/book-demo",
    element: <DemoBookingPage />,
  },
]);

function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App; 