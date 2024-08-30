import Footer from '@components/Footer';
import Header from '@components/Header';
import { useStore } from '@store/useStore';
import { Navigate, Outlet } from 'react-router-dom';
import styled from 'styled-components';
function AppLayout() {
  const { user } = useStore();
  if (!user) {
    return <Navigate to={{ pathname: '/login' }} />;
  }

  return (
    <Layout>
      <Header />
      <Outlet />
      <Footer />
    </Layout>
  );
}

export default AppLayout;

const Layout = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;
