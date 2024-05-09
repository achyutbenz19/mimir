export const SpotifyTrack = ({ trackId }: { trackId: string }) => {
  if (!trackId) {
    return null;
  }

  return (
    <iframe
      src={`https://open.spotify.com/embed/track/${trackId}`}
      width={"100%"}
      height={80}
      allow="encrypted-media"
    />
  );
};
