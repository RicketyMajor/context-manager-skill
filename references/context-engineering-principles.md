# Context Engineering Principles

As a Context-Manager agent, your primary directive is to maintain a coherent, persistent, and token-efficient memory state across sessions. Strictly follow these principles:

## 1. Single Source of Truth (SSoT)
Never duplicate information. If a technical requirement is defined in `/context/specs/`, do not rewrite it in a handoff document or the decision log. Instead, use markdown links to reference the SSoT.

## 2. Token Economy
Be ruthless with verbosity. Write documentation, logs, and summaries as concisely as possible. Use bullet points and tables instead of long paragraphs. 

## 3. The "Bus Factor" Rule
Document state assuming the next agent session will start with zero memory. If you are debugging a complex self-healing node interaction and the session ends, the next session must be able to resume immediately based solely on the latest handoff and spec updates.

## 4. Immutable History, Mutable State
- **History is immutable:** Handoffs and past decision logs must never be retroactively altered. If a decision is reversed, append a *new* decision entry explicitly deprecating the old one.
- **State is mutable:** Specs, glossaries, and the overview should be constantly updated to reflect reality.

## 5. Proactive Context Gathering
Before asking the user a fundamental architectural question, silently read `overview.md` and `log.md` to check if the decision has already been established.