import { LabelInput } from '@/ui';
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
        <LabelInput
          id={idId}
          register={register}
          errors={errors}
          label="아이디"
          inputName="id"
          options={{ required: '아이디를 입력해주세요.' }}
          type="text"
        />

        {/* 비밀번호 필드 */}
        <LabelInput
          id={passwordId}
          register={register}
          errors={errors}
          label="비밀번호"
          inputName="password"
          options={{
            required: '비밀번호를 입력해주세요.',
            minLength: {
              value: 8,
              message: '비밀번호는 최소 8자리 이상이어야 합니다.',
            },
            pattern: {
              value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[^\w\s]).*$/,
              message: '비밀번호는 숫자, 영문자, 특수문자를 포함해야 합니다.',
            },
          }}
          type="password"
        />

        {/* 비밀번호 확인 필드 */}
        <LabelInput
          id={passwordConfirmId}
          register={register}
          errors={errors}
          label="비밀번호 확인"
          inputName="passwordConfirm"
          options={{
            required: '비밀번호를 다시 입력해주세요.',
            validate: (value) => value === watch('password') || '비밀번호가 일치하지 않습니다.',
          }}
          type="password"
        />

        {/* 닉네임 필드 */}
        <LabelInput
          id={nicknameId}
          register={register}
          errors={errors}
          label="닉네임"
          inputName="nickname"
          options={{
            required: '닉네임을 입력해주세요.',
            minLength: {
              value: 2,
              message: '닉네임은 최소 2자리 이상이어야 합니다.',
            },
          }}
          type="text"
        />
      </div>
      {/* 버튼들 */}
      <div className="flex flex-col justify-center items-center w-full gap-4">
        <button
          type="submit"
          disabled={!isValid}
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
