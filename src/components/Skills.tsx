import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Code, Settings, Globe, Database, TestTube, Cloud } from "lucide-react";

export function Skills() {
  const skillCategories = [
    {
      icon: Code,
      title: "Programming Languages",
      skills: ["Java", "JavaScript", "Python", "HTML", "CSS"]
    },
    {
      icon: Globe,
      title: "Development Frameworks",
      skills: ["Spring Boot", "React.js", "Node.js", "Express.js", "Redux", "Bootstrap", "Material UI"]
    },
    {
      icon: Settings,
      title: "Developer Tools",
      skills: ["Git", "GitHub", "Docker", "AWS", "CI/CD", "GitHub Actions", "Postman", "JIRA", "Linux"]
    },
    {
      icon: Database,
      title: "Database Technologies",
      skills: ["SQL", "MongoDB", "PostgreSQL"]
    },
    {
      icon: Cloud,
      title: "API Development",
      skills: ["RESTful APIs", "GraphQL"]
    },
    {
      icon: TestTube,
      title: "Additional Skills",
      skills: ["JWT Authentication", "Selenium", "WebSockets", "OpenAI API", "Flask", "Swagger"]
    }
  ];

  return (
    <section className="py-20 px-4 bg-secondary/5">
      <div className="max-w-6xl mx-auto">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl md:text-4xl">Technical Skills</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Comprehensive expertise across modern development stack with focus on 
            scalable web applications and DevOps practices.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((category, index) => {
            const IconComponent = category.icon;
            return (
              <Card key={index} className="h-full">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <IconComponent className="h-5 w-5 text-primary" />
                    {category.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill, skillIndex) => (
                      <Badge key={skillIndex} variant="secondary">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}