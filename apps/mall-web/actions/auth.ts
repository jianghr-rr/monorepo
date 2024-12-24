import CryptoJS from 'crypto-js';
import { userAPI } from '~/apis/user.api';
import { SignupFormSchema, type FormState } from '~/lib/definitions';

export async function signup(state: FormState, formData: FormData) {
  // Validate form fields
  const validatedFields = SignupFormSchema.safeParse({
    username: formData.get('username'),
    password: formData.get('password'),
    confirmPassword: formData.get('confirmPassword'),
    email: formData.get('email'),
    phone: formData.get('phone'),
    question: formData.get('question'),
    answer: formData.get('answer'),
  });

  // If any form fields are invalid, return early
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  console.log('validatedFields.data:::', validatedFields.data);

  const { username, email, password, phone, question, answer } =
    validatedFields.data;
  const hashedPassword = CryptoJS.MD5(password + process.env.SALT).toString();
  console.log('hashedPassword:::', hashedPassword);
  console.log('userAPI:::', userAPI);
  try {
    await userAPI.signup({
      username,
      email,
      password: hashedPassword,
      phone,
      question,
      answer,
    });
  } catch (error) {
    return {
      message: 'An error occurred while creating your account.',
    };
  }

  // const user = data[0];

  // if (!user) {
  //   return {
  //     message: 'An error occurred while creating your account.',
  //   };
  // }

  // TODO:
  // 4. Create user session
  // 5. Redirect user
}
