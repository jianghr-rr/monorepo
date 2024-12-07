/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/ban-ts-comment */
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
import { useUserStore, type UserState, type UserActions } from './store';

interface LoginDialogProps {
  open: boolean;
  onOpenChange?: (isOpen: boolean) => void;
}

const formSchema = z.object({
  username: z.string().min(2, {
    message: 'Username must be at least 2 characters.',
  }),
  password: z.string().min(3, {
    message: 'Password must be at least 3 characters.',
  }),
});

const LoginDialog: FC<LoginDialogProps> = ({ open, onOpenChange }) => {
  const { toast } = useToast();
  const userStore = useUserStore((state: UserState & UserActions) => state);
  const { updateUser } = userStore;

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const response = await userAPI.login({
        username: values.username,
        password: values.password,
      });
      if (response.status !== 0) {
        toast({
          duration: 4000,
          title: 'login error',
          description: response.msg,
        });
      } else {
        // @ts-ignore
        updateUser(response.data);
        toast({
          duration: 4000,
          // @ts-ignore
          title: `欢迎${response.data?.username}`,
        });
        onOpenChange?.(false);
      }
    } catch (e: any) {
      toast({
        title: 'login error',
        description: e.msg,
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
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default LoginDialog;
export { LoginDialog };
