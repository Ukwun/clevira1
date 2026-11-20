export function createWhatsappHref(message: string): string {
  const number = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER?.replace(/\D/g, "");
  const encodedMessage = encodeURIComponent(message);
  return number
    ? `https://wa.me/${number}?text=${encodedMessage}`
    : `https://wa.me/?text=${encodedMessage}`;
}
