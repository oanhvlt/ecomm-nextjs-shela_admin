'"use client'

import { CldUploadWidget } from 'next-cloudinary';
import { Button } from '../ui/button';
import { Plus, Trash } from 'lucide-react';
import React from 'react';
import Image from 'next/image';

interface ImageUploadProps {
    value: string[];
    onChange: (value: string) => void;
    onRemove: (value: string) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ value, onChange, onRemove }) => {
    const onUpload = (result: any) => {
        //console.log('result: ', result)
        onChange(result.info.secure_url);
    }
    return (
        <div>
            <div className="mb-4 flex flex-wrap items-center">
                {value.map((url) => (
                    <div className="relative w-[200px] h-[200px]">
                        <div className="absolute top-0 right-0 z-10">
                            <Button onClick={() => onRemove(url)} size='sm' className='bg-red-1 text-white' >
                                <Trash className='h-4 w-4' />
                            </Button>
                        </div>
                        <Image src={url} alt='collection' className='object-cover rounded-lg' fill />
                    </div>
                ))}
            </div>
            <CldUploadWidget uploadPreset="cw33fscz" onUpload={onUpload}>
                {({ open }) => {
                    return (
                        <Button className='bg-gray-600 text-white'
                            onClick={() => open()}>
                            <Plus className='mr-2' />
                            Upload an Image
                        </Button>
                    );
                }}
            </CldUploadWidget>
        </div>
    )
}

export default ImageUpload;