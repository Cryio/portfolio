'use client';

import Timeline from "@/components/Timeline";

export default function RoleAndResponsibilities() {
  return (
    <main className="min-h-screen pt-24">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-primary to-primary/50 text-transparent bg-clip-text">
          Role & Responsibilities
        </h1>

        <div className="mb-4 text-foreground/80 text-lg">
          A timeline of my professional roles, volunteer work, and educational journey.
        </div>

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
            badge="2023"
            subheader="Maa Karma Global Engineering LLP"
            description={[
              "Designed and developed web interfaces in a remote internship",
              "Created responsive and user-friendly website layouts",
              "Implemented modern UI/UX principles in design solutions"
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
      </div>
    </main>
  );
} 