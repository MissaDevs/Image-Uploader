'use client'
import { Card, CardHeader, CardBody, Image, Button } from "@nextui-org/react";
import { Dispatch, SetStateAction, useCallback, useEffect, useState } from "react";
import { FileWithPath, useDropzone } from "react-dropzone";
import { UploadFileResponse, generateClientDropzoneAccept } from "uploadthing/client";
import { useUploadThing } from "~/constants/upload";

interface Props {
    setLoading: Dispatch<SetStateAction<boolean>>;
    setLoadingVal: Dispatch<SetStateAction<number>>;
    setImages: Dispatch<SetStateAction<UploadFileResponse[]>>;
}

export const Upload = ({ setLoading, setLoadingVal, setImages }: Props) => {
    const [files, setFiles] = useState<File[]>([]);

    const onDrop = useCallback((acceptedFiles: FileWithPath[]) => {
        setFiles(acceptedFiles);
    }, []);

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: generateClientDropzoneAccept(["png", "jpg", "jpeg", "gif", "svg"]),
        maxFiles: 1
    });

    const { startUpload } = useUploadThing("imageUploader", {
        onClientUploadComplete: (res) => {
            if (res) {
                setImages(res);
                setLoading(false);
            }
        },
        onUploadProgress: (progress) => {
            setLoading(true);
            setLoadingVal(progress);
        },
        onUploadError: () => {
            alert("error occurred while uploading");
        },
    });

    useEffect(() => {
        if (files.length > 0) startUpload(files)
    }, [files])

    return (
        <Card className="py-4 px-5 max-w-lg max-h-[40rem] absolute m-auto left-0 right-0 top-0 bottom-0 space-y-5">
            <CardHeader className="pb-0 space-y-5 pt-6 flex-col items-center">
                <h1 className="font-bold text-2xl">Upload your Image</h1>
                <p className="text-tiny font-semibold text-[#BDBDBD]">File should be Jpeg, Png...</p>
            </CardHeader>
            <CardBody className="overflow-visible py-6 space-y-6">
                <div {...getRootProps()} className="border cursor-pointer hover:bg-[#97BEF4] hover:bg-opacity-30 transition-all border-dashed border-[#97BEF4] rounded-3xl h-full relative w-full flex items-center justify-center">
                    <input {...getInputProps()} />
                    <div className="space-y-10 flex-col items-center flex">
                        <Image
                            alt="Card background"
                            className="object-cover rounded-xl"
                            src="/upload.svg"
                            width={150}
                        />
                        <p className="text-[#BDBDBD] font-medium">Drag & Drop your image here</p>
                    </div>
                </div>
                <p className="text-center text-[#BDBDBD]">Or</p>
                <Button color="primary" className="w-36 m-auto py-6">
                    <div {...getRootProps()}>
                        <input {...getInputProps()} />
                        Choose a file
                    </div>
                </Button>
            </CardBody>
        </Card>
    )
}
