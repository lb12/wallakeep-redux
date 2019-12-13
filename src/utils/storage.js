export const setUser = user => {
  localStorage.setItem("wallakeep_user", JSON.stringify(user));
};

export const getUser = () => {
  const user = localStorage.getItem("wallakeep_user");
  return JSON.parse(user);
};

export const deleteUser = () => {
  localStorage.removeItem('wallakeep_user');
};
