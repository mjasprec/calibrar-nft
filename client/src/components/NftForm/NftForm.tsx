'use client';
import { UPDATE_NFT } from '@/graphql/actions/updateNft.action';
import styles from '@/utils/styles';
import { useMutation } from '@apollo/client';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { Dispatch, SetStateAction, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { z } from 'zod';

const formSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  description: z.string().min(12, 'Description must be at least 12 characters'),
  price: z.coerce.number().nonnegative(),
  category: z.coerce.string(),
  imgUrl: z.coerce.string(),
});

type NftSchema = z.infer<typeof formSchema>;

type NftFormPropTypes = {
  isNftModal: boolean;
  setIsNftModal: Dispatch<SetStateAction<boolean>>;
  nftId: string;
  name: string;
  description: string;
  price: string;
  category: string;
  imgUrl: string;
};

function NftForm({
  nftId,
  name,
  description,
  price,
  category,
  imgUrl,
  isNftModal,
  setIsNftModal,
}: NftFormPropTypes) {
  const [RegisterUser, { loading }] = useMutation(UPDATE_NFT);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<NftSchema>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: NftSchema) => {
    try {
      toast.success('Please check your email to activate your account.');
      reset();
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const handleCloseModal = (e: any) => {
    if (e.target.id === 'nft-screen') {
      setIsNftModal(false);
    }
  };

  if (!isNftModal) {
    return <></>;
  }

  return (
    <div
      className='w-full h-screen fixed top-0 left-0 z-50 flex items-center justify-center bg-[#0000003a]'
      id='nft-screen'
      onClick={(e) => handleCloseModal(e)}
    >
      <div className='w-[38%] h-auto bg-slate-900 rounded shadow-sm p-5'>
        <div>
          <h1 className={`${styles.title}`}>Edit NFT</h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className='flex flex-row gap-4'>
              <div className='w-full mt-3 relative mb-1'>
                <label
                  htmlFor='name'
                  className={`${styles.label}`}
                >
                  Name
                </label>
                <input
                  {...register('name')}
                  type='text'
                  placeholder='name'
                  className={`${styles.input}`}
                  value={name ? name : ''}
                />
                {errors.name ? (
                  <span className={`text-red-500 block mt-1`}>
                    {errors.name.message}
                  </span>
                ) : null}
              </div>
            </div>

            <div className='w-full mt-3 relative mb-1'>
              <label
                htmlFor='description'
                className={`${styles.label}`}
              >
                Description
              </label>
              <input
                {...register('description')}
                type='text'
                placeholder='description'
                className={`${styles.input}`}
                value={description ? description : ''}
              />
              {errors.description ? (
                <span className={`text-red-500 block mt-1`}>
                  {errors.description.message}
                </span>
              ) : null}
            </div>

            <div className='flex flex-row gap-4'>
              <div className='w-full mt-3 relative mb-1'>
                <label
                  htmlFor='price'
                  className={`${styles.label}`}
                >
                  Price
                </label>
                <input
                  {...register('price')}
                  type='text'
                  placeholder='price'
                  className={`${styles.input}`}
                  value={price ? price : ''}
                />
                {errors.price ? (
                  <span className={`text-red-500 block mt-1`}>
                    {errors.price.message}
                  </span>
                ) : null}
              </div>

              <div className='w-full mt-3 relative mb-1'>
                <label
                  htmlFor='category'
                  className={`${styles.label}`}
                >
                  Category
                </label>

                <select
                  {...register('category')}
                  className={`${styles.input}`}
                  value={category ? category : ''}
                >
                  <option value='basketball'>Basketball</option>
                  <option value='boxing'>Boxing</option>
                  <option value='mma'>MMA</option>
                  <option value='hockey'>Hockey</option>
                </select>

                {errors.category ? (
                  <span className={`text-red-500 block mt-1`}>
                    {errors.category.message}
                  </span>
                ) : null}
              </div>
            </div>
            <div className='w-full mt-3 relative mb-1'>
              <label
                htmlFor='imgUrl'
                className={`${styles.label}`}
              >
                Image Url
              </label>
              <input
                {...register('imgUrl')}
                type='text'
                placeholder='url'
                className={`${styles.input}`}
                value={imgUrl ? imgUrl : ''}
              />
              {errors.imgUrl ? (
                <span className={`text-red-500 block mt-1`}>
                  {errors.imgUrl.message}
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
          </form>
        </div>
      </div>
    </div>
  );
}

export default NftForm;
