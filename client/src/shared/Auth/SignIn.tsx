'use client';
import { LOGIN_USER } from '@/graphql/actions/login.action';
import styles from '@/utils/styles';
import { useMutation } from '@apollo/client';
import { zodResolver } from '@hookform/resolvers/zod';
import { Dispatch, SetStateAction, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { z } from 'zod';
import Cookies from 'js-cookie';

const formSchema = z.object({
  username: z.string().min(6, 'Username must be at least 6 characters'),
  password: z.string().min(6, 'Username must be at least 6 characters'),
});

type SignInSchema = z.infer<typeof formSchema>;

type SignInPropType = {
  setActiveState: Dispatch<SetStateAction<string>>;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
};

function SignIn({ setActiveState, setIsModalOpen }: SignInPropType) {
  const [showPassword, setShowPassword] = useState(false);

  const [login, { loading }] = useMutation(LOGIN_USER);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<SignInSchema>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: SignInSchema) => {
    try {
      const loginCredentials = {
        username: data.username,
        password: data.password,
      };

      const {
        data: {
          login: { user, error, accessToken, refreshToken },
        },
      } = await login({ variables: loginCredentials });

      if (user) {
        Cookies.set('access_token', accessToken, { expires: 1 });
        Cookies.set('refresh_token', refreshToken, { expires: 7 });
        setIsModalOpen(false);
        toast.success('Login successfully!');
        reset();
        window.location.reload();
      } else if (error) {
        toast.error(error.message);
      } else {
        toast.error('Something went wrong. Please try again.');
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <div>
      <h1 className={`${styles.title}`}>SignIn</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        <label
          htmlFor='username'
          className={`${styles.label}`}
        >
          Username
        </label>
        <input
          {...register('username')}
          type='text'
          placeholder='username'
          className={`${styles.input}`}
        />
        {errors.username ? (
          <span className={`text-red-500 block mt-1`}>
            {errors.username.message}
          </span>
        ) : null}

        <div className='w-full mt-5 relative mb-1'>
          <label
            htmlFor='password'
            className={`${styles.label}`}
          >
            Password
          </label>
          <input
            {...register('password')}
            type={!showPassword ? 'password' : 'text'}
            placeholder='password'
            className={`${styles.input}`}
          />

          {errors.password ? (
            <span className={`text-red-500 block mt-1`}>
              {errors.password.message}
            </span>
          ) : null}

          {!showPassword ? (
            <AiOutlineEyeInvisible
              className='absolute bottom-3 right-2 z-10 cursor-pointer'
              size={20}
              onClick={() => setShowPassword(true)}
            />
          ) : (
            <AiOutlineEye
              className='absolute bottom-3 right-2 z-10 cursor-pointer'
              size={20}
              onClick={() => setShowPassword(false)}
            />
          )}
        </div>

        <div className='w-full mt-5'>
          <span
            className={`${styles.label} my-2 text-[#2190ff] block text-right cursor-pointer`}
          >
            Forgot your password?
          </span>
          <input
            type='submit'
            value='Sign In'
            disabled={isSubmitting || loading}
            className={`${styles.button} mt-3`}
          />
        </div>

        <h5 className='text-center pt-4 font-Poppins text-[14px] text-white'>
          Don&apos;t have an account?
          <span
            className={`${styles.label}  text-[#2190ff] cursor-pointer ml-1`}
            onClick={() => setActiveState('sign-up')}
          >
            Sign Up
          </span>
        </h5>
      </form>
    </div>
  );
}

export default SignIn;
