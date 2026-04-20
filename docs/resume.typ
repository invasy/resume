// Import the rendercv function and all the refactored components
#import "@preview/rendercv:0.3.0": *

// Apply the rendercv template with custom configuration
#show: rendercv.with(
  name: "Vasiliy Polyakov",
  title: "Vasiliy Polyakov - CV",
  footer: context { [#str(here().page())\/#str(counter(page).final().first())] },
  top-note: [ #emph[Last updated in Apr 2026] ],
  locale-catalog-language: "en",
  text-direction: ltr,
  page-size: "a4",
  page-top-margin: 1cm,
  page-bottom-margin: 1cm,
  page-left-margin: 2cm,
  page-right-margin: 2cm,
  page-show-footer: true,
  page-show-top-note: false,
  colors-body: rgb(0, 0, 0),
  colors-name: rgb(0, 0, 0),
  colors-headline: rgb(0, 0, 0),
  colors-connections: rgb(0, 0, 0),
  colors-section-titles: rgb(0, 0, 0),
  colors-links: rgb(0, 0, 0),
  colors-footer: rgb(128, 128, 128),
  colors-top-note: rgb(128, 128, 128),
  typography-line-spacing: 0.6em,
  typography-alignment: "justified",
  typography-date-and-location-column-alignment: right,
  typography-font-family-body: "XCharter",
  typography-font-family-name: "XCharter",
  typography-font-family-headline: "XCharter",
  typography-font-family-connections: "XCharter",
  typography-font-family-section-titles: "XCharter",
  typography-font-size-body: 10pt,
  typography-font-size-name: 25pt,
  typography-font-size-headline: 10pt,
  typography-font-size-connections: 10pt,
  typography-font-size-section-titles: 1.2em,
  typography-small-caps-name: false,
  typography-small-caps-headline: false,
  typography-small-caps-connections: false,
  typography-small-caps-section-titles: false,
  typography-bold-name: false,
  typography-bold-headline: false,
  typography-bold-connections: false,
  typography-bold-section-titles: true,
  links-underline: true,
  links-show-external-link-icon: false,
  header-alignment: center,
  header-photo-width: 3.5cm,
  header-space-below-name: 0.7cm,
  header-space-below-headline: 0.7cm,
  header-space-below-connections: 0.7cm,
  header-connections-hyperlink: true,
  header-connections-show-icons: false,
  header-connections-display-urls-instead-of-usernames: true,
  header-connections-separator: "|",
  header-connections-space-between-connections: 0.5cm,
  section-titles-type: "with_full_line",
  section-titles-line-thickness: 0.5pt,
  section-titles-space-above: 0.5cm,
  section-titles-space-below: 0.3cm,
  sections-allow-page-break: true,
  sections-space-between-text-based-entries: 0.15cm,
  sections-space-between-regular-entries: 0.42cm,
  entries-date-and-location-width: 4.15cm,
  entries-side-space: 0cm,
  entries-space-between-columns: 0.1cm,
  entries-allow-page-break: false,
  entries-short-second-row: false,
  entries-degree-width: 1cm,
  entries-summary-space-left: 0cm,
  entries-summary-space-above: 0.08cm,
  entries-highlights-bullet:  text(13pt, [•], baseline: -0.6pt) ,
  entries-highlights-nested-bullet:  text(13pt, [•], baseline: -0.6pt) ,
  entries-highlights-space-left: 0cm,
  entries-highlights-space-above: 0.08cm,
  entries-highlights-space-between-items: 0.08cm,
  entries-highlights-space-between-bullet-and-text: 0.3em,
  date: datetime(
    year: 2026,
    month: 4,
    day: 21,
  ),
)


= Vasiliy Polyakov

  #headline([Senior Software Engineer])

#connections(
  [#link("mailto:job@vpolyakov.cv", icon: false, if-underline: false, if-color: false)[job\@vpolyakov.cv]],
  [#link("https://vpolyakov.cv/", icon: false, if-underline: false, if-color: false)[vpolyakov.cv]],
  [#link("https://linkedin.com/in/invasy", icon: false, if-underline: false, if-color: false)[linkedin.com\/in\/invasy]],
  [#link("https://github.com/invasy", icon: false, if-underline: false, if-color: false)[github.com\/invasy]],
)


== Summary

Software engineer (C++\/Qt, Scala, Python) with over 10 years of experience in enterprise services development.

Development automation specialist with a vast CI\/CD and DevOps expertise.

Collaborating with distributed teams in different software development stages.

Constantly improving skills with new technologies and instruments.

Passionate about efficiency and performance.

GNU\/Linux and FOSS enthusiast.

== Experience

#regular-entry(
  [
    #strong[Senior Software Engineer], NGENIX -- Moscow, Russia (#emph[remote])

  ],
  [
    June 2023 – present

  ],
  main-column-second-row: [
    #summary[#strong[Tech stack]: Python, Flask, FastAPI, OpenAPI, Connexion, SQLAlchemy, PostgreSQL, ClickHouse, Kubernetes.]

  ],
)

#regular-entry(
  [
    #strong[Lead Software Engineer], M.Video-Eldorardo -- Moscow, Russia (#emph[remote])

  ],
  [
    Dec 2021 – Sept 2022

  ],
  main-column-second-row: [
    #summary[#strong[Tech stack]: Scala, Akka, Lagom, Cassandra, Elastic Stack, SAP, GitLab CI, Kubernetes, microservices.]

    - Analyzed requirements and implemented architecture for new microservices.

    - Collaborated with agile team, managed to enhance service robustness.

    - Facilitated internal developers meetings to share ideas and knowledge.

  ],
)

#regular-entry(
  [
    #strong[Senior Software Engineer], Rostelecom IT -- Perm, Russia

  ],
  [
    Jan 2019 – Dec 2021

  ],
  main-column-second-row: [
    #summary[#strong[Tech stack]: C++, Qt, CEF, Scala, Oracle, GitLabCI, Tomcat, OpenShift, JMeter, Gatling.]

    - Developed high performance event-driven payment service with C++, Qt, CEF, OpenShift.

    - Boosted service performance by redesigning event queues.

    - Organized and implemented CI\/CD pipelines to decrease deployment time from days to minutes.

    - Initiated migration to blue-green deployment with extensive load testing.

    - Planned tasks and facilitated meetings with distributed agile team.

    - Redesigned documentation and knowledge base structure, saved hours of searching for answers.

  ],
)

#regular-entry(
  [
    #strong[Research Engineer], Perm State University -- Perm, Russia

  ],
  [
    May 2018 – Dec 2018

  ],
  main-column-second-row: [
    #summary[#strong[Tech stack]: C++, Fortran 90, CUDA, OpenMP, OpenMPI, OpenHPC, RHEL, Ganglia.]

    - Participated in research and development project for #emph[UEC-Aviadvigatel] funded by Russian Foundation for Basic Research.

    - Project result is a turbine engine computational aerodynamics model based on a proprietary numerical solver of Navier-Stokes equations.

  ],
)

#regular-entry(
  [
    #strong[Software Engineer], Stream (MTS) -- Perm, Russia

  ],
  [
    Dec 2017 – May 2018

  ],
  main-column-second-row: [
    #summary[#strong[Tech stack]: C++, STL, Boost, CMake.]

    - Developed in-house high performance service using C++, STL, Boost, Qt that allowed clients to commit payment transactions and view fiscal data.

    - Optimized event matching algorithms to decrease server load by 21\% on average.

  ],
)

#regular-entry(
  [
    #strong[Chief of Laboratory and Research Engineer], Perm State University -- Perm, Russia

  ],
  [
    Oct 2012 – Dec 2017

  ],
  main-column-second-row: [
    #summary[#strong[Tech stack]: C++, Fortran90, OpenMP, OpenMPI CUDA, Hadoop, Perl, Ruby on Rails, Redmine, RHEL.]

    - Researched and developed HPC applications (fluid mechanics, aerodynamics, linguistics).

    - Tasks, projects, and people management.

    - HPC clusters administration and maintenance.

    - Popularization of science, public lectures, science events and festivals.

  ],
)

== Education

#education-entry(
  [
    #strong[Perm State University], BS in Applied mathematics and informatics -- Perm, Russia

  ],
  [
    Sept 2007 – Aug 2013

  ],
  main-column-second-row: [
  ],
)

== Technologies

#strong[C++:] STL, Boost, Qt, CEF

#strong[Scala:] Akka, Cats, Lagom

#strong[Python:] Django, Flask, Connexion, asyncio, SQLAlchemy, Pydantic

#strong[DB:] PostgreSQL, MySQL, ClickHouse, Cassandra

#strong[DevOps:] GitHub Actions, GitLab CI, Jenkins, Ansible, Puppet, Docker, Podman, Kubernetes, GNU Make, Bash

#strong[Misc:] Linux, Git, Jira, Confluence, Scrum, Kanban

== Volunteer

#regular-entry(
  [
    #strong[PermLUG]

  ],
  [
    Sept 2011 – present

  ],
  main-column-second-row: [
    #summary[Community Manager]

  ],
)
