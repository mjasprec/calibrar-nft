'use client';
import { RESET_PASSWORD } from '@/graphql/actions/resetPassword.action';
import styles from '@/utils/styles';
import { useMutation } from '@apollo/client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { z } from 'zod';

const formSchema = z
  .object({
    password: z.string().min(6, 'Username must be at least 6 characters'),
    confirmPassword: z.string(),
  })
  .refine(
    (values) => {
      return values.password === values.confirmPassword;
    },
    {
      message: 'Passwords must match',
      path: ['confirmPassword'],
    }
  );

type ResetPasswordSchema = z.infer<typeof formSchema>;

type ResetPasswordPropType = {
  activationToken: string | string[] | undefined;
};

function ResetPassword({ activationToken }: ResetPasswordPropType) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [ResetPassword, { loading }] = useMutation(RESET_PASSWORD);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ResetPasswordSchema>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (formData: ResetPasswordSchema) => {
    try {
      const response = await ResetPassword({
        variables: {
          password: formData.password,
          activationToken,
        },
      });

      toast.success('Successfully reset password');
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <div className='w-full flex justify-center items-center h-screen'>
      <div className='md:w-[500px] w-full'>
        <h1 className={`${styles.title}`}>Reset Your Password</h1>

        <form onSubmit={handleSubmit(onSubmit)}>
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

          <div className='w-full mt-3 relative mb-1'>
            <label
              htmlFor='confirmPassword'
              className={`${styles.label}`}
            >
              Confirm Password
            </label>
            <input
              {...register('confirmPassword')}
              type={!showConfirmPassword ? 'password' : 'text'}
              placeholder='confirm password'
              className={`${styles.input}`}
            />

            {errors.confirmPassword ? (
              <span className={`text-red-500 block mt-1`}>
                {errors.confirmPassword.message}
              </span>
            ) : null}

            {!showConfirmPassword ? (
              <AiOutlineEyeInvisible
                className='absolute bottom-3 right-2 z-10 cursor-pointer'
                size={20}
                onClick={() => setShowConfirmPassword(true)}
              />
            ) : (
              <AiOutlineEye
                className='absolute bottom-3 right-2 z-10 cursor-pointer'
                size={20}
                onClick={() => setShowConfirmPassword(false)}
              />
            )}
          </div>

          <div className='w-full mt-5'>
            <input
              type='submit'
              value='Sign In'
              disabled={isSubmitting || loading}
              className={`${styles.button} mt-3`}
            />
          </div>
        </form>
      </div>
    </div>
  );
}

export default ResetPassword;
