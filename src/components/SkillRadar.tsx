"use client";

import { RadarChart, PolarGrid, PolarAngleAxis, Radar, Tooltip, ResponsiveContainer } from "recharts";
import { useTheme } from "./ThemeProvider";

type Skill = { label: string; Strength: number; note?: string };

export function SkillRadar({
  title = "",
  skills = [
    { label: "Forensics", Strength: 80, note: "Docker/Podman CVEs, DFIR, Autopsy, CAPEv2, Ghidra, x64dbg" },
    { label: "Containers", Strength: 90, note: "Docker, Podman, QEMU, VirtualBox — research on container vulnerabilities" },
    { label: "Networking", Strength: 85, note: "Wireshark, TCP/IP, Cisco Packet Tracer, network config & VAPT" },
    { label: "Cloud", Strength: 75, note: "Google Cloud Platform, AWS, Azure — GenAI app deployment" },
    { label: "Red Team", Strength: 80, note: "Nessus, Burp Suite, Metasploit, SQLmap, exploit PoCs (C/Python)" },
    { label: "Blue Team", Strength: 78, note: "Wazuh, MISP, DFIR-IRIS, Log Management, Threat Intelligence" },
    { label: "AI/ML", Strength: 70, note: "IIT Bombay ML course, GANs, CSI-based Activity Recognition" },
    { label: "Dev", Strength: 72, note: "Python, Java, Node.js, React, Flutter, Flask APIs, OAuth" },
    { label: "3D & Design", Strength: 65, note: "Blender 3D, Figma, Adobe Suite, React Three Fiber visuals" },
  ],
}: {
  title?: string;
  skills?: Skill[];
}) {
  const { theme } = useTheme();
  const data = skills.map((s) => ({ label: s.label, Strength: s.Strength, note: s.note }));

  // Enhanced color contrast for both themes
  const colors =
    theme === "dark"
      ? {
          text: "#ffffff",
          grid: "rgba(255,255,255,0.25)",
          stroke: "#ffffff",
          fill: "rgba(255,255,255,0.35)",
          tooltipBg: "rgba(20,20,20,0.8)",
        }
      : {
          text: "#1a1a1a",
          grid: "rgba(0,0,0,0.2)", // darker grid for better visibility
          stroke: "#222222", // darker stroke
          fill: "rgba(0,0,0,0.25)", // more visible radar area
          tooltipBg: "rgba(255,255,255,0.95)",
        };

  return (
    <div
      className={`transition-colors duration-500 ${
        theme === "dark" ? "text-white" : "text-gray-900"
      }`}
    >
      <h3 className="text-xl font-semibold mb-4 text-center md:text-left">{title}</h3>

      <div className="w-full flex justify-center">
        <ResponsiveContainer width="100%" height={300}>
          <RadarChart data={data} cx="50%" cy="50%" outerRadius="80%">
            <PolarGrid stroke={colors.grid} strokeWidth={0.8} />
            <PolarAngleAxis
              dataKey="label"
              tick={{ fill: colors.text, fontSize: 12, fontWeight: 600 }}
            />
            <Tooltip
              contentStyle={{
                background: colors.tooltipBg,
                border: "none",
                borderRadius: 8,
                color: colors.text,
                boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
              }}
              labelStyle={{ color: colors.text }}
            />
            <Radar
              name={title}
            dataKey="Strength"
              stroke={colors.stroke}
              fill={colors.fill}
              fillOpacity={0.5}
              strokeWidth={2}
              animationBegin={100}
              animationDuration={1200}
              isAnimationActive
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
