import Footer from '@components/Footer';
import Header from '@components/Header';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
function AppLayout() {
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
