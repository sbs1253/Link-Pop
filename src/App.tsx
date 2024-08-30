import { ThemeProvider } from 'styled-components';
import { GlobalStyle } from '@styles/GlobalStyle';
import theme from '@styles/theme';
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import AppLayout from '@layout/AppLayout';
import NotFound from '@pages/NotFound';
import Home from '@pages/Home';
import { Login } from '@pages/Login';
import { useStore } from '@store/useStore';

// const ProtectedRoute = ({ children }) => {
//   const { user } = useStore();
//   if (!user) {
//     return <Navigate to="/login" replace />;
//   }
//   return children;
// };
const router = createBrowserRouter([
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/',
    element: <AppLayout />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <Home />,
      },
    ],
  },
]);
function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
