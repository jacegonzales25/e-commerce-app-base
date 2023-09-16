"use client";

import { usePathname, useParams } from "next/navigation";

import { cn } from "@/lib/utils";
import Link from "next/link";

export function MainNav({
    className,
    ...props
}: React.HTMLAttributes<HTMLElement>) {

    // adding routes to the main nav
    const pathname = usePathname();
    const params = useParams();

    const routes = [
        {   
            // Custom routing for specific stores
            href: `/${params.storeId}/`,
            label: 'Overview',
            // Active route attribute
            active: pathname === `/${params.storeId}/`,
        },
        {   
            // Custom routing for specific stores
            href: `/${params.storeId}/settings`,
            label: 'Settings',
            // Active route attribute
            active: pathname === `/${params.storeId}/settings`,
        }
    ]

    return (

        // Advanced cn, to add a class name to the existing class name by passing Props and having HTML attributes
        // The syntax has a default classname alongside the props classname when it is passed in. 
        <nav
            className={cn("flex items-center space-x-4 lg:space-x-6", className)}
        >
            {routes.map((route) => (
                <Link
                    key={route.href}    
                    href={route.href}
                    className={cn(
                        "text-sm font-medium transition-colors hover:text-primary",
                        // Conditional, dark: means if it is in darkmode
                        route.active ? "text-black dark:text-white" : "text-muted-foreground"
                    )}
                >
                    {route.label}
                </Link>
            ))}

        </nav>
        // <p>Main Navigation</p>
    );
}