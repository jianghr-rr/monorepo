'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useToast } from '~/hooks/use-toast';
import { userAPI } from '~/pages/api/user.api';
import { Button } from '~components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '~components/ui/form';
import { Input } from '~components/ui/input';
import { useUserStore, type UserState, type UserActions } from '~store/user';
import type { IUserInfo } from '~types/user.types';

const formSchema = z.object({
  username: z.string().optional(),
  email: z.string().email(),
  phone: z
    .string()
    .min(10, { message: 'Phone number must be at least 10 characters.' }),
  question: z.string(),
  answer: z.string(),
});

const UserInfoPage = () => {
  const router = useRouter();
  const { toast } = useToast();
  const userStore = useUserStore((state: UserState & UserActions) => state);
  const { user } = userStore;

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
      email: '',
      phone: '',
      question: '',
      answer: '',
    },
  });

  useEffect(() => {
    form.reset({
      username: user?.username,
      email: user?.email,
      phone: user?.phone,
      question: user?.question,
      answer: user?.answer,
    });
  }, [user]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const { data } = await userAPI.updateUserInfo({
      email: values.email,
      phone: values.phone,
      question: values.question,
      answer: values.answer,
    });
    if (data?.data) {
      toast({
        duration: 3000,
        title: data?.msg ?? 'Success',
      });
      userAPI
        .getUserInfo()
        .then((res) => {
          if (res.data?.data) {
            userStore.updateUser(res.data?.data);
          } else {
            userStore.updateUser(null);
          }
        })
        .catch(() => {
          userStore.updateUser(null);
        });
    } else {
      toast({
        title: data?.msg ?? 'Failed to update user info',
      });
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mx-auto max-w-lg space-y-4"
      >
        {/* Username Field */}
        <FormField
          disabled
          name="username"
          control={form.control}
          render={({ field }) => (
            <FormItem className="flex items-center">
              <FormLabel className="mr-4 w-32 text-right">Username</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Username" className="flex-1" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Email Field */}
        <FormField
          name="email"
          control={form.control}
          render={({ field }) => (
            <FormItem className="flex items-center">
              <FormLabel className="mr-4 w-32 text-right">Email</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Email" className="flex-1" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Email Field */}
        <FormField
          name="phone"
          control={form.control}
          render={({ field }) => (
            <FormItem className="flex items-center">
              <FormLabel className="mr-4 w-32 text-right">Phone</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Phone" className="flex-1" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Question Field */}
        <FormField
          name="question"
          control={form.control}
          render={({ field }) => (
            <FormItem className="flex items-center">
              <FormLabel className="mr-4 w-32 text-right">Question</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Question" className="flex-1" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Answer Field */}
        <FormField
          name="answer"
          control={form.control}
          render={({ field }) => (
            <FormItem className="flex items-center">
              <FormLabel className="mr-4 w-32 text-right">Answer</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Answer" className="flex-1" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
        <Button
          type="button"
          variant="outline"
          className="mx-2"
          onClick={() => router.back()}
        >
          Cancel
        </Button>
      </form>
    </Form>
  );
};

export { UserInfoPage as default };
