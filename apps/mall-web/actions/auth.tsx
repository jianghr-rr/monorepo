// import 'server-only';
import CryptoJS from 'crypto-js';
import { SignupFormSchema, type FormState } from '~/lib/definitions';

export function signup(state: FormState, formData: FormData) {
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
  console.log('validatedFields', validatedFields);

  // If any form fields are invalid, return early
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  // 2. Prepare data for insertion into database
  const { username, email, password, phone, question, answer } =
    validatedFields.data;
  console.log('validatedFields.data', validatedFields.data);
  // e.g. Hash the user's password before storing it
  // const hashedPassword = await bcrypt.hash(password, 10);
  const hashedPassword = CryptoJS.MD5(password + process.env.SALT).toString();
  console.log('hashedPassword', hashedPassword);
  // // 3. Insert the user into the database or call an Auth Library's API
  try {
    // const data = await db.insert(mmallUser).values({
    //   username,
    //   email,
    //   password: hashedPassword,
    //   phone,
    //   question,
    //   answer,
    //   role: 1,
    // });
    // console.log('data', data);
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
