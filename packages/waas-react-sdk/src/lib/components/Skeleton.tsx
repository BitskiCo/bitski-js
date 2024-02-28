import React from 'react';

export const Skeleton = () => {
  return (
    <div className="flex flex-row gap-3">
      <div className="bg-gray-200 flex w-10 h-10 justify-center items-center gap-2.5 shadow-[0px_3px_15px_0px_color(display-p3_0_0.0667_0.2_/_0.05)] rounded-[999px]"></div>
      <div className="flex flex-col gap-[5px]">
        <div className="bg-gray-200 flex w-[120px] h-4 flex-col items-start gap-1 rounded-md"></div>
        <div className="bg-gray-200 flex w-[72px] h-3.5 flex-col items-start gap-1 rounded-md"></div>
      </div>
    </div>
  );
};
