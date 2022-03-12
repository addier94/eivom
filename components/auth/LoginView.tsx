import React, {
  FC, useEffect, useState, useCallback,
} from 'react';
import {Logo, Button, Input} from '@components/ui';
// import useLogin from '@framework/auth/use-login'
import {useUI} from '@components/ui/context';
import {validate} from 'email-validator';
import {useRouter} from 'next/router';
import {useForm} from 'react-hook-form';
import {getProviders, signIn} from 'next-auth/react';
import s from './SignUpView.module.css';
import {FormTextWarn, dn} from '@lib/form-style-warn';
import cn from 'clsx';
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import {RedirectableProviderType} from 'next-auth/providers';

type FormData = {
  email : string,
  password: string,
};

const SignInSchema = yup.object().shape({
  email: yup.string().required().email(),
  password: yup.string().required().min(6),
});

const LoginView: React.FC = () => {
  // Form State
  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');
  // const [loading, setLoading] = useState(false);
  // const [message, setMessage] = useState('');
  // const [dirty, setDirty] = useState(false);
  // const [disabled, setDisabled] = useState(false);
  // const {setModalView, closeModal} = useUI();

  // const login = useLogin()
  const router = useRouter();
  // const { loginUser } = useContext( AuthContext );

  const {register, handleSubmit, formState: {errors: err}} = useForm<FormData>({
    resolver: yupResolver(SignInSchema),
  });
  const [showError, setShowError] = useState(false);
  const {setModalView, closeModal} = useUI();

  const [providers, setProviders] = useState<any>({});

  useEffect(() => {
    getProviders().then( (prov) => {
      // console.log({prov});
      setProviders(prov);
    });
  }, []);

  const onLoginUser = async ( {email, password}: FormData ) => {
    setShowError(false);

    // const isValidLogin = await loginUser( email, password );
    // if ( !isValidLogin ) {
    //     setShowError(true);
    //     setTimeout(() => setShowError(false), 3000);
    //     return;
    // }
    // // Todo: navegar a la pantalla que el usuario estaba
    // const destination = router.query.p?.toString() || '/';
    // router.replace(destination);
    const res = await signIn<RedirectableProviderType>('credentials', {redirect: false, email, password});
    if (res?.ok) {
      // closeModal();
      console.log(res);
    }
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
        {true && (
          <div className="text-red border border-red p-3">
            {showError}
            . Did you
            <a
              className="text-accent-9 inline font-bold hover:underline cursor-pointer ml-1"
              onClick={() => setModalView('FORGOT_VIEW')}
            >
              forgot your password?
            </a>
          </div>
        )}
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
          // loading={loading}
          // disabled={disabled}
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
