import { ChangeEventHandler, FormEventHandler, useState, type FC } from 'react';
import { useAppDispatch, useAppSelector } from 'src/app/hooks';
import type { SignupInput } from '../../../types';
import { signup } from '../../../authSlice';

export const SignupForm: FC = () => {
  const dispatch = useAppDispatch();
  const signupState = useAppSelector((state) => state.auth.signup);

  const [signupInput, setSingupInput] = useState<SignupInput>({
    name: '',
    email: '',
    password: '',
  });

  const onChangeHandler: ChangeEventHandler<HTMLInputElement> = (event) => {
    setSingupInput({
      ...signupInput,
      [event.target.name]: event.target.value.trim(),
    });
  };

  const onSubmitHandler: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
    dispatch(signup(signupInput));
  };

  if (signupState.inProgress) {
    return <p>送信中...</p>;
  }

  if (signupState.isSucceeded) {
    return (
      <>
        <p>仮登録に成功しました。</p>
        <p>
          本登録を完了するために、登録したメールのメールBoxをご確認ください。
        </p>
      </>
    );
  }

  const errorMessages = !signupState.error
    ? []
    : Array.isArray(signupState.error.message)
    ? signupState.error.message
    : [signupState.error.message];

  return (
    <>
      <ul>
        {errorMessages.map((text, index) => {
          return <li key={index}>{text}</li>;
        })}
      </ul>
      <form method="post" onSubmit={onSubmitHandler}>
        <div>
          <label htmlFor="name">名前</label>
          <input
            type="text"
            id="name"
            name="name"
            value={signupInput.name}
            onChange={onChangeHandler}
          />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="text"
            id="email"
            name="email"
            value={signupInput.email}
            onChange={onChangeHandler}
          />
        </div>
        <div>
          <label htmlFor="password">パスワード</label>
          <input
            type="password"
            id="password"
            name="password"
            value={signupInput.password}
            onChange={onChangeHandler}
          />
        </div>
        <div>
          <input type="submit" value="新規作成" />
        </div>
      </form>
    </>
  );
};
