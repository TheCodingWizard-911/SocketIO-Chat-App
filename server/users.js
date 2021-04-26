const users = [];

const addUser = ({ id, username, roomname }) => {
  username = username.trim().toLowerCase();
  roomname = roomname.trim().toLowerCase();

  const existingUser = users.find(
    (user) => user.roomname === roomname && user.username === username
  );

  if (!username || !roomname)
    return { error: "Username and room are required." };
  if (existingUser) return { error: "Username is taken." };

  const user = { id, username, roomname };

  console.log("users array before", users);

  users.push(user);

  console.log("User", user, "Pushed into users array");
  console.log("users array after", users);

  return { user };
};

const removeUser = (id) => {
  const index = users.findIndex((user) => user.id === id);

  if (index !== -1) return users.splice(index, 1)[0];
};

const getUser = (id) => users.find((user) => user.id === id);

const getUsersInRoom = (roomname) =>
  users.filter((user) => user.roomname === roomname);

module.exports = { addUser, removeUser, getUser, getUsersInRoom };
