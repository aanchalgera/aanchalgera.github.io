//@flow
import * as React from 'react';
import Loadable from 'react-loadable';
import Layout from 'containers/Layout';

const LoadableConfig = Loadable({
  loader: () => import('./Config'),
  loading() {
    return <div>Loading...</div>;
  }
});

type Props = {
  location: { search: string, pathname: string }
};

const Main = (props: Props) => {
  const { location: { pathname } } = props;
  if (
    pathname.indexOf('/publicar/') > -1 ||
    pathname.indexOf('/difundir/') > -1 ||
    pathname.indexOf('/edit/') > -1 ||
    pathname.indexOf('/escribir/') > -1 ||
    pathname.indexOf('/post/new') > -1
  ) {
    return <Layout {...props} />;
  }

  return <LoadableConfig {...props} />;
};

export default Main;
