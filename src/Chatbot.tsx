import React, { useEffect, useRef, useState } from 'react';
import './App.css';

interface Message {
  user: boolean;
  text: string;
}

interface IChatBot {
  showChart: boolean;
  setShowChart: (value: boolean) => void;
}

const initialChatMessage = [{ user: false, text: 'Hi, how can I help you today?' }];

const Chatbot = (props: IChatBot) => {
  const { showChart, setShowChart } = props;
  const [message, setMessage] = useState('');
  const [chatMessages, setChatMessages] = useState<Message[]>([{ user: false, text: '' }]);
  const [firstMessageSent, setFirstMessageSent] = useState(false);
  const [selectedIcon, setSelectedIcon] = useState('bar');

  const chatContainerRef = useRef<HTMLDivElement>(null);

  const handleMessageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newUserMessage: Message = { user: true, text: message };
    const aiResponse: Message = { user: false, text: "I don't know" };

    setChatMessages([...chatMessages, newUserMessage, aiResponse]);
    setMessage('');

    if (!firstMessageSent) {
      setShowChart(true);
      setFirstMessageSent(true);
    }
  };

  const onReset = () => {
    console.log('hitting');
    setChatMessages(initialChatMessage);
    setMessage('');
  };
  
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatMessages]);

  return (
    <div className="chatbot">
      <div
        className="chatbot-box"
        style={{
          width: showChart ? '100%' : '550px',
          maxWidth: showChart ? '350px' : '550px',
          height: showChart ? '85%' : '25%'
        }}>
        {/* Heading */}
        <div className="icon-chart flex flex-col space-y-1.5 pb-6">
          <div>
            <h2 className="font-semibold text-lg tracking-tight">Chatbot</h2>
          </div>
          <div className="icons flex space-x-2">
          <div className='icon-chart'>
            <div
              className={`icon ${selectedIcon === 'bar' ? 'selected' : ''}`}
              onClick={() => setSelectedIcon('bar')}>
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M6 20c1.1 0 2-.9 2-2v-7c0-1.1-.9-2-2-2s-2 .9-2 2v7c0 1.1.9 2 2 2m10-5v3c0 1.1.9 2 2 2s2-.9 2-2v-3c0-1.1-.9-2-2-2s-2 .9-2 2m-4 5c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2s-2 .9-2 2v12c0 1.1.9 2 2 2"
                />
              </svg>
            </div>
            <div
              className={`icon ${selectedIcon === 'line' ? 'selected' : ''}`}
              onClick={() => setSelectedIcon('line')}>
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24">
                <g
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2">
                  <path d="M3 3v18h18" />
                  <path d="m19 9l-5 5l-4-4l-3 3" />
                </g>
              </svg>
            </div>
            <div
              className={`icon ${selectedIcon === 'lollipop' ? 'selected' : ''}`}
              onClick={() => setSelectedIcon('lollipop')}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 64 64"
                width="18"
                height="18"
                fill="currentColor">
                <line x1="12" y1="20" x2="12" y2="50" stroke="black" strokeWidth="2" />
                <line x1="32" y1="30" x2="32" y2="50" stroke="black" strokeWidth="2" />
                <line x1="52" y1="10" x2="52" y2="50" stroke="black" strokeWidth="2" />

                <circle cx="12" cy="20" r="6" fill="black" />
                <circle cx="32" cy="30" r="6" fill="black" />
                <circle cx="52" cy="10" r="6" fill="black" />

                <line x1="0" y1="50" x2="64" y2="50" stroke="black" strokeWidth="2" />
              </svg>
            </div>
            </div>
            <button className='reset-icon' onClick={() => onReset()}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1em"
              height="1em"
              viewBox="0 0 21 21">
              <g
                fill="none"
                fillRule="evenodd"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round">
                <path d="M3.578 6.487A8 8 0 1 1 2.5 10.5"></path>
                <path d="M7.5 6.5h-4v-4"></path>
              </g>
            </svg>
          </button>
          </div>
          
        </div>

        {/* Chat Container */}
        <div
          className="message-div pr-4 h-[474px] overflow-y-scroll"
          ref={chatContainerRef}
          style={{ minWidth: '100%', height: showChart ? '520px': '10px' }}>
          {chatMessages.map(
            (msg, index) =>
              msg.text !== '' && (
                <div
                  key={index}
                  className={`flex gap-3 my-4 text-gray-600 text-sm flex-1 ${
                    msg.user ? 'justify-end' : 'justify-start'
                  }`}>
                  {!msg.user && (
                    <span className="relative flex shrink-0 overflow-hidden rounded-full w-8 h-8">
                      <div className="rounded-full bg-gray-100 border p-1">
                        <svg
                          stroke="none"
                          fill="black"
                          strokeWidth="1.5"
                          viewBox="0 0 24 24"
                          aria-hidden="true"
                          height="20"
                          width="20"
                          xmlns="http://www.w3.org/2000/svg">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z"
                          />
                        </svg>
                      </div>
                    </span>
                  )}
                  <p className="leading-relaxed">
                    <span
                      className={`block font-bold ${msg.user ? 'text-gray-700' : 'text-gray-400'}`}>
                      {msg.user ? 'You' : 'AI'}
                    </span>
                    {msg.text}
                  </p>
                </div>
              )
          )}
        </div>

        {/* Input Box */}
        <div className="flex items-center pt-0">
          <form
            className="flex items-center justify-center w-full space-x-2"
            onSubmit={handleSubmit}>
            <input
              className="flex h-10 w-full rounded-md border border-[#e5e7eb] px-3 py-2 text-sm placeholder-[#6b7280] focus:outline-none focus:ring-2 focus:ring-[#9ca3af] disabled:cursor-not-allowed disabled:opacity-50 text-[#030712] focus-visible:ring-offset-2"
              placeholder="Type your message"
              value={message}
              onChange={handleMessageChange}
            />
            <button
              className="inline-flex items-center justify-center rounded-md text-sm font-medium text-[#f9fafb] disabled:pointer-events-none disabled:opacity-50 bg-black hover:bg-[#111827E6] h-10 px-4 py-2"
              type="submit">
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
   
  );
};

export default Chatbot;
