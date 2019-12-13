
// If user object is not empty, is because user logged before.
export const isUserLogged = user => ( Object.entries(user).length > 0 );