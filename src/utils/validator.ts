const emailValidator = (email: string) => {
  const reg = new RegExp('^[a-z0-9]+@[a-z]+\\.[a-z]{2,3}$');

  if (email.length > 30) return '이메일은 30자 이하로 입력해주세요';
  else if (!reg.test(email)) return '올바른 이메일을 입력해주세요.';
  else return 'success';
};

const passwordValidator = (password: string) => {
  const reg = new RegExp('^[A-Za-z0-9#@!$%^&*]{6,20}$');
  if (password.length > 20) return '비밀번호는 20자 이하로 입력해주세요';
  else if (password.length < 6) return '비밀번호는 6자 이상 입력해주세요';
  else if (!reg.test(password)) return '비밀번호는 영문, 숫자, 특수문자(#@!$%^&*)만 입력해주세요';
  else return 'success';
};

export { emailValidator, passwordValidator };
