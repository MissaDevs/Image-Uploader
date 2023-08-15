'use client'
import { NextUIProvider, Progress } from '@nextui-org/react'
import { useState } from 'react'
import { UploadFileResponse } from 'uploadthing/client'
import { ImageUploaded } from '~/components/ImageUploaded'
import { Upload } from '~/components/Upload'

export default function Home() {
  const [images, setImages] = useState<UploadFileResponse[]>([])
  const [loading, setLoading] = useState(false)
  const [loadingVal, setLoadingVal] = useState(0)

  return (
    <NextUIProvider>
      <div className='min-h-screen'>
        {loading ?
          <Progress
            aria-label="Uploading..."
            label="Uploading..."
            size="md"
            value={loadingVal}
            color="primary"
            showValueLabel={true}
            className="max-w-md absolute m-auto left-0 top-1/2 bottom-0 right-0 px-5"
          />
          : images.length > 0
            ? <ImageUploaded image={images[0]} />
            : <Upload setLoading={setLoading} setLoadingVal={setLoadingVal} setImages={setImages} />}
      </div>
    </NextUIProvider>
  )
}
