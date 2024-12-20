async function DiscordRequest(env, endpoint, options) {
  const url = `https://discord.com/api/v10/` + endpoint;
  if (options.body) options.body = JSON.stringify(options.body);

  const res = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bot ${env.DISCORD_TOKEN}`,
    },
    ...options,
  });
  // throw API errors
  if (!res.ok) {
    const data = await res.json();
    console.log(res.status);
    throw new Error(JSON.stringify(data));
  }
  // return original response
  return res;
}

export async function DeleteMessage(env, interaction) {
  const endpoint = `/channels/${interaction.message.channel_id}/messages/${interaction.message.id}`;
  return await DiscordRequest(env, endpoint, { method: 'DELETE' });
}

export async function GetCommands(env) {
  const endpoint = `/applications/${env.DISCORD_APPLICATION_ID}/commands`;
  return await DiscordRequest(env, endpoint, { method: 'GET' });
}

export async function DeleteCommand(env, interaction) {
  const endpoint = `/channels/${interaction.message.channel_id}/messages/${interaction.message.id}`;
  return await DiscordRequest(env, endpoint, { method: 'DELETE' });
}
