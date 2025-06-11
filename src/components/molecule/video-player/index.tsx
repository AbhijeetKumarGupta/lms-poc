import React from 'react';

interface VideoPlayerProps {
  url: string;
}

export default function VideoPlayer({ url }: VideoPlayerProps) {
  const isYouTube = /youtube\.com|youtu\.be/.test(url);
  const isVimeo = /vimeo\.com/.test(url);
  const isGoogleDrive = /drive\.google\.com/.test(url);
  const isDirectFile = /\.(mp4|webm|ogg)$/i.test(url) || url.includes('imagekit.io');

  let embedUrl = '';

  if (isYouTube) {
    embedUrl = url.includes('embed')
      ? url
      : url.replace('watch?v=', 'embed/').replace('youtu.be/', 'youtube.com/embed/');
  } else if (isVimeo) {
    const videoId = url.split('/').pop();
    embedUrl = `https://player.vimeo.com/video/${videoId}`;
  } else if (isGoogleDrive) {
    const match = url.match(/\/d\/(.+?)\//);
    embedUrl = match ? `https://drive.google.com/file/d/${match[1]}/preview` : url;
  }

  if (isDirectFile) {
    return <video controls src={url} style={{ maxWidth: '100%', borderRadius: 4 }} />;
  }

  if (embedUrl) {
    return (
      <iframe
        src={embedUrl}
        frameBorder="0"
        allow="encrypted-media"
        allowFullScreen
        style={{
          width: '100%',
          height: 400,
          borderRadius: '8px',
        }}
      />
    );
  }

  return (
    <div>
      <p>Unsupported video format or provider.</p>
      <a href={url} target="_blank" rel="noopener noreferrer">
        Open Video
      </a>
    </div>
  );
}
