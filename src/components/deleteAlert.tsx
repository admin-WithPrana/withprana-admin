// components/ConfirmDeleteDialog.tsx

import {
    AlertDialog,
    AlertDialogTrigger,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogCancel,
    AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { ReactNode } from "react";

interface ConfirmDeleteDialogProps {
    onConfirm: () => void;
    trigger: ReactNode;
    title?: string;
    description?: string;
    confirmText?: string;
    cancelText?: string;
}

export const ConfirmDeleteDialog = ({
    onConfirm,
    trigger,
    title = "Are you absolutely sure?",
    description = "This action cannot be undone. This will permanently delete the item.",
    confirmText = "Delete",
    cancelText = "Cancel",
}: ConfirmDeleteDialogProps) => {
    return (
        <AlertDialog >
            <AlertDialogTrigger asChild>{trigger}</AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader className="font-rubik-400">
                    <AlertDialogTitle>{title}</AlertDialogTitle>
                    <AlertDialogDescription>{description}</AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter className="font-rubik-400">
                    <AlertDialogCancel>{cancelText}</AlertDialogCancel>
                    <AlertDialogAction
                        className="bg-red-600 text-white hover:bg-red-700"
                        onClick={onConfirm}
                    >
                        {confirmText}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};
