'use client';
import { FORGOT_PASSWORD } from '@/graphql/actions/forgotPassword.action';
import styles from '@/utils/styles';
import { useMutation } from '@apollo/client';
import { zodResolver } from '@hookform/resolvers/zod';
import { Dispatch, SetStateAction } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { z } from 'zod';

const formSchema = z.object({
  email: z.coerce.string().email(),
});

type ForgotPasswordSchema = z.infer<typeof formSchema>;

type ForgotPasswordProps = {
  setActiveState: Dispatch<SetStateAction<string>>;
};

function ForgotPassword({ setActiveState }: ForgotPasswordProps) {
  const [ForgotPassword, { loading }] = useMutation(FORGOT_PASSWORD);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ForgotPasswordSchema>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (formData: ForgotPasswordSchema) => {
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    emailRegex.test(formData?.email);

    try {
      const { data } = await ForgotPassword({
        variables: {
          email: formData.email,
        },
      });

      toast.success(data.ForgotPassword.message);
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <div>
      <h1 className={`${styles.title}`}>Forgot Password?</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        <label
          htmlFor='email'
          className={`${styles.label}`}
        >
          Email
        </label>
        <input
          {...register('email')}
          type='email'
          placeholder='email'
          className={`${styles.input}`}
        />
        {errors.email ? (
          <span className={`text-red-500 block mt-1`}>
            {errors.email.message}
          </span>
        ) : null}

        <div className='w-full mt-5'>
          <input
            type='submit'
            value='Submit'
            disabled={isSubmitting || loading}
            className={`${styles.button} mt-3`}
          />
        </div>

        <h5 className='text-center pt-4 font-Poppins text-[14px] text-white'>
          Or go back to
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

export default ForgotPassword;
