// Support / donation configuration for the "Buy Me a Coffee" donation modal.
// Keeping the donation URL and QR image URL here means they can be swapped
// later without touching any component code.
//
// The QR image URL is read from the environment so the actual link stays out
// of source control. Set NEXT_PUBLIC_DONATE_QR_URL in your .env.local. Until
// it is set the modal shows an in-app placeholder instead of a broken link.

export type SupportQrPath = string | null;

export const SUPPORT = {
  koFiUrl: "https://ko-fi.com/H4J424N3PM",

  qr: (process.env.NEXT_PUBLIC_DONATE_QR_URL as SupportQrPath) || null,
};