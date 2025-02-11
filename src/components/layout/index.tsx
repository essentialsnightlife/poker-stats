import { Header } from './header';
import { Footer } from './footer';

export const Layout = () => {
  return (
    <>
      <Header />
      <main className='container py-5'>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};
