import React from 'react';
import DashboardLayout from '@/components/shared/DashboardLayout';
import { Card } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';

// Sample conversations data
const conversations = [
  {
    id: '1',
    name: 'Saudi Venture Capital',
    avatar: 'SVC',
    role: 'Investor',
    lastMessage: 'We would like to schedule a meeting to discuss your growth plans.',
    timestamp: '10:24 AM',
    unread: true,
  },
  {
    id: '2',
    name: 'Riyadh Angels',
    avatar: 'RA',
    role: 'Investor',
    lastMessage: 'Thank you for sharing your pitch deck. We have a few questions about your revenue projections.',
    timestamp: 'Yesterday',
    unread: false,
  },
  {
    id: '3',
    name: 'KAUST Innovation Fund',
    avatar: 'KIF',
    role: 'Investor',
    lastMessage: 'Could you provide more details about your technology stack?',
    timestamp: '2 days ago',
    unread: false,
  },
  {
    id: '4',
    name: 'Vision Accelerator',
    avatar: 'VA',
    role: 'Investor',
    lastMessage: 'We are interested in learning more about your expansion plans into UAE.',
    timestamp: '1 week ago',
    unread: false,
  },
];

// Sample messages for an active conversation
const messages = [
  {
    id: 'm1',
    sender: 'You',
    content: 'Hello! Thank you for connecting. We are excited about the potential partnership.',
    timestamp: 'June 15, 2023 10:00 AM',
  },
  {
    id: 'm2',
    sender: 'Saudi Venture Capital',
    content: 'Thank you for accepting our connection. We were impressed by your AI solution for the energy sector.',
    timestamp: 'June 15, 2023 10:15 AM',
  },
  {
    id: 'm3',
    sender: 'You',
    content: 'We appreciate that. Our technology has been implemented by several major companies in the region with great results.',
    timestamp: 'June 15, 2023 10:20 AM',
  },
  {
    id: 'm4',
    sender: 'Saudi Venture Capital',
    content: "That's excellent. We would like to schedule a meeting to discuss your growth plans and how we might support your expansion.",
    timestamp: 'June 15, 2023 10:24 AM',
  },
];

export default function MessagesPage() {
  // For a real implementation, we would track active conversation with state
  const activeConversation = conversations[0];
  
  return (
    <DashboardLayout
      pageTitle="Messages"
      pageDescription="Connect and communicate with your matches"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Conversations List */}
        <div className="md:col-span-1">
          <Card className="h-full">
            <div className="p-4 border-b">
              <h3 className="text-lg font-medium text-gray-900">Conversations</h3>
              <div className="mt-2">
                <Input 
                  placeholder="Search messages"
                  type="search"
                />
              </div>
            </div>
            
            <div className="overflow-y-auto" style={{ maxHeight: 'calc(100vh - 280px)' }}>
              <ul className="divide-y divide-gray-200">
                {conversations.map((conversation) => (
                  <li key={conversation.id} className={`px-4 py-3 hover:bg-gray-50 cursor-pointer ${conversation.id === activeConversation.id ? 'bg-blue-50' : ''}`}>
                    <div className="flex items-center space-x-4">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
                          <span className="text-gray-700 font-medium">{conversation.avatar}</span>
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium text-gray-900 truncate">
                            {conversation.name}
                          </p>
                          <p className="text-xs text-gray-500">
                            {conversation.timestamp}
                          </p>
                        </div>
                        <p className="text-xs text-gray-500">
                          {conversation.role}
                        </p>
                        <p className="text-sm text-gray-500 truncate">
                          {conversation.lastMessage}
                        </p>
                      </div>
                      {conversation.unread && (
                        <div className="flex-shrink-0">
                          <span className="inline-block w-2 h-2 rounded-full bg-blue-600"></span>
                        </div>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </Card>
        </div>
        
        {/* Active Conversation */}
        <div className="md:col-span-2">
          <Card className="h-full flex flex-col">
            {/* Conversation Header */}
            <div className="p-4 border-b flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-700 font-medium">{activeConversation.avatar}</span>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900">{activeConversation.name}</h3>
                  <p className="text-sm text-gray-500">{activeConversation.role}</p>
                </div>
              </div>
              <div>
                <Button variant="outline" size="sm">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  Schedule Call
                </Button>
              </div>
            </div>
            
            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4" style={{ maxHeight: 'calc(100vh - 350px)' }}>
              {messages.map((message) => (
                <div key={message.id} className={`flex ${message.sender === 'You' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-md px-4 py-2 rounded-lg ${message.sender === 'You' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'}`}>
                    <div className="flex items-end">
                      <div className="flex-1">
                        <p className="text-sm">{message.content}</p>
                      </div>
                    </div>
                    <p className="mt-1 text-xs text-gray-500">
                      {message.timestamp}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Message Input */}
            <div className="p-4 border-t">
              <div className="flex space-x-2">
                <div className="flex-1">
                  <Input
                    placeholder="Type your message..."
                  />
                </div>
                <Button variant="primary">
                  <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                  Send
                </Button>
              </div>
              <div className="flex mt-2 space-x-2">
                <button className="text-gray-400 hover:text-gray-600" title="Attach file">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                  </svg>
                </button>
                <button className="text-gray-400 hover:text-gray-600" title="Send image">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </button>
                <button className="text-gray-400 hover:text-gray-600" title="Schedule meeting">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
} 