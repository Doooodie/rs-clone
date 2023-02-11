import { useAppSelector } from '../../hooks';

function Cart() {
  const products = useAppSelector((state) => state.cart.products);

  if (!products.length)
    return (
      <main className='main'>
        <div className='container no-page-container'>
          <h1 className='no-page-header'>Cart is empty 😔</h1>
        </div>
      </main>
    );

  return (
    <main className='main'>
      <div className='container cart-container' />
    </main>
  );
}

export default Cart;
