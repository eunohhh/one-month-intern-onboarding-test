import useAuth from '@/auth/hooks';
import useModalStore from '@/modal/zustand';
import { useEffect, useId, useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

function ProfileEditForm() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const { me, changeProfile } = useAuth();
  const { openModal } = useModalStore();

  const [previewUrl, setPreviewUrl] = useState<string>(
    me?.avatar ? me.avatar : '/default-profile.jpg',
  );

  const fileInputId = useId();
  const nickNameId = useId();

  const handleImageClick = (e: React.MouseEvent<HTMLButtonElement | HTMLImageElement>) => {
    e.preventDefault();
    document.getElementById(fileInputId)?.click();
  };

  const handleReturnClick = () => navigate('/');

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const { nickname, avatar } = data;

    if (!avatar || avatar.length === 0) {
      openModal({
        type: 'error',
        message: '변경할 이미지를 선택해 주세요',
      });
      return;
    }
    if (!nickname) {
      openModal({
        type: 'error',
        message: '변경할 닉네임을 입력해 주세요',
      });
      return;
    }

    const imgFile = avatar[0];

    const profileData = {
      avatar: imgFile,
      nickname,
    };

    try {
      await changeProfile(profileData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === 'avatar' && value.avatar && value.avatar.length > 0) {
        const file = value.avatar[0];
        if (file instanceof File) {
          const fileUrl = URL.createObjectURL(file);
          setPreviewUrl(fileUrl);
          return () => URL.revokeObjectURL(fileUrl);
        }
      }
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  useEffect(() => {
    if (me) {
      setPreviewUrl(me.avatar ? me.avatar : '/default-profile.jpg');
    }
  }, [me]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-row gap-4 h-fit relative">
      <div className="flex flex-col gap-3">
        <div className="w-28 h-28 rounded-full overflow-hidden">
          <img
            className="w-full h-full object-cover cursor-pointer"
            src={previewUrl}
            alt="profile-image"
            onClick={handleImageClick}
          />
        </div>
        <button
          type="button"
          className="bg-black text-white py-1 px-1 text-[15px] rounded-md font-medium hover:bg-black/80 transition active:bg-black/70"
          onClick={handleImageClick}
        >
          이미지 변경하기
        </button>
        <input
          id={fileInputId}
          type="file"
          accept="image/*"
          className="hidden"
          {...register('avatar')}
        />
      </div>
      <div className="flex flex-col gap-2 justify-center">
        <div className="flex gap-x-1 justify-between w-full">
          <label htmlFor={nickNameId}>닉네임 변경하기</label>
          {errors.nickname && (
            <p className="text-red-500 text-xs">{errors.nickname.message as string}</p>
          )}
        </div>
        <input
          type="text"
          id={nickNameId}
          placeholder={me ? me.nickname : ''}
          {...register('nickname', { required: '닉네임을 입력해주세요.' })}
          className="border px-4 py-1 rounded-md w-80"
        />
        <div className="flex gap-1 justify-end">
          <button
            type="button"
            className="bg-black text-white py-1 px-1 text-[15px] rounded-md font-medium hover:bg-black/80 transition active:bg-black/70"
            onClick={handleReturnClick}
          >
            돌아가기
          </button>
          <button
            type="submit"
            className="bg-black text-white py-1 px-1 text-[15px] rounded-md font-medium hover:bg-black/80 transition active:bg-black/70"
          >
            저장하기
          </button>
        </div>
      </div>
    </form>
  );
}

export default ProfileEditForm;
