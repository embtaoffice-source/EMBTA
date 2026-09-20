import embtaLogo from '../assets/embta-logo.png';

/**
 * Extracts the YouTube Video ID from various URL formats without requiring external API.
 * Supports:
 * - https://www.youtube.com/watch?v=VIDEO_ID
 * - https://youtu.be/VIDEO_ID
 * - https://www.youtube.com/embed/VIDEO_ID
 * - https://www.youtube.com/v/VIDEO_ID
 */
export function extractYouTubeId(url: string): string | null {
  if (!url) return null;

  // Check if it's already just the 11 character ID
  if (/^[a-zA-Z0-9_-]{11}$/.test(url.trim())) {
    return url.trim();
  }

  // Regex patterns
  const patterns = [
    /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/i,
    /embed\/([a-zA-Z0-9_-]{11})/i,
    /watch\?v=([a-zA-Z0-9_-]{11})/i,
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match && match[1]) {
      return match[1];
    }
  }

  return null;
}

/**
 * Returns a clean, secure YouTube embed URL with privacy enhancements.
 */
export function getYouTubeEmbedUrl(urlOrId: string): string {
  const videoId = extractYouTubeId(urlOrId) || urlOrId;
  return `https://www.youtube-nocookie.com/embed/${videoId}?rel=0&modestbranding=1&playsinline=1`;
}

/**
 * Returns a high-resolution thumbnail URL for a YouTube video.
 */
export function getYouTubeThumbnail(urlOrId: string): string {
  const videoId = extractYouTubeId(urlOrId);
  if (!videoId) return embtaLogo;
  return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
}
