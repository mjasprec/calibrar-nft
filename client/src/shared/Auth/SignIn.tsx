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
  usernameOrEmail: z.string().min(6, 'Username must be at least 6 characters'),
  password: z.string().min(6, 'Username must be at least 6 characters'),
});

type SignInSchema = z.infer<typeof formSchema>;

type SignInPropType = {
  setActiveState: Dispatch<SetStateAction<string>>;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
};

function SignIn({ setActiveState, setIsModalOpen }: SignInPropType) {
  const [showPassword, setShowPassword] = useState(false);

  const [LoginUser, { loading }] = useMutation(LOGIN_USER);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<SignInSchema>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (formData: SignInSchema) => {
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    try {
      emailRegex.test(formData?.usernameOrEmail);
      const loginCredentials = {
        username: !emailRegex.test(formData?.usernameOrEmail)
          ? formData.usernameOrEmail
          : '',
        email: emailRegex.test(formData?.usernameOrEmail)
          ? formData.usernameOrEmail
          : '',
        password: formData.password,
      };

      const {
        data: {
          LoginUser: { user, accessToken, refreshToken, error },
        },
      } = await LoginUser({ variables: loginCredentials });

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
          Username/Email
        </label>
        <input
          {...register('usernameOrEmail')}
          type='text'
          placeholder='username or email'
          className={`${styles.input}`}
        />
        {errors.usernameOrEmail ? (
          <span className={`text-red-500 block mt-1`}>
            {errors.usernameOrEmail.message}
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
