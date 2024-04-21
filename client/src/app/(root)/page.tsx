'use client';
import NftCard from '@/components/NftCard/NftCard';
import useNfts from '@/hooks/useNfts';
import HomeScreen from '@/screens/HomeScreen';
import { useEffect, useState } from 'react';

type NftPropType = {
  name: string;
  description: string;
  price: string;
  category: string;
  imgUrl: string;
  idx: number;
};

export default function Home() {
  const [isNfts, setIsNfts] = useState([]);
  const { loading, nfts } = useNfts();

  useEffect(() => {
    if (!loading && nfts) {
      setIsNfts(nfts);
    }
  }, [loading, nfts]);

  console.log('loading', loading);
  console.log('isNfts', isNfts);
  return (
    <HomeScreen>
      <div className='h-screen max-w-[900px] mx-auto my-8'>
        <div className='grid grid-cols-3 gap-4'>
          {isNfts?.length > 0
            ? isNfts?.map(
                ({
                  name,
                  description,
                  price,
                  category,
                  imgUrl,
                  idx,
                }: NftPropType) => (
                  <NftCard
                    idx={idx}
                    name={name}
                    description={description}
                    price={price}
                    category={category}
                    imgUrl={imgUrl}
                  />
                )
              )
            : null}
        </div>
      </div>
    </HomeScreen>
  );
}
