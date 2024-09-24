import axios from "axios";
import { env } from "../env";


export async function SendDiscordMessage(msg: string): Promise<void> { 
  const webhook_url = env.DISCORD_WEBHOOK;

  const params = {
      username: 'James',
      content: msg,
  };

  try {
    const sendMessage = await axios({
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      data: JSON.stringify(params),
      url: webhook_url,
    });
    
    const data = sendMessage.data;

    return data;

  } catch (error) {
    console.error('Error sending message to Discord:', error);
    throw error; 
  }
}
