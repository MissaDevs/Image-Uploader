'use client'
import { Card, CardHeader, CardBody, Image, Button, ButtonGroup, Input } from "@nextui-org/react";
import { UploadFileResponse } from "uploadthing/client";
import copy from 'copy-to-clipboard';
import { useState } from "react";

interface Props {
    image: UploadFileResponse
}

export const ImageUploaded = ({ image }: Props) => {
    const [copied, setCopied] = useState(false);

    return (
        <Card className="py-4 px-5 max-w-lg max-h-[40rem] absolute m-auto left-0 right-0 top-0 bottom-0 space-y-2">
            <CardHeader className="pb-0 space-y-5 pt-6 flex-col items-center">
                <Image
                    alt="Check"
                    className="object-cover"
                    src="/check.png"
                    width={42}
                />
                <h1 className="font-bold text-2xl">Uploaded Successfully!</h1>
            </CardHeader>
            <CardBody className="overflow-visible py-6 space-y-6">
                <Image
                    alt="Card background"
                    className="object-cover rounded-xl"
                    src={image.url}
                    width={500}
                />
                <div className="border rounded-2xl p-1 flex">
                    <input value={image.url} type="text" disabled className="outline-none bg-transparent border-none w-3/4 text-ellipsis overflow-hidden" />
                    <Button onClick={() => void copy(image.url)} color="primary" className="w-36 m-auto py-6">
                        Copy Link
                    </Button>
                </div>
            </CardBody>
        </Card>
    )
}
