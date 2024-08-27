import { ThemeProvider } from 'styled-components';
import { GlobalStyle } from '@styles/GlobalStyle';
import theme from '@styles/theme';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import AppLayout from '@layout/AppLayout';
import NotFound from '@pages/NotFound';
import Home from '@pages/Home';

const router = createBrowserRouter([
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
