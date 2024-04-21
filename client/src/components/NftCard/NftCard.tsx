import styles from '@/utils/styles';
import {
  Card,
  CardHeader,
  CardBody,
  Image,
  CardFooter,
} from '@nextui-org/react';

type NftCardProps = {
  name: string;
  description: string;
  price: string;
  category: string;
  imgUrl: string;
  idx: number;
  isAdmin?: boolean;
  isOwner?: boolean;
};

function NftCard({
  name,
  description,
  price,
  category,
  imgUrl,
  idx,
  isAdmin,
  isOwner,
}: NftCardProps) {
  return (
    <Card
      shadow='sm'
      key={idx}
      isPressable
      onPress={() => console.log('item pressed')}
    >
      <CardBody className='overflow-visible p-0'>
        <Image
          shadow='sm'
          radius='lg'
          width='100%'
          alt={name}
          className='w-full object-cover h-[240px]'
          src={imgUrl}
        />
      </CardBody>
      <CardFooter className='text-small justify-between'>
        <div className='w-full '>
          <div>
            <b>{name}</b>
            <p className='text-default-500'>{description}</p>
          </div>

          <div className='flex justify-between'>
            <p className='text-default-500'>Price</p>
            <b>${price}</b>
          </div>

          <div className='flex justify-between'>
            <p className='text-default-500'>Category</p>
            <b>{category}</b>
          </div>

          <input
            type='submit'
            value='Buy'
            disabled={false}
            className={`${styles.buttonPurchase} mt-3`}
          />

          {isAdmin || isOwner ? (
            <div className='flex gap-3'>
              <input
                type='submit'
                value='Delete'
                disabled={false}
                className={`${styles.buttonDanger} mt-3`}
              />
              <input
                type='submit'
                value='Edit'
                disabled={false}
                className={`${styles.buttonInfo} mt-3`}
              />
            </div>
          ) : null}
        </div>
      </CardFooter>
    </Card>
  );
}

export default NftCard;
