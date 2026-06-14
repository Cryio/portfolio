'use client';

import Timeline from "@/components/Timeline";
import { FadeInWrapper } from "@/components/FadeInWrapper";

export default function RoleAndResponsibilities() {
  return (
    <main className="min-h-screen pt-24">
      <div className="container mx-auto px-4">
        <FadeInWrapper duration={600} delay={0}>
          <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-primary to-primary/50 text-transparent bg-clip-text">
            Role & Responsibilities
          </h1>
        </FadeInWrapper>

        <FadeInWrapper duration={600} delay={100}>
          <div className="mb-4 text-foreground/80 text-lg">
            A timeline of my professional roles, volunteer work, and educational journey.
          </div>
        </FadeInWrapper>

        <FadeInWrapper duration={600} delay={200}>
        <Timeline>
          <Timeline.Item
            header="Hopefully You!"
            badge="Now"
            subheader="Present"
            description={[
              "Looking forward to the next opportunity to contribute, innovate, and grow."
            ]}
            skills={[
              "Adaptability",
              "Creativity",
              "Leadership",
              "Continuous Learning"
            ]}
          />
          <Timeline.Item
            header="Platform Engineer"
            badge="June 2026 – Present"
            subheader="Xcaliber Health"
            location="Bangalore, Karnataka"
            description={[
              "Converted from intern to full-time Platform Engineer on the core data platform team",
              "Design and operate change-data-capture and data-sync pipelines (Kafka, Debezium, Ray, Temporal) powering analytics at scale",
              "Build and harden platform capabilities — data catalog, lineage, and distributed data-quality validation",
              "Drive reliability, security, and observability across workflow orchestration and infrastructure"
            ]}
            skills={[
              "Kafka",
              "Debezium",
              "Ray",
              "Temporal",
              "Daft",
              "Iceberg",
              "Platform Engineering"
            ]}
          />
          <Timeline.Item
            header="Engineering Intern"
            badge="March 2026 – June 2026"
            subheader="Xcaliber Health"
            location="Bangalore, Karnataka"
            description={[
              "Developed scalable CDC and Data Sync pipelines using Kafka, Debezium, Ray, and Temporal",
              "Built Data Catalog, Lineage, and Analytics platform features for enterprise users",
              "Implemented distributed Data Quality validation using Daft and Ray",
              "Enhanced platform reliability, security, and observability through workflow and infrastructure improvements"
            ]}
            skills={[
              "Kafka",
              "Debezium",
              "Ray",
              "Temporal",
              "Daft",
              "Data Engineering"
            ]}
          />
          <Timeline.Item
            header="CyberSecurity Intern"
            badge="July 2025 – March 2026"
            subheader="Fluidech IT Services"
            location="Gurugram, Haryana"
            description={[
              "Assisted in monitoring security alerts and logs from endpoints to identify suspicious activities",
              "Performed VAPT activities using industry-standard tools and manual testing",
              "Gained hands-on exposure to SIEM dashboards and Case Management solutions",
              "Integrated external threat intelligence feeds into security workflows to enhance detection and prioritization"
            ]}
            skills={[
              "VAPT",
              "SIEM",
              "Threat Intelligence",
              "Incident Response",
              "Security Operations"
            ]}
          />
          <Timeline.Item
            header="Graduation"
            badge="2026"
            subheader="BTech in Computer Science"
            location="NIIT University"
            description={[
              "Completed my BTech CSE with a focus on cybersecurity and software development."
            ]}
            skills={[
              "Cybersecurity",
              "Software Development",
              "Web Technologies",
              "Python",
              "Java",
              "JavaScript",
              "Problem-Solving"
            ]}
          />
          <Timeline.Item
            header="Design Core"
            badge="2023-2024"
            subheader="TEDxNIITUniversity"
            location="Neemrana, Rajasthan"
            description={[
              "Worked on visual storytelling and creative direction for TEDx events",
              "Created engaging visual content for social media and event promotions",
              "Collaborated with speakers to develop presentation visuals"
            ]}
            skills={[
              "3D Design",
              "Graphic Design",
              "Event Branding",
              "Creative Direction",
              "Public Speaking Aesthetics"
            ]}
          />
          
          <Timeline.Item
            header="Junior Web Designer"
            badge="Apr – Sep 2023"
            subheader="Maa Karmaa Global Engineering LLP"
            location="Kalyan, Maharashtra"
            description={[
              "Designed and developed web pages using HTML/CSS, improving UI/UX consistency",
              "Created engaging graphic designs to enhance visual communication",
              "Collaborated with cross-functional teams to implement responsive design solutions"
            ]}
            skills={[
              "Web Development",
              "Frontend Design",
              "CSS",
              "UI/UX",
              "Graphic Design",
              "User-Centered Design"
            ]}
          />
          
          <Timeline.Item
            header="Design Lead"
            badge="2023-2024"
            subheader="Google Developers Student Club"
            location="Neemrana, Rajasthan"
            description={[
              "Led the design team, focusing on branding, graphics, and community engagement",
              "Developed and implemented UI/UX strategies for club projects",
              "Managed creative direction for club events and initiatives"
            ]}
            skills={[
              "UI/UX",
              "Graphic Design",
              "Branding",
              "Leadership",
              "Community Engagement",
              "CSS",
              "Mass Media"
            ]}
          />

          <Timeline.Item
            header="English Language Instructor"
            badge="Oct - Dec 2022"
            subheader="NIIT Foundation"
            location="Career Development Center, Mokhada"
            description={[
              "Conducted English language training for job readiness programs",
              "Completed 20 hours of dedicated volunteering tenure over 6 weeks",
              "Provided personalized guidance to enhance students' career prospects",
              "Received recognition for diligent and proactive teaching approach",
              "Contributed to the Foundation's mission of empowering students"
            ]}
            skills={[
              "English Language Training",
              "Career Development",
              "Teaching",
              "Mentoring",
              "Volunteer Work"
            ]}

          />

          <Timeline.Item
            header="Higher Secondary"
            badge="2022"
            subheader="12th (CBSE)"
            description={[
              "Started my career working on threat intelligence and security operations"
            ]}
            skills={[
              "Critical Thinking",
              "Research & Analysis"
            ]}
          />
        </Timeline>
        </FadeInWrapper>
      </div>
    </main>
  );
} 
