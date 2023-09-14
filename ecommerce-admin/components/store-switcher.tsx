"use client";

import { Check, 
    ChevronsUpDown, 
    PlusCircle, 
    Store as StoreIcon 
} from "lucide-react";
import { Store } from "@prisma/client";
import { useState } from "react";

// Writing custom Popover type using shadcn-ui
import { 
    Popover, 
    PopoverContent, 
    PopoverTrigger 
} from "@/components/ui/popover";
import { useStoreModal } from "@/app/hooks/use-store-modal";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { 
    Command, 
    CommandEmpty, 
    CommandGroup, 
    CommandInput, 
    CommandItem, 
    CommandList, 
    CommandSeparator
 } from "@/components/ui/command";

type PopoverTriggerProps = React.ComponentPropsWithoutRef<typeof PopoverTrigger>

interface StoreSwitcherProps extends PopoverTriggerProps{
    items: Store[];
}

export default function StoreSwitcher({
    className,
    items = [],
}: StoreSwitcherProps) {
    // Allowing user to create another store
    const storeModal = useStoreModal();
    const params = useParams();
    const router = useRouter();

    const formattedItems = items.map((item) => ({
        label: item.name,
        value: item.id
    }));

    // Selector of current store if current ID in [storeId] routes matches the formatted items in the page.

    const currentStore = formattedItems.find((item) => item.value === params.storeId);

    // State management for the store switcher Popover
    const [isOpen, setIsOpen] = useState(false);

    // Trigger function when choosing a different store

    const onStoreSelect = (store: { label: string, value: string }) => {
        setIsOpen(false);
        // Redirect to the dynamic storeId
        router.push(`/${store.value}`);
    }

    return (
        <Popover
            open={isOpen} onOpenChange={setIsOpen}
        >
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    size="sm"
                    role="combobox"
                    aria-expanded={isOpen}
                    aria-label="Store"
                    className={cn("w-[200px] justify-between", className)}
                >
                    <StoreIcon className="mr-2 h-4 w-4"/>
                    {/* Current Store */}
                    {currentStore?.label}
                    <ChevronsUpDown className="ml-auto h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
                <Command>
                    <CommandList>
                        <CommandInput placeholder="Search store..." />
                        <CommandEmpty>No store found</CommandEmpty>
                        <CommandGroup heading="Stores">
                           {formattedItems.map((store) => (
                                <CommandItem
                                    key={store.value}
                                    onSelect={() => onStoreSelect(store)}
                                    className="text-sm"
                                >
                                    <StoreIcon className="mr-2 h-4 w-4"/>
                                    {store.label}
                                    <Check
                                        // cn for dynamic styling
                                        className={cn("ml-auto h-4 w-4", 
                                        currentStore?.value === store.value ? "opacity-100" : "opacity-0" )}
                                    
                                    />
                                </CommandItem>
                           ))}
                        </CommandGroup>
                    </CommandList>
                   <CommandSeparator />
                   <CommandList>
                    <CommandGroup>
                        {/* Closes the current Command */}
                        <CommandItem
                            onSelect={() => { 
                                setIsOpen(false);
                                storeModal.onOpen(); 
                            }}
                        >
                            <PlusCircle className="mr-2 h-5 w-5" />
                            Create Store
                        </CommandItem>
                    </CommandGroup>
                   </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
}