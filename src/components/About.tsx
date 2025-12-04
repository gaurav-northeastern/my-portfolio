import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { GraduationCap, Award, BookOpen } from "lucide-react";

export function About() {
  return (
    <section className="py-20 px-4 bg-secondary/5">
      <div className="max-w-4xl mx-auto">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl md:text-4xl">About Me</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Passionate software engineer with a strong foundation in full-stack development,
            currently pursuing advanced studies while building impactful solutions.
          </p>
        </div>

        <div className="grid gap-8">
          {/* Education Section */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-primary/10">
                  <GraduationCap className="h-6 w-6 text-primary" />
                </div>
                <div className="flex-1 space-y-4">
                  <div>
                    <h3 className="text-xl mb-1">Master of Science in Software Engineering Systems</h3>
                    <p className="text-primary">Northeastern University, Boston, USA</p>
                    <p className="text-sm text-muted-foreground mt-1">Expected Dec 2026</p>
                    <div className="mt-3">
                      <p className="text-sm font-medium mb-2">Relevant Coursework:</p>
                      <div className="flex flex-wrap gap-2">
                        {["Data Structures", "Algorithms Design", "Networking Protocols (TCP/IP)", "Operating Systems", "Object-Oriented Design"].map((course, index) => (
                          <Badge key={index} variant="secondary">
                            {course}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t">
                    <h3 className="text-xl mb-1">Bachelor of Technology in Computer Science</h3>
                    <p className="text-primary">GGSIP University, Delhi, India</p>
                    <p className="text-sm text-muted-foreground mt-1">Graduated July 2023</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* About Description */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-primary/10">
                  <BookOpen className="h-6 w-6 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl mb-3">Professional Summary</h3>
                  <div className="space-y-3 text-muted-foreground">
                    <p>
                      I'm a software engineer with hands-on experience in developing web applications
                      using modern technologies like React, Node.js, and Spring Boot. My background
                      includes working with startups where I've taken ownership of features from
                      concept to deployment.
                    </p>
                    <p>
                      Currently pursuing my Master's at Northeastern University, I'm expanding my
                      knowledge in advanced software engineering systems while working as a Service
                      Desk Technician, where I provide technical support and troubleshoot complex issues.
                    </p>
                    <p>
                      I specialize in building full-stack applications with a focus on clean code,
                      scalable architecture, and user experience. My experience includes implementing
                      CI/CD pipelines, containerization with Docker, cloud deployment on AWS, and
                      creating AI-powered solutions.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
