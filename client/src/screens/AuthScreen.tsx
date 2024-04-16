'use client';
import Otp from '@/shared/Auth/Otp';
import SignIn from '@/shared/Auth/SignIn';
import SignUp from '@/shared/Auth/SignUp';
import { Dispatch, SetStateAction, useState } from 'react';

type AuthScreenType = {
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
};

function AuthScreen({ setIsModalOpen }: AuthScreenType) {
  const [activeState, setActiveState] = useState('sign-in');

  const handleCloseModal = (e: any) => {
    if (e.target.id === 'auth-screen') {
      setIsModalOpen(false);
    }
  };

  return (
    <div
      className='w-full h-screen fixed top-0 left-0 z-50 flex items-center justify-center bg-[#0000003a]'
      id='auth-screen'
      onClick={(e) => handleCloseModal(e)}
    >
      <div className='w-[38%] h-auto bg-slate-900 rounded shadow-sm p-5'>
        {activeState === 'sign-in' ? (
          <SignIn
            setActiveState={setActiveState}
            setIsModalOpen={setIsModalOpen}
          />
        ) : null}

        {activeState === 'sign-up' ? (
          <SignUp setActiveState={setActiveState} />
        ) : null}

        {activeState === 'verification' ? (
          <Otp setActiveState={setActiveState} />
        ) : null}
      </div>
    </div>
  );
}

export default AuthScreen;
