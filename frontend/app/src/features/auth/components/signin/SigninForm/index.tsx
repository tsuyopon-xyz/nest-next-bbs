import type { FC } from 'react';
import { ChangeEventHandler, FormEventHandler, useState } from 'react';
import type { SigninInput } from '../../../types';

export const SigninForm: FC = () => {
  const [signupInput, setSingupInput] = useState<SigninInput>({
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
    console.log(signupInput);
    try {
      const res = await fetch('http://localhost:8000/auth/signin', {
        method: 'POST',
        mode: 'cors',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(signupInput),
      });

      const data = await res.json();
      console.log({ data });
    } catch (error) {
      console.error('error : ', error);
    }
  };

  return (
    <form method="post" onSubmit={onSubmitHandler}>
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
        <input type="submit" value="ログイン" />
      </div>
    </form>
  );
};
