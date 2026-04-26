# Designer Agent Team Presentation

Use this deck outline to explain how a designer can use Cursor as a generic, reusable product team with foreground and background agents.

## Slide 1: From engineering agent to designer-led team

**Message:** Cursor can act as more than a single coding assistant. It can become a designer-directed team of specialists.

- Designer remains the decision maker
- Foreground agent acts as the live design lead
- Background agents handle focused specialist work
- Output can be a prototype, critique, handoff, PR, or presentation

**Speaker note:** The goal is not to replace design judgment. The goal is to give the designer access to engineering, UX, QA, and critique skills on demand.

## Slide 2: The operating model

```text
Designer
  |
  v
Foreground Design Lead Agent
  |
  +-- UX Strategy Agent
  +-- UI Systems Agent
  +-- Prototype Builder Agent
  +-- Design Critic Agent
  +-- Accessibility QA Agent
  +-- Content and Naming Agent
  +-- Handoff Agent
```

**Message:** One agent stays in conversation with the designer. Other agents work in the background and return focused outputs.

## Slide 3: Foreground agent

**Role:** Live collaborator and coordinator.

Use the foreground agent for:

- Clarifying the design brief
- Translating design intent into implementation tasks
- Choosing which specialists should help
- Synthesizing results into designer-readable decisions
- Reviewing final work against success criteria

**Good prompt:** "Act as my Design Lead Agent. Help me turn this rough idea into options, then coordinate specialists to make it buildable."

## Slide 4: Background agents

**Role:** Specialists that run focused tasks.

Use background agents for:

- Auditing existing flows or components
- Generating multiple UX approaches
- Mapping components and states
- Building scoped prototypes
- Checking accessibility and responsive behavior
- Preparing handoff notes

**Rule of thumb:** If a task can be done independently and summarized clearly, it is a background-agent task.

## Slide 5: The agent team

| Agent | Skill | Best output |
|---|---|---|
| Design Lead | Orchestration and synthesis | Plan, decisions, next steps |
| UX Strategy | Flow and interaction options | 3 approaches and recommendation |
| UI Systems | Component architecture | Props, variants, states, tokens |
| Prototype Builder | Implementation | Working branch or prototype |
| Design Critic | Review and quality | Ordered issues and fixes |
| Accessibility QA | Inclusive interaction | Pass/fail checklist |
| Content and Naming | Product language | Labels, CTAs, empty/error states |
| Handoff | Packaging | Engineer-ready brief |

## Slide 6: What agents need to be successful

Give the team:

- **Goal:** What outcome should exist?
- **Audience:** Who is it for?
- **Current artifact:** Screenshot, route, file path, prototype, or notes
- **Brand rules:** Tokens, tone, constraints, design system guidance
- **Must keep / must avoid:** Non-negotiables
- **Acceptance criteria:** What makes the work done?
- **Output format:** Deck, prototype, critique, ticket, PR, or handoff

**Speaker note:** You do not need every detail up front. The foreground agent should identify important gaps and make reasonable choices when the brief is clear.

## Slide 7: Designer control loop

1. Frame the outcome
2. Assign agent roles
3. Generate options
4. Choose and refine
5. Build or package
6. Review against success criteria

**Message:** The designer controls direction and quality gates. Agents supply speed, structure, and specialist execution.

## Slide 8: Example workflow

**Brief:** "Create a mobile-first VIP dashboard concept."

1. Foreground Design Lead restates the goal and unknowns
2. UX Strategy Agent proposes 3 flow options
3. Designer picks one direction
4. UI Systems Agent defines components, states, and responsive rules
5. Prototype Builder Agent implements the lab prototype
6. Design Critic and Accessibility QA review the result
7. Handoff Agent packages the final direction

## Slide 9: Success checklist

The agent team is working when:

- The designer can explain the direction without reading code
- The selected option is justified against alternatives
- Components, states, and responsive rules are explicit
- Accessibility and content have been reviewed
- Technical constraints and risks are visible
- The handoff is useful to engineering
- Open questions are separated from decisions

## Slide 10: Copy-paste kickoff prompt

```text
You are my foreground Design Lead Agent.

Goal:
[Describe the design outcome I want]

Context:
[Paste notes, screenshots, links, code paths, or constraints]

Audience:
[Who this is for]

Success criteria:
[What must be true when this is done]

Output I want:
[Presentation, prototype, critique, handoff, PR, prompt pack, etc.]

Work like a small agent team. Decide which specialist background agents are useful, assign them clear tasks, synthesize their results, and give me designer-readable decisions. If implementation is needed, produce scoped engineering tasks and review the result before calling it done.
```

## Slide 11: Recommended next step

Start with a low-risk design task:

- Existing screen critique
- New empty state
- Mobile-first component variant
- Stakeholder presentation
- Prototype for one flow

Then expand to implementation and QA once the designer-agent loop feels reliable.
