"use client";

import axios from "axios";
import * as z from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {useEffect,useState} from "react";
import {useForm,Controller} from "react-hook-form";


import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import{
 Form,
 FormControl,
 FormField,
 FormItem,
 FormLabel,
 FormMessage
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FileUpload } from "@/components/file-upload";
import { log } from "console";
import { useRouter } from "next/navigation";

const formSchema = z.object({
    name: z.string().min(1, {
        message: "Server name is required"
    }),
    imageUrl: z.string().min(1, {
        message: "server image is required"
    })
    });

export const InitialModal = () => {
    const [isMounted,setIsMounted] = useState(false);

    const router = useRouter();

    useEffect(() => {
        setIsMounted(true);
    }, []);
    
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            imageUrl: "",
        },
    });

    const isLoding = form.formState.isSubmitting;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
     try{
        console.log("Submitting values:", values);
        await axios.post("/api/servers",values);
        console.log("Server created successfully");
       console.log(values)
       form.reset();
       router.refresh();
       window.location.reload();
     } catch(error) {
        console.log(error);
        
     }   }

    if(!isMounted){
        return null;
    }
    return (
      <Dialog open>
        <DialogContent className="bg-white text-black p-0
        overflow-hidden">
            <DialogHeader className="pt-8 px-6">
                <DialogTitle className="text-2xl text-center font-bold">
                    Customise your server
                </DialogTitle>
                <DialogDescription className="text-center text-zinc-500">
                    Give your server a personality with a name and an image. You can always change this later.
                </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-8 px-6">
                        <div className="space-y-8 px-6">
                            <div className="flex items-center justify-center text-center">
                                <Controller
                                control={form.control}
                                name="imageUrl"
                                render={({field}) => (
                                    <FormItem>
                                        <FormControl>
                                            <FileUpload
                                            endpoint="serverImage"
                                            value={field.value}
                                            onChange={(url) => field.onChange(url)
                                                
                                            }/>
                                        </FormControl>
                                    </FormItem>
                                )}    />
                                </div>
                                <FormField
                                control={form.control}
                                name="name"
                                render={({ field}) => (
                                    <FormItem>
                                        <FormLabel
                                        className="uppercase text-xs font-bold text-zinc-500
                                        dark:text-second/70"
                                        >
                                            Server name
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                            disabled={isLoding}
                                            className="bg-zinc-300/50 border-0
                                            focus-visible:ring-0 text-black
                                            focus-visible:ring-offset-0"
                                            placeholder="Enter server name"
                                            {...field}
                                            />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                                />
                            </div>
                            <DialogFooter className="bg-gray-100 px-6 py-4">
                                <Button variant="primary" disabled={isLoding}>
                                    Create
                                </Button>
                            </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
            </Dialog>
      

    )
}