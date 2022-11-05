import React from 'react'
import QRCode from "qrcode"
import { useState } from 'react';
import bg from "../undraw_job_hunt_re_q203.svg";


export default function MyToken() {
  const [qrValue, setQrValue] = useState("http://www.google.com");
  const [qrImageUrl, setQrImageUrl] = useState("");

  const showMyToken = async (e) => {
    if(!qrValue) {
      return ;
    }
    const res = await QRCode.toDataURL(qrValue, { errorCorrectionLevel: 'H' });
    setQrImageUrl(res);
  }
  showMyToken();
  return (
    <>
      <div className="mx-auto max-w-9xl py-4 sm:px-6 lg:px-8 static">
        <div data-aos="zoom-in" className="h-fit rounded-lg border-4 border-dashed border-gray-200">
        <div className="grid grid-cols-4 gap-2 ">
          <div className='col-start-1 col-span-2 justify-self-end'>
            <img className='h-full ' src={qrImageUrl}></img>
          </div>
          <div className='col-start-3 justify-self-start relative'>
            <img className='h-full left-24' src={bg}  />
          </div>
        </div>
        </div>
      </div>
    </>
  )
}
