
'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Link2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

const FormSchema = z.object({
  url: z.string().url({ message: 'Please enter a valid URL. e.g. https://example.com' }),
});

interface UrlFormProps {
  currentUrl: string;
  onUrlChange: (url: string) => void;
}

export function UrlForm({ currentUrl, onUrlChange }: UrlFormProps) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      url: currentUrl,
    },
  });

  function onSubmit(values: z.infer<typeof FormSchema>) {
    onUrlChange(values.url);
  }

  return (
    <div className="p-4 bg-card border-b">
        <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex w-full items-start gap-2">
            <FormField
            control={form.control}
            name="url"
            render={({ field }) => (
                <FormItem className="flex-1">
                <FormControl>
                    <div className="relative">
                    <Link2 className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Enter a URL..." {...field} className="pl-9"/>
                    </div>
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />
            <Button type="submit">Load</Button>
        </form>
        </Form>
    </div>
  );
}
