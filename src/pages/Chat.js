// src/MyChat.tsx
import { ChatKit, useChatKit } from "@openai/chatkit-react";
import axios from 'axios';
import apiConfig from '../config/api.json';
import { getServerUrl } from '../config/env';

export default function MyChat() {

  const serverUrl = getServerUrl();
  const { control } = useChatKit({
    api: {
      async getClientSecret(existing) {
        // If `existing` is passed, you can implement session refresh here
        const res = await axios.post(`${serverUrl}${apiConfig.api.chat.CHATKIT_TOKEN}`);
        const { client_secret } = res.data;
        return client_secret;
      },
    },
  });

  return (
    <div style={{ height: 600, width: 360 }}>
      <ChatKit control={control} />
    </div>
  );
}
