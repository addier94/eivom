import {FC, useEffect, useState, useCallback, useContext} from 'react';
import {validate} from 'email-validator';
import {Info} from '@components/icons';
import {useUI} from '@components/ui/context';
import {Logo, Button, Input} from '@components/ui';
import {useForm} from 'react-hook-form';

import {signIn, getSession} from 'next-auth/react';
import {AuthContext} from './context';
import s from './SignUpView.module.css';
import cn from 'clsx';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {dn, FormTextWarn} from '@lib/form-style-warn';

// import useSignup from '@framework/auth/use-signup';

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

  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const onRegisterForm = async ( {name, email, password}: FormData ) => {
    setShowError(false);
    const {hasError, message} = await registerUser(name, email, password);

    if ( hasError ) {
      setShowError(true);
      setErrorMessage( message! );
      setTimeout(() => setShowError(false), 3000);
      return;
    }
    // Todo: navegar a la pantalla que el usuario estaba
    // const destination = router.query.p?.toString() || '/';
    // router.replace(destination);
    await signIn('credentials', {email, password});
  };
  // Form State
  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');
  // const [firstName, setFirstName] = useState('');
  // const [lastName, setLastName] = useState('');
  // const [loading, setLoading] = useState(false);
  // const [message, setMessage] = useState('');
  // const [dirty, setDirty] = useState(false);
  // const [disabled, setDisabled] = useState(false);


  const {setModalView, closeModal} = useUI();

  // const handleSignup = async (e: React.SyntheticEvent<EventTarget>) => {
  //   e.preventDefault();

  //   if (!dirty && !disabled) {
  //     setDirty(true);
  //     handleValidation();
  //   }
  // };

  // const handleValidation = useCallback(() => {

  //   const validPassword = /^(?=.*[a-zA-Z])(?=.*[0-9])/.test(password);


  //   if (dirty) {
  //     setDisabled(!validate(email) || password.length < 7 || !validPassword);
  //   }
  // }, [email, password, dirty]);

  // useEffect(() => {
  //   handleValidation();
  // }, [handleValidation]);

  return (
    <form
      onSubmit={handleSubmit(onRegisterForm)}
      className="w-80 flex flex-col justify-between p-3"
    >
      <div className="flex justify-center pb-12 ">
        <Logo width="64px" height="64px" />
      </div>
      <div className="flex flex-col space-y-4">
        {errorMessage && (
          <div className="text-red border border-red p-3">{errorMessage}</div>
        )}
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
            // loading={loading}
            // disabled={disabled}
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
