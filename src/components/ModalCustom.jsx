import React from "react";
import {
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
    IconButton,
    Typography,
} from "@material-tailwind/react";

function ModalCustom({ open, handleOpen, title, body, footer, size }) {
    return (
        <Dialog size={size || 'xs'} open={open} handler={handleOpen}>
            <DialogHeader className="justify-between">
                <Typography variant="h5" color="blue-gray">
                    {title}
                </Typography>
                <IconButton
                    color="blue-gray"
                    size="sm"
                    variant="text"
                    onClick={() => handleOpen(false)}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                        className="h-5 w-5"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6 18L18 6M6 6l12 12"
                        />
                    </svg>
                </IconButton>
            </DialogHeader>
            <DialogBody className="pr-2">
                {body}
            </DialogBody>
            <DialogFooter className="justify-between gap-2 border-t border-blue-gray-50">
                {footer || <></>}
            </DialogFooter>
        </Dialog>
    )
}

export default ModalCustom