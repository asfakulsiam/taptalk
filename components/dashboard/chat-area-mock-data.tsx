// Create a new file for mock data to make it easier to manage
export const onlineUsers = [
  {
    id: 1,
    name: "Alex Johnson",
    avatar: "/placeholder.svg?height=40&width=40",
    status: "online",
    unread: 3,
    lastMessage: "Hey, how's it going?",
    time: "10:30 AM",
    isPremium: true,
  },
  {
    id: 2,
    name: "Maria Garcia",
    avatar: "/placeholder.svg?height=40&width=40",
    status: "online",
    unread: 0,
    lastMessage: "Can we discuss the project later?",
    time: "9:45 AM",
    isPremium: false,
  },
  {
    id: 3,
    name: "James Smith",
    avatar: "/placeholder.svg?height=40&width=40",
    status: "online",
    unread: 1,
    lastMessage: "I've sent you the files",
    time: "Yesterday",
    isPremium: true,
  },
  {
    id: 4,
    name: "Emma Wilson",
    avatar: "/placeholder.svg?height=40&width=40",
    status: "offline",
    unread: 0,
    lastMessage: "Let's catch up soon!",
    time: "Yesterday",
    isPremium: false,
  },
  {
    id: 5,
    name: "Michael Brown",
    avatar: "/placeholder.svg?height=40&width=40",
    status: "online",
    unread: 5,
    lastMessage: "Did you see the latest update?",
    time: "Monday",
    isPremium: true,
  },
];

export const groups = [
  {
    id: 1,
    name: "Project Alpha",
    avatar: "/placeholder.svg?height=40&width=40",
    unread: 2,
    lastMessage: "Alex: I've updated the designs",
    time: "11:20 AM",
    members: 5,
  },
  {
    id: 2,
    name: "Design Team",
    avatar: "/placeholder.svg?height=40&width=40",
    unread: 0,
    lastMessage: "Maria: Let's meet tomorrow",
    time: "Yesterday",
    members: 8,
  },
  {
    id: 3,
    name: "Marketing",
    avatar: "/placeholder.svg?height=40&width=40",
    unread: 7,
    lastMessage: "James: Campaign results are in!",
    time: "Monday",
    members: 12,
  },
];

// Mock data for messages
export const mockMessages = [
  {
    id: 1,
    sender: "Alex Johnson",
    content: "Hey there! How's it going?",
    time: "10:30 AM",
    isMine: false,
    status: "read",
    isPremium: true,
  },
  {
    id: 2,
    sender: "You",
    content: "I'm good, thanks! Just working on the new project.",
    time: "10:32 AM",
    isMine: true,
    status: "read",
  },
  {
    id: 3,
    sender: "Alex Johnson",
    content: "That sounds interesting. What kind of project is it?",
    time: "10:33 AM",
    isMine: false,
    status: "read",
    isPremium: true,
  },
  {
    id: 4,
    sender: "You",
    content:
      "It's a chat application called Taptalk. I'm using Next.js and TypeScript.",
    time: "10:35 AM",
    isMine: true,
    status: "read",
  },
  {
    id: 5,
    sender: "Alex Johnson",
    content: "That's cool! I've been wanting to learn Next.js myself.",
    time: "10:36 AM",
    isMine: false,
    status: "read",
    isPremium: true,
  },
];

// Mock data for messages with Maria
export const mariaMessages = [
  {
    id: 1,
    sender: "Maria Garcia",
    content: "Hi there! Can we discuss the project later today?",
    time: "9:45 AM",
    isMine: false,
    status: "read",
    isPremium: false,
  },
  {
    id: 2,
    sender: "You",
    content: "Sure, what time works for you?",
    time: "9:47 AM",
    isMine: true,
    status: "read",
  },
  {
    id: 3,
    sender: "Maria Garcia",
    content: "How about 3 PM? I'll be free after my meeting.",
    time: "9:50 AM",
    isMine: false,
    status: "read",
    isPremium: false,
  },
  {
    id: 4,
    sender: "You",
    content: "3 PM works perfectly. Should we use Taptalk for the call?",
    time: "9:52 AM",
    isMine: true,
    status: "read",
  },
];

// Mock data for Project Alpha group
export const projectAlphaMessages = [
  {
    id: 1,
    sender: "Alex Johnson",
    content:
      "I've updated the designs for the homepage. Check them out when you get a chance.",
    time: "11:20 AM",
    isMine: false,
    status: "read",
    isPremium: true,
  },
  {
    id: 2,
    sender: "Maria Garcia",
    content: "They look great! I especially like the new color scheme.",
    time: "11:25 AM",
    isMine: false,
    status: "read",
    isPremium: false,
  },
  {
    id: 3,
    sender: "You",
    content:
      "I agree with Maria. The new design is much cleaner. When can we start implementing it?",
    time: "11:30 AM",
    isMine: true,
    status: "read",
  },
  {
    id: 4,
    sender: "Alex Johnson",
    content:
      "I'm thinking we can start next week. I'll finalize everything by Friday.",
    time: "11:35 AM",
    isMine: false,
    status: "read",
    isPremium: true,
  },
];

// AI suggestions for quick replies
export const aiSuggestions = [
  "Thanks for the information!",
  "I'll check these out right away.",
  "Could you recommend any specific tutorials?",
  "Do you have time for a quick call to discuss this?",
];
