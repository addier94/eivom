import {useUI} from '@components/ui/context';
import React, {FC, useState} from 'react';
import cn from 'clsx';
import Link from 'next/link';
import {Heart, Menu} from '@components/icons';
import {Button} from '@components/ui';
import s from './UserNav.module.css';
import {Avatar} from '..';
import DropdownMenu from './DropdownMenu';

interface Props {
  className?: string
}

const UserNav: FC<Props> = ({className}) => {
  const [customer, setCustomer] = useState(false);
  const {
    toggleSidebar, openModal, setSidebarView, closeSidebarIfPresent,
  } = useUI();

  return (
    <div className={cn(s.root, className)}>
      <ul className={s.list}>
        <li className={s.item}>
          <Link href="/wishlist">
            <a onClick={closeSidebarIfPresent} aria-label="Wishlist">
              <Heart />
            </a>
          </Link>
        </li>
        <li className={s.mobileMenu}>
          <Button
            className={s.item}
            variant="naked"
            onClick={() => {
              setSidebarView('MOBILEMENU_VIEW');
              toggleSidebar();
            }}
            aria-label="Menu"
          >
            <Menu />
          </Button>
        </li>
        <li className={s.item}>
          { customer ? (
              <DropdownMenu />
            ) : (
              <button className={s.avatarButton}
                aria-label="Menu"
                onClick={() => openModal()}>
                <Avatar />
              </button>
            )}
        </li>
      </ul>
    </div>
  );
};

export default UserNav;
