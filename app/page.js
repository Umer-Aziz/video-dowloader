"use client"
import { useState } from 'react';
import Navbar from "@/components/Navbar";
import Image from "next/legacy/image";

export default function Home() {
  const [videoData, setVideoData] = useState([]);
  const [videoUrl, setVideoUrl] = useState('');
  const [loading, setLoading] = useState(false); // Add loading state
  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true); // Set loading to true when form is submitted

    const url = `https://fb-video-reels.p.rapidapi.com/smvd/get/all?url=${encodeURIComponent(videoUrl)}`;
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': process.env.NEXT_PUBLIC_RAPID_API_KEY,
        'X-RapidAPI-Host': 'fb-video-reels.p.rapidapi.com'
      }
    };

    try {
      const response = await fetch(url, options);
      const result = await response.json();
      setVideoData(result);
      
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false); // Set loading to false after data is fetched
    }
  };

  return (
    <>
      <Navbar />
      <main className="max-width padd-x padd-y">
        <div className="flex flex-col items-center">
          <h1 className="text-2xl lg:text-3xl text-center">Free Online Video Downloader</h1>
          <p className="mt-2 text-sm tracking-wide">Download YouTube, Facebook, Instagram, and TikTok videos for Free</p>
          {videoData && videoData.length !== 0 && <a className='underline' href="/">Download any Other Video</a>}
          <div className="max-w-3xl mx-auto w-full">
            {videoData && videoData == "" && (
              <form onSubmit={handleSubmit} className="mt-4 sm:mt-8 w-full flex items-center gap-3">
                <div className="w-full">
                  {/* URL video */}
                  <input
                    className="border-2 outline-none border-cyan-600 w-full py-2 px-4 rounded"
                    type="text"
                    placeholder="Paste your video link here"
                    value={videoUrl}
                    onChange={(e) => setVideoUrl(e.target.value)}
                  />
                </div>
                <button type="submit" className="py-2.5 px-4 rounded-md bg-cyan-600 hover:bg-cyan-700 text-white">Download</button>
              </form>
            )}

          {loading && <div className='flex justify-center my-10'><div className='loader my-8'></div></div>} {/* Show loading text or loader */}

            {/* Display video data */}
            {videoData && videoData.length !== 0 && (
              <div className="p-4 md:p-8 my-8 lg:my-12 bg-cyan-50 w-full flex flex-col md:flex-row items-center md:items-start gap-4">
                {/* Display loader or image */}
                {
                  videoData.picture && (
                    <div className="relative w-full max-w-80">
                      <Image
                        className="rounded w-full"
                        priority
                        layout="responsive"
                        width={300}
                        height={260}
                        alt="banner"
                        src={videoData.picture}
                      />
                    </div>
                )}
                <div>
                  {/* Display fetched video data */}
                  { videoData.title && <h3 className="font-medium">{videoData.title}</h3>}
                  { videoData.author && (
                    <h4 className="text-xs font-medium mt-0.5">
                      <span className="text-cyan-600">Channel: </span> {videoData.author}
                    </h4>
                  )}
                  { videoData.durationText && (
                    <h6 className="mt-2 md:mt-4 text-sm">
                      <span className="text-cyan-600">Duration: </span>
                      <span>{videoData.durationText}</span>
                    </h6>
                  )}
                  { videoData.publishedText && (
                    <p className="text-sm">
                      <span className="text-cyan-600">Published: </span>
                      <span>{videoData.publishedText}</span>
                    </p>
                  )}
                  <div className="mt-4 md:mt-6 lg:mt-8 flex gap-4 items-center">
                    {/* SD Download button */}
                    { videoData.links && videoData.links.map(link => (
                      link.quality === 'sd_360p' && (
                        <a
                          key={link.quality}
                          href={link.link}
                          className="bg-cyan-600 px-4 py-2.5 text-white rounded hover:bg-cyan-700"
                          download={videoData.title}
                        >
                          SD Download
                        </a>
                      )
                    ))}
                    {/* HD Download button */}
                    { videoData.links && videoData.links.map(link => (
                      link.quality === 'hd_720p' && (
                        <a
                          key={link.quality}
                          href={link.link}
                          className="bg-cyan-600 px-4 py-2.5 text-white rounded hover:bg-cyan-700"
                          download={videoData.title}
                        >
                          HD Download
                        </a>
                      )
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  );
}
