export const getUsername = (email: string): string => {
  const breakIndex = email.indexOf("@");

  if (breakIndex < 0) return "";

  return email.split("").slice(0, breakIndex).join("");
};
