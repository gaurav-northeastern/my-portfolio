import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { ExternalLink, Github } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

export function Projects() {
  const projects = [
    {
      title: "Real-Time Monitoring & Alert System",
      description: "Created monitoring software with automated data scraping using Selenium and BeautifulSoup. Built role-based permissions and optimized process management with Python multithreading (40% speed increase). Packaged in Docker and deployed on AWS with GitHub Actions.",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop",
      technologies: ["React.js", "MongoDB", "Flask", "Docker", "Python", "Selenium", "WebSockets", "JWT"],
      github: "#",
      demo: "#"
    },
    {
      title: "SmartAssist AI - Customer Support Platform",
      description: "Built AI-powered chatbot reducing customer support response time by 70% using OpenAI GPT-3.5. Designed RESTful API with 8+ endpoints handling 1,000+ daily requests. Implemented secure authentication with JWT tokens supporting 100+ concurrent users.",
      image: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=600&h=400&fit=crop",
      technologies: ["React", "Flask", "MongoDB", "OpenAI API", "JWT", "Context API"],
      github: "#",
      demo: "#"
    },
    {
      title: "Scarlet Lifeline – Blood Donation App",
      description: "Developed blood donation platform connecting Spring Boot backend with React frontend, coordinating 3 microservices. Built APIs using Swagger documentation for donor registration, blood requests, and inventory management. Implemented secure authentication with Spring Security and JWT.",
      image: "https://images.unsplash.com/photo-1615461066841-6116e61058f4?w=600&h=400&fit=crop",
      technologies: ["Spring Boot", "React", "MongoDB", "Swagger", "Spring Security", "JWT"],
      github: "#",
      demo: "#"
    },
    {
      title: "BookMyEvent",
      description: "Built event platform where organizers create events with ticket tiers and capacity management, while users browse and purchase tickets. Implemented role-based access control, auto-scheduling for notifications, and admin dashboard with live ticket sales data. Packaged in Docker containers.",
      image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&h=400&fit=crop",
      technologies: ["React.js", "GraphQL", "MongoDB", "Node.js", "Docker", "JWT", "Context API"],
      github: "#",
      demo: "#"
    }
  ];

  return (
    <section className="py-20 px-4 bg-secondary/5">
      <div className="max-w-6xl mx-auto">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl md:text-4xl">Featured Projects</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A selection of projects that demonstrate my expertise in full-stack 
            development and modern DevOps practices.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <Card key={index} className="overflow-hidden">
              <div className="aspect-video overflow-hidden">
                <ImageWithFallback
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
                />
              </div>
              <CardHeader>
                <CardTitle>{project.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, techIndex) => (
                    <Badge key={techIndex} variant="secondary">
                      {tech}
                    </Badge>
                  ))}
                </div>
                <div className="flex gap-2 pt-2">
                  <Button variant="outline" size="sm" className="gap-2">
                    <Github className="h-4 w-4" />
                    Code
                  </Button>
                  <Button size="sm" className="gap-2">
                    <ExternalLink className="h-4 w-4" />
                    Demo
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}