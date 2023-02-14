import { useEffect, useState } from 'react';
import MessageTable from './components/MessageTable'
import NewMessage from './components/NewMessage'

interface Response {
  message?: string;
  error?: string;
  data?: MessageObj[];
}

function App() {
  const [messages, setMessages] = useState<MessageObj[]>([]);

  function refreshMessages() {
    const url = new URL(window.location.toString());
    url.pathname = '/messages/list';
    fetch(url)
      .then(res => res.json<Response>())
      .then(res => setMessages(res.data!));
  }

  const newMessage = () => {
    refreshMessages();
  }

  useEffect(() => {
    refreshMessages();
  }, []);

  return (
    <div className='w-full h-full my-10 text-center'>
      <div className='w-4/5 m-auto'>
        <h1 className='text-4xl font-bold'>Message board</h1>

        <hr className='border-1 border-solid m-6 w-4/5 inline-block' />

        {/* Write a comment */}
        <NewMessage onNewMessage={newMessage} />

        {/* Message table */}
        <MessageTable messages={messages} />
        </div>
    </div>
  )
}

export default App
