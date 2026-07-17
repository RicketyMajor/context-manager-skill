# Handoff Compilation Guide

The handoff process is critical to bypass LLM context limits and token exhaustion. A handoff document captures the immediate state of the workflow so a new session can resume seamlessly.

## Handoff Triggers

You must initiate the handoff process when any of the following conditions are met:

| Trigger Condition | Description | Action Required |
| :--- | :--- | :--- |
| **Token Limit Warning** | The system or user indicates that the context window is near its limit. | Immediately pause work, compile handoff, and prompt user to start a new chat. |
| **Major Milestone Reached** | A complex feature spec is completed, or a critical bug (e.g., cluster desynchronization) is resolved. | Compile handoff summarizing the milestone and prepare next steps. |
| **Explicit User Command** | The user inputs commands like "save state", "create handoff", or "let's switch chats". | Execute handoff protocol immediately without further code execution. |
| **End of Workday / Shift** | User indicates they are logging off or stopping for the day. | Compile handoff with clear "Next Steps" for the next day. |

## Execution Protocol

When a trigger is activated, execute these steps in order:
1. **Fetch Template:** Read `/assets/handoff.md`.
2. **Compile State:** Fill in the template concisely. Categorize what worked and what failed into the designated table.
3. **Link Context:** Ensure the `Quick Start Context` section links to the exact files the next agent will need (e.g., `/context/specs/auto-scaling.md`).
4. **Save File:** Save the document in `/context/handoff/` using the naming convention: `handoff-YYYY-MM-DD-HHMM.md`.
5. **Final Message:** Send a brief message to the user confirming the handoff is saved, providing the exact file name, and advising them to upload it or reference it in the next session.