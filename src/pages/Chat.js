// src/MyChat.tsx
import { ChatKit, useChatKit } from "@openai/chatkit-react";
import apiConfig from '../config/api.json';
import { getServerUrl } from '../config/env';

export default function MyChat() {

  const serverUrl = getServerUrl();
  const { control } = useChatKit({
    api: {
      async getClientSecret(existing) {
        // If `existing` is passed, you can implement session refresh here
        const res = await fetch(`${serverUrl}${apiConfig.api.chat.CHATKIT_TOKEN}`, { method: "POST" });
        const { client_secret } = await res.json();
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
