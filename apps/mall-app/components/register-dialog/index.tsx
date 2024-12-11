/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { type FC } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useToast } from '~/hooks/use-toast';
import { userAPI } from '~api/user.api';
import { Button } from '~components/ui/button';
import { Dialog, DialogContent, DialogTitle } from '~components/ui/dialog';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '~components/ui/form';
import { Input } from '~components/ui/input';
import { useUserStore, type UserState, type UserActions } from '~store/user';
import type { IRegister } from '~types/user.types';

interface LoginDialogProps {
  open: boolean;
  onOpenChange?: (isOpen: boolean) => void;
}

const formSchema = z
  .object({
    username: z.string().min(2, {
      message: 'Username must be at least 2 characters.',
    }),
    password: z.string().min(3, {
      message: 'Password must be at least 3 characters.',
    }),
    rePassword: z.string().min(3, {
      message: 'Re-password must be at least 3 characters.',
    }),
    email: z.string().email({ message: 'Email is not valid' }),
    phone: z.string().min(10, {
      message: 'Phone number must be at least 10 characters.',
    }),
    question: z.string(),
    answer: z.string(),
  })
  .refine((data) => data.password === data.rePassword, {
    message: 'Passwords do not match',
    path: ['rePassword'], // 你可以选择错误字段的路径，这里我们选择 `rePassword` 作为错误字段
  });

const RegisterDialog: FC<LoginDialogProps> = ({ open, onOpenChange }) => {
  const { toast } = useToast();
  const userStore = useUserStore((state: UserState & UserActions) => state);
  const { updateUser } = userStore;

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
      password: '',
      rePassword: '',
      email: '',
      phone: '',
      question: '',
      answer: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const { rePassword, ...rest } = values;
      const response = await userAPI.register(rest);
      // response.
      // if (response.data?.status !== 0) {
      //   toast({
      //     duration: 4000,
      //     title: 'login error',
      //     description: response.data?.msg,
      //   });
      // } else {
      //   if (response.data?.msg) {
      //     toast({
      //       duration: 4000,
      //       title: 'login message',
      //       description: response.data?.msg,
      //     });
      //   } else {
      //     updateUser(response.data);
      //     toast({
      //       duration: 4000,
      //       title: `欢迎${response.data?.data?.username}`,
      //     });
      //     onOpenChange?.(false);
      //   }
      // }
    } catch (e: any) {
      toast({
        title: 'login error',
        description: e ? e?.toString() : 'Unknown error',
      });
    } finally {
      console.log('finally');
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogTitle>Log in to your account</DialogTitle>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="Username" {...field} />
                  </FormControl>
                  <FormDescription>
                    This is your public display name.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input placeholder="Password" type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="rePassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>rePassword</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="rePassword"
                      type="password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>email</FormLabel>
                  <FormControl>
                    <Input placeholder="email" type="email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone</FormLabel>
                  <FormControl>
                    <Input placeholder="Phone" type="phone" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="question"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Question</FormLabel>
                  <FormControl>
                    <Input placeholder="Question" type="input" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="answer"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Answer</FormLabel>
                  <FormControl>
                    <Input placeholder="Answer" type="input" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Join</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default RegisterDialog;
export { RegisterDialog };
