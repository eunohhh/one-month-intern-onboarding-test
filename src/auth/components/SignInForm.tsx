import { type AuthData } from '@/auth';
import useAuth from '@/auth/hooks';
import { useEffect, useId } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

function SignInForm() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const { logIn, me } = useAuth();
  const idId = useId();
  const passwordId = useId();
  const navigate = useNavigate();

  const handleSignUpClick = () => navigate('/signup');

  const onSubmit: SubmitHandler<FieldValues> = async () => {
    if (Object.keys(errors).length > 0) return;
    const logInData: AuthData = {
      id: watch('id'),
      password: watch('password'),
    };
    await logIn(logInData);
    navigate('/mypage');
  };

  useEffect(() => {
    if (me) {
      console.log('me', me);
      // navigate('/mypage');
    }
  }, [me, navigate]);

  // useEffect(() => {
  //   console.log(errors);
  // }, [errors]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="h-fit top-1/2 -translate-y-1/2 relative flex gap-4 flex-col"
    >
      <h1 className="text-2xl font-semibold text-center">로그인</h1>
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
      </div>
      <button
        type="submit"
        className="bg-black text-white py-3 text-base rounded-md font-medium hover:bg-black/80 transition active:bg-black/70"
      >
        로그인
      </button>
      <button
        type="button"
        onClick={handleSignUpClick}
        className="bg-black text-white py-3 text-base rounded-md font-medium hover:bg-black/80 transition active:bg-black/70"
      >
        회원가입
      </button>
    </form>
  );
}

export default SignInForm;
