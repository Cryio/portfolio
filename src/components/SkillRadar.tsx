"use client";

import { RadarChart, PolarGrid, PolarAngleAxis, Radar, Tooltip } from "recharts";

type Skill = { label: string; value: number; note?: string };

export function SkillRadar({
  title = "",
  skills = [
  { label: "Forensics", value: 80, note: "Docker/Podman CVEs, DFIR, Autopsy, CAPEv2, Ghidra, x64dbg" },
  { label: "Containers", value: 90, note: "Docker, Podman, QEMU, VirtualBox — research on container vulnerabilities" },
  { label: "Networking", value: 85, note: "Wireshark, TCP/IP, Cisco Packet Tracer, network config & VAPT" },
  { label: "Cloud", value: 75, note: "Google Cloud Platform, AWS, Azure — GenAI app deployment" },
  { label: "Red Team", value: 80, note: "Nessus, Burp Suite, Metasploit, SQLmap, exploit PoCs (C/Python)" },
  { label: "Blue Team", value: 78, note: "Wazuh, MISP, DFIR-IRIS, Log Management, Threat Intelligence" },
  { label: "AI/ML", value: 70, note: "IIT Bombay ML course, GANs, CSI-based Activity Recognition" },
  { label: "Dev", value: 72, note: "Python, Java, Node.js, React, Flutter, Flask APIs, OAuth" },
  { label: "3D & Design", value: 65, note: "Blender 3D, Figma, Adobe Suite, React Three Fiber visuals" }
],
}: {
  title?: string;
  skills?: Skill[];
}) {
  const data = skills.map((s) => ({ label: s.label, value: s.value, note: s.note }));

  return (
    <div className="text-white">
      <h3 className="text-xl font-semibold mb-4 text-center md:text-left">{title}</h3>
      <div className="w-full flex justify-center">
        <RadarChart data={data} width={360} height={300} cx={180} cy={150} outerRadius={110}>
          <PolarGrid stroke="rgba(255,255,255,0.25)" />
          <PolarAngleAxis dataKey="label" tick={{ fill: "#ffffff", fontSize: 12 }} />
          <Tooltip
            contentStyle={{ background: "rgba(0,0,0,0.6)", border: "none", borderRadius: 8, color: "#ffffff" }}
            labelStyle={{ color: "#ffffff" }}
          />
          <Radar
            name={title}
            dataKey="value"
            stroke="#ffffff"
            fill="#ffffff"
            fillOpacity={0.2}
            animationBegin={100}
            animationDuration={1200}
            isAnimationActive
          />
        </RadarChart>
      </div>
    </div>
  );
}


