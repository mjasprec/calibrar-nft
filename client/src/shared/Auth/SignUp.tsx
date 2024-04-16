'use client';
import { REGISTER_USER } from '@/graphql/actions/register.action';
import styles from '@/utils/styles';
import { useMutation } from '@apollo/client';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { Dispatch, SetStateAction, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { z } from 'zod';

const formSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  email: z.string().email(),
  username: z.string().min(6, 'Username must be at least 6 characters'),
  password: z.string().min(6, 'Username must be at least 6 characters'),
  about: z.string().min(16, 'About must be at least 16 characters'),
  birthday: z.coerce.date(),
  gender: z.string(),
  wallet: z.coerce.number().nonnegative(),
});

type SignUpSchema = z.infer<typeof formSchema>;

type SignUpPropType = {
  setActiveState: Dispatch<SetStateAction<string>>;
};

function SignUp({ setActiveState }: SignUpPropType) {
  const [registerUserMutation, { loading }] = useMutation(REGISTER_USER);

  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<SignUpSchema>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: SignUpSchema) => {
    try {
      const response = await registerUserMutation({
        variables: data,
      });
      localStorage.setItem(
        'activation_token',
        response.data.register.activation_token
      );
      toast.success('Please check your email to activate your account.');
      reset();
      setActiveState('verification');
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <div>
      <h1 className={`${styles.title}`}>Sign Up</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='flex flex-row gap-4'>
          <div className='w-full mt-3 relative mb-1'>
            <label
              htmlFor='firstName'
              className={`${styles.label}`}
            >
              First Name
            </label>
            <input
              {...register('firstName')}
              type='text'
              placeholder='First Name'
              className={`${styles.input}`}
            />
            {errors.firstName ? (
              <span className={`text-red-500 block mt-1`}>
                {errors.firstName.message}
              </span>
            ) : null}
          </div>
          <div className='w-full mt-3 relative mb-1'>
            <label
              htmlFor='lastName'
              className={`${styles.label}`}
            >
              Last Name
            </label>
            <input
              {...register('lastName')}
              type='text'
              placeholder='Last Name'
              className={`${styles.input}`}
            />
            {errors.lastName ? (
              <span className={`text-red-500 block mt-1`}>
                {errors.lastName.message}
              </span>
            ) : null}
          </div>
        </div>

        <div className='w-full mt-3 relative mb-1'>
          <label
            htmlFor='email'
            className={`${styles.label}`}
          >
            Email
          </label>
          <input
            {...register('email')}
            type='email'
            placeholder='email@email.com'
            className={`${styles.input}`}
          />
          {errors.email ? (
            <span className={`text-red-500 block mt-1`}>
              {errors.email.message}
            </span>
          ) : null}
        </div>

        <div className='flex flex-row gap-4'>
          <div className='w-full mt-3 relative mb-1'>
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
          </div>

          <div className='w-full mt-3 relative mb-1'>
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
                className='absolute bottom-2 right-2 z-10 cursor-pointer'
                size={20}
                onClick={() => setShowPassword(true)}
              />
            ) : (
              <AiOutlineEye
                className='absolute top-[35%] right-2 z-10 cursor-pointer'
                size={20}
                onClick={() => setShowPassword(false)}
              />
            )}
          </div>
        </div>

        <div className='w-full mt-3 relative mb-1'>
          <label
            htmlFor='about'
            className={`${styles.label}`}
          >
            About
          </label>

          <textarea
            {...register('about')}
            name='about'
            cols={30}
            rows={30}
            className={`${styles.input} p-1 h-[80px]`}
          ></textarea>

          {errors.about ? (
            <span className={`text-red-500 block mt-1`}>
              {errors.about.message}
            </span>
          ) : null}
        </div>

        <div className='flex flex-row gap-4'>
          <div className='flex flex-col gap-5 w-full mt-3 relative mb-1'>
            <label
              htmlFor='gender'
              className={`${styles.label}`}
            >
              Gender
            </label>
            <div className='w-full flex flex-row gap-3   mb-1 '>
              <div>
                <input
                  {...register('gender')}
                  type='radio'
                  name='gender'
                  value='male'
                />
                <label
                  htmlFor='male'
                  className='ml-2 inline-block'
                >
                  Male
                </label>
              </div>

              <div>
                <input
                  {...register('gender')}
                  type='radio'
                  name='gender'
                  value='female'
                />
                <label
                  htmlFor='female'
                  className='ml-2 inline-block'
                >
                  Female
                </label>
              </div>
            </div>
          </div>

          <div className='w-full mt-3 relative mb-1'>
            <label
              htmlFor='birthday'
              className={`${styles.label}`}
            >
              Birthday
            </label>
            <input
              {...register('birthday')}
              type='date'
              placeholder='birthday'
              className={`${styles.input}`}
            />
            {errors.birthday ? (
              <span className={`text-red-500 block mt-1`}>
                {errors.birthday.message}
              </span>
            ) : null}
          </div>
        </div>

        <div className='w-full mt-3 relative mb-1'>
          <label
            htmlFor='wallet'
            className={`${styles.label}`}
          >
            Wallet
          </label>
          <input
            {...register('wallet')}
            type='text'
            name='wallet'
            className={`${styles.input}`}
          />
          {errors.wallet ? (
            <span className={`text-red-500 block mt-1`}>
              {errors.wallet.message}
            </span>
          ) : null}
        </div>

        <div className='w-full mt-3'>
          <input
            type='submit'
            value='Sign Up'
            disabled={isSubmitting || loading}
            className={`${styles.button} mt-3`}
          />
        </div>

        <h5 className='text-center pt-4 font-Poppins text-[14px] text-white'>
          Already have an account?
          <span
            className={`${styles.label}  text-[#2190ff] cursor-pointer ml-1`}
            onClick={() => setActiveState('sign-in')}
          >
            Sign In
          </span>
        </h5>
      </form>
    </div>
  );
}

export default SignUp;
