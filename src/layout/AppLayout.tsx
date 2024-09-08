import Footer from '@components/Footer';
import Header from '@components/Header';
import { useUserStore } from '@store/useUserStore';
import { Navigate, Outlet } from 'react-router-dom';
import styled from 'styled-components';
function AppLayout() {
  const user = useUserStore((state) => state.isLogin);
  console.log(user);
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
