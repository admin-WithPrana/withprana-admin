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
    trigger: ReactNode; // You pass a Button or any element
    children: ReactNode; // Content inside modal
    footer?: ReactNode;  // Optional footer actions
}

export function CustomModal({
    title,
    description,
    trigger,
    children,
    footer,
}: CustomModalProps) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                {trigger}
            </DialogTrigger>

            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    {description && <DialogDescription>{description}</DialogDescription>}
                </DialogHeader>

                <div className="py-4">
                    {children}
                </div>

                {footer && (
                    <div className="pt-4">
                        {footer}
                    </div>
                )}
            </DialogContent>
        </Dialog>
    );
}
