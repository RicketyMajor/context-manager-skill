# Context-Manager Skill

**Context-Manager** is an advanced, autonomous context engineering skill designed for the Antigravity AI assistant. Its primary goal is to ensure that a project's context, architectural decisions, and domain knowledge are never lost across chat sessions.

## Core Features

- **Autonomous Auto-Documentation:** Does not wait to be told. The agent proactively updates the context after any significant code or architectural change.
- **Single Source of Truth (SSoT):** Maintains a strict `/context` directory topology to keep track of decisions (`log.md`), specs, glossaries, and system overviews.
- **Agent Rules Management:** Automatically initializes and manages `.agents/AGENTS.md` (Antigravity's equivalent to `CLAUDE.md`), ensuring that project-specific AI rules persist across sessions.
- **Session Handoffs:** Provides a robust handoff mechanism (`/context/handoff/`) so you can resume work exactly where you left off, without the LLM losing track of the big picture.
- **MCP Integration Ready:** Designed to work alongside Model Context Protocol servers for real-time telemetry and cluster status injection.

## Installation & Usage

Since this is an Antigravity skill, it is automatically triggered based on its semantic description when placed in your skills directory.

1. Clone or place this repository into your Antigravity skills folder (e.g., `~/.gemini/config/skills/context-manager` or `.agents/skills/context-manager`).
2. When starting a new project, simply ask Antigravity:
   > *"Initialize the project context"*
3. The agent will create the `/context` folder, set up `.agents/AGENTS.md`, configure your `.gitignore`, and begin autonomously tracking changes.

## Context Topology

The skill enforces the following immutable structure:
- `/context/decisions/log.md`: Append-only ledger of architectural decisions.
- `/context/general/overview.md`: High-level system overview.
- `/context/general/glossary.md`: Domain-specific terms.
- `/context/handoff/`: Session transition documents.
- `/context/sources/index.md`: External resource and entry-point mapping.
- `/context/specs/`: Living documents for feature development.
- `.agents/AGENTS.md`: Persistent agent directives and rules.

## Priority

This skill operates with **CRITICAL Priority Overrides**. Context preservation is non-negotiable. Even if instructed to perform quick or brief refactoring, the agent is strictly instructed to always preserve and update the repository context.
