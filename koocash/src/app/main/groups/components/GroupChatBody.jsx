import React from "react";

const ChatBody = ({ messages, lastMessageRef }) => {
  return (
    <div>
      <div
        id="messages"
        class="flex flex-col space-y-4 p-3 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch"
      >
        {messages.map((message) =>
          message.name == localStorage.getItem("Chat-userName") ? (
            <div className="chat-message">
              <div className="flex items-end justify-end">
                <div className="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-1 items-end">
                  <div>
                    <span className="px-4 py-2 rounded-lg inline-block rounded-br-none bg-green-300 text-black ">
                      {message.text}
                    </span>
                  </div>
                </div>
                <span></span>
              </div>
            </div>
          ) : (
            <div className="chat-message">
              <div className="flex items-end">
                <div className="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-2 items-start">
                  <div>
                    <span className="px-4 py-2 rounded-lg inline-block rounded-bl-none bg-gray-300 text-gray-600">
                      <span className="text-black font-bold">
                        {message.name}
                      </span>{" "}
                      <br />
                      {message.text}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )
        )}
        <div ref={lastMessageRef} />
      </div>

      <script>
        const el = document.getElementById('messages') el.scrollTop =
        el.scrollHeight
      </script>
    </div>
  );
};

export default ChatBody;
