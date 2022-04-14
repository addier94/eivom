import React from 'react';
import {Layout} from '@components/common';
import {Text} from '@components/ui';

export default function Four0Four() {
  return (
    <div className="max-w-2xl mx-8 sm:mx-auto py-20 flex flex-col items-center justify-center fit">
      <Text variant="heading">Not Found</Text>
      <Text className="">
        The requested page doesnt exist or you dont have access to it.
      </Text>
    </div>
  );
};

Four0Four.Layout = Layout;

