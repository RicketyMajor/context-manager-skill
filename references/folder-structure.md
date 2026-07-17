# Context Folder Structure Guide

This document defines the strict topology of the `/context` directory. As an AI agent, you must strictly adhere to these boundaries when reading or writing state.

| Directory / File | Purpose | strict Rules & Constraints |
| :--- | :--- | :--- |
| `/context/decisions/log.md` | Chronological ledger of architectural, technical, or business decisions. | **Append only.** Do not overwrite past decisions. Put the newest entry at the top. |
| `/context/general/overview.md` | High-level project summary, goals, and core directives. | **Rarely updated.** Modify only when the fundamental project scope or architecture changes. |
| `/context/general/glossary.md` | Dictionary of domain-specific terms and their definitions. | **Keep concise.** Use table format. Do not add generic programming terms. |
| `/context/handoff/` | Storage for session transition documents (`handoff-YYYY-MM-DD.md`). | **Immutable.** Once a handoff is created, do not edit it. Read the latest one to resume context. |
| `/context/sources/index.md` | Directory mapping key resources, entry points, and documentation. | **Link only.** Do not paste source code here. Only file paths and URLs. |
| `/context/specs/` | Individual markdown files for features (e.g., `health-check-spec.md`). | **Living documents.** Update status and criteria as development progresses. |

## Global Constraints
- **Do not create new subdirectories** inside `/context` without explicit user permission.
- Always cross-reference. If a spec requires a specific architecture change, link to the relevant entry in `/decisions/log.md`.