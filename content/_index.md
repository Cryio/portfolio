---
title: "Welcome to My Portfolio"
layout: "home"
description: "Hi, I'm Srachet Rai – a Cybersecurity Enthusiast & BTech CSE. Welcome to my portfolio!"
---

<div class="animate-fadeInUp">
  <h1>Hi, I'm Srachet Rai</h1>
  <p>I merge cybersecurity expertise with creative design to build engaging digital experiences.</p>
</div>

{{< button href="/projects/" >}}View Projects{{< /button >}}

## Featured Project

{{< figure
    src="featured.jpg"
    alt="Featured Project Screenshot"
    caption="Featured Project – Innovative Cybersecurity Solution"
>}}

## Animated Gallery

Below is a gallery of project images (animated on hover using Tailwind CSS or your custom CSS):

{{< gallery >}}
  <img src="gallery/project1.jpg" class="grid-w33 hover:scale-105 transition-transform duration-300" alt="Project 1" />
  <img src="gallery/project2.jpg" class="grid-w33 hover:scale-105 transition-transform duration-300" alt="Project 2" />
  <img src="gallery/project3.jpg" class="grid-w33 hover:scale-105 transition-transform duration-300" alt="Project 3" />
{{< /gallery >}}

## Recent Articles

{{< list limit=3 >}}
