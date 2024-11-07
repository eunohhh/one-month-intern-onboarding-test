import { useEffect, useId } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks';
import type { AuthData } from '../types';

function SignUpForm() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const idId = useId();
  const passwordId = useId();
  const passwordConfirmId = useId();
  const nicknameId = useId();
  const { signUp } = useAuth();

  const handleLogInClick = () => navigate('/');

  const onSubmit: SubmitHandler<FieldValues> = () => {
    if (Object.keys(errors).length > 0) return;
    const signUpData: AuthData = {
      id: watch('id'),
      password: watch('password'),
      nickname: watch('nickname'),
    };
    signUp(signUpData);
  };

  useEffect(() => {
    console.log(errors);
  }, [errors]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="h-fit top-1/2 -translate-y-1/2 relative flex gap-4 flex-col"
    >
      <h1 className="text-2xl font-semibold text-center">회원가입</h1>
      <div className="flex flex-col gap-y-4">
        <div className="flex flex-col gap-y-1.5 items-start">
          <div className="flex gap-x-1 justify-between w-full">
            <label htmlFor={idId} className="text-sm font-medium">
              {'아이디'}
            </label>
            {errors.id && <p className="text-red-500 text-xs">{errors.id.message as string}</p>}
          </div>
          <input
            id={idId}
            className="border px-4 py-2.5 rounded-md w-80"
            type="text"
            {...register('id', { required: '아이디를 입력해주세요.' })}
          />
        </div>
        <div className="flex flex-col gap-y-1.5 items-start">
          <div className="flex gap-x-1 justify-between w-full">
            <label htmlFor={passwordId} className="text-sm font-medium">
              {'비밀번호'}
            </label>
            {errors.password && (
              <p className="text-red-500 text-xs">{errors.password.message as string}</p>
            )}
          </div>
          <input
            id={passwordId}
            className="border px-4 py-2.5 rounded-md w-80"
            type="password"
            {...register('password', {
              required: '비밀번호를 입력해주세요.',
              minLength: {
                value: 4,
                message: '비밀번호는 최소 4자리 이상이어야 합니다.',
              },
            })}
          />
        </div>
        <div className="flex flex-col gap-y-1.5 items-start">
          <div className="flex gap-x-1 justify-between w-full">
            <label htmlFor={passwordConfirmId} className="text-sm font-medium">
              {'비밀번호 확인'}
            </label>
            {errors.password && (
              <p className="text-red-500 text-xs">{errors.password.message as string}</p>
            )}
          </div>
          <input
            id={passwordConfirmId}
            className="border px-4 py-2.5 rounded-md w-80"
            type="password"
            {...register('passwordConfirm', {
              required: '비밀번호를 입력해주세요.',
              minLength: {
                value: 4,
                message: '비밀번호는 최소 4자리 이상이어야 합니다.',
              },
            })}
          />
        </div>
        <div className="flex flex-col gap-y-1.5 items-start">
          <div className="flex gap-x-1 justify-between w-full">
            <label htmlFor={nicknameId} className="text-sm font-medium"></label>
            {errors.password && (
              <p className="text-red-500 text-xs">{errors.password.message as string}</p>
            )}
          </div>
          <input
            id={nicknameId}
            className="border px-4 py-2.5 rounded-md w-80"
            type="text"
            {...register('nickname', {
              required: '닉네임을 입력해주세요.',
              minLength: {
                value: 2,
                message: '닉네임은 최소 2자리 이상이어야 합니다.',
              },
            })}
          />
        </div>
      </div>
      <div className="flex flex-col justify-center items-center w-full gap-4">
        <button
          type="submit"
          className="bg-black text-white py-3 text-[15px] rounded-md font-medium hover:bg-black/80 transition active:bg-black/70 w-full"
        >
          회원가입
        </button>
        <button
          type="button"
          onClick={handleLogInClick}
          className="bg-black text-white py-3 text-[15px] rounded-md font-medium hover:bg-black/80 transition active:bg-black/70 w-full"
        >
          로그인하러가기
        </button>
      </div>
    </form>
  );
}

export default SignUpForm;
