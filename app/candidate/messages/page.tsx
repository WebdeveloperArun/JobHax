"use client"

import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { 
  Search,
  Send,
  Paperclip,
  MoreVertical,
  Phone,
  Video,
  ArrowLeft
} from "lucide-react"
import { useState } from "react"

const conversations = [
  {
    id: 1,
    name: "Sarah Miller",
    company: "TechCorp Inc.",
    avatar: "SM",
    lastMessage: "Great! Looking forward to meeting you on Monday.",
    time: "2m ago",
    unread: 2,
  },
  {
    id: 2,
    name: "Mike Johnson",
    company: "StartupXYZ",
    avatar: "MJ",
    lastMessage: "Thank you for your application. We'd like to schedule an interview.",
    time: "1h ago",
    unread: 0,
  },
  {
    id: 3,
    name: "Emily Chen",
    company: "DesignHub",
    avatar: "EC",
    lastMessage: "Could you share more details about your design experience?",
    time: "3h ago",
    unread: 1,
  },
  {
    id: 4,
    name: "David Kim",
    company: "CloudScale",
    avatar: "DK",
    lastMessage: "The technical assessment has been sent to your email.",
    time: "1d ago",
    unread: 0,
  },
]

const messages = [
  {
    id: 1,
    sender: "them",
    text: "Hi John! Thank you for applying to the Senior Frontend Developer position at TechCorp.",
    time: "10:00 AM",
  },
  {
    id: 2,
    sender: "them",
    text: "We've reviewed your application and we're impressed with your experience. Would you be available for an interview next week?",
    time: "10:02 AM",
  },
  {
    id: 3,
    sender: "me",
    text: "Hi Sarah! Thank you for getting back to me. I'm very excited about this opportunity!",
    time: "10:15 AM",
  },
  {
    id: 4,
    sender: "me",
    text: "Yes, I'm available next week. What times work best for you?",
    time: "10:15 AM",
  },
  {
    id: 5,
    sender: "them",
    text: "How about Monday at 2:00 PM PST? We can do a video call.",
    time: "10:30 AM",
  },
  {
    id: 6,
    sender: "me",
    text: "Monday at 2:00 PM works perfectly for me!",
    time: "10:45 AM",
  },
  {
    id: 7,
    sender: "them",
    text: "Great! Looking forward to meeting you on Monday.",
    time: "10:46 AM",
  },
]

export default function CandidateMessagesPage() {
  const [selectedConversation, setSelectedConversation] = useState(conversations[0])
  const [showMobileChat, setShowMobileChat] = useState(false)

  return (
    <div className="flex min-h-screen">
      <DashboardSidebar 
        userType="candidate" 
        userName="John Doe" 
        userEmail="john@example.com" 
      />
      
      <main className="flex-1 overflow-hidden">
        <div className="h-[calc(100vh-4rem)] lg:h-screen flex">
          {/* Conversations List */}
          <div className={`w-full md:w-80 lg:w-96 border-r border-border flex flex-col ${showMobileChat ? 'hidden md:flex' : 'flex'}`}>
            <div className="p-4 border-b border-border">
              <h1 className="text-xl font-bold text-foreground mb-4">Messages</h1>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search conversations..." className="pl-10" />
              </div>
            </div>
            
            <ScrollArea className="flex-1">
              <div className="p-2">
                {conversations.map((conv) => (
                  <button
                    key={conv.id}
                    onClick={() => {
                      setSelectedConversation(conv)
                      setShowMobileChat(true)
                    }}
                    className={`w-full flex items-start gap-3 p-3 rounded-lg transition-colors text-left ${
                      selectedConversation.id === conv.id 
                        ? 'bg-primary/10' 
                        : 'hover:bg-muted'
                    }`}
                  >
                    <Avatar>
                      <AvatarFallback className="bg-secondary">{conv.avatar}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="font-medium text-sm truncate">{conv.name}</p>
                        <span className="text-xs text-muted-foreground">{conv.time}</span>
                      </div>
                      <p className="text-xs text-muted-foreground">{conv.company}</p>
                      <p className="text-sm text-muted-foreground truncate mt-1">{conv.lastMessage}</p>
                    </div>
                    {conv.unread > 0 && (
                      <Badge className="shrink-0">{conv.unread}</Badge>
                    )}
                  </button>
                ))}
              </div>
            </ScrollArea>
          </div>

          {/* Chat Area */}
          <div className={`flex-1 flex flex-col ${showMobileChat ? 'flex' : 'hidden md:flex'}`}>
            {/* Chat Header */}
            <div className="p-4 border-b border-border flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="md:hidden"
                  onClick={() => setShowMobileChat(false)}
                >
                  <ArrowLeft className="h-5 w-5" />
                </Button>
                <Avatar>
                  <AvatarFallback className="bg-secondary">{selectedConversation.avatar}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{selectedConversation.name}</p>
                  <p className="text-sm text-muted-foreground">{selectedConversation.company}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon">
                  <Phone className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon">
                  <Video className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Messages */}
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === 'me' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                        message.sender === 'me'
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted'
                      }`}
                    >
                      <p className="text-sm">{message.text}</p>
                      <p className={`text-xs mt-1 ${
                        message.sender === 'me' 
                          ? 'text-primary-foreground/70' 
                          : 'text-muted-foreground'
                      }`}>
                        {message.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

            {/* Message Input */}
            <div className="p-4 border-t border-border">
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon">
                  <Paperclip className="h-5 w-5" />
                </Button>
                <Input 
                  placeholder="Type a message..." 
                  className="flex-1"
                />
                <Button size="icon">
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Empty State for Desktop */}
          {!selectedConversation && (
            <div className="hidden md:flex flex-1 items-center justify-center">
              <Card className="max-w-sm">
                <CardContent className="py-12 text-center">
                  <p className="text-muted-foreground">Select a conversation to start messaging</p>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
