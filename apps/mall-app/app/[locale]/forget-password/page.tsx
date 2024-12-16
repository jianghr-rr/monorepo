'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useToast } from '~/hooks/use-toast';
import { userAPI } from '~/pages/api/user.api';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '~components/ui/accordion';
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

const formSchema = z.object({
  username: z.string(),
  question: z.string(),
  answer: z.string(),
});

const formSchema2 = z
  .object({
    username: z.string(),
    password: z.string(),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: '密码和确认密码必须相同', // 自定义错误消息
    path: ['confirmPassword'], // 错误消息指向 `confirmPassword` 字段
  });

const ResetPasswordPage = () => {
  const router = useRouter();
  const [key, setKey] = useState<string | undefined>(undefined);
  const [vaKey, setVaKey] = useState<string>('item-1');
  const { toast } = useToast();

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
      question: '',
      answer: '',
    },
  });
  // 1. Define your form.
  const form2 = useForm<z.infer<typeof formSchema2>>({
    resolver: zodResolver(formSchema2),
    defaultValues: {
      username: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const { data } = await userAPI.forgetCheckAnswer(
        values.username,
        values.question,
        values.answer
      );
      if (data?.data) {
        setKey(data?.data);
        setVaKey('item-2');
      }
    } catch (e) {
      toast({
        title: '验证问题错误',
        description: e?.toString(),
        duration: 3000,
      });
    }
  };

  const onSubmit2 = async (values: z.infer<typeof formSchema2>) => {
    try {
      if (!key) {
        return;
      }
      const { data } = await userAPI.forgetResetPassword(
        values.username,
        values.password,
        key
      );
      if (data?.status === 0) {
        toast({
          title: '重置密码成功',
          duration: 3000,
        });
      }
    } catch (e) {
      toast({
        title: '重置密码失败',
        description: e?.toString(),
        duration: 3000,
      });
    }
  };

  return (
    <div className="mx-10">
      <Accordion type="single" collapsible value={vaKey}>
        <AccordionItem value="item-1">
          <AccordionTrigger>验证提示问题</AccordionTrigger>
          <AccordionContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="mx-auto max-w-lg space-y-4"
              >
                {/* Question Field */}
                <FormField
                  name="username"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem className="flex items-center">
                      <FormLabel className="mr-4 w-32 text-right">
                        Username
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Username"
                          className="flex-1"
                        />
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
                      <FormLabel className="mr-4 w-32 text-right">
                        Question
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Question"
                          className="flex-1"
                        />
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
                      <FormLabel className="mr-4 w-32 text-right">
                        Answer
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Answer"
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
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-2" disabled={!key}>
          <AccordionTrigger>修改密码</AccordionTrigger>
          <AccordionContent>
            <Form {...form2}>
              <form
                onSubmit={form2.handleSubmit(onSubmit2)}
                className="mx-auto max-w-lg space-y-4"
              >
                {/* Question Field */}
                <FormField
                  name="username"
                  control={form2.control}
                  render={({ field }) => (
                    <FormItem className="flex items-center">
                      <FormLabel className="mr-4 w-32 text-right">
                        username
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="username"
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
                      <FormLabel className="mr-4 w-32 text-right">
                        password
                      </FormLabel>
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
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export { ResetPasswordPage as default };
