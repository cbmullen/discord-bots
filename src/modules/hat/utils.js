export function SplitCustomId(string){
  const words = string.split("_");

  const id = {
    "item": `${words[0]}`,
    "type": `${words[1]}`,
    "hatName": `${words[2]}`
  }
  return id;
}
  