import { ValidationError } from "yup";

interface YupError {
  path: string;
  message: string;
}

export const formatYupError = (err: ValidationError) => {
  const errors: Array<{ path: string; message: string }> = [];
  err.inner.forEach((e: YupError) => {
    errors.push({
      path: e.path,
      message: e.message
    });
  });

  return errors;
};
