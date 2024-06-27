'use client'

import { Trash } from "lucide-react"
import { Button } from "../ui/button"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { useState } from "react"
import toast from "react-hot-toast"

interface DeleteProps {
    id: String;
}

const Delete = ({ id }: DeleteProps) => {
    const [loading, setLoading] = useState(false);

    const onDelete = async () => {
        try {
            setLoading(true);
            const res = await fetch(`/api/collections/${id}`, {
                method: 'DELETE',
            })
            if (res.ok) {
                setLoading(false)
                window.location.href = '/collections'
                toast.success('Collection delete')
            }

        } catch (error) {
            console.log('[CollectionId_DELETE]', error);
            toast.error('Something went wrong, please try again.');
        }
    }

    return (
        <AlertDialog>
            <AlertDialogTrigger>
                <Button className="bg-red-1 text-white">
                    <Trash />
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="bg-white text-grey-1">
                <AlertDialogHeader>
                    <AlertDialogTitle className="text-red-1">Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete your collection.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction className="bg-red-1 text-white" onClick={onDelete}>Continue
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default Delete