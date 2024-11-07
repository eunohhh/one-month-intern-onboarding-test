import { useId } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks';
import type { AuthData } from '../types';

function SignUpForm() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm({
    mode: 'onChange',
  });
  const navigate = useNavigate();
  const idId = useId();
  const passwordId = useId();
  const passwordConfirmId = useId();
  const nicknameId = useId();
  const { signUp, logIn } = useAuth();

  const handleLogInClick = () => navigate('/signin');

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const signUpData: AuthData = {
      id: data.id,
      password: data.password,
      nickname: data.nickname,
    };
    await signUp(signUpData);
    await logIn({ id: signUpData.id, password: signUpData.password });
    navigate('/mypage');
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="h-fit top-1/2 -translate-y-1/2 relative flex gap-4 flex-col"
    >
      <h1 className="text-2xl font-semibold text-center">회원가입</h1>
      <div className="flex flex-col gap-y-4">
        {/* 아이디 필드 */}
        <div className="flex flex-col gap-y-1.5 items-start">
          <div className="flex gap-x-1 justify-between w-full">
            <label htmlFor={idId} className="text-sm font-medium">
              아이디
            </label>
            {errors.id && <p className="text-red-500 text-xs">{errors.id.message?.toString()}</p>}
          </div>
          <input
            id={idId}
            className="border px-4 py-2.5 rounded-md w-80"
            type="text"
            {...register('id', { required: '아이디를 입력해주세요.' })}
          />
        </div>

        {/* 비밀번호 필드 */}
        <div className="flex flex-col gap-y-1.5 items-start">
          <div className="flex gap-x-1 justify-between w-full">
            <label htmlFor={passwordId} className="text-sm font-medium">
              비밀번호
            </label>
            {errors.password && (
              <p className="text-red-500 text-xs">{errors.password.message?.toString()}</p>
            )}
          </div>
          <input
            id={passwordId}
            className="border px-4 py-2.5 rounded-md w-80"
            type="password"
            {...register('password', {
              required: '비밀번호를 입력해주세요.',
              minLength: {
                value: 8,
                message: '비밀번호는 최소 8자리 이상이어야 합니다.',
              },
              pattern: {
                value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[^\w\s]).*$/,
                message: '비밀번호는 숫자, 영문자, 특수문자를 포함해야 합니다.',
              },
            })}
          />
        </div>

        {/* 비밀번호 확인 필드 */}
        <div className="flex flex-col gap-y-1.5 items-start">
          <div className="flex gap-x-1 justify-between w-full">
            <label htmlFor={passwordConfirmId} className="text-sm font-medium">
              비밀번호 확인
            </label>
            {errors.passwordConfirm && (
              <p className="text-red-500 text-xs">{errors.passwordConfirm.message?.toString()}</p>
            )}
          </div>
          <input
            id={passwordConfirmId}
            className="border px-4 py-2.5 rounded-md w-80"
            type="password"
            {...register('passwordConfirm', {
              required: '비밀번호를 다시 입력해주세요.',
              validate: (value) => value === watch('password') || '비밀번호가 일치하지 않습니다.',
            })}
          />
        </div>

        {/* 닉네임 필드 */}
        <div className="flex flex-col gap-y-1.5 items-start">
          <div className="flex gap-x-1 justify-between w-full">
            <label htmlFor={nicknameId} className="text-sm font-medium">
              닉네임
            </label>
            {errors.nickname && (
              <p className="text-red-500 text-xs">{errors.nickname.message?.toString()}</p>
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

      {/* 버튼들 */}
      <div className="flex flex-col justify-center items-center w-full gap-4">
        <button
          type="submit"
          disabled={!isValid} // 폼이 유효하지 않으면 버튼 비활성화
          className={`${
            isValid
              ? 'bg-black hover:bg-black/80 active:bg-black/70'
              : 'bg-gray-400 cursor-not-allowed'
          } text-white py-3 text-[15px] rounded-md font-medium transition w-full`}
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
