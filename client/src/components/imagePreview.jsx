import React from "react";
import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
} from "@material-tailwind/react";

export function ImagePreview({ open, handleOpen, imageUrl }) {

    return (
        <Dialog open={open} handler={handleOpen} className="max-h-[90vh] overflow-auto shadow-none bg-transparent" >
            <DialogBody>
                <img src={imageUrl} alt="Enlarged view" className="w-full h-auto" />
            </DialogBody>
        </Dialog>
    );
}