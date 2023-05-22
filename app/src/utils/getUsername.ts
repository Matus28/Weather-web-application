export const getUsername = (email: string): string => {
  const breakIndex = email.indexOf("@");
  return email.split("").slice(0, breakIndex).join("");
};
