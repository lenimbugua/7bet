export function useDownloadApp() {
  function downloadApp() {
    const apkUrl =
      "https://play.google.com/store/apps/details?id=com.paristake&hl=en";
    window.location.href = apkUrl;
  }
  return {
    downloadApp,
  };
}
