export function SplitCustomId(string) {
  const words = string.split('_');

  const id = {
    uid: `${words[0]}`,
    header: `${words[1]}`,
    name: `${words[2]}`,
    datetime: `${words[3]}`,
    isConsecutive: `${words[4]}`,
  };
  return id;
}

export function SplitMessage(string) {
  const words = string.split(`\n`);

  const id = {
    message: `${words[0]}`,
    alert: `${words[1]}`,
  };
  return id;
}

export function GetSelectedUsers(interaction) {
  const userList = [];
  const keys = Object.keys(interaction.data.resolved.users);
  keys.forEach((key) => {
    userList.push({
      id: interaction.data.resolved.users[key].id,
      username: interaction.data.resolved.users[key].username,
    });
  });
  return userList;
}
