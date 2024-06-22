import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import './App.css';
import { ETemplateId, initialState, setConfig, setTemplate } from './redux/templateSlice';
import axios from 'axios';
import store from './redux/store';
import { setPreviewDataConfig } from './redux/previewDataSlice';

interface Message {
  user: boolean;
  text: string;
}

interface IChatBot {
  showChart: boolean;
  setShowChart: (value: boolean) => void;
}

interface IResponse {
  data: {
    config: string;
  };
  status: number;
}

const initialChatMessage = [{ user: false, text: 'Hi, how can I help you today?' }];

const Chatbot = (props: IChatBot) => {
  const { showChart, setShowChart } = props;
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false)
  const [chatMessages, setChatMessages] = useState<Message[]>([{ user: false, text: '' }]);
  const [firstMessageSent, setFirstMessageSent] = useState(false);
  const [selectedIcon, setSelectedIcon] = useState('bar');

  const chatContainerRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();

  const handleMessageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newUserMessage: Message = { user: true, text: message };
    const aiResponse: Message = { user: false, text: "I don't know" };

    const payload = {
      type: showChart ? 'update' : 'create',
      config: store.getState().config,
      prompt: chatMessages
    };
    

    setLoading(true)
    const res = (await axios.post('http://localhost:8080/get-config', payload)) as IResponse;
    console.log('the res is here', res);
    const parsedResponse = JSON.parse(res.data.config);
    console.log('parsed response', parsedResponse);
    if (res.status === 200) {
      setChatMessages([...chatMessages, newUserMessage, aiResponse]);
      setMessage('');
      if (!firstMessageSent) {
        dispatch(setPreviewDataConfig(parsedResponse))
        setShowChart(true);
        setFirstMessageSent(true);
      }
      setLoading(false)
    }
  };

  const onChartUpdate = (value: ETemplateId) => {
    setSelectedIcon(value);
    dispatch(setTemplate({ template: value }));
  };

  const onReset = () => {
    console.log('hitting');
    setChatMessages(initialChatMessage);
    setMessage('');
    dispatch(setConfig(initialState));
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
          maxWidth: showChart ? '350px' : '550px'
        }}>
        {/* Heading */}
        <div className="icon-chart flex flex-col space-y-1.5 pb-6">
          <div>
            <h2 className="font-semibold text-lg tracking-tight">Chatbot</h2>
          </div>
          <div className="icons flex space-x-2" style={{ width: showChart ? '' : '30%' }}>
            <div className="icon-chart">
              <div
                className={`icon ${selectedIcon === ETemplateId.BAR ? 'selected' : ''}`}
                onClick={() => onChartUpdate(ETemplateId.BAR)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M6 20c1.1 0 2-.9 2-2v-7c0-1.1-.9-2-2-2s-2 .9-2 2v7c0 1.1.9 2 2 2m10-5v3c0 1.1.9 2 2 2s2-.9 2-2v-3c0-1.1-.9-2-2-2s-2 .9-2 2m-4 5c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2s-2 .9-2 2v12c0 1.1.9 2 2 2"
                  />
                </svg>
              </div>
              <div
                className={`icon ${selectedIcon === 'line' ? 'selected' : ''}`}
                onClick={() => onChartUpdate(ETemplateId.LINE)}>
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
            </div>
            <button className="reset-icon" onClick={() => onReset()}>
              <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 21 21">
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
          style={{ minWidth: '100%', height: showChart ? '34rem' : '10px' }}>
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
              type="submit"
              
              >
              {loading? (
                <div role="status">
                <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                </svg>
                <span className="sr-only">Loading...</span>
            </div>
              ): <div>submit</div>}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
