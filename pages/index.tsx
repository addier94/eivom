import {Layout} from '@components/common';
import {MovieView} from '@components/movie';


export default function Home() {
  return (
    <>
      <MovieView />
    </>
  );
}

Home.Layout = Layout;
