"use client";

import * as z from "zod";
import { set, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

import { useStoreModal } from "@/app/hooks/use-store-modal"
import { Modal } from "@/components/modals/modal"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const formSchema = z.object({
    name: z.string().min(1)

});

export const StoreModal = () => {
    const storeModal = useStoreModal();

    const [loading, isLoading] = useState(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: ""
        },
    });

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            isLoading(true);


            const response = await axios.post("/api/stores", values);

            // This code will completely refresh the page
            window.location.assign(`/${response.data.id}`);
            // console.log(response.data);
            // toast.success("Store created successfully.");
        } catch (error) {
            toast.error("Something went wrong.");
        } finally {
            isLoading(false);
        }
    };


    return(
        <Modal
            title="Create Store"
            description="Add a new store"
            isOpen={storeModal.isOpen}
            onClose={storeModal.onClose}
        >   
            {/* Div to return a form, with styling of space */}
            <div>
                <div className="space-y-4 py-2 pb-4">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                            <FormField
                                control={form.control}
                                name="name"
                                render={( { field }) => (
                                    <FormItem>
                                        <FormLabel>Name</FormLabel>
                                        <FormControl>
                                            <Input disabled={loading} placeholder="E-commerce" {...field} />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                            <div className="pt-6 space-x-2 flex items-center justify-end w-full">
                               <Button 
                               variant="outline" 
                               onClick={storeModal.onClose}
                               disabled={loading}
                               >
                                    Cancel
                                
                                </Button>
                                <Button type="submit"
                                disabled={loading}
                                >
                                    Continue
                                </Button>
                            </div>
                        </form>
                    </Form>
                </div>
            </div>
        </Modal>
    );
};