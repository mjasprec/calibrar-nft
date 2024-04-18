'use client';
import AuthScreen from '@/screens/AuthScreen';
import { Avatar } from '@nextui-org/react';
import { useEffect, useState } from 'react';
import { CgProfile } from 'react-icons/cg';
import { IoLogOutOutline } from 'react-icons/io5';
import useUser from '@/hooks/useUser';
import Cookies from 'js-cookie';
import toast from 'react-hot-toast';

function ProfileDropDown() {
  const [signedIn, setSignedIn] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { loading, user } = useUser();

  useEffect(() => {
    if (!loading) {
      setSignedIn(!!user);
    }
  }, [loading, user]);

  const handleLogout = () => {
    console.log('CLICKED handleLogout');
    Cookies.remove('access_token');
    Cookies.remove('refresh_token');
    toast.success('Logout successfully');

    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };

  return (
    <div className='flex items-center gap-4'>
      {signedIn ? (
        <>
          <div className='flex flex-col items-center gap-2'>
            <Avatar
              as='button'
              className='transition-transform'
              src={
                user?.avatar?.imgUrl ||
                'https://sm.ign.com/ign_nordic/cover/a/avatar-gen/avatar-generations_prsz.jpg'
              }
            />
            <p className='font-semibold text-gray-500 text-[10px]'>
              Signed in as{' '}
              <span className='font-semibold text-blue-300'>
                {user?.username}
              </span>
            </p>
          </div>

          <IoLogOutOutline
            className='text-2xl text-red-400 cursor-pointer'
            onClick={handleLogout}
          />
        </>
      ) : (
        <CgProfile
          className='text-2xl cursor-pointer'
          onClick={() => setIsModalOpen((prev) => !prev)}
        />
      )}

      {/* {signedIn ? (
        <Dropdown placement='bottom-end'>
          <DropdownTrigger>
            <Avatar
              as='button'
              className='transition-transform'
              src={
                user?.avatar?.imgUrl ||
                'https://sm.ign.com/ign_nordic/cover/a/avatar-gen/avatar-generations_prsz.jpg'
              }
            />
          </DropdownTrigger>
          <DropdownMenu
            aria-label='Profile Actions'
            variant='flat'
          >
            <DropdownItem
              key='Profile'
              className='h-14 gap-2'
            >
              <p className='font-semibold text-gray-500 text-[12px]'>
                Signed in as
              </p>
              <p className='font-semibold'>{user?.username}</p>
            </DropdownItem>

            <DropdownItem key='Profile'>
              <Link href='profile'>
                <p className='font-semibold'>Profile</p>
              </Link>
            </DropdownItem>
            <DropdownItem key='Wallet'>
              <p className='font-semibold'>Wallet</p>
            </DropdownItem>
            <DropdownItem key='NFT'>
              <p className='font-semibold'>NFT</p>
            </DropdownItem>
            <DropdownItem
              key='logout'
              color='danger'
              onClick={handleLogout}
            >
              <p className='font-semibold'>Logout</p>
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      ) : (
        <CgProfile
          className='text-2xl cursor-pointer'
          onClick={() => setIsModalOpen((prev) => !prev)}
        />
        <button
          type='button'
          onClick={handleLogout}
        >
          Logout
        </button>
      )} */}

      {isModalOpen ? <AuthScreen setIsModalOpen={setIsModalOpen} /> : null}
    </div>
  );
}

export default ProfileDropDown;
