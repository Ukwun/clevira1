export function createWhatsappHref(message: string): string {
  const number = getWhatsappNumber();
  const encodedMessage = encodeURIComponent(message);
  return number
    ? `https://wa.me/${number}?text=${encodedMessage}`
    : `https://wa.me/?text=${encodedMessage}`;
}

export function getWhatsappNumber(): string {
  const configuredNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER?.replace(/\D/g, "");
  const number = configuredNumber || "2349040282698";
  return number.startsWith("0") ? `234${number.slice(1)}` : number;
}
