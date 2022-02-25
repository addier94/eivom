import React, { FC } from 'react';
import cn from 'clsx';
import { Navbar } from '@components/common';

import { Page } from '@type/page';
import { Category } from '@type/site';
import s from './Layout.module.css';
import Footer from '../Footer';

interface Props {
  pageProps: {
    pages?: Page[]
    categories: Category[]
  }
}

const Layout: FC<Props> = ({
  children,
  pageProps: { categories = [], ...pageProps },
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
    </div>
  );
};

export default Layout;
