# Designer Agent Team Presentation

Phone-friendly format for explaining how a designer can use Cursor as a reusable product team with foreground and background agents.

---

## 1. Big idea

Cursor can be more than one engineering assistant.

It can act like a small designer-led team.

You stay the decision maker.

The agents provide:

- UX options
- UI system thinking
- Prototype building
- Critique
- Accessibility QA
- Handoff support

**Key message:** The agents add specialist skills. They do not replace design judgment.

---

## 2. How the team works

```text
You, the designer
  |
  v
Foreground Design Lead
  |
  +-- UX Strategy
  +-- UI Systems
  +-- Prototype Builder
  +-- Design Critic
  +-- Accessibility QA
  +-- Content and Naming
  +-- Handoff
```

One agent stays with you in the main chat.

Other agents work in the background on focused tasks.

The foreground agent collects the results and explains what matters.

---

## 3. Foreground agent

**Role:** Your live collaborator.

Use it to:

- Clarify the brief
- Choose the right specialists
- Turn design intent into tasks
- Compare options
- Review final output

**Simple prompt:**

```text
Act as my Design Lead Agent.
Help me turn this rough idea into options.
Then coordinate specialists to make it buildable.
```

---

## 4. Background agents

**Role:** Focused specialists.

Use them for work that can happen independently.

Good background tasks:

- Audit an existing screen
- Generate 3 UX directions
- Map components and states
- Build a prototype branch
- Check accessibility
- Improve copy
- Package handoff notes

**Rule of thumb:** If the task can be summarized clearly, it can be a background-agent task.

---

## 5. The agent team

### Design Lead

Coordinates the work.

Best output: plan, decisions, next steps.

### UX Strategy

Explores flow and interaction options.

Best output: 3 approaches and a recommendation.

### UI Systems

Turns a direction into components.

Best output: props, variants, states, tokens.

### Prototype Builder

Builds in the repo.

Best output: working prototype or branch.

### Design Critic

Reviews quality.

Best output: issues ordered by severity.

### Accessibility QA

Checks inclusive interaction.

Best output: pass/fail checklist.

### Content and Naming

Improves product language.

Best output: labels, CTAs, empty states, error states.

### Handoff

Packages the result.

Best output: engineer-ready brief.

---

## 6. What agents need

Give the team whatever you have.

You do not need every detail.

### Goal

What outcome should exist?

### Audience

Who is this for?

### Current artifact

Screenshot, route, file path, prototype, or notes.

### Brand rules

Tokens, tone, constraints, design system guidance.

### Must keep / must avoid

Important decisions and boundaries.

### Acceptance criteria

What makes the work done?

### Output format

Deck, prototype, critique, ticket, PR, or handoff.

---

## 7. Designer control loop

1. Frame the outcome.
2. Assign agent roles.
3. Generate options.
4. Choose a direction.
5. Refine the details.
6. Build or package.
7. Review against success criteria.

**Key message:** You control direction and quality gates. Agents supply speed, structure, and specialist execution.

---

## 8. Example workflow

**Brief:** Create a mobile-first VIP dashboard concept.

### Step 1

Foreground Design Lead restates the goal and unknowns.

### Step 2

UX Strategy Agent proposes 3 flow options.

### Step 3

You pick one direction.

### Step 4

UI Systems Agent defines components, states, and responsive rules.

### Step 5

Prototype Builder Agent implements the lab prototype.

### Step 6

Design Critic and Accessibility QA review the result.

### Step 7

Handoff Agent packages the final direction.

---

## 9. Success checklist

The agent team is working when:

- You can explain the direction without reading code
- The selected option is justified
- Components and states are clear
- Mobile behavior is clear
- Accessibility has been reviewed
- Content has been reviewed
- Technical risks are visible
- Handoff is useful to engineering
- Open questions are separate from decisions

---

## 10. Copy-paste kickoff prompt

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

Work like a small agent team.
Decide which specialist background agents are useful.
Assign them clear tasks.
Synthesize their results.
Give me designer-readable decisions.

If implementation is needed, produce scoped engineering tasks.
Review the result before calling it done.
```

---

## 11. Best first tasks

Start small.

Good first tasks:

- Existing screen critique
- New empty state
- Mobile-first component variant
- Stakeholder presentation
- Prototype for one flow

Then expand into implementation and QA once the designer-agent loop feels reliable.
