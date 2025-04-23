"use client"
import { useInView } from "react-intersection-observer"
import { MessageSquare, Edit, Clock, UserCheck, Video, Share2, FileText, Bot } from "lucide-react"

const features = [
  {
    icon: MessageSquare,
    title: "Text Chat",
    description: "Smooth real-time messaging with support for read receipts and typing indicators.",
  },
  {
    icon: Edit,
    title: "Message Management",
    description: "Edit or delete messages anytime with manual control for all users.",
  },
  {
    icon: Clock,
    title: "Auto-Delete Messages",
    description: "Free: Auto-deleted when offline. Premium: Set custom auto-delete timers per chat.",
  },
  {
    icon: UserCheck,
    title: "User Status",
    description: "Blue tick for Premium users and real-time online/offline indicators.",
  },
  {
    icon: Video,
    title: "Audio & Video Calls",
    description: "Free: 20 minutes daily. Premium: Unlimited high-quality calls.",
  },
  {
    icon: Share2,
    title: "Screen Sharing",
    description: "Premium users can share screens for meetings, support, or collaboration.",
  },
  {
    icon: FileText,
    title: "File Sharing",
    description: "Premium users can send attachments up to 50MB (images, docs, media, etc.).",
  },
  {
    icon: Bot,
    title: "AI Chat Assistant",
    description: "Premium only: AI that responds to messages while you're offline in Bangla and English.",
  },
]

export function FeaturesSection() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <section id="features" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/80">
              Feature-rich
            </span>{" "}
            Chat Experience
          </h2>
          <p className="text-muted-foreground">
            SmartConnect offers a comprehensive set of features designed to enhance your communication experience, with
            both free and premium options.
          </p>
        </div>

        <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`bg-card border-border rounded-xl p-6 transition-all duration-700 ease-out ${
                inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="bg-secondary p-3 rounded-lg inline-block mb-4">
                <feature.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
