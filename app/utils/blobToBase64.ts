function blobToBase64(blob: Blob): Promise<string> {
  const reader = new FileReader();
  return new Promise((resolve) => {
    reader.onload = function () {
      // @ts-ignore
      const base64data = reader?.result?.split(",")[1];
      resolve(base64data);
    };

    reader.readAsDataURL(blob);
  });
}

export { blobToBase64 };
