'use client';
import NftCard from '@/components/NftCard/NftCard';
import useUser from '@/hooks/useUser';
import HomeScreen from '@/screens/HomeScreen';
import { useEffect, useState } from 'react';

type NftPropType = {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  imgUrl: string;
  idx: number;
};

export default function Home() {
  const { loading, user } = useUser();
  const [isUserData, SetUserData] = useState<any>(null);

  useEffect(() => {
    if (!loading && user) {
      SetUserData(user);
    }
  }, [loading, user]);

  // console.log('isUserData', isUserData);

  return (
    <HomeScreen>
      <div className='h-screen max-w-[900px] mx-auto my-8 '>
        <div className='grid grid-cols-3 gap-4'>
          {isUserData?.nfts?.length > 0
            ? isUserData?.nfts?.map(
                ({
                  id,
                  name,
                  description,
                  price,
                  category,
                  imgUrl,
                  idx,
                }: NftPropType) => (
                  <NftCard
                    idx={idx}
                    nftId={id}
                    name={name}
                    description={description}
                    price={price}
                    category={category}
                    imgUrl={imgUrl}
                    isAdmin={isUserData?.role === 'Admin'}
                    isOwner={true}
                  />
                )
              )
            : null}
        </div>
      </div>
    </HomeScreen>
  );
}
