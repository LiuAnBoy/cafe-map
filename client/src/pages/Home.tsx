import { get } from 'mongoose';
import { useEffect } from 'react';
import { useHello } from '../application/useHello';

function HomePage() {
  const { getHello } = useHello();

  useEffect(() => {
    const hello = async () => {
      const hello = await getHello();
      console.log(hello);
    };
    hello();
  }, [getHello]);
  return (
    <section>
      <h1>HomePage</h1>
    </section>
  );
}

export default HomePage;
