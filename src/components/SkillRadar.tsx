"use client";

import { RadarChart, PolarGrid, PolarAngleAxis, Radar, Tooltip } from "recharts";

type Skill = { label: string; value: number; note?: string };

export function SkillRadar({
  title = "",
  skills = [
    { label: "Forensics", value: 60, note: "Ghidra, x64dbg" },
    { label: "Containers", value: 80, note: "Docker, Podman" },
    { label: "Networking", value: 80, note: "Wireshark, TCP/IP" },
    { label: "ML/AI", value: 70, note: "ML coursework & projects" },
    { label: "Red Team", value: 75, note: "Nessus, Burp Suite, Metasploit, SQLmap" },
    { label: "Blue Team", value: 75, note: "Wazuh, MISP, DFIR-IRIS" },
    { label: "Cloud", value: 70, note: "Azure, AWS" },
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


