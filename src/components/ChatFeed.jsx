// import { isMixedTypeAnnotation } from '@babel/types';
// import React from 'react';
// import MessageForm from './MessageForm';
// import MyMessage from './MessageForm';
// import TheirMessage from './MessageForm';
// const ChatFeed = (props) => {
//   console.log(props);
//   const { chats, activeChat, userName, messages } = props;
//   //iff there is an active chat
//   const chat = chats && chats[activeChat];

//   const renderReadReceipts = (message, isMyMessage) => {
//     chat.people.map(
//       (person, index) =>
//         person.last_read === message.id && (
//           <div
//             key={`read_${index}`}
//             className='read-receipt'
//             style={{
//               float: isMyMessage ? 'right' : 'left',
//               backgroundImage:
//                 person.person.avator && `url(${person.person.avator})`,
//             }}
//           />
//         )
//     );
//   };

//   const renderMessages = () => {
//     const keys = Object.keys(messages);
//     return keys.map((key, index) => {
//       const message = messages[key];
//       const lastMessagekey = index === 0 ? null : keys[index - 1];
//       const isMyMessage = userName === message.sender.username;
//       return (
//         <div key={`msg_${index}`} style={{ width: '100%' }}>
//           <div className='message-block'>
//             {isMyMessage ? (
//               <MyMessage message={message} />
//             ) : (
//               <TheirMessage
//                 message={message}
//                 style={{
//                   marginRight: isMyMessage ? '18px' : '0px',
//                   marginLeft: isMyMessage ? '0px' : '68px',
//                 }}
//               />
//             )}
//           </div>
//           <div
//             className='read-receipts'
//             style={{
//               marginRight: isMyMessage ? '18px' : '0px',
//               marginLeft: isMyMessage ? '0px' : '68px',
//             }}
//           >
//             {renderReadReceipts(message, isMyMessage)}
//           </div>
//         </div>
//       );
//     });
//   };

//   if (!chat) return <div />;
//   return (
//     <div className='chat-feed'>
//       <div className='chat-title'>{chat?.title}</div>
//       <div className='chat-subtitle'>
//         {chat.people.map((person) => `${person.person.username}`)}
//       </div>
//       {renderMessages()}
//       <div style={{ height: '100px' }} />
//       <div className='message-form-container'>
//         <MessageForm {...props} chatid={activeChat} />
//       </div>
//     </div>
//   );
// };

// export default ChatFeed;

import MyMessage from './MyMessage';
import TheirMessage from './TheirMessage';
import MessageForm from './MessageForm';

const ChatFeed = (props) => {
  const { chats, activeChat, userName, messages } = props;

  const chat = chats && chats[activeChat];

  //if person has read the message
  const renderReadReceipts = (message, isMyMessage) =>
    chat.people.map(
      (person, index) =>
        person.last_read === message.id && (
          <div
            key={`read_${index}`}
            className='read-receipt'
            style={{
              float: isMyMessage ? 'right' : 'left',
              backgroundImage:
                person.person.avatar && `url(${person.person.avatar})`,
            }}
          />
        )
    );

  const renderMessages = () => {
    const keys = Object.keys(messages);

    return keys.map((key, index) => {
      const message = messages[key];
      const lastMessageKey = index === 0 ? null : keys[index - 1];
      const isMyMessage = userName === message.sender.username;

      return (
        <div key={`msg_${index}`} style={{ width: '100%' }}>
          <div className='message-block'>
            {isMyMessage ? (
              <MyMessage message={message} />
            ) : (
              <TheirMessage
                message={message}
                lastMessage={messages[lastMessageKey]}
              />
            )}
          </div>
          <div
            className='read-receipts'
            style={{
              marginRight: isMyMessage ? '18px' : '0px',
              marginLeft: isMyMessage ? '0px' : '68px',
            }}
          >
            {renderReadReceipts(message, isMyMessage)}
          </div>
        </div>
      );
    });
  };

  if (!chat) return <div />;

  return (
    <div className='chat-feed'>
      <div className='chat-title-container'>
        <div className='chat-title'>{chat?.title}</div>
        <div className='chat-subtitle'>
          {chat.people.map((person) => ` ${person.person.username}`)}
        </div>
      </div>
      {renderMessages()}
      <div style={{ height: '100px' }} />
      <div className='message-form-container'>
        <MessageForm {...props} chatId={activeChat} />
      </div>
    </div>
  );
};

export default ChatFeed;
