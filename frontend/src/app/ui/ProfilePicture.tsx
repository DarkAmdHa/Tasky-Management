import React from 'react'

function ProfilePicture({imgSrc,size,border=8}: {
    imgSrc?: string;
    size: number;
    border: number;
}) {
  return (
    <div className={`rounded-full shadow-lg border-${border} border-slate-100 overflow-hidden w-30 transition hover:shadow-xl`}>
        <img
        src={
            imgSrc
            ? `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/storage/${imgSrc}`
            : `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/storage/img/avatar.jpg`
        }
        width={size}
        height={size}
        className="rounded"
        alt=""
        />
    </div>
  )
}

export default ProfilePicture