export const SpotifyTrack = ({
  trackId,
  width = 300,
  height = 80,
}: {
  trackId: string;
  width?: number;
  height?: number;
}) => {
  if (!trackId) {
    return null;
  }

  return (
    <iframe
      src={`https://open.spotify.com/embed/track/${trackId}`}
      width={width}
      height={height}
      frameBorder="0"
      allow="encrypted-media"
    />
  );
};
