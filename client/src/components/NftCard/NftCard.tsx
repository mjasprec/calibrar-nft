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
};

function NftCard({
  name,
  description,
  price,
  category,
  imgUrl,
  idx,
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
      <CardFooter className='text-small justify-between grid grid-col-3'>
        <div>
          <b>{name}</b>
          <p className='text-default-500'>{description}</p>
        </div>

        <div className='flex justify-between'>
          <b>Price</b>
          <p className='text-default-500'>${price}</p>
        </div>

        <div className='flex justify-between'>
          <b>Category</b>
          <p className='text-default-500'>{category}</p>
        </div>
      </CardFooter>
    </Card>
  );
}

export default NftCard;
