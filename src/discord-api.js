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
  const text = await res.text();
  // throw API errors
  if (!res.ok) {
    const rateLimitInfo = {
      discordRetryAfter: res.headers.get('X-RateLimit-Reset-After'),
      cloudflareRetryAfter: res.headers.get('Retry-After'),
      status: res.status,
      body: text,
      translateForNonNerds: "I don't know",
    };
    // const data = await res.json();
    if (text === 'error code: 1015') {
      rateLimitInfo.translateForNonNerds =
        'Cloudflare is rate limiting the bot. Try again later.';
    }
    throw new Error(JSON.stringify(rateLimitInfo));
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
