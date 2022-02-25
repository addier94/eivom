import cn from 'clsx';
import React, { FC } from 'react';

interface ContainerProps {
  className?: string
  children?:any
  el?:HTMLElement
  clean?: boolean
}

const Container: FC<ContainerProps> = ({
  className,
  children,
  el = 'div',
  clean,
}) => {
  const RootClassName = cn(className, {
    'mx-auto max-w-8xl px-6': !clean,
  });

  const Component: React.ComponentType<React.HTMLAttributes<HTMLDivElement>> = el as any;
  return (
    <div className={RootClassName}>{children}</div>
  );
};

export default Container;
