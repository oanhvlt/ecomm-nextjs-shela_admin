'use client';
//app imports
import { Separator } from "../ui/separator";
//global import
import { z } from 'zod';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import ImageUpload from "../custom-ui/ImageUpload";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import Delete from "../custom-ui/Delete";

// create Form schema
const formSchema = z.object({
    title: z.string().min(2).max(20),
    description: z.string().min(2).max(500).trim(),
    image: z.string()
});

interface CollectionFormProps {
    initialData?: CollectionType | null;
}

const CollectionForm = ({ initialData }: CollectionFormProps) => {
    const router = useRouter();
    const params = useParams();
    const [loading, setLoading] = useState(false);

    // Define form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData ? initialData : {
            title: "",
            description: "",
            image: "",
        },
    })

    //Define a submit handler.
    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        ///console.log(values)
        try {
            setLoading(true);
            const url = initialData ? `/api/collections/${params.collectionId}` : '/api/collections';


            const res = await fetch(url, {
                method: 'POST',
                body: JSON.stringify(values),
            });
            //console.log('res ', res)
            if (res.ok) {
                setLoading(false);
                toast.success(`Collection ${initialData ? 'updated' : 'created'} `);
                window.location.href = '/collections';
                router.push('/collections');
            }

        } catch (error) {
            console.log('[Collection_POST]', error);
            toast.error('Something went wrong, please try again.');
        }
    }

    //handle Enter key
    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement> | React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === "Enter") {
            e.preventDefault();
        }
    }

    return (
        <div className="p-10">
            {initialData ?
                <div className="flex items-center justify-between">
                    <p className="text-heading2-bold text-gray-600">Edit Collection</p>
                    <Delete id={initialData._id} />
                </div>
                :
                <p className="text-heading2-bold text-gray-600">Create Collection</p>
            }

            <Separator className="bg-gray-200" />
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Title</FormLabel>
                                <FormControl>
                                    <Input placeholder="Title" {...field} onKeyDown={handleKeyPress} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Description</FormLabel>
                                <FormControl>
                                    <Textarea placeholder="Description" {...field} rows={5} onKeyDown={handleKeyPress} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="image"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Image</FormLabel>
                                <FormControl>
                                    <ImageUpload value={field.value ? [field.value] : []}
                                        onChange={(url) => field.onChange(url)}
                                        onRemove={() => field.onChange("")} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className="flex gap-10">
                        <Button type="submit" className="bg-red-1 text-white">Submit</Button>
                        <Button type="button" className="bg-grey-3 text-grey-1"
                            onClick={() => router.push("/collections")}>
                            Discard
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    )
}

export default CollectionForm;