export const handleSignOut = () => {
  localStorage.removeItem("ISSUED_AT");
  localStorage.removeItem("ACCESS_TOKEN");
};
