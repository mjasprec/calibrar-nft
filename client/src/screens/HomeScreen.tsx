import Header from '@/components/Layout/Header';

function HomeScreen({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <Header />
      {children}
    </div>
  );
}

export default HomeScreen;
