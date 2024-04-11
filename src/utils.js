export function SplitCustomId(string){
  const words = string.split("_");

  const id = {
    "owner": `${words[0]}`,
    "header": `${words[1]}`,
    "name": `${words[2]}`,
    "datetime": `${words[3]}`,
    "isSequential": `${words[4]}`,
  }
  return id;
}

export function SplitMessage(string){
  const words = string.split(`\n`);

  const id = {
    "message": `${words[0]}`,
    "alert": `${words[1]}`
  }
  return id;
}

