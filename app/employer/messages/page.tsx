"use client"

import { DashboardSidebar } from "@/components/dashboard-sidebar"
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
  ArrowLeft,
  FileText
} from "lucide-react"
import { useState } from "react"

const conversations = [
  {
    id: 1,
    name: "Sarah Johnson",
    position: "Senior Frontend Developer",
    avatar: "SJ",
    lastMessage: "Thank you! Looking forward to the interview.",
    time: "5m ago",
    unread: 1,
    status: "interview",
  },
  {
    id: 2,
    name: "Michael Chen",
    position: "Full Stack Developer",
    avatar: "MC",
    lastMessage: "I've attached my updated portfolio.",
    time: "2h ago",
    unread: 0,
    status: "screening",
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    position: "Product Designer",
    avatar: "ER",
    lastMessage: "Yes, I'm available for a call tomorrow.",
    time: "1d ago",
    unread: 0,
    status: "interview",
  },
  {
    id: 4,
    name: "David Kim",
    position: "DevOps Engineer",
    avatar: "DK",
    lastMessage: "Could you share more details about the role?",
    time: "2d ago",
    unread: 2,
    status: "new",
  },
]

const messages = [
  {
    id: 1,
    sender: "me",
    text: "Hi Sarah! Thank you for applying to the Senior Frontend Developer position.",
    time: "Yesterday 2:30 PM",
  },
  {
    id: 2,
    sender: "me",
    text: "We've reviewed your application and we're impressed with your experience. Would you be available for an interview next week?",
    time: "Yesterday 2:31 PM",
  },
  {
    id: 3,
    sender: "them",
    text: "Hi! Thank you so much for considering my application. I'm very excited about this opportunity!",
    time: "Yesterday 4:15 PM",
  },
  {
    id: 4,
    sender: "them",
    text: "Yes, I'm available next week. What times work best for you?",
    time: "Yesterday 4:16 PM",
  },
  {
    id: 5,
    sender: "me",
    text: "Great! How about Wednesday at 10:00 AM PST? We can do a video call.",
    time: "Yesterday 5:00 PM",
  },
  {
    id: 6,
    sender: "them",
    text: "Wednesday at 10 AM works perfectly!",
    time: "Today 9:30 AM",
  },
  {
    id: 7,
    sender: "me",
    text: "I'll send you a calendar invite with the video call link shortly.",
    time: "Today 10:00 AM",
  },
  {
    id: 8,
    sender: "them",
    text: "Thank you! Looking forward to the interview.",
    time: "Today 10:05 AM",
  },
]

const statusColors = {
  new: "bg-blue-500/10 text-blue-600",
  screening: "bg-yellow-500/10 text-yellow-600",
  interview: "bg-green-500/10 text-green-600",
}

export default function EmployerMessagesPage() {
  const [selectedConversation, setSelectedConversation] = useState(conversations[0])
  const [showMobileChat, setShowMobileChat] = useState(false)

  return (
    <div className="flex min-h-screen">
      <DashboardSidebar 
        userType="employer" 
        userName="TechCorp Inc." 
        userEmail="hr@techcorp.com" 
      />
      
      <main className="flex-1 overflow-hidden">
        <div className="h-[calc(100vh-4rem)] lg:h-screen flex">
          {/* Conversations List */}
          <div className={`w-full md:w-80 lg:w-96 border-r border-border flex flex-col ${showMobileChat ? 'hidden md:flex' : 'flex'}`}>
            <div className="p-4 border-b border-border">
              <h1 className="text-xl font-bold text-foreground mb-4">Messages</h1>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search candidates..." className="pl-10" />
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
                      <div className="flex items-center gap-2 mt-0.5">
                        <p className="text-xs text-muted-foreground truncate">{conv.position}</p>
                        <Badge variant="outline" className={`text-[10px] px-1.5 py-0 ${statusColors[conv.status as keyof typeof statusColors]}`}>
                          {conv.status}
                        </Badge>
                      </div>
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
                  <div className="flex items-center gap-2">
                    <p className="font-medium">{selectedConversation.name}</p>
                    <Badge variant="outline" className={`text-xs ${statusColors[selectedConversation.status as keyof typeof statusColors]}`}>
                      {selectedConversation.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{selectedConversation.position}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  <FileText className="h-4 w-4 mr-2" />
                  View Resume
                </Button>
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
        </div>
      </main>
    </div>
  )
}
