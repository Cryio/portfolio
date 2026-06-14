export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  tags: string[];
  date: string;
  readTime: string;
  featured: boolean;
}

export const blogPosts: BlogPost[] = [
  {
    id: "intro-to-penetration-testing",
    title: "Introduction to Penetration Testing: A Beginner's Guide",
    excerpt: "Learn the fundamentals of ethical hacking and penetration testing. This comprehensive guide covers the essential tools, methodologies, and best practices for aspiring security professionals.",
    content: `
# Introduction to Penetration Testing

Penetration testing, often called "pen testing," is a crucial practice in cybersecurity that involves simulating cyberattacks to identify vulnerabilities in systems, networks, and applications.

## What is Penetration Testing?

Penetration testing is essentially authorized hacking. Security professionals use the same techniques as malicious hackers, but with permission and the goal of improving security rather than exploiting it.

## The Phases of Penetration Testing

1. **Reconnaissance** - Gathering information about the target
2. **Scanning** - Identifying open ports and services
3. **Gaining Access** - Exploiting vulnerabilities
4. **Maintaining Access** - Ensuring persistent access
5. **Analysis & Reporting** - Documenting findings

## Essential Tools

- **Nmap** - Network scanning and discovery
- **Burp Suite** - Web application testing
- **Metasploit** - Exploitation framework
- **Wireshark** - Network protocol analysis

Stay ethical, stay curious, and always get proper authorization before testing!
    `,
    category: "Security Fundamentals",
    tags: ["Penetration Testing", "Ethical Hacking", "Security"],
    date: "2024-12-15",
    readTime: "8 min read",
    featured: true,
  },
  {
    id: "securing-linux-servers",
    title: "Hardening Linux Servers: Essential Security Practices",
    excerpt: "A comprehensive guide to securing your Linux servers against common attacks. Learn about firewall configuration, SSH hardening, and implementing security best practices.",
    content: `
# Hardening Linux Servers

Linux servers are the backbone of modern infrastructure. Here's how to secure them properly.

## SSH Hardening

- Disable root login
- Use key-based authentication
- Change default port
- Implement fail2ban

## Firewall Configuration

Use iptables or ufw to control traffic:

\`\`\`bash
ufw default deny incoming
ufw default allow outgoing
ufw allow ssh
ufw enable
\`\`\`

## Regular Updates

Keep your system updated:

\`\`\`bash
apt update && apt upgrade -y
\`\`\`
    `,
    category: "System Security",
    tags: ["Linux", "Server Hardening", "SSH", "Firewall"],
    date: "2024-12-10",
    readTime: "12 min read",
    featured: true,
  },
  {
    id: "web-app-vulnerabilities",
    title: "Top 10 Web Application Vulnerabilities in 2024",
    excerpt: "Explore the most critical web application security risks according to OWASP, and learn how to identify and prevent them in your applications.",
    content: `
# Top 10 Web Application Vulnerabilities

Understanding common vulnerabilities is the first step to building secure applications.

## 1. Broken Access Control

Ensure proper authorization checks on all endpoints.

## 2. Cryptographic Failures

Use strong encryption and proper key management.

## 3. Injection Attacks

Always validate and sanitize user input.

## 4. Insecure Design

Security should be built in from the start, not bolted on.

## 5. Security Misconfiguration

Review and harden all configurations.
    `,
    category: "Web Security",
    tags: ["OWASP", "Web Security", "Vulnerabilities"],
    date: "2024-12-05",
    readTime: "10 min read",
    featured: false,
  },
  {
    id: "incident-response-101",
    title: "Incident Response 101: What to Do When You're Breached",
    excerpt: "Learn the essential steps of incident response - from detection to recovery. Be prepared when security incidents occur.",
    content: `
# Incident Response 101

When a security incident occurs, having a plan is crucial.

## The IR Lifecycle

1. **Preparation** - Have plans and tools ready
2. **Detection** - Identify the incident
3. **Containment** - Limit the damage
4. **Eradication** - Remove the threat
5. **Recovery** - Restore normal operations
6. **Lessons Learned** - Improve for next time

## Key Takeaways

- Document everything
- Communicate clearly
- Preserve evidence
- Learn and improve
    `,
    category: "Incident Response",
    tags: ["Incident Response", "Blue Team", "Security Operations"],
    date: "2024-11-28",
    readTime: "7 min read",
    featured: false,
  },
  {
    id: "docker-security-best-practices",
    title: "Docker Security: Best Practices for Container Security",
    excerpt: "Containers are powerful but can introduce security risks. Learn how to secure your Docker deployments with these essential practices.",
    content: `
# Docker Security Best Practices

Containers need security attention just like any other infrastructure.

## Image Security

- Use official base images
- Scan images for vulnerabilities
- Keep images minimal

## Runtime Security

- Don't run as root
- Use read-only filesystems
- Limit resources

## Network Security

- Use Docker networks
- Don't expose unnecessary ports
- Implement network policies
    `,
    category: "DevSecOps",
    tags: ["Docker", "Containers", "DevSecOps"],
    date: "2024-11-20",
    readTime: "9 min read",
    featured: false,
  },
  {
    id: "change-data-capture-lakehouse-sync",
    title: "Change Data Capture: Keeping a Lakehouse in Sync with Your Database",
    excerpt: "How to stream every insert, update, and delete from a transactional database into an analytical lakehouse — in order, exactly once, and without bringing production to its knees.",
    content: `
# Change Data Capture: Keeping a Lakehouse in Sync with Your Database

Most teams eventually hit the same wall: the transactional database that powers the product is the worst possible place to run analytics. Heavy queries lock rows, scans compete with live traffic, and the schema is optimized for writes, not aggregation. The usual answer is to move data into an analytical store. The hard part is keeping that copy *fresh* without nightly batch dumps that are always hours stale.

Change Data Capture (CDC) is the pattern that solves this. Instead of re-reading the whole table, you tail the database's write-ahead log and turn every committed change into an event.

## The five-stage pipeline

A production CDC pipeline tends to settle into the same shape:

1. **Change capture** — a connector reads the database's write-ahead log (WAL) and emits a structured event for every \`INSERT\`, \`UPDATE\`, and \`DELETE\`.
2. **Event streaming** — those events land on a durable log (Kafka), one topic per table, retained for days.
3. **Batch processing** — workers consume micro-batches, reshape the row-oriented events into columnar frames, and validate them.
4. **Analytical storage** — the batch is committed to a lakehouse table format with ACID guarantees.
5. **Orchestration** — a workflow engine sequences setup, schema changes, and maintenance.

Postgres' logical replication (the \`pgoutput\` plugin) plus Debezium covers stages 1 and 2 out of the box. Each event carries the operation type, the full before/after row state, and source metadata like the log sequence number and transaction timestamp.

## Ordering is the whole game

Here is the subtle bug that bites everyone: if an \`UPDATE\` is processed before its \`INSERT\`, or a \`DELETE\` arrives before the latest \`UPDATE\`, your analytical copy is silently wrong.

The fix is to **partition the event stream by the record's primary key**. Kafka guarantees ordering *within* a partition, so every change to order \`#5\` lands on the same partition and is consumed in commit order. You still get parallelism across keys — order \`#5\` and order \`#250\` can be processed simultaneously — without ever reordering a single record's history.

## Two invariants worth enforcing

**Schema before data.** A schema change must propagate to every storage layer *before* any event carrying the new shape arrives. In practice that means: pause the stream, evolve the target table, then resume. Events buffer harmlessly in the log while you do it.

**Idempotent, offset-after-commit processing.** Commit the analytical write *first*, then commit the consumer offset. If a worker dies in between, it simply reprocesses the last batch on restart — and because the write is idempotent (upsert by key), reprocessing changes nothing. This is how you get exactly-once *effects* on top of at-least-once *delivery*.

## Why micro-batches, not row-by-row

Streaming one row at a time into a columnar lakehouse table produces thousands of tiny files and miserable query performance. Consuming the log in micro-batches lets you convert a chunk of CDC events into a single columnar frame, validate it against the target schema once, and write it as one well-sized file. Throughput goes up, the small-files problem goes away, and you can naturally pause and resume at batch boundaries.

## Takeaways

- Tail the WAL; never poll the table.
- Partition by primary key so per-record ordering survives parallelism.
- Commit the offset *after* the destination write, and make writes idempotent.
- Propagate schema changes before the data that needs them.

CDC isn't glamorous, but a pipeline built on these four rules will keep an analytical store within seconds of production and survive crashes without manual cleanup.
    `,
    category: "Data Engineering",
    tags: ["CDC", "Kafka", "Debezium", "Data Pipelines", "PostgreSQL"],
    date: "2026-05-18",
    readTime: "9 min read",
    featured: true,
  },
  {
    id: "durable-workflows-orchestration",
    title: "Durable Workflows: Why Long-Running Jobs Need an Orchestrator",
    excerpt: "Cron jobs and retry loops fall apart the moment a process crashes mid-task. Durable workflow engines turn fragile multi-step jobs into code that resumes exactly where it left off.",
    content: `
# Durable Workflows: Why Long-Running Jobs Need an Orchestrator

Every backend eventually grows a job that is too important to lose and too long to trust to a single process: a multi-step data sync, an onboarding sequence, a billing run. You start with a cron entry and a try/except, and it works — until the box restarts halfway through and you're left reconciling partial state by hand at 2am.

A durable workflow engine like Temporal exists to make that class of bug impossible.

## Workflows vs. activities

The core distinction is simple:

- A **workflow** is durable business logic — the sequence of steps. It can run for seconds or months and survives crashes.
- An **activity** is a single side-effecting task — call an API, write a file, send an email. Activities are where failure actually happens, so they're where retries live.

The engine records every step a workflow takes into an append-only history. If the worker dies, a new one **replays that history** to reconstruct the exact in-memory state, then continues from the next unfinished step. Your code looks like a plain sequential function; the durability is invisible.

## What you get for free

- **Durable execution** — the workflow resumes from the precise point of failure, not the beginning.
- **Exactly-once effects** — completed activities are never re-run on replay, so you don't double-charge a customer.
- **Built-in retries** — declare a retry policy instead of hand-rolling loops.
- **Timers** — "wait 7 days, then send a reminder" is one line, and it survives restarts.
- **A complete audit trail** — the history *is* the log of what happened.

## Retries: backoff and thresholds

Not every failure is equal, so retry policies should differ by failure mode. A useful baseline:

| Failure | Retries | Backoff |
|---|---|---|
| Downstream processing error | 5 | Exponential |
| Transient connection error | 3 | Linear |
| Storage commit conflict | 3 | Exponential |

Exponential backoff (\`1s, 2s, 4s, 8s, 16s\`) backs off fast for things that need time to recover. Linear backoff (\`1s, 2s, 3s, 4s\`) suits blips that clear quickly.

Layer **consecutive-failure thresholds** on top: warn at 3 in a row, and pause the workflow with a critical alert at 10. A workflow that fails forever should stop and shout, not silently burn retries.

## The unbounded-history trap

Here's the gotcha with long-lived loops. Because the engine stores *every* event, a workflow that loops forever accumulates an ever-growing history until it falls over. The fix is the **continue-as-new** pattern: periodically end the current execution and atomically start a fresh one with the latest state as input. The loop continues conceptually, but the history stays bounded.

## When to reach for one

You don't need a workflow engine for a stateless request handler. You *do* want one the moment a job is **multi-step, long-running, and expensive to half-complete** — exactly the jobs where a mid-flight crash is a data-integrity incident rather than an annoyance.

Stop writing reconciliation scripts for crashes that shouldn't have lost state. Let the orchestrator remember for you.
    `,
    category: "Architecture",
    tags: ["Temporal", "Workflows", "Distributed Systems", "Reliability"],
    date: "2026-04-22",
    readTime: "8 min read",
    featured: false,
  },
  {
    id: "code-as-knowledge-graph",
    title: "Code as Knowledge: Turning a Codebase into a Queryable Graph",
    excerpt: "Critical engineering knowledge is locked inside template files, schema dumps, and sample payloads — real, but un-askable. Here's how to ingest it into a graph so an agent can answer questions deterministically instead of guessing.",
    content: `
# Code as Knowledge: Turning a Codebase into a Queryable Graph

In any system that integrates many external sources, the most valuable knowledge is also the least accessible. Every source system emits data in its own proprietary shape, and the job of mapping each one to your canonical internal model lives in hand-written transformation templates, CSV schema dumps, and sample API payloads.

That knowledge is *real* — but it's locked in files. You can grep it, but you can't **ask it questions** like:

- "Source field \`$.customer_id\` — which canonical field does it become, and is there a transform?"
- "Which warehouse column ultimately feeds \`canonical_order.total\`?"
- "What does this source's response actually return, and which fields have *no* mapping yet?"

## The core principle: knowledge-first, not API-first

The naive approach is to have an agent call source APIs live and reason about the results. That's slow, non-reproducible, and prone to hallucination. The better approach:

> Ingest all the relevant knowledge into a graph **once**. At question time, the agent does graph lookups — deterministic, auditable, offline, and reproducible.

A graph database like Kuzu is a natural fit, because the knowledge *is* relationships: fields belong to models, source fields map to canonical fields, payloads provide evidence of what a source really sends.

## Four sources, one graph

The trick is recognizing that your existing artifacts are already a knowledge base in disguise:

| Source artifact | What it contributes |
|---|---|
| Transformation templates | \`source field → canonical field + transform\` edges. The templates *are* the mapping. |
| Canonical schema files | The authoritative target model and field nodes. |
| Raw sample payloads | Evidence nodes — proof of the actual field shapes a source returns. |
| Warehouse column metadata | Lineage back to the physical column feeding each canonical field. |

Parse each one, write nodes and edges, and you have a single graph that knows more than any individual file did.

## A minimal ontology

You don't need a sprawling schema. A handful of node and edge types carries the load:

- **Model** owns **Field** (\`HAS_FIELD\`).
- **SourceMapping** targets a **Field** (\`MAPPED_FROM\`) and carries the transform + provenance.
- **Endpoint** returns **ResponseField** (\`HAS_RESPONSE_FIELD\`) — the payload evidence.
- **ResponseField** links to a canonical **Field** (\`MAPS_TO\`) with a match score.

Now "how is this model mapped across all sources?" is one graph traversal, not an afternoon of reading templates.

## What "good" looks like

The reason to do this is **trustworthy answers**. The acceptance criteria that keep the system honest:

- A known source path resolves to at least one real canonical field.
- An unknown path returns \`unmapped\` — never a hallucinated field.
- Ambiguous cases return ranked candidates with scores and an \`ambiguous\` flag.
- Every returned field id actually exists in the graph.

That last rule is the whole point. Because the agent can only return ids that exist as nodes, it *cannot* invent a field. Determinism is enforced by the data model, not by hoping the model behaves.

## The bigger idea

This generalizes well beyond field mapping. Any time engineering knowledge is "real but locked in files" — service dependencies, config provenance, ownership, data lineage — you can parse those files into a graph and turn tribal knowledge into something queryable. The codebase stops being a pile of text and becomes a structured source of truth an agent can reason over without guessing.
    `,
    category: "AI Engineering",
    tags: ["Knowledge Graph", "AI Agents", "Kuzu", "Data Modeling", "RAG"],
    date: "2026-06-02",
    readTime: "10 min read",
    featured: true,
  },
  {
    id: "observational-data-quality",
    title: "Observational Data Quality: Validate Without Blocking the Pipeline",
    excerpt: "Treating data quality checks as hard gates means one bad batch halts everything downstream. Treating them as observations lets data flow while you still catch — and audit — every problem.",
    content: `
# Observational Data Quality: Validate Without Blocking the Pipeline

There are two philosophies for data quality. The first treats every check as an **enforcement gate**: if a batch fails validation, it's rejected and the pipeline stops. The second treats checks as **observations**: validate, record the result, and let the data keep moving.

Gates feel safer, but they have a nasty failure mode. One overly strict rule, or one genuinely weird-but-valid batch, and everything downstream grinds to a halt — usually at the worst possible time. For most analytical pipelines, the observational model is the better default.

> Data quality failures are *signals*, not stop signs.

## Where validation fits

The natural place to validate is at a layer transition — when raw ingested data is promoted into a cleaned, modeled layer (a "bronze → silver" step in medallion terms). At that boundary you know the target schema and the business rules, but you haven't yet built the expensive downstream aggregations.

The flow looks like this:

1. An insertion event signals that a new batch landed.
2. A parent workflow fans out one child workflow per data model.
3. Each child fetches its contract, loads just the relevant slice of data, runs its checks, and writes the results to a shadow table.

Running each model in its own child workflow keeps them **parallel and isolated** — a failure validating one model never blocks the others.

## Contracts as the source of truth

Hard-coding thresholds in the pipeline guarantees they go stale. Instead, pull the expectations from a live **data contract** — null rates, allowed ranges, uniqueness, referential rules — at validation time. The contract lives with the dataset's owners; the pipeline just reads it. Update the contract, and the next run uses the new rules with zero code changes.

## The shadow table

Results don't belong in logs that scroll away. Write them to a dedicated **shadow table** — same lakehouse format as the data itself — with one row per check per run: which rule, which model, pass/fail, the observed value, the timestamp.

This unlocks the things that actually matter:

- **Trend analysis** — "null rate on this column has crept up 4% over two weeks."
- **Time travel** — query the quality of the data *as it was* on any past date.
- **Audit** — a permanent, queryable record of every check ever run.

A visibility layer (a dashboard or catalog integration) then surfaces these signals to the people who own the data.

## The tradeoff, stated honestly

Observational DQ does **not** stop bad data from reaching consumers — and that's a real cost. The bet is that for analytical workloads, *visibility plus continuity* beats *enforcement plus fragility*. You catch every problem, you keep a full audit trail, and you decide what to do about it — instead of having a strict gate decide for you by taking the whole pipeline down.

For the rare dataset where bad data is genuinely catastrophic, keep a hard gate. For everything else, observe, record, and keep the data flowing.
    `,
    category: "Data Engineering",
    tags: ["Data Quality", "Data Pipelines", "Observability", "Lakehouse"],
    date: "2026-03-30",
    readTime: "8 min read",
    featured: false,
  },
  {
    id: "modern-lakehouse-table-formats",
    title: "The Modern Lakehouse: ACID Tables on Object Storage",
    excerpt: "Object storage is cheap and infinite but has no transactions, no schema, and no history. Open table formats add all three — turning a bucket of files into something that behaves like a database.",
    content: `
# The Modern Lakehouse: ACID Tables on Object Storage

Object storage (S3 and friends) is the ideal place to keep large volumes of data: cheap, durable, effectively infinite. It's also, on its own, a terrible database. There are no transactions, so concurrent writers corrupt each other. There's no schema, so readers guess. There's no history, so a bad write is permanent.

Open **table formats** like Apache Iceberg close that gap. They add a metadata layer on top of plain Parquet files that brings database-like guarantees to a bucket of objects.

## What the format buys you

**ACID transactions.** Writes commit atomically against a catalog. Either every file in a write becomes visible at once, or none does. Snapshot isolation means readers always see a consistent version, even while a write is in flight.

**Schema evolution.** Add a column, rename one, promote a type, change nullability — all as metadata operations, with no rewrite of existing data files. The pain of "we need to change the schema" mostly disappears.

**Time travel.** Every commit creates a snapshot. You can query the table as of a snapshot id or a timestamp, diff two points in time, or roll back a bad write. "What did this table look like last Tuesday?" becomes a query, not an archaeology project.

**Hidden partitioning.** The table tracks partition transforms (by day, by month, by hash bucket) in metadata. Queries get partition pruning *without* users having to know the physical layout or add magic \`WHERE\` clauses — and you can evolve the partitioning later without rewriting history.

## The medallion pattern

Table formats pair naturally with a layered modeling approach:

- **Bronze** — raw data landed as-is from the source.
- **Silver** — cleaned, conformed, deduplicated, validated.
- **Gold** — business-level aggregates and metrics ready for consumption.

Each layer is its own set of tables. Data flows bronze → silver → gold through transformation jobs, and because each layer is versioned and time-travelable, you can always trace a gold number back to the bronze rows that produced it.

## Lazy processing keeps it fast

The processing side matters too. A modern dataframe engine like Daft (running distributed on Ray) reads these tables **lazily**: defining a filter or a projection doesn't move any data — it builds a plan. Only when you materialize results does the optimizer push filters down, prune partitions, and read the minimum set of files.

The practical payoff: you express \`read_table(...).where(region == "EU").select(...)\` as if it were in-memory, and the engine quietly arranges to touch only the relevant slice of a multi-terabyte table.

## Why it matters

The lakehouse isn't a buzzword — it's the collapse of a decade-old split between cheap-but-dumb data lakes and expensive-but-smart warehouses. With an open table format you get warehouse semantics (transactions, schema, time travel) directly on lake-priced storage, with no proprietary engine lock-in. For most teams building analytics today, that combination is the new default — and understanding the metadata layer underneath is what lets you operate it well.
    `,
    category: "Data Engineering",
    tags: ["Apache Iceberg", "Lakehouse", "Data Engineering", "Parquet", "Daft"],
    date: "2026-02-14",
    readTime: "9 min read",
    featured: false,
  },
];

export const categories = [
  "All",
  "Security Fundamentals",
  "System Security",
  "Web Security",
  "Incident Response",
  "DevSecOps",
  "Data Engineering",
  "Architecture",
  "AI Engineering",
];