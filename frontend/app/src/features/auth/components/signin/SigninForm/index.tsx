import { useRouter } from 'next/router';
import { ChangeEventHandler, FormEventHandler, useState, type FC } from 'react';
import { useAppDispatch, useAppSelector } from 'src/app/hooks';
import type { SigninInput } from '../../../types';
import { signin } from '../../../authSlice';

export const SigninForm: FC = () => {
  const dispatch = useAppDispatch();
  const signinState = useAppSelector((state) => state.auth.signin);
  const router = useRouter();
  const [signinInput, setSinginInput] = useState<SigninInput>({
    email: '',
    password: '',
  });

  const onChangeHandler: ChangeEventHandler<HTMLInputElement> = (event) => {
    setSinginInput({
      ...signinInput,
      [event.target.name]: event.target.value.trim(),
    });
  };

  const onSubmitHandler: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
    dispatch(signin(signinInput));
  };

  if (signinState.inProgress) {
    return <p>送信中...</p>;
  }

  if (signinState.accessToken) {
    //ログイン済みの場合は、認証後のメインページに飛ばす
    router.push('/');
    return <></>;
  }

  return (
    <>
      <ul>
        {signinState.error?.message ? (
          <li>{signinState.error.message}</li>
        ) : null}
      </ul>
      <form method="post" onSubmit={onSubmitHandler}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="text"
            id="email"
            name="email"
            value={signinInput.email}
            onChange={onChangeHandler}
          />
        </div>
        <div>
          <label htmlFor="password">パスワード</label>
          <input
            type="password"
            id="password"
            name="password"
            value={signinInput.password}
            onChange={onChangeHandler}
          />
        </div>
        <div>
          <input type="submit" value="ログイン" />
        </div>
      </form>
    </>
  );
};
