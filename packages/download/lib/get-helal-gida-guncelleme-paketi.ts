// import type { IResponseGetHelalGidaGuncellemePaketi } from "./interface-get-helal-gida-guncelleme-paketi.ts";
export async function getHelalGidaGuncellemePaketi() {
  const response = await fetch(
    "https://gimnet.gimdes.com/Services/MobileServices/GetHelalGidaGuncellemePaketi"
  );

  return response;
  // return await response.arrayBuffer();
  // const data = await response.json();
  // response.

  // return data as IResponseGetHelalGidaGuncellemePaketi;
}
