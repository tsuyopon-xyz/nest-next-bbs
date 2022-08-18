import { ChangeEventHandler, FormEventHandler, useState, type FC } from 'react';
import { useAppSelector } from 'src/app/hooks';
import { useCreatePostMutation } from 'src/features/posts/api/posts';
import { CreateRequestInput } from '../../types';
import styles from './style.module.css';

const MAX_CONTENT_LENGTH = 500;

export const PostForm: FC = () => {
  // src/pages/index.tsx内で、signinしていなかったら、このコンポーネントは使われないため、
  // signinState.accessTokenはある前提でこのコンポーネントが読み込まれている
  const accessToken = useAppSelector(
    (state) => state.auth.signin.accessToken
  ) as string;
  const [requestInput, setRequestInput] = useState<CreateRequestInput>({
    accessToken,
    content: '',
  });

  const [createPost, { error, isLoading, isSuccess, reset }] =
    useCreatePostMutation();

  if (isSuccess && requestInput.content.length > 0) {
    setRequestInput({
      ...requestInput,
      content: '',
    });
    reset();
  }

  const onChangeHandler: ChangeEventHandler<HTMLTextAreaElement> = (event) => {
    setRequestInput({
      ...requestInput,
      [event.target.name]: event.target.value,
    });
  };

  const onSubmitHandler: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    createPost(requestInput);
  };

  const canPost = () => {
    if (requestInput.content.trim().length === 0) return false;
    // if (MAX_CONTENT_LENGTH < requestInput.content.length) return false;
    if (isLoading) return false;

    return true;
  };

  return (
    <>
      {error ? <p>{JSON.stringify(error)}</p> : null}
      <form method="post" onSubmit={onSubmitHandler}>
        <textarea
          className={styles.textArea}
          name="content"
          id="content"
          value={requestInput.content}
          onChange={onChangeHandler}
        ></textarea>
        <div className={styles.belowTextAreaContainer}>
          <span>
            {requestInput.content.length}/{MAX_CONTENT_LENGTH}
          </span>
          <input type="submit" value="投稿する" disabled={!canPost()} />
        </div>
      </form>
    </>
  );
};
