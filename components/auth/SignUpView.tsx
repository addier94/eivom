import {FC, useState, useContext} from 'react';
import {Info} from '@components/icons';
import {useUI} from '@components/ui/context';
import {Logo, Button, Alert} from '@components/ui';
import {useForm} from 'react-hook-form';

import {signIn} from 'next-auth/react';
import {AuthContext} from './context';
import s from './SignUpView.module.css';
import cn from 'clsx';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {dn, FormTextWarn} from '@lib/form-style-warn';
import {RedirectableProviderType} from 'next-auth/providers';


type FormData = {
  name : string;
  email : string;
  password: string;
};

const SignupSchema = yup.object().shape({
  name: yup.string().required().min(2),
  email: yup.string().required().email(),
  password: yup.string().required().min(6),
});

const SignUpView: FC = () => {
  const {registerUser} = useContext( AuthContext );


  const {register, handleSubmit, formState: {errors: err}} = useForm<FormData>({
    resolver: yupResolver(SignupSchema),
  });

  const [showError, setShowError] = useState('');
  const [loading, setLoading] = useState(false);

  const onRegisterForm = async ( {name, email, password}: FormData ) => {
    setLoading(true);
    const {hasError, message} = await registerUser(name, email, password);

    if ( hasError ) {
      setShowError(message!);
      setLoading(false);
      return;
    }

    const res = await signIn<RedirectableProviderType>('credentials', {redirect: false, email, password});
    if (res?.ok) {
      closeModal();
    }
    setLoading(false);
  };


  const {setModalView, closeModal} = useUI();


  return (
    <form
      onSubmit={handleSubmit(onRegisterForm)}
      className="w-80 flex flex-col justify-between p-3"
    >
      <div className="flex justify-center pb-12 ">
        <Logo width="64px" height="64px" />
      </div>
      <div className="flex flex-col space-y-4">
        {showError && <Alert msg={showError} setShowError={setShowError} />}
        <input
          className={dn(s.root, s.inputWarning, err.name?.message)}
          placeholder='Name'
          { ...register('name')} />
        {err.name?.message && <FormTextWarn msg={err.name.message} />}

        <input
          className={cn(s.root, {[s.inputWarning]: err.email})}
          placeholder='Email'
          { ...register('email')} />
        {err.email?.message && <FormTextWarn msg={err.email.message} />}

        <input
          className={cn(s.root, {[s.inputWarning]: err.password})}
          placeholder='Password'
          type="password"
          { ...register('password')} />
        {err.password?.message && <FormTextWarn msg={err.password.message} />}

        <span className="text-accent-8">
          <span className="inline-block align-middle ">
            <Info width="15" height="15" />
          </span>{' '}
          <span className="leading-6 text-sm">
            <strong>Info</strong>: Passwords must be longer than 7 chars and
            include numbers.{' '}
          </span>
        </span>
        <div className="pt-2 w-full flex flex-col">
          <Button
            variant="slim"
            type="submit"
            loading={loading}
          >
            Sign Up
          </Button>
        </div>

        <span className="pt-1 text-center text-sm">
          <span className="text-accent-7">Do you have an account?</span>
          {` `}
          <a
            className="text-accent-9 font-bold hover:underline cursor-pointer"
            onClick={() => setModalView('LOGIN_VIEW')}
          >
            Log In
          </a>
        </span>
      </div>
    </form>
  );
};

export default SignUpView;
