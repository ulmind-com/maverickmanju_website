/**
 * Hover previews for gallery and testimonial videos.
 *
 * Browsers refuse to start an unmuted video until the page has picked up user
 * activation, and a hover on its own does not count — but any earlier click or
 * tap anywhere on the page does. So ask for sound first and fall back to a
 * silent preview only when the browser actually refuses; once the visitor has
 * clicked anything, every later hover plays out loud.
 */
export async function playPreview(video: HTMLVideoElement): Promise<void> {
  video.muted = false;
  try {
    await video.play();
    return;
  } catch {
    /* refused while unmuted — retry silently below */
  }
  video.muted = true;
  try {
    await video.play();
  } catch {
    /* refused outright — the poster frame stays put */
  }
}

export function stopPreview(video: HTMLVideoElement): void {
  video.pause();
  video.currentTime = 0;
  video.muted = true;
}
