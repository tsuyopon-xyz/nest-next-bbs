import type { FC } from 'react';
import { ChangeEventHandler, FormEventHandler, useState } from 'react';
import type { SignupInput } from '../../../types';

export const SignupForm: FC = () => {
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
    console.log(signupInput);
    try {
      const res = await fetch('http://localhost:8000/auth/signup', {
        method: 'POST',
        mode: 'cors',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(signupInput),
      });
      if (res.status === 201) {
        console.log('作成成功');
      } else {
        console.log('作成失敗 : ', res.status);
      }
    } catch (error) {
      console.error('error : ', error);
    }
  };

  return (
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
  );
};
