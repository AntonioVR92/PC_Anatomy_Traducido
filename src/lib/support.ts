// Support / donation configuration for the "Buy Me a Coffee" modal.
// Keeping the donation URL and QR image paths here means they can be
// swapped later without touching any component code.
//
// Leave `qr.gcash` / `qr.gotyme` set to `null` until the real QR assets are
// ready — the modal then renders an in-app placeholder instead of a broken link.

export type SupportQrPath = string | null;

export const SUPPORT = {
  koFiUrl: "https://ko-fi.com/H4J424N3PM",

  qr: {
    // TODO: point these at the real QR code assets, e.g. "/qr/gcash.png".
    gcash: null as SupportQrPath,
    gotyme: null as SupportQrPath,
  },
};