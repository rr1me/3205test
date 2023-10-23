import { FormData } from '../redux/formSlice';

const validate: (state: FormData) => boolean = ({ email, errors }) => {
  const emailValid = isEmailValid(email);
  errors.invalidEmail = !emailValid;

  if (errors.internalError) errors.internalError = false;

  return emailValid;
};

export default validate;

const isEmailValid = (email: string) =>
  /^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i.test(email);
