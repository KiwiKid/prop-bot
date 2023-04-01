import React from 'react';
import Layout from '@/components/layout';
import Chat from '@/components/chat'

import dynamic from 'next/dynamic'

/*const DynamicChat = dynamic(() => import(), {
  loading: () => <p>Loading...</p>,
})*/

const ChatPage = (props) => {
  console.log('props', props);

  return (
    <Layout>
      <Chat />
    </Layout>
  );
};

export default ChatPage;
