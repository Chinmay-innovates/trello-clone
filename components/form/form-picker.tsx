"use client"
import { defaultImages } from "@/constants/images";
import { unsplash } from "@/lib/unsplash";
import { cn } from "@/lib/utils";
import { Check, Loader2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useFormStatus } from "react-dom";
import { FormErrors } from "./form-errors";

interface FormPickerProps {
    id: string;
    errors?: Record<string, string[] | undefined>;
}
export const FormPicker = ({
    id, errors
}: FormPickerProps) => {
    const { pending } = useFormStatus();
    const [images, setImages] = useState<Array<Record<string, any>>>(defaultImages)
    const [isLoading, setIsLoading] = useState(true);
    const [selectedImageId, setSelectedImageId] = useState(null)

    useEffect(() => {
        const fetchedImages = async () => {
            try {
                const result = await unsplash.photos.getRandom({
                    collectionIds: ["317099"],
                    count: 9
                })
                if (result && result.response) {
                    const newImages = (result.response as Array<Record<string, any>>)
                    setImages(newImages)
                } else {
                    console.error("Failed to fetch images from Unsplash");
                }
            } catch (error) {
                console.log(error);
                setImages(defaultImages)
            } finally {
                setIsLoading(false)
            }
        };
        fetchedImages();
    }, []);
    if (isLoading) {
        return (
            <div className="flex p-6 items-center justify-center">
                <Loader2 className="size-6 animate-spin text-sky-700 " />
            </div>
        )
    }
    return (
        <div className="relative ">
            <div className="grid grid-cols-3 gap-2 mb-2">
                {images.map((image) => (
                    <div
                        key={image.id}
                        className={cn(
                            "cursor-pointer relative aspect-video group hover:opacity-75 transition bg-muted",
                            pending && "opacity-50 hover:opacity-50 cursor-auto"
                        )}
                        onClick={() => {
                            if (pending) return
                            setSelectedImageId(image.id)
                        }}
                    >
                        <input
                            type="radio"
                            name={id}
                            id={id}
                            className="hidden"
                            checked={selectedImageId === image.id}
                            disabled={pending}
                            value={`${image.id}|${image.urls.thumb}|${image.urls.full}|${image.links.html}|${image.user.name}`}
                        />
                        <Image
                            fill
                            src={image.urls.thumb}
                            alt="Unsplash image"
                            className="object-cover rounded-sm"
                        />
                        {selectedImageId === image.id && (
                            <div className="absolute inset-y-0 size-full bg-black/30
                            flex items-center justify-center">
                                <Check className="size-4 text-white" />
                            </div>
                        )}
                        <Link
                            href={image.links.html}
                            target="_blank"
                            className="opacity-0 group-hover:opacity-100 absolute
                         bottom-0 w-full text-[10px] truncate text-white hover:underline p-1 bg-black/50"
                        >
                            {image.user.name}
                        </Link>
                    </div>
                ))}
            </div>
            <FormErrors
                id="image"
                errors={errors}
            />
        </div>

    );
};