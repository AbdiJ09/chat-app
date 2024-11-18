export const getUserId = (): number | null => {
  const userString = localStorage.getItem("user");
  if (userString) {
    const user = JSON.parse(userString);
    return user.id || null;
  }
  console.error("User not found in localStorage");
  return null;
};
