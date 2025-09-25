'use client';

import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogClose,
} from '@/components/ui/dialog';

import { ReactNode } from 'react';

interface CustomModalProps {
    title?: string;
    description?: string;
    trigger?: ReactNode; // Trigger element (e.g., button)
    children: ReactNode; // Modal body content
    footer?: ReactNode;  // Optional footer content
    open?: boolean;      // Optional controlled open state
    onOpenChange?: (open: boolean) => void; // Callback when open state changes
}

export function CustomModal({
    title,
    description,
    trigger,
    children,
    footer,
    open,
    onOpenChange,
}: CustomModalProps) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogTrigger asChild>
                {trigger}
            </DialogTrigger>

            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    {description && (
                        <DialogDescription>{description}</DialogDescription>
                    )}
                </DialogHeader>

                <div className="py-4">{children}</div>

                {footer && <div className="pt-4">{footer}</div>}
            </DialogContent>
        </Dialog>
    );
}
