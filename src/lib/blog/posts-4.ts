import type { BlogPost } from "@/lib/blog-types";

export const posts4: BlogPost[] = [
  {
    slug: "multi-agent-systems-in-practice",
    title: "Multi-Agent Systems in Practice",
    description:
      "Orchestration patterns, handoffs, shared state and failure containment for systems where several AI agents work together.",
    category: "AI Agents",
    date: "2026-04-14",
    readMinutes: 12,
    tags: ["Agents", "Orchestration", "Architecture"],
    lead: "Multiple agents solve context and specialisation problems, and create coordination problems in exchange.",
    sections: [
      {
        heading: "Why split at all",
        body: [
          "Two reasons hold up: context isolation, where one agent's working memory would otherwise pollute another's, and specialisation, where different steps need different tools, models or guardrails.",
          "A research agent reading long documents should not carry that context into a customer-facing reply. A code-writing agent needs a different toolset and a different tolerance for risk than a triage agent deciding what to do next.",
          "Splitting for elegance alone adds latency and failure modes without benefit. If one well-prompted agent with the right tools finishes the job reliably, that is the correct architecture. Multi-agent design is a cost you pay for a specific capability, not a default.",
          "We ask a blunt question before adding an agent: what can this agent do that a better prompt, a better tool, or a longer context window cannot? If the answer is vague, we do not add it.",
        ],
      },
      {
        heading: "Supervisor over free-for-all",
        body: [
          "A supervisor that delegates to specialists and owns the final answer is far more debuggable than agents negotiating among themselves. Keep one component accountable for the outcome.",
          "Peer-to-peer agent conversations look impressive in a demo and become unmanageable in production. Nobody can say, after the fact, which agent decided what, or why the conversation ended where it did.",
          "A supervisor pattern gives you a single log to read, a single place to add a policy check, and a single point where the final answer is validated before it reaches a user. That structure is worth more than any elegance gained from decentralisation.",
        ],
      },
      {
        heading: "Make handoffs explicit",
        body: [
          "Define a typed contract for what passes between agents. Free-form message passing degrades into telephone: each hop loses detail and adds invention.",
          "A handoff should carry the original request, the specialist's structured output, and enough provenance to trace where a fact came from. Anything looser invites drift, where the third agent in a chain is reasoning from a paraphrase of a paraphrase.",
        ],
        bullets: [
          "Structured payloads, validated on both sides",
          "Explicit success and failure states",
          "A maximum hop count per request",
          "Provenance carried alongside every claim",
        ],
      },
      {
        heading: "Contain failure",
        body: [
          "A specialist that fails should return a clear failure to the supervisor, not improvise. Improvised recovery deep in a chain produces confidently wrong final answers.",
          "The failure modes worth designing for are not exotic. A tool call times out. A specialist returns a payload that does not match its schema. A specialist runs out of budget or hits a rate limit. Each of these needs a defined path back to the supervisor, not a silent guess.",
          "We treat every specialist as untrusted by default. Its output is validated before use, and a validation failure is itself a signal the supervisor can act on — retry with more context, fall back to a simpler path, or escalate to a human.",
        ],
      },
      {
        heading: "Shared state without shared confusion",
        body: [
          "When multiple agents read and write a common state object, races and stale reads follow quickly. Decide up front which agent owns which fields, and treat the rest as read-only to everyone else.",
          "A working pattern: the supervisor owns the canonical state and specialists receive a scoped, read-only slice plus a return contract for what they are allowed to change. This avoids the class of bug where two agents update the same field from different views of the world.",
        ],
      },
      {
        heading: "A worked example: support ticket triage",
        body: [
          "A classifier agent tags intent and urgency from the raw ticket. A retrieval agent pulls account history and prior resolutions. A drafting agent proposes a reply using both. The supervisor validates the draft against policy before it reaches a human queue.",
          "Each agent has one job and a narrow tool list: the classifier cannot call the CRM, the retrieval agent cannot draft prose, the drafting agent cannot send anything. The constraint is the point — it makes each agent's failure mode small and its output easy to check.",
          "In this system the supervisor rejected roughly one in eight drafts during the first month, mostly for policy violations like promising refunds the drafting agent had no authority to promise. That rejection rate told us where the tool boundary needed tightening, not where the model needed to be smarter.",
        ],
      },
      {
        heading: "Metrics that actually tell you something",
        body: [
          "Track hop count per request, specialist failure rate, and time-to-final-answer separately from the accuracy of the final output. A system can be accurate and still slow or fragile in ways that only show up under load.",
        ],
        bullets: [
          "Median and p95 hop count per completed request",
          "Specialist failure and retry rate, by specialist",
          "End-to-end latency versus single-agent baseline",
          "Rate of supervisor override or rejection",
        ],
      },
      {
        heading: "Common failure modes we see repeatedly",
        body: [
          "Unbounded delegation loops, where a supervisor keeps asking a specialist to try again with no cap, are the most common cause of runaway cost. A hard hop limit with a defined fallback fixes this in an afternoon.",
          "The second common failure is context loss at handoff — a specialist receiving a summary instead of the structured facts it needs, and quietly inventing the gaps. The fix is almost always to pass more structured data and less prose between agents.",
          "The third is silent scope creep, where a specialist originally built for one narrow task accumulates extra responsibilities over months until its failure surface is unpredictable. Review agent scope on a schedule, the same way you would review a service's permissions.",
        ],
      },
      {
        heading: "When one agent is genuinely the wrong call",
        body: [
          "If a task needs conflicting expertise at different points — legal caution here, marketing tone there — a single agent switching modes mid-task tends to blend both badly. Separate agents with separate prompts and separate validation handle this more cleanly than one agent trying to be two things.",
        ],
      },
      {
        heading: "Questions we get asked",
        body: [
          "Does more agents mean more accuracy? No. Accuracy comes from good tools, good context and good validation. Splitting into agents changes where those things live, not whether they exist.",
          "Should agents be allowed to talk to each other directly? Generally no, for the same reason two departments should not bypass their manager to make binding decisions together — it works until nobody can explain what happened.",
          "How many agents is too many? When you can no longer draw the system on one page and explain each agent's job in a sentence, you have added coordination cost you probably cannot see.",
        ],
      },
      {
        heading: "Getting started without over-building",
        body: [
          "Start with one agent and one tool. Add a second agent only when you can name the specific context or tool conflict it resolves. Add a supervisor as soon as you have two specialists, not after.",
          "Instrument from day one: log every handoff, every validation failure, every retry. The instrumentation is cheap to add early and expensive to retrofit once the system is in production and something has already gone wrong.",
        ],
      },
    ],
  },
  {
    slug: "ai-for-lead-generation-and-sales",
    title: "Using AI for Lead Generation Without Becoming Spam",
    description:
      "Research, qualification, personalisation and follow-up: where AI genuinely improves sales pipelines and where it destroys reputation.",
    category: "Business",
    date: "2026-04-07",
    readMinutes: 10,
    tags: ["Sales", "Growth", "Automation"],
    lead: "AI made it trivial to send ten thousand personalised emails. That is precisely why doing so no longer works.",
    sections: [
      {
        heading: "The volume trap",
        body: [
          "The first instinct with any AI writing tool is to scale outreach. This is the wrong instinct. Every prospect's inbox filter, and every prospect themselves, has already adapted to generated volume, so the marginal reply rate of one more templated campaign is close to zero.",
          "The actual constraint on revenue was never the number of emails sent. It was the number of conversations that led somewhere. AI should shrink the top of the funnel and improve what happens inside it, not widen the top further.",
        ],
      },
      {
        heading: "Automate research, not sending",
        body: [
          "The highest-value use of AI in sales is preparation: understanding a prospect's business, recent changes, likely problems and relevant references — condensed into a briefing before a human writes anything.",
          "This briefing should read like something a good analyst would hand a salesperson five minutes before a call, not a paragraph of flattering guesses. Recent funding, a leadership change, a public roadmap item, a competitor's move — these are usable. A generated compliment is not.",
        ],
      },
      {
        heading: "Qualify ruthlessly",
        body: [
          "Use AI to score inbound and outbound lists against real fit criteria, then contact fewer, better-matched prospects. Precision beats volume in every market that has already been saturated by volume.",
          "A scoring model is only as good as the criteria behind it. Firmographic fit, technographic fit and timing signals are useful inputs; vague notions of 'good prospect' are not. Write the criteria down before you automate the scoring, or you automate a guess.",
        ],
        bullets: [
          "Firmographic and technographic fit",
          "Evidence of the problem you solve",
          "Timing signals: hiring, funding, product launches",
          "Existing relationship or warm path in, however faint",
        ],
      },
      {
        heading: "Personalisation must be true",
        body: [
          "A generated compliment about a blog post the prospect did not write is worse than no personalisation. If a claim cannot be verified from a source, do not include it.",
          "The test we apply: would the prospect recognise this fact about their own business as accurate and specific, not generic and flattering? If a line could be sent to any company in the sector unchanged, it is not personalisation, it is a template with a name inserted.",
        ],
      },
      {
        heading: "Follow-up is the actual win",
        body: [
          "Most pipeline is lost to inconsistent follow-up. Automated reminders, context summaries before calls, and instant post-call notes recover more revenue than any outbound campaign.",
          "A rep who has a fresh, accurate summary of the last conversation before every call closes more deals than one working from memory or a half-updated CRM field. This is unglamorous automation, and it is where the largest measurable gains actually sit.",
          "We have watched teams spend months tuning an outbound message while a simple automated call-recap workflow, shipped in a week, moved more deals through the pipeline than the messaging change ever did.",
        ],
      },
      {
        heading: "Keep a human on the relationship",
        body: [
          "AI can prepare, draft and remind. It should not be the voice a prospect believes they are talking to in a real relationship. The moment a buyer suspects the personal touch was fabricated, trust drops faster than it would have from no outreach at all.",
        ],
      },
      {
        heading: "A worked example: re-engaging a stalled pipeline",
        body: [
          "A backlog of six-month-old opportunities marked 'no decision' was scored for renewed fit signals — new hires in the buying team, a product change that removed their old objection, a competitor's price rise. Only the prospects with a genuine new reason were re-contacted.",
          "The message referenced the specific new signal, not a generic check-in. Reply rates on this narrow, evidence-based list were markedly higher than the original campaign that created the backlog, because every message had an actual reason to exist.",
        ],
      },
      {
        heading: "Metrics worth watching",
        body: [
          "Reply rate and open rate measure attention, not revenue. Track meetings booked per hundred contacts, and pipeline value per rep-hour, to see whether the automation is actually buying time or just activity.",
        ],
        bullets: [
          "Meetings booked per hundred qualified contacts",
          "Time from first contact to qualified meeting",
          "Deals lost to 'no follow-up' versus 'no fit'",
          "Rep hours spent on research versus on conversations",
        ],
      },
      {
        heading: "Failure modes to watch for",
        body: [
          "The most damaging failure is a factual error in a personalised message reaching a prospect who knows it is wrong — it signals that nothing about the outreach was actually checked. Always keep a verification step before send, automated or human.",
          "A second failure mode is optimising the wrong metric: a campaign tuned purely for reply rate will drift toward gimmicky subject lines that generate replies without generating pipeline. Tie every automation change back to booked meetings and closed revenue, not vanity engagement numbers.",
        ],
      },
      {
        heading: "Questions we get asked",
        body: [
          "Is AI outreach dead? No — bulk, generic AI outreach is dead. Targeted, evidence-based outreach assisted by AI research is more effective than either fully manual or fully automated approaches on their own.",
          "Should reps write their own emails or edit AI drafts? Editing a well-briefed draft is faster and usually as good, provided the rep genuinely reviews it rather than sending it unread.",
        ],
      },
      {
        heading: "Where to start",
        body: [
          "Begin with research automation and qualification scoring — the two areas with the least reputational risk and the clearest time savings. Add follow-up automation next. Save personalised outbound generation for last, and keep a human review step on it permanently.",
        ],
      },
    ],
  },
  {
    slug: "internal-ai-tools-that-teams-use",
    title: "Building Internal AI Tools People Actually Use",
    description:
      "Adoption, not capability, decides whether an internal AI tool succeeds. What we do differently to get teams to keep using it.",
    category: "Products",
    date: "2026-03-31",
    readMinutes: 9,
    tags: ["Internal Tools", "Adoption", "Design"],
    lead: "The graveyard of internal AI tools is full of impressive systems nobody opened twice.",
    sections: [
      {
        heading: "Go to the work",
        body: [
          "A tool that requires opening a new tab loses to a tool that appears where the work already happens: the inbox, the CRM, the chat channel, the spreadsheet.",
          "Every extra click between a person's task and the assistant that could help with it is a chance for them to just do the task the old way instead. The winning integrations are the boring ones: a sidebar in the tool they already have open, a slash command in the channel they already use.",
        ],
      },
      {
        heading: "Solve one task completely",
        body: [
          "A narrow tool that finishes a job beats a general assistant that helps with everything a little. Users adopt outcomes, not capabilities.",
          "'Draft a reply' is a capability. 'This ticket is now answered and routed correctly' is an outcome. Design toward the second, even if it means the tool does less on paper. A tool that finishes one job completely earns the trust to be given a second job later.",
        ],
      },
      {
        heading: "Show the working",
        body: [
          "Internal users are experts in their domain. They will not trust an answer they cannot check. Show the source, the intermediate steps, and what the system was unsure about.",
          "This is not a nice-to-have for internal tools the way it might be for a consumer product. An operations analyst who cannot see which record a number came from will simply stop trusting the number, and stop opening the tool.",
        ],
        bullets: [
          "Cite the record or document used",
          "Flag low-confidence output explicitly",
          "Make overriding easy and remembered",
          "Log every override so the pattern is visible later",
        ],
      },
      {
        heading: "Launch with a real workflow change",
        body: [
          "Tools introduced as optional stay optional. Pair the launch with a specific change: this report is now generated here, this triage now starts here.",
          "Optional tools compete with existing habits and lose, not because they are worse but because habits do not need to be re-decided every day. A defined workflow change removes the daily decision and replaces it with a new default.",
        ],
      },
      {
        heading: "Watch the first two weeks",
        body: [
          "Adoption curves are set early. If usage drops off in the first two weeks, the tool has a real problem — a missing feature, a trust issue, or friction nobody flagged in testing — and it needs direct attention before the team quietly reverts to the old process.",
          "We treat week one and week two after launch as an extension of the build phase, not a wrap-up. The team that shipped the tool sits with real users during this window and fixes what breaks the same day, not in the next sprint.",
        ],
      },
      {
        heading: "A worked example: a claims-triage assistant",
        body: [
          "An insurance operations team had a tool that classified incoming claims and suggested a handler. Early usage was low despite good accuracy in testing, because the suggestion appeared in a separate dashboard nobody had reason to open during their normal queue work.",
          "Moving the same suggestion into the claims queue itself, as a single line next to each item, raised daily active usage sharply within the first two weeks — same model, same accuracy, completely different adoption, because the friction of switching tools had been removed.",
        ],
      },
      {
        heading: "Metrics that predict long-term use",
        body: [
          "Daily active usage in week four is a better predictor of long-term adoption than any accuracy benchmark measured before launch. Track it against the size of the eligible user base, not against total headcount.",
        ],
        bullets: [
          "Daily active users as a share of the eligible team",
          "Override rate and whether it declines over time",
          "Time saved per completed task, self-reported and measured",
          "Usage retention at week two, four and eight",
        ],
      },
      {
        heading: "Failure modes we see repeatedly",
        body: [
          "The most common failure is building for the manager's view of the workflow rather than the practitioner's. Managers ask for dashboards; practitioners need the answer inside the task they are already doing. Build for the second and the first follows.",
          "The second is silence on uncertainty. A tool that always answers confidently, even when it should not, trains users to distrust every answer equally, including the good ones. An honest 'not sure' is more useful than a wrong answer stated plainly.",
          "The third is treating launch as the finish line. Tools that are not maintained — as source systems change, as edge cases accumulate — decay quietly until usage drops and nobody investigates why.",
        ],
      },
      {
        heading: "Questions we get asked",
        body: [
          "Should we build custom or buy a general assistant platform? If the task is genuinely narrow and repeated, a custom tool embedded in the existing workflow tends to win on adoption even against a more capable general platform.",
          "How do we get management buy-in for the workflow change? Pilot with the most willing team first, publish real time-saved numbers from that pilot, and let the result do the persuading rather than the pitch.",
        ],
      },
      {
        heading: "A practical checklist before you launch",
        body: [
          "Before launch, confirm the tool lives inside an existing workflow, solves one task completely, shows its sources, and has a named owner responsible for the first month of usage data. Missing any one of these predicts a slow, quiet failure.",
        ],
      },
    ],
  },
  {
    slug: "small-language-models-edge-ai",
    title: "Small Models, Big Results: The Case for Right-Sizing AI",
    description:
      "Why smaller and fine-tuned models often outperform frontier models on narrow business tasks, in cost, latency and consistency.",
    category: "Engineering",
    date: "2026-03-24",
    readMinutes: 11,
    tags: ["Models", "Performance", "Cost"],
    lead: "Frontier models are general. Most business tasks are not. Narrowness is an advantage you can buy cheaply.",
    sections: [
      {
        heading: "Narrow tasks need narrow capability",
        body: [
          "Classifying a support ticket into one of twelve categories does not require a model that can write poetry. It requires consistency, speed and a low price per call.",
          "Most production AI tasks inside a business are this shape: a bounded input, a bounded set of acceptable outputs, run thousands of times a day. Paying for general reasoning ability on every call is paying for capability the task never uses.",
        ],
      },
      {
        heading: "Consistency as a feature",
        body: [
          "Smaller models constrained to a tight output schema tend to produce more predictable structure, which matters more than eloquence when the output feeds another system.",
          "A downstream system parsing a field does not benefit from a more creative phrasing of the answer. It benefits from the same shape, every time. Frontier models, tuned for broad helpfulness, sometimes vary structure in ways a smaller, narrowly-tuned model does not.",
        ],
      },
      {
        heading: "Latency changes product design",
        body: [
          "When a call returns in a fraction of a second, you can put AI inside interactions that could not tolerate a pause: typing, filtering, live suggestions, voice.",
          "This is not just a performance win, it is a different category of product. A suggestion that appears after a two-second wait competes with the user finishing the thought themselves; a suggestion that appears in under 150 milliseconds becomes part of the interaction.",
        ],
        bullets: [
          "Autocomplete and inline suggestions",
          "Real-time voice turn handling",
          "Live moderation and routing",
          "Interactive filtering over large result sets",
        ],
      },
      {
        heading: "Fine-tuning versus prompting",
        body: [
          "Prompting is the right default. Consider fine-tuning when you have a stable, high-volume task, hundreds of good examples, and a demonstrated ceiling on prompt improvements.",
          "Fine-tuning is a commitment: it needs a maintained dataset, a retraining plan as the task drifts, and evaluation discipline to know when a new version actually helps. Do not reach for it before prompting and better context have been genuinely exhausted.",
        ],
      },
      {
        heading: "Use tiers deliberately",
        body: [
          "A well-designed system routes easy, high-volume cases to a small model and escalates genuinely hard or ambiguous cases to a larger one. This is not a compromise; it is usually cheaper and more accurate than sending everything to one model.",
          "The routing decision itself needs to be reliable — a cheap classifier or a confidence threshold deciding when to escalate. Get this wrong and you either overpay by escalating too often, or under-serve hard cases by escalating too rarely.",
        ],
      },
      {
        heading: "A worked example: document field extraction",
        body: [
          "A logistics client needed structured fields pulled from delivery notes at high volume. A frontier model handled the task well but at a cost per document that made the workflow uneconomical at their volume.",
          "A smaller model fine-tuned on a few hundred labelled examples of their actual document formats matched the frontier model's accuracy on the common formats and cost a fraction as much per call, with noticeably lower latency. The rare, malformed documents were routed to a larger model as a fallback.",
        ],
      },
      {
        heading: "Metrics that matter for right-sizing",
        body: [
          "Track cost per successful task, not cost per call — a cheap model that fails often and needs a retry can end up costing more than a pricier model that succeeds first time.",
        ],
        bullets: [
          "Cost per successfully completed task",
          "p95 latency, not just average",
          "Escalation rate from small model to large model",
          "Accuracy drift over time as inputs change",
        ],
      },
      {
        heading: "Failure modes to watch for",
        body: [
          "The most common mistake is fine-tuning too early, before the task definition has stabilised, which means retraining every time the requirements shift. Prompting is far cheaper to iterate on while the task is still being defined.",
          "The second is under-monitoring drift. A small model tuned to a snapshot of your data will degrade as inputs change — new document formats, new product categories, new customer language — and nobody notices until accuracy has quietly dropped for weeks.",
          "The third is routing everything to the frontier model by default out of caution, which is safe for correctness but expensive and slow at scale, and delays the point at which the team learns which parts of the task are actually simple.",
        ],
      },
      {
        heading: "Questions we get asked",
        body: [
          "Will a small model ever match a frontier model on hard reasoning? Not reliably, and that is fine — that is exactly the class of task that should be routed to the larger model.",
          "How much data do you need to fine-tune? Enough to cover the realistic variety of inputs, not a specific number — a few hundred well-chosen, representative examples usually outperforms a few thousand redundant ones.",
        ],
      },
      {
        heading: "How to decide, practically",
        body: [
          "Start every task on the model tier you already have running elsewhere, measure accuracy and cost, then ask whether a smaller model can hit the same accuracy on the common cases. If yes, move the volume down and keep the larger model for the edge cases only.",
        ],
      },
    ],
  },
  {
    slug: "why-we-build-in-public",
    title: "Why Genartml Builds Products and Services Side by Side",
    description:
      "Our operating philosophy: owning products keeps our client work honest, and client work keeps our products grounded in real problems.",
    category: "Business",
    date: "2026-03-17",
    readMinutes: 13,
    tags: ["Genartml", "Philosophy", "Studio"],
    lead: "Building > talking. Owning products and serving clients are not two businesses — they are the same practice pointed in two directions.",
    sections: [
      {
        heading: "Products keep us honest",
        body: [
          "When you own the product, you own the consequences: the support load, the cost per user, the churn caused by a decision made six months earlier. That perspective is impossible to fake in a proposal.",
          "Evoluter and Extutor are live systems with real users. Cortiva is on the way. Every architectural opinion we hold has an invoice behind it — we have paid the inference bill, fielded the support ticket, and rewritten the module that seemed clever at design time and expensive in production.",
          "A consultancy that has never operated what it recommends can describe a good architecture. It cannot tell you which good architecture becomes painful at month eight, because it has never been there for month eight.",
        ],
      },
      {
        heading: "Client work keeps us grounded",
        body: [
          "Product teams drift toward interesting problems. Client work drags attention back to the ones that cost money: brittle integrations, messy data, adoption, handover, maintenance.",
          "Every client engagement is a forced encounter with a real, specific mess — a legacy system nobody documented, a dataset with a decade of inconsistent labelling, a team with strong opinions about a tool we would not have chosen. That mess is where the actual craft of shipping AI systems lives.",
        ],
      },
      {
        heading: "What transfers between the two",
        body: [
          "The same components move in both directions — evaluation harnesses, retrieval pipelines, agent scaffolding, cost controls — hardened in one context and reused in the other.",
          "An evaluation approach built to keep Evoluter's own scoring honest becomes the same approach we bring to a client's model-selection problem. A cost-control pattern built to keep a client's agent system within budget becomes a default we apply to our own products before it becomes a problem there too.",
        ],
        bullets: [
          "Evaluation tooling built for our products, applied to client systems",
          "Integration patterns from client work, folded back into products",
          "A shared bar for what counts as production-ready",
          "One engineering culture, not two separate playbooks",
        ],
      },
      {
        heading: "The tension this creates",
        body: [
          "Running both is not free. Product roadmaps and client deadlines compete for the same senior engineering time, and there is no formula that resolves that tension cleanly. We manage it deliberately rather than pretending it does not exist.",
          "The discipline that makes this work is refusing to let either side become an excuse for the other — client work is not a distraction from 'real' product building, and product ambitions are not a reason to under-deliver for a client. Both are judged by the same bar.",
        ],
      },
      {
        heading: "A worked example: Evoluter and a client evaluation problem",
        body: [
          "A client needed a defensible way to compare two candidate models for a customer-facing task before committing to one. The evaluation framework we used was the same scaffolding built originally to score Evoluter's own outputs against a rubric, adapted to the client's specific task and acceptance criteria.",
          "That reuse cut weeks off the engagement, not because the client's problem was identical to Evoluter's, but because the hard part — building a rubric-based, repeatable evaluation process rather than a one-off gut check — had already been solved and hardened elsewhere.",
        ],
      },
      {
        heading: "What we measure to know it is working",
        body: [
          "We track how often components originate in one context and get reused in the other, and how often a production incident in one surfaces a fix that gets applied pre-emptively in the other before it becomes an incident there too.",
        ],
        bullets: [
          "Rate of component reuse between product and client work",
          "Time from an incident in one context to a preventive fix applied in the other",
          "Senior engineering time split across product and client work",
          "Client outcomes measured against the same bar as internal product metrics",
        ],
      },
      {
        heading: "Failure modes we actively guard against",
        body: [
          "The obvious risk is neglect — letting the products stagnate while client revenue takes all the attention, or letting client delivery slip while an interesting product idea absorbs the best engineers. We guard against this with explicit time allocation, reviewed regularly, not good intentions.",
          "A subtler risk is cross-contamination of standards — quietly accepting lower quality in client work because a client will not notice, or in product work because there is no external deadline forcing rigour. Both erode the same trust over time, just on different timelines.",
          "A third risk is treating every client engagement as a chance to build a new product feature whether or not the client actually needs it. We keep those separate: what we build for a client serves the client's problem first, and only becomes a product feature afterward if it stands on its own merit.",
        ],
      },
      {
        heading: "Why this matters to a prospective client",
        body: [
          "It means the people advising on your architecture have made the mistakes they are warning you about, on their own systems, with their own money. It also means the tools we bring to your project are not being invented for the first time on your budget.",
        ],
      },
      {
        heading: "Questions we get asked",
        body: [
          "Does client work slow down your products? Sometimes, visibly. We accept that trade because client work is where our engineering gets tested against problems we would not have chosen for ourselves, and that pressure makes the products better too.",
          "Would you ever drop one side entirely? No. Each side catches failure modes the other cannot see on its own — a pure product company optimises for its own users only, and a pure consultancy never has to live with its own advice.",
        ],
      },
      {
        heading: "What this looks like day to day",
        body: [
          "On any given week, the same engineer might be closing an issue in Evoluter's evaluation pipeline and reviewing a retrieval design for a client's internal search tool. That is not a scheduling quirk. It is the whole point: the same standards, the same instincts, applied twice.",
        ],
      },
      {
        heading: "Where this is heading",
        body: [
          "As Cortiva moves from build to live product, we expect the same pattern to repeat: voice-handling patterns proven internally will show up in client agent work, and client voice projects will surface edge cases that make Cortiva better. That loop, more than any single feature, is the actual product of running the studio this way.",
        ],
      },
    ],
  },
];
