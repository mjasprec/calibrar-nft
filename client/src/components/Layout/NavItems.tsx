'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import useUser from '@/hooks/useUser';
import React, { useEffect, useState } from 'react';

const authenticatedLinks = [
  {
    title: 'NFT',
    url: '/nft',
  },
  {
    title: 'Wallet',
    url: '/wallet',
  },
  {
    title: 'Profile',
    url: '/profile',
  },
];

function NavItems() {
  const pathname = usePathname();
  const { user } = useUser();
  const [navItems, setNavItems] = useState([
    {
      title: 'Home',
      url: '/',
    },
    {
      title: 'Marketplace',
      url: '/marketplace',
    },
  ]);

  useEffect(() => {
    if (user) {
      setNavItems([...navItems, ...authenticatedLinks]);
    }
  }, [user]);

  return (
    <div>
      {navItems.map((navItem) => (
        <Link
          key={navItem.title}
          href={navItem.url}
          className={`px-5 text[18px] font-Poppins font-[500] cursor-pointer ${
            navItem.url === pathname ? 'text-[#37b668]' : ''
          }`}
        >
          {navItem.title}
        </Link>
      ))}
    </div>
  );
}

export default React.memo(NavItems);
