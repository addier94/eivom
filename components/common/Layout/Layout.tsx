import React, {FC} from 'react';
import cn from 'clsx';
import {Navbar} from '@components/common';

import {Page} from '@type/page';
import {Category} from '@type/site';
import {CheckoutProvider} from '@components/checkout/context';
import {useUI} from '@components/ui/context';
import {LoadingDots, Sidebar} from '@components/ui';
import dynamic from 'next/dynamic';
import {ForgotPassword, LoginView, SignUpView} from '@components/auth';
import s from './Layout.module.css';
import Footer from '../Footer';
import MenuSidebarView, {Link} from '../UserNav/MenuSidebarView';

const Loading = () => (
  <div className="w-80 h-80 flex items-center text-center justify-center p-3">
    <LoadingDots />
  </div>
);

const dynamicProps = {
  loading: Loading,
};

const Modal = dynamic(
    () => import('@components/ui/Modal'),
    {
      ...dynamicProps,
      ssr: false,
    },
);

interface Props {
  pageProps: {
    pages?: Page[]
    categories: Category[]
  }
}

const ModalView: FC<{modalView: string; closeModal(): any}> = ({
  modalView,
  closeModal,
}) => (
  <Modal onClose={closeModal}>
    {modalView === 'LOGIN_VIEW' && <LoginView />}
    {modalView === 'SIGNUP_VIEW' && <SignUpView />}
    {modalView === 'FORGOT_VIEW' && <ForgotPassword />}
  </Modal>
);

const ModalUI: FC = () => {
  const {displayModal, closeModal, modalView} = useUI();

  return displayModal ? (
    <ModalView modalView={modalView} closeModal={closeModal} />
  ) : null;
};

const SidebarView: FC<{
  sidebarView: string,
  closeSidebar(): any,
  links: Link[]
}> = ({sidebarView, closeSidebar, links}) => (
  <Sidebar onClose={closeSidebar}>
    { sidebarView === 'MOBILEMENU_VIEW' && <MenuSidebarView links={links} />}
  </Sidebar>
);

const SidebarUI: FC<{ links: any}> = ({links}) => {
  const {displaySidebar, closeSidebar, sidebarView} = useUI();

  return displaySidebar ? (
    <SidebarView
      sidebarView={sidebarView}
      closeSidebar={closeSidebar}
      links={links}
    />
  ) : null;
};

const Layout: FC<Props> = ({
  children,
  pageProps: {categories = [], ...pageProps},
}) => {
  const navBarlinks = categories.slice(0, 2).map((c) => ({
    label: c.name,
    href: `/search/${c.slug}`,
  }));

  return (
    <div className={cn(s.root)}>
      <Navbar links={navBarlinks} />
      <main className="fit">{children}</main>
      <Footer pages={pageProps.pages} />
      <ModalUI />
      <CheckoutProvider>
        <SidebarUI links={navBarlinks} />
      </CheckoutProvider>
    </div>
  );
};

export default Layout;
