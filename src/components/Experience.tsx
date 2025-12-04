import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Briefcase, Calendar, MapPin } from "lucide-react";

export function Experience() {
  const experiences = [
    {
      title: "Service Desk Technician",
      company: "Northeastern University",
      location: "Boston, Massachusetts",
      period: "Jan 2025 - April 2025",
      description: "Provide timely and effective technical support to end-users by troubleshooting hardware, software, and network issues.",
      technologies: ["Technical Support", "Troubleshooting", "Hardware", "Software", "Networking"]
    },
    {
      title: "Software Engineer",
      company: "DMS Vision INC",
      location: "Austin, Texas (Remote)",
      period: "August 2023 - July 2024",
      description: "Developed web applications with React and Node.js, personally building over half the UI components like dashboards and approval workflows. Tackled technical challenges alongside the engineering team and took ownership of features from start to finish. Implemented user authentication with Active Directory across 3+ modules. Modified website functionality per client specifications and created SQL stored procedures for backend operations. Set up CI/CD automation with GitHub Actions, Docker, and AWS. Collaborated with different teams to meet project deadlines in a startup setting.",
      technologies: ["React", "Node.js", "Active Directory", "SQL", "GitHub Actions", "Docker", "AWS", "CI/CD"]
    }
  ];

  return (
    <section className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl md:text-4xl">Professional Experience</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Experience in full-stack development, building scalable web applications,
            and providing technical support in academic and startup environments.
          </p>
        </div>
        
        <div className="space-y-6">
          {experiences.map((exp, index) => (
            <Card key={index}>
              <CardHeader>
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Briefcase className="h-5 w-5 text-primary" />
                      {exp.title}
                    </CardTitle>
                    <p className="text-primary mt-1">{exp.company}</p>
                  </div>
                  <div className="flex flex-col md:items-end gap-1">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      {exp.period}
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <MapPin className="h-4 w-4" />
                      {exp.location}
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">{exp.description}</p>
                <div className="flex flex-wrap gap-2">
                  {exp.technologies.map((tech, techIndex) => (
                    <Badge key={techIndex} variant="outline">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}