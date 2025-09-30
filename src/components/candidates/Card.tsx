import {
  LucideBookDown,
  LucideDownload,
  LucideStar,
  MapPin,
  TimerIcon,
} from "lucide-react";
import React from "react";

declare global {
  interface Window {
    ReactNativeWebView?: {
      postMessage: (message: string) => void;
    };
  }
}


function Card({
  name,
  jobDesignation,
  resumeDlLink,
  ratings,
  location,
  skills,
  image,
  experience,
  eployementType
}: {
  name: string;
  jobDesignation: string;
  resumeDlLink: string;
  ratings: number;
  location: string;
  skills: string[];
  image?: string;
  experience?: string
  eployementType?: string
}) {
  // const handleDownload = async () => {
  //   try {
  //     const response = await fetch(resumeDlLink);
  //     const blob = await response.blob();
  //     // Create a temporary link and trigger download
  //     const link = document.createElement("a");
  //     link.href = URL.createObjectURL(blob);
  //     link.download = "file.pdf"; // the filename for download
  //     link.click();

  //     // Clean up
  //     URL.revokeObjectURL(link.href);
  //   } catch (err) {
  //     console.error("Download failed", err);
  //   }
  // };

  const handleDownload = async () => {
  try {
    // Check if running in React Native WebView
    if (window.ReactNativeWebView) {
      // Send message to React Native
      window.ReactNativeWebView.postMessage(JSON.stringify({
        type: 'DOWNLOAD_FILE',
        url: resumeDlLink,
        filename: `${name.replace(/\s+/g, '_')}_resume.pdf`
      }));
    } else {
      // Fallback for web browsers
      const response = await fetch(resumeDlLink);
      const blob = await response.blob();
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = `${name.replace(/\s+/g, '_')}_resume.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setTimeout(() => URL.revokeObjectURL(link.href), 100);
    }
  } catch (err) {
    console.error("Download failed", err);
  }
};

  return (
    <div className="w-full py-4 border border-neutral-200 rounded-2xl p-4 flex justify-start items-start gap-2.5">
      <div className="h-full w-1/4">
        <div className="w-[4.5rem] h-[4.5rem] rounded-full overflow-hidden bg-primary flex justify-center items-center font-bold text-white text-2xl">
          {image ? (
            <img src={image} className="w-full h-full object-cover" />
          ) : (
            name[0]
          )}
        </div>
      </div>
      <div className="relative w-full">
        <div className="w-10 h-10 absolute flex justify-center items-center gap-1 right-0 -top-1">
          {/* <LucideShare2 size={20} /> */}
          <LucideStar className="text-yellow-500" size={14} />{" "}
          <p className="text-neutral-400">{ratings ? ratings : 0}</p>
        </div>
        <h1 className="text-lg font-semibold">{name}</h1>
        <p className="text-sm font-medium font-sans mt-0.5 text-neutral-600">
          {jobDesignation}
        </p>

        <div className="flex pt-3 text-neutral-500 gap-4">
          <div className="flex gap-1 justify-center items-center">
            <MapPin size={13} />
            <p className="text-xs ">{location ? location : "Unknown"}</p>
          </div>
          <div className="flex gap-1 justify-center items-center">
            <TimerIcon size={14} />
            <p className="text-xs">{experience}</p>
          </div>
        </div>
        {/* <h1 className='text-base font-bold pt-1'>$1000 - $1200</h1> */}
        <div className="flex justify-start items-center gap-1.5 my-1.5">
          {skills.length > 0 && (
            <>
              {skills.slice(0, 4).map((item, idx) => (
                <div
                  className="px-2 py-1 bg-gray-400/20 text-gray-700 rounded-sm my-1 w-fit text-xs"
                  key={idx}
                >
                  {item}
                </div>
              ))}

              {skills.length > 4 && (
                <div className="px-2 py-1 bg-green-400/20 text-green-700 rounded-sm w-fit text-xs">
                  +{skills.length - 4}
                </div>
              )}
            </>
          )}
        </div>

            <div className="px-2 py-1 bg-orange-600/20 text-orange-700 rounded-sm my-1 w-fit text-[10px] capitalize">{eployementType}</div>


        <button
          className="absolute right-2 -bottom-8 w-fit h-fit rounded-lg bg-primary text-white font-semibold py-2 px-4 text-sm flex justify-center gap-1.5 items-center"
          onClick={handleDownload}
        >
          Resume <LucideDownload size={14} />
        </button>
      </div>
    </div>
  );
}

export default Card;
