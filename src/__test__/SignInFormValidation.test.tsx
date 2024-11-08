import { SignInForm } from '@/auth/components';
import { fireEvent, screen } from '@testing-library/react';
import { renderWithQueryClient } from './testUtils';

test('displays validation error messages for empty fields', async () => {
  renderWithQueryClient(<SignInForm />);
  fireEvent.click(screen.getByRole('button', { name: '로그인' }));

  expect(await screen.findByText('아이디를 입력해주세요.')).toBeInTheDocument();
  expect(await screen.findByText('비밀번호를 입력해주세요.')).toBeInTheDocument();
});

test('displays validation error for short password', async () => {
  renderWithQueryClient(<SignInForm />);
  fireEvent.input(screen.getByLabelText('비밀번호'), { target: { value: '123' } });
  fireEvent.click(screen.getByRole('button', { name: '로그인' }));

  expect(await screen.findByText('비밀번호는 최소 4자리 이상이어야 합니다.')).toBeInTheDocument();
});
