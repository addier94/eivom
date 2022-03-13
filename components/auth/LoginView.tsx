import React, {useState} from 'react';
import {Logo, Button, Alert} from '@components/ui';
import {useUI} from '@components/ui/context';
import {signIn} from 'next-auth/react';
import s from './SignUpView.module.css';
import {FormTextWarn} from '@lib/form-style-warn';
import cn from 'clsx';
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import {RedirectableProviderType} from 'next-auth/providers';
import {useForm} from 'react-hook-form';

type FormData = {
  email : string,
  password: string,
};

const SignInSchema = yup.object().shape({
  email: yup.string().required().email(),
  password: yup.string().required().min(6),
});

const LoginView: React.FC = () => {
  const [loading, setLoading] = useState(false);

  const {register, handleSubmit, formState: {errors: err}} = useForm<FormData>({
    resolver: yupResolver(SignInSchema),
  });
  const [showError, setShowError] = useState('');
  const {setModalView, closeModal} = useUI();

  // const [providers, setProviders] = useState<any>({});

  // useEffect(() => {
  //   getProviders().then( (prov) => {
  //     console.log({prov});
  //     setProviders(prov);
  //   });
  // }, []);

  const onLoginUser = async ( {email, password}: FormData ) => {
    setLoading(true);

    const res = await signIn<RedirectableProviderType>('credentials', {redirect: false, email, password});
    if (res?.ok) {
      closeModal();
    } else {
      setShowError('Email or password wrong');
    }
    setLoading(false);
  };
  return (
    <form
      onSubmit={handleSubmit(onLoginUser)}
      className="w-80 flex flex-col justify-between p-3"
    >
      <div className="flex justify-center pb-12 ">
        <Logo width="64px" height="64px" />
      </div>
      <div className="flex flex-col space-y-3">

        {showError && <Alert msg={showError} setShowError={setShowError} />}

        <div className="text-red border border-red p-3">
            Did you
          <a
            className="text-accent-9 inline font-bold hover:underline cursor-pointer ml-1"
            onClick={() => setModalView('FORGOT_VIEW')}
          >
              forgot your password?
          </a>
        </div>
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
        <Button
          variant="slim"
          type="submit"
          loading={loading}
        >
          Log In
        </Button>
        <div className="pt-1 text-center text-sm">
          <span className="text-accent-7 mr-1">Dont have an account?</span>
          <a
            className="text-accent-9 font-bold hover:underline cursor-pointer"
            onClick={() => setModalView('SIGNUP_VIEW')}
          >
            Sign Up
          </a>
        </div>
      </div>
    </form>
  );
};

export default LoginView;
