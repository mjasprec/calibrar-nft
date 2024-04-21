'use client';
import useUser from '@/hooks/useUser';
import AuthScreen from '@/screens/AuthScreen';
import HomeScreen from '@/screens/HomeScreen';
import styles from '@/utils/styles';
import { Button } from '@nextui-org/button';
import { useEffect, useState } from 'react';

export default function Home() {
  const { loading, user } = useUser();
  const [signedIn, setSignedIn] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (!loading) {
      setSignedIn(!!user);
    }
  }, [loading, user]);

  return (
    <HomeScreen>
      <div className='w-full h-[92vh] banner flex items-center z-10 absolute'>
        <div className='backdrop_shaders w-full' />
        <div className='w-[80%] m-auto'>
          <h1 className='text-4xl py-5 xl:text-6xl font-[700] xl:leading-[80px] sm:mt-20 font-Inter'>
            NFT <br />
            Marketplace
          </h1>
          <p className={`${styles.label} !text-[18px]`}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            <br /> Duis dignissim velit sit amet nulla suscipit malesuada.
            Aenean dictum enim in dolor feugiat viverra. <br /> Nunc vel nibh
            suscipit, lobortis mauris ac, varius ipsum.
          </p>
          <br />
          {signedIn ? null : (
            <Button
              className={`${styles.button} w-[180px] md:mb-12`}
              onClick={() => setIsModalOpen((prev) => !prev)}
            >
              Sign In
            </Button>
          )}
        </div>
      </div>
      {isModalOpen ? <AuthScreen setIsModalOpen={setIsModalOpen} /> : null}
    </HomeScreen>
  );
}
