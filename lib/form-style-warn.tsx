import cn from 'clsx';

export const dn = (mainStyle:string, extraStyle:string, evaluate?:string) => {
  return cn(mainStyle, {[extraStyle]: !!evaluate});
};

export const FormTextWarn = ({msg}:{msg:string}) => {
  return <p
    className='text-sm font-light outline-none shadow-outline-normal text-red'
    style={{margin: '0'}}
  >{msg}
  </p>;
};
