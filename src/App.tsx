import { ThemeProvider } from 'styled-components';
import { GlobalStyle } from '@styles/GlobalStyle';
import theme from '@styles/theme';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import AppLayout from '@layout/AppLayout';
import NotFound from '@pages/NotFound';
import Home from '@pages/Home';
import { Login } from '@pages/Login';
import PlaylistDetail from '@pages/PlaylistDetail';

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
      {
        path: 'playlist/:id',
        element: <PlaylistDetail />,
      },
    ],
  },
  {
    path: '*',
    element: <NotFound />,
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
