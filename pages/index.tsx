import {Layout} from '@components/common';
import {MovieView} from '@components/movie';

export default function HomePage() {
  return (
    <>
      <MovieView />
    </>
  );
}

HomePage.Layout = Layout;

