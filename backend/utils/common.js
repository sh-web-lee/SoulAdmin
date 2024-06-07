import fs from "fs";
import https from 'https';

export function transformImgToBase64(url) {
  const img = fs.readFileSync(url);

  return img.toString("base64");
}

export function urlToBase64(url) {
  return new Promise((resolve, reject) => {
    https
      .get(url, (response) => {
        response.setEncoding("binary");
        let body = "";
        response.on("data", (data) => {
          body += data;
        });
        response.on("end", () => {
          const base64 = Buffer.from(body, "binary").toString("base64");
          resolve(base64);
        });
      })
      .on("error", (error) => {
        reject(error);
      });
  });
}
