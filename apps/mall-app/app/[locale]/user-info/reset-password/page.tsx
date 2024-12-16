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

const formSchema2 = z
  .object({
    oldPassword: z.string(),
    password: z.string(),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: '密码和确认密码必须相同', // 自定义错误消息
    path: ['confirmPassword'], // 错误消息指向 `confirmPassword` 字段
  });

const ResetPasswordPage = () => {
  const router = useRouter();
  const { toast } = useToast();

  // 1. Define your form.
  const form2 = useForm<z.infer<typeof formSchema2>>({
    resolver: zodResolver(formSchema2),
    defaultValues: {
      oldPassword: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit2 = async (values: z.infer<typeof formSchema2>) => {
    try {
      const { data } = await userAPI.resetPassword(
        values.oldPassword,
        values.password
      );
      if (data?.data) {
        toast({
          duration: 3000,
          title: data?.msg ?? 'Success',
        });
      } else {
        toast({
          title: data?.msg ?? 'Failed to update user info',
        });
      }
    } catch (e) {
      toast({
        duration: 4000,
        title: '修改密码失败',
        description: e?.toString(),
      });
    }
  };

  return (
    <div className="mx-10">
      <Form {...form2}>
        <form
          onSubmit={form2.handleSubmit(onSubmit2)}
          className="mx-auto max-w-lg space-y-4"
        >
          {/* Question Field */}
          <FormField
            name="oldPassword"
            control={form2.control}
            render={({ field }) => (
              <FormItem className="flex items-center">
                <FormLabel className="mr-4 w-32 text-right">
                  oldPassword
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="password"
                    placeholder="oldPassword"
                    className="flex-1"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Question Field */}
          <FormField
            name="password"
            control={form2.control}
            render={({ field }) => (
              <FormItem className="flex items-center">
                <FormLabel className="mr-4 w-32 text-right">password</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="password"
                    placeholder="password"
                    className="flex-1"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Answer Field */}
          <FormField
            name="confirmPassword"
            control={form2.control}
            render={({ field }) => (
              <FormItem className="flex items-center">
                <FormLabel className="mr-4 w-32 text-right">
                  confirmPassword
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="password"
                    placeholder="confirmPassword"
                    className="flex-1"
                  />
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
    </div>
  );
};

export { ResetPasswordPage as default };
