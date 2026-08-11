import type { BlogPost } from "@/lib/blog-types";

export const posts1: BlogPost[] = [
  {
    slug: "ai-automation-roi-for-small-teams",
    title: "The Real ROI of AI Automation for Small Teams",
    description:
      "How small teams should calculate the return on AI automation: which hours to count, which to ignore, and the payback window to expect.",
    category: "Business",
    date: "2026-07-28",
    readMinutes: 11,
    tags: ["ROI", "Automation", "Operations"],
    lead: "Most automation business cases fail because they measure the wrong hours. Here is the model we use before we write a line of code.",
    sections: [
      {
        heading: "Count the hours that repeat",
        body: [
          "Automation pays back on repetition, not complexity. A task that takes four hours once a year is a bad candidate. A task that takes eleven minutes, forty times a week, across three people, is where the money is. Volume beats novelty every time you are sizing a business case.",
          "Start by listing every task your team performs on a fixed cadence: daily reconciliations, weekly reporting, inbound triage, data entry between two systems, status updates that exist only because someone has to type them. Write these down before you talk to a vendor or an engineer, because the list itself usually reveals the priority order.",
          "Small teams underestimate this list because the work is spread across people rather than concentrated in one role. Ask each person to keep a rough log for a single week. The pattern that emerges — three people doing a slightly different version of the same task — is almost always the first thing worth automating.",
        ],
        bullets: [
          "Frequency per week multiplied by minutes per run",
          "Number of people who perform the same task",
          "Rework caused by human error in that task",
        ],
      },
      {
        heading: "Separate saved time from recovered time",
        body: [
          "Saved time is the minutes removed from a process. Recovered time is what those minutes become. If an automation frees six hours a week but nobody reassigns those hours to revenue work, you have bought a nicer workflow, not a return. This distinction is the single most common reason automation projects get quietly cancelled a year later.",
          "Before building, decide explicitly what the freed capacity gets spent on. That single sentence turns an efficiency project into a growth project. It might be more outbound calls, faster quote turnaround, or simply reducing overtime. Whatever it is, name it in the business case, not after the system ships.",
          "For very small teams, recovered time often shows up as reduced founder involvement rather than headcount reduction. That is a legitimate and often underrated return: the owner spending two fewer hours a day on admin is worth more than the raw hourly rate suggests, because founder time is the scarcest resource in the business.",
        ],
      },
      {
        heading: "Model the payback window honestly",
        body: [
          "A well-scoped automation for a small team typically lands somewhere between two and six weeks of build time, and pays back within one to two quarters. Anything promising instant payback is either trivial or overstated. Treat vendor claims of same-week ROI with the same scepticism you would apply to any other sales pitch.",
          "Include the ongoing cost: model usage, monitoring, and the occasional prompt or logic revision when upstream systems change. Automation is infrastructure, not a one-off purchase. A rough rule of thumb is to budget ten to fifteen percent of the original build cost per year for upkeep, and to review that assumption after the first two quarters of real usage.",
          "Build the payback model in a spreadsheet before any code is written, with three columns: one-off build cost, monthly running cost, and monthly value recovered. If the third column does not clearly exceed the second within two quarters, either the scope is too small to matter or the task was not repetitive enough to justify automation in the first place.",
        ],
      },
      {
        heading: "Where AI changes the maths",
        body: [
          "Classic automation could only handle structured, predictable inputs. AI extends the reachable set to messy inputs: free-text emails, call transcripts, scanned documents, inconsistent spreadsheets. That single shift is why automation ROI calculations from five years ago undercount what is possible today.",
          "That matters because the expensive work in most small businesses is not the structured part. It is the interpretation layer sitting in front of it — reading the email to work out what the customer actually wants, or deciding which category an invoice belongs to. Automating interpretation is what moves the return from marginal to obvious.",
          "The practical effect is that tasks previously dismissed as too variable to automate are now worth reconsidering. Anything that involves reading, summarising, classifying or drafting text is a candidate again, even if a rules engine would never have coped with it. Revisit your rejected automation list from a few years ago with this in mind.",
        ],
      },
      {
        heading: "A worked example",
        body: [
          "A twelve-person agency processes forty supplier invoices a week, each requiring someone to read the PDF, match it to a purchase order, and key the result into accounting software. That takes roughly nine minutes per invoice, or six hours a week across the team, worth around three hundred and twelve hours a year at a blended rate.",
          "An AI extraction step reads the PDF, matches it against open purchase orders, and flags exceptions for a human to review. Build time was three weeks. Running cost is under sixty pounds a month in model usage. Ninety percent of invoices now need no human touch at all, and the remaining ten percent are the genuinely ambiguous ones a person should be looking at anyway.",
          "Payback arrived in under two months once the freed time was redirected to chasing overdue receivables, which produced a direct cash-flow improvement rather than a vague productivity gain. The lesson generalises: the return improved not because the automation was clever, but because the recovered hours were pointed at something measurable.",
        ],
      },
      {
        heading: "A step-by-step framework for sizing a case",
        body: [
          "Use a consistent five-step process rather than judging opportunities individually, because consistency is what lets you compare candidates fairly across a team.",
          "First, log frequency and duration for two weeks. Second, calculate the annual hour cost using a blended hourly rate. Third, estimate build and running cost from a comparable project or a vendor quote. Fourth, name explicitly what the recovered time will be spent on. Fifth, set a review date at eight weeks post-launch to check the numbers against reality, not the original estimate.",
          "Teams that skip step four are the ones who see automation stall after the first project, because nobody can point to what actually improved. Teams that skip step five are the ones who keep funding automations that quietly stopped paying back months ago.",
        ],
        bullets: [
          "Log frequency and duration for two weeks",
          "Calculate the annual hour cost at a blended rate",
          "Estimate build and running cost realistically",
          "Name what the recovered time will fund",
          "Set an eight-week review date",
        ],
      },
      {
        heading: "Common failure modes",
        body: [
          "The most common failure is automating a task nobody can describe clearly. If three people explain the process three different ways, the automation will encode one person's version and quietly break for the other two. Fix the process before you fix the tooling.",
          "The second failure is scope creep during the build. A two-week project that grows to cover every edge case discovered along the way rarely ships, and even when it does, the payback window has usually doubled. Ship the eighty percent case, then iterate with real usage data.",
          "The third failure is treating the freed time as a soft benefit that nobody is accountable for. Assign an owner to the recovered hours the same way you would assign an owner to a budget line, otherwise the hours simply diffuse back into general busyness within a quarter.",
        ],
      },
      {
        heading: "What to measure once it is live",
        body: [
          "Track volume processed, error rate, exception rate, and the time from input arriving to output being ready. These four numbers tell you whether the system is actually working, independent of whether anyone feels like it is working.",
          "Also track a softer but important signal: how often a human overrides the automated result. A rising override rate usually means an upstream input has changed shape, not that the automation was badly built. Catching that early avoids a slow, invisible decline in accuracy that nobody notices until a customer complains.",
        ],
        bullets: [
          "Volume processed per week",
          "Error and exception rate",
          "Time from input to completed output",
          "Human override rate over time",
        ],
      },
      {
        heading: "Frequently asked questions",
        body: [
          "How small is too small to automate? If the process happens fewer than five times a week, the build and maintenance overhead rarely justifies itself unless the task carries a high error cost, such as compliance filings.",
          "Should we build or buy? Buy for common, well-solved problems like invoice extraction or meeting notes. Build, or use a partner to build, when the process is specific to how your business actually operates, because off-the-shelf tools will fight your workflow rather than fit it.",
          "What if the team resists it? Involve the people doing the task in defining what good output looks like before the build starts. Resistance almost always comes from feeling like a process was imposed rather than designed with them.",
        ],
      },
      {
        heading: "What we would do first",
        body: [
          "Run the two-week logging exercise across the whole team before committing to any tool or vendor. It costs nothing beyond a shared spreadsheet and it will surface the highest-value candidate faster than any workshop or consultant will.",
          "Then pick the single task with the clearest frequency, the least ambiguity, and the most obvious destination for the recovered time, and build only that. Prove the payback model on one process before expanding, because the credibility earned from one working system is what funds the next three.",
        ],
      },
    ],
  },
  {
    slug: "ai-agents-vs-workflows",
    title: "AI Agents vs Workflows: Choosing the Right Architecture",
    description:
      "Agents are not always the answer. A practical framework for deciding between deterministic workflows and autonomous AI agents.",
    category: "AI Agents",
    date: "2026-07-21",
    readMinutes: 10,
    tags: ["Agents", "Architecture", "LLM"],
    lead: "Agentic systems are powerful and often unnecessary. The decision comes down to how much branching your problem actually has.",
    sections: [
      {
        heading: "The difference in one line",
        body: [
          "A workflow decides the path at build time. An agent decides the path at run time. Everything else — tools, memory, retries — is shared plumbing, and confusing the two leads teams to over-engineer simple problems or under-engineer genuinely open-ended ones.",
          "This distinction sounds academic until you are three weeks into a build and the requirements keep shifting because nobody agreed which model was in play. Deciding this upfront, on paper, before any code exists, saves that entire class of argument later.",
        ],
      },
      {
        heading: "When a workflow wins",
        body: [
          "If the steps are known, ordered, and finite, a workflow is cheaper, faster, and vastly easier to debug. You get deterministic behaviour, predictable cost, and logs you can actually read line by line when something goes wrong.",
          "Most business processes fall here: extract, validate, enrich, route, notify. An LLM can still power individual steps without controlling the sequence — for example, using a model purely to classify an email's intent inside an otherwise fixed pipeline.",
          "The main advantage teams underrate is testability. A workflow can be unit tested step by step, the same way conventional software is tested, which means a junior engineer can maintain it confidently a year after the original author has moved on.",
        ],
        bullets: [
          "Document processing pipelines",
          "Lead qualification and routing",
          "Report generation on a schedule",
          "Data migration and normalisation",
        ],
      },
      {
        heading: "When an agent wins",
        body: [
          "Agents earn their complexity when the number of valid paths is too large to enumerate. Research tasks, multi-system troubleshooting, and open-ended customer conversations all fit, because writing out every possible branch by hand would take longer than the problem is worth solving.",
          "The signal is simple: if you find yourself writing an if-statement tree that keeps growing every week, you have an agent-shaped problem. When the branching logic becomes the majority of your code, it is usually cheaper to let a model reason about the next step than to keep maintaining the tree.",
          "Agents also fit situations where the right sequence of tool calls depends on information only discovered mid-task, such as diagnosing why a customer's integration stopped syncing, where the second step genuinely depends on what the first step reveals.",
        ],
      },
      {
        heading: "The hybrid most systems end up as",
        body: [
          "In production, the durable pattern is a deterministic outer loop with agentic inner steps. The workflow guarantees the process completes; the agent handles the ambiguous step inside it, which contains the model's unpredictability to a single, well-monitored stage.",
          "This gives you the reliability of a pipeline with the flexibility of reasoning, and it keeps failure contained to a single node rather than the whole run. If the agentic step fails or times out, the outer workflow can retry it, escalate it to a human, or fall back to a simpler rule.",
          "We see this pattern most often in support triage: a fixed workflow receives the ticket, an agentic step decides how to categorise and respond to genuinely novel requests, and the workflow resumes to log the outcome and update the record.",
        ],
      },
      {
        heading: "A worked example: two versions of the same problem",
        body: [
          "Consider inbound sales enquiries. Version one, a workflow: parse the form, check against a fixed set of qualification rules, route to the right rep, send a templated acknowledgement. This covers eighty percent of enquiries reliably and cheaply, and it is what most teams should build first.",
          "Version two, an agent: a prospect emails a rambling, multi-part question about pricing, integration requirements, and timeline all at once. An agent can read the whole message, decide which of several knowledge sources to check, draft a tailored reply, and flag the parts that need a human. A workflow would need a rule for every possible combination, which does not scale.",
          "Most companies need both, wired together: the workflow handles routing and logging, the agent handles the messy minority of enquiries that do not fit a template. Building only the agent wastes money on the eighty percent that never needed one.",
        ],
      },
      {
        heading: "A decision framework",
        body: [
          "Ask four questions before choosing an architecture. Can you list every realistic path the task could take? Does the order of steps ever depend on information only available mid-task? Is deterministic, auditable behaviour a legal or trust requirement? Would getting it wrong be expensive or embarrassing?",
          "If you can list the paths, order rarely changes, and auditability matters, build a workflow. If the paths are too numerous to list, order genuinely depends on intermediate discoveries, and the cost of an occasional wrong step is tolerable, an agent is justified. Most real answers land somewhere in between, which is exactly why the hybrid pattern dominates in practice.",
        ],
        bullets: [
          "Can every realistic path be listed in advance?",
          "Does step order depend on mid-task discoveries?",
          "Is deterministic, auditable behaviour required?",
          "Is an occasional wrong step tolerable?",
        ],
      },
      {
        heading: "Common failure modes",
        body: [
          "The most expensive mistake is building an agent for a problem that was actually a workflow, usually because agents feel more impressive to demo. The result is a system that is slower, harder to debug, and more expensive to run than the simpler alternative would have been.",
          "The second mistake is the opposite: forcing a genuinely open-ended problem into a rigid workflow, which produces a rules engine that grows a new special case every week and eventually becomes unmaintainable. Both mistakes come from skipping the branching-complexity question at the start.",
          "A third, quieter failure is giving an agent tools without limits — no cap on iterations, no budget on tokens, no restriction on which systems it can touch. This turns a reasoning problem into a reliability and cost problem almost overnight.",
        ],
      },
      {
        heading: "Cost and observability",
        body: [
          "Agents multiply token usage unpredictably because they choose how many steps to take. Cap iterations, log every tool call, and set a hard budget per run. An agent without a ceiling is an open invoice, and the invoice tends to arrive as a surprise at the end of the month.",
          "Instrument agentic steps more heavily than deterministic ones: log the full reasoning trace, every tool call and its result, and the final decision, so a failure can be replayed and understood rather than guessed at. Workflows need less of this because their behaviour is already predictable by design.",
        ],
      },
      {
        heading: "What to measure",
        body: [
          "For workflows, track throughput, error rate at each step, and time to completion. These are the same metrics you would use for any conventional pipeline, because a workflow is, functionally, conventional software with an LLM step embedded in it.",
          "For agentic steps, add average number of tool calls per run, cost per run, and the rate at which a run needs human escalation. A steadily rising tool-call count over time is an early warning that the task has drifted outside what the agent was designed to handle.",
        ],
        bullets: [
          "Throughput and error rate per step",
          "Average tool calls per agent run",
          "Cost per run against budget",
          "Human escalation rate",
        ],
      },
      {
        heading: "Frequently asked questions",
        body: [
          "Can a workflow use an LLM at all? Yes — most good workflows do, for individual steps like classification, extraction or drafting. The workflow still controls the sequence; the model just does one job well inside it.",
          "Do agents need to be riskier in production? Not if they are bounded properly: capped iterations, restricted tools, and a fallback to human review when confidence is low. An unbounded agent is risky; a bounded one is a normal engineering component.",
          "Which should we prototype first? Prototype the workflow version even if you suspect you need an agent. It clarifies exactly which step is genuinely ambiguous, which then tells you precisely how small the agentic component needs to be.",
        ],
      },
      {
        heading: "What we would do first",
        body: [
          "Map the process on a whiteboard and count the branches. If you run out of space before you run out of branches, you likely need an agent for that section. If the diagram fits comfortably, build the workflow and move on.",
          "Then build the deterministic outer shell first, even if it currently has a placeholder for the ambiguous step. This gives you a working, monitorable system from day one, and lets you swap in the agentic component once you understand exactly what it needs to decide.",
        ],
      },
    ],
  },
  {
    slug: "ai-voice-agents-customer-operations",
    title: "AI Voice Agents Are Quietly Rewriting Customer Operations",
    description:
      "What changed in voice AI, where it works today, and how to deploy voice agents without damaging customer trust.",
    category: "AI Agents",
    date: "2026-07-14",
    readMinutes: 9,
    tags: ["Voice AI", "Cortiva", "Customer Experience"],
    lead: "Latency dropped, interruption handling improved, and voice agents crossed the line from demo to deployment.",
    sections: [
      {
        heading: "What actually changed",
        body: [
          "Three things: sub-second response times, natural turn-taking that survives interruption, and the ability to call real systems mid-conversation instead of collecting information for a human to process later. Any one of these alone was a marginal improvement; together they cross a usability threshold.",
          "That last point is the one businesses underestimate. A voice agent that can check availability, update a record, and confirm an action is a system, not a phone tree. The caller experiences a completed task, not a message taken for someone else to action tomorrow.",
          "Two years ago, voice agents felt like talking to a slow, polite answering machine. Today the better implementations feel closer to a competent front-desk operator, and the gap between the two is almost entirely about latency and interruption handling rather than the underlying language model.",
        ],
      },
      {
        heading: "Where voice works today",
        body: [
          "Voice performs best on high-volume, structured, emotionally low-stakes calls where speed matters more than nuance. These are calls where the caller already knows what they want and just needs the system to execute it quickly and correctly.",
          "It also performs well as an overflow layer rather than a full replacement, picking up calls during peak hours or outside business hours so nothing goes unanswered, while routine hours still route to a human team that handles the harder cases.",
        ],
        bullets: [
          "Appointment booking, rescheduling and reminders",
          "Order status and delivery updates",
          "Lead qualification and callback scheduling",
          "After-hours coverage and overflow handling",
        ],
      },
      {
        heading: "Where it still should not go alone",
        body: [
          "Complaints, cancellations, billing disputes and anything with emotional weight should route to a human quickly. The right design detects frustration and escalates before the caller has to ask twice, because forcing an upset customer to repeat themselves to a machine compounds the original problem.",
          "Similarly, anything involving genuine judgement calls — a refund outside policy, a safety concern, a legal question — should be a hard boundary the agent is not allowed to cross, regardless of how confident its language sounds. Confidence in tone is not the same as correctness in judgement.",
        ],
      },
      {
        heading: "Design rules that protect trust",
        body: [
          "Disclose that the caller is speaking with an AI assistant. Offer a human path in the first fifteen seconds. Keep responses short — long monologues feel robotic even when the voice is perfect, and callers on the phone process speech far more slowly than text.",
          "Log transcripts, review the worst ten calls each week, and fix the specific failure rather than rewriting the whole prompt. This weekly discipline catches drift early, before a pattern of poor calls turns into a pattern of poor reviews.",
          "Avoid over-personifying the agent with a name and backstory that implies it is human. Callers tolerate a competent AI far better than they tolerate feeling deceived about what they were talking to once they find out.",
        ],
      },
      {
        heading: "A worked example",
        body: [
          "A dental practice with three locations was losing an estimated fifteen percent of inbound calls to voicemail during peak morning hours, mostly reschedule requests that then required a callback the next day, by which point some patients had booked elsewhere.",
          "A voice agent was deployed to handle booking, rescheduling and basic triage, with a live transfer to reception for anything involving clinical judgement or a complaint. Within the first month, missed-call rate during peak hours dropped to near zero, and reception staff reported the calls they did take were more substantive, because the routine ones were already handled.",
          "The measurable win was not fewer staff hours; it was fewer lost patients due to unanswered calls, which is a revenue outcome rather than a cost-saving one, and it is the outcome that made the business case easy to approve.",
        ],
      },
      {
        heading: "A rollout framework",
        body: [
          "Start with a single call type, not the whole phone line. Booking and rescheduling is the easiest starting point for most businesses because the required data is structured and the downside of a minor error is low.",
          "Run the agent in shadow mode first, listening to real calls and generating a proposed response without the caller hearing it, so you can review accuracy before it ever speaks to a customer. Move to live calls only once shadow accuracy is consistently high across a representative sample.",
          "Expand call types gradually, adding one new scenario every few weeks and reviewing transcripts closely at each stage, rather than launching every use case simultaneously and trying to debug all of them at once.",
        ],
        bullets: [
          "Start with one narrow, structured call type",
          "Run in shadow mode before going live",
          "Expand scenarios one at a time",
          "Review transcripts weekly, not monthly",
        ],
      },
      {
        heading: "Common failure modes",
        body: [
          "The most common failure is launching with too broad a scope, so the agent attempts to handle complaints or complex queries it was never designed for, damaging trust in the first week and making the whole rollout harder to defend internally.",
          "A second failure is ignoring latency in the surrounding systems. A voice agent that responds instantly but then waits four seconds for a booking system to confirm availability still feels slow to the caller, because the caller experiences the whole interaction, not just the model's response time.",
          "A third failure is treating the launch as finished once it goes live. Voice agents need the same ongoing review discipline as any other production system, and the businesses that get the most value are the ones still listening to calls and adjusting six months in.",
        ],
      },
      {
        heading: "What to measure",
        body: [
          "Track call completion rate without human transfer, average handling time, escalation rate, and — critically — caller sentiment on a sample of calls each week, since a technically successful call can still leave a caller frustrated.",
          "Also track missed-call rate before and after deployment as the primary business metric, since for most small and mid-sized businesses the value of voice AI is coverage, not cost reduction.",
        ],
        bullets: [
          "Call completion rate without transfer",
          "Average handling time",
          "Escalation rate to a human",
          "Missed-call rate before versus after",
        ],
      },
      {
        heading: "Frequently asked questions",
        body: [
          "Will customers tolerate speaking to an AI? Most will, provided the disclosure is upfront and the agent is competent at the specific task it was built for. Frustration comes from poor performance, not from the fact that it is an AI.",
          "What happens when the agent does not understand? A well-designed agent recognises low confidence and offers a human transfer rather than guessing or looping the caller through repeated clarifying questions, which is the fastest way to lose trust on a call.",
          "How long does a first deployment take? A narrow, well-scoped use case such as appointment booking typically takes three to six weeks from scoping to live calls, assuming the underlying booking system has a usable interface to connect to.",
        ],
      },
      {
        heading: "The operational payoff",
        body: [
          "The gain is rarely headcount reduction. It is coverage: every call answered on the first ring, at 2am, in a consistent tone, with the data written back to your systems automatically, which is a different kind of value than simply doing the same work with fewer people.",
          "Businesses that treat voice AI as a coverage and consistency tool, rather than a cost-cutting one, tend to get a smoother rollout and a clearer, more defensible business case, because the metric they are chasing — calls answered, not calls avoided — is one customers actually notice.",
        ],
      },
      {
        heading: "What we would do first",
        body: [
          "Pull call logs for the last three months and identify the single most common call type, along with the current missed-call rate during peak hours. That number alone usually makes the business case before any technology decision is made.",
          "Then build a narrow shadow-mode pilot around that one call type, review a week of transcripts by hand, and only go live once accuracy is high enough that you would be comfortable listening to any single call at random.",
        ],
      },
    ],
  },
  {
    slug: "building-ai-products-not-features",
    title: "Building AI Products, Not AI Features",
    description:
      "Why bolting a chatbot onto an existing product rarely works, and what it takes to design software where AI is the core mechanic.",
    category: "Products",
    date: "2026-07-07",
    readMinutes: 12,
    tags: ["Product", "Design", "LLM"],
    lead: "A chat box in the corner is a feature. Software that could not exist without a model is a product.",
    sections: [
      {
        heading: "The bolt-on trap",
        body: [
          "The fastest way to add AI to a product is to add a chat panel. It is also the fastest way to add something nobody uses. Chat pushes the entire burden of knowing what to ask onto the user, which is exactly the burden most software exists to remove in the first place.",
          "Good AI products invert that. They make the decision, show the result, and let the user correct it. The model does the work of framing the problem and proposing an answer, rather than waiting passively for the user to type a well-formed question into an empty box.",
          "Chat panels also tend to be measured by novelty rather than usage. Teams see a spike of curious clicks in the first week, mistake it for engagement, and are surprised months later when usage has collapsed to near zero because the panel never became part of anyone's actual workflow.",
        ],
      },
      {
        heading: "Start from the unavoidable work",
        body: [
          "Find the step in your product where users grind: writing the first draft, categorising the backlog, reading through the export, comparing the options. That is where a model creates felt value, because it is removing effort the user was already forced to spend, not offering effort they never wanted to spend in the first place.",
          "If removing the AI would barely change the workflow, it was a feature. If removing it breaks the product, you built the right thing. This test is uncomfortable to apply honestly, because it often reveals that a recently shipped AI feature is decorative rather than load-bearing.",
          "A useful exercise is to watch five real users complete the task the AI is meant to help with, without mentioning the AI feature exists. The moments where they visibly slow down, re-read something twice, or open a second tab to check something are the moments worth building for.",
        ],
      },
      {
        heading: "Design for correction, not perfection",
        body: [
          "Models are wrong sometimes. Products that assume otherwise feel fragile. Products that make correction effortless feel intelligent, because the user's overall impression is shaped far more by how gracefully an error is handled than by how rarely errors occur.",
          "Correction needs to be cheaper than starting over, or users will quietly abandon the AI output and do the task manually, which erases the value of having built it at all. If editing an AI-generated draft takes as long as writing one from scratch, most users will choose the blank page every time.",
        ],
        bullets: [
          "Show the reasoning or the source",
          "Make editing the output a single click, not a re-prompt",
          "Remember corrections and apply them next time",
        ],
      },
      {
        heading: "Latency is a design constraint",
        body: [
          "Perceived speed shapes trust more than raw quality. Stream partial output, show progressive stages, and never present a blank screen while a model thinks. A user watching text appear feels informed; a user watching a spinner feels ignored, even if the total wait time is identical.",
          "Break long-running tasks into visible stages — reading the document, extracting the key points, drafting the summary — rather than a single opaque loading state. Naming the stage tells the user the system is doing something specific, which reduces the anxiety that drives people to refresh or abandon the page.",
        ],
      },
      {
        heading: "Evaluate before you ship",
        body: [
          "Build a small evaluation set of real inputs and expected behaviour before launch. Without it, every prompt change is a guess and every regression is discovered by a customer, usually the customer least willing to forgive it.",
          "The evaluation set does not need to be large to be useful. Twenty to thirty representative cases, covering the common path and the two or three trickiest edge cases you can think of, is enough to catch the majority of regressions before they reach production.",
        ],
      },
      {
        heading: "A worked example: two products, one problem",
        body: [
          "Consider two note-taking apps that both add AI. Product A adds a chat box where users can ask questions about their notes. Usage is low because most users cannot articulate what they want to ask; they just want their messy notes turned into something usable.",
          "Product B instead automatically summarises each note into key points and action items the moment it is saved, with a single click to accept or edit the summary inline. Usage is high because the value appears without the user having to request it, and correcting it costs almost nothing.",
          "The underlying model in both products could be identical. The difference is entirely in where the AI sits in the workflow: waiting to be asked, versus proactively doing the unavoidable work and inviting correction. That placement decision is usually worth more than any amount of prompt tuning.",
        ],
      },
      {
        heading: "A framework for deciding where AI belongs",
        body: [
          "Map your product's core workflow step by step, and for each step ask three questions: is this step effortful for the user today, is the output verifiable at a glance, and would a wrong answer here be cheap or expensive to notice and fix.",
          "Steps that are effortful, quickly verifiable, and cheap to correct are the best candidates for AI to take over directly. Steps that are effortful but expensive to get wrong are better served by AI assisting a human decision rather than making it outright. Steps that are not effortful at all should probably be left alone.",
        ],
        bullets: [
          "Is this step effortful for the user today?",
          "Is the output verifiable at a glance?",
          "Is a wrong answer here cheap or expensive to fix?",
          "Would removing the AI break the product or just decorate it?",
        ],
      },
      {
        heading: "Common failure modes",
        body: [
          "The most common failure is shipping an AI feature because a competitor announced one, without first identifying the unavoidable work in your own product. This produces a feature that looks similar on a landing page but is barely touched inside the product itself.",
          "A second failure is over-trusting model output in the interface, presenting a generated answer as fact rather than as a draft. This works fine until the first visibly wrong answer, at which point user trust in every subsequent output — even the correct ones — drops sharply and is slow to recover.",
          "A third failure is optimising the underlying model long after the interaction design was wrong from the start. Teams spend weeks tuning prompts to fix a low adoption problem that was actually caused by placing the feature somewhere users never look.",
        ],
      },
      {
        heading: "What to measure",
        body: [
          "Track adoption of the specific AI-powered step, not overall product usage, since a healthy product can mask a barely-used feature. Also track the edit rate on AI output: how often users accept as-is versus modify versus discard entirely.",
          "A high edit rate is not automatically bad — it can mean users are engaged and personalising the output — but a high discard rate is a clear signal that the output is missing the mark and needs attention before you invest further in the surrounding interface.",
        ],
        bullets: [
          "Adoption rate of the specific AI step",
          "Accept, edit and discard rates on AI output",
          "Time to complete the task with AI versus without",
          "Retention of users who engage with the AI feature",
        ],
      },
      {
        heading: "Frequently asked questions",
        body: [
          "Should every product have an AI feature? No. If there is no unavoidable, effortful step in your workflow that a model can meaningfully shorten, adding AI is more likely to add cost and confusion than value.",
          "Is chat ever the right interface? Yes, for genuinely open-ended exploration tasks where the user's need cannot be predicted in advance, such as research or analysis tools. It is the wrong interface for a workflow that has a predictable, repeatable shape.",
          "How do we know if we built a feature or a product? Remove it for a week in a test environment and watch what breaks. If nothing meaningfully breaks, it was a feature.",
        ],
      },
      {
        heading: "What we would do first",
        body: [
          "Watch five real users complete your product's core task without prompting them to use any AI feature you have already built, and note exactly where they slow down, hesitate, or reach for another tool. That is your unavoidable work, and it is almost always more specific than the initial assumption.",
          "Then design one narrow AI-powered step around that specific moment, with an obvious, cheap correction path, and measure adoption and edit rate before building anything else. One well-placed step beats five decorative ones.",
        ],
      },
    ],
  },
  {
    slug: "llm-evaluation-in-production",
    title: "How to Evaluate LLM Output in Production",
    description:
      "Practical evaluation strategy for AI systems: golden sets, rubric scoring, regression testing and catching silent quality drift.",
    category: "Engineering",
    date: "2026-06-30",
    readMinutes: 13,
    tags: ["Evaluation", "Evoluter", "Quality"],
    lead: "You cannot improve what you do not measure, and AI output degrades silently. Evaluation is the difference between a demo and a system.",
    sections: [
      {
        heading: "Start with a golden set",
        body: [
          "Collect fifty to two hundred real inputs that represent the range of what your system sees, including the awkward ones. For each, record what a good answer looks like — not word for word, but in terms of criteria, since exact-match comparison rarely works for anything a model generates in free text.",
          "This set becomes your regression suite. Every prompt change, model swap, or retrieval tweak runs against it before it reaches users, turning what would otherwise be a subjective judgement call into a repeatable, comparable test run.",
          "Build the golden set from real production inputs wherever possible, not synthetic examples you imagine a user might send. Synthetic examples tend to be cleaner and more polite than reality, which means a system that passes on synthetic data can still fail badly on the messy inputs real users actually produce.",
        ],
      },
      {
        heading: "Score against a rubric, not a vibe",
        body: [
          "Define three to five dimensions that matter for your use case and score each independently. Aggregate scores hide the specific thing that broke, which makes debugging a regression far slower than it needs to be when a single overall number drops without explanation.",
          "Write the rubric down in plain language before you start scoring, with concrete examples of a one, a three and a five for each dimension. Without concrete anchors, two reviewers will score the same output differently, and the whole exercise loses its value as a comparison tool over time.",
        ],
        bullets: [
          "Factual accuracy against the provided source",
          "Instruction adherence and format compliance",
          "Completeness relative to the question",
          "Tone and safety",
        ],
      },
      {
        heading: "Model-as-judge, carefully",
        body: [
          "Using a model to grade output scales well but inherits bias. Calibrate it: have a human grade a sample, compare, and adjust the rubric until agreement is high. Re-calibrate whenever you change the judge model, since a different model can shift what it considers a good answer without any change to your actual system.",
          "A useful discipline is to keep a fixed set of thirty cases with human-agreed scores as a permanent calibration check. Every time the judge model is updated, rerun it against those thirty and confirm it still broadly agrees with the human scores before trusting it on the full golden set again.",
          "Model-as-judge tends to be more reliable on structural criteria — did it follow the format, did it include the required fields — than on subjective criteria like tone or persuasiveness, where human review remains the more trustworthy option even if it does not scale as well.",
        ],
      },
      {
        heading: "Watch production, not just tests",
        body: [
          "Sample real traffic continuously. Track refusal rates, output length distribution, tool-call failures and user corrections. A sudden shift in any of these usually precedes a support ticket by days or weeks, which makes it a genuinely useful early-warning system rather than a retrospective report.",
          "Set alerting thresholds on these metrics the same way you would for uptime or error rate on any other production service. AI systems fail differently to conventional software: they rarely crash outright, they drift, and drift is invisible unless something is actively watching for it.",
        ],
      },
      {
        heading: "Close the loop",
        body: [
          "Every failure found in production should become a new case in the golden set. Over time the suite encodes everything your system has ever gotten wrong, which is exactly the memory a team needs, especially as team members change and institutional knowledge would otherwise be lost.",
          "This is the single habit that separates teams whose AI systems steadily improve from teams whose systems plateau after launch and slowly degrade as the world around them changes. The golden set is a living asset, not a one-off deliverable from the initial build.",
        ],
      },
      {
        heading: "A worked example",
        body: [
          "A customer support summarisation tool began producing summaries that omitted the customer's original request about one time in twenty, a failure invisible to spot checks because the summaries still read fluently and confidently even when incomplete.",
          "Adding a rubric dimension specifically for completeness, scored against the original ticket rather than against general readability, surfaced the pattern within a week of monitoring. The root cause turned out to be a recent change to how long tickets were truncated before being passed to the model, not a problem with the prompt itself.",
          "The fix was cheap once identified, but it would never have been found through general spot-checking, because the summaries looked good in isolation. This is the core argument for structured, dimension-specific evaluation over impressionistic review: it catches the failures that read fine but are quietly wrong.",
        ],
      },
      {
        heading: "A step-by-step evaluation framework",
        body: [
          "Define the rubric dimensions first, grounded in what actually matters to your users rather than generic quality language. Second, build the golden set from real, varied production inputs. Third, establish a human baseline score on a sample. Fourth, calibrate a model judge against that baseline. Fifth, run the full suite on every meaningful change before it ships.",
          "Sixth, and most often skipped, schedule a recurring production sample review — weekly for high-traffic systems, monthly for lower-traffic ones — so that drift is caught by a process rather than by luck or a customer complaint arriving at the right moment.",
        ],
        bullets: [
          "Define rubric dimensions grounded in real user needs",
          "Build a golden set from real production inputs",
          "Establish a human baseline score",
          "Calibrate a model judge against that baseline",
          "Run the suite before every meaningful change",
          "Schedule recurring production sampling",
        ],
      },
      {
        heading: "Common failure modes",
        body: [
          "The most common failure is building an evaluation set once at launch and never updating it, so it stops reflecting how the system is actually used within a few months. An evaluation suite that does not grow with production traffic quietly loses relevance.",
          "A second failure is trusting an uncalibrated model judge, which tends to reward fluent, confident-sounding answers over accurate ones, since that is a well-documented bias in how models assess text. Without human calibration, a judge model can consistently pass exactly the kind of plausible-but-wrong output that matters most to catch.",
          "A third failure is measuring only the model's output quality and ignoring the surrounding system: retrieval failures, tool errors, and truncated inputs often cause more damage than anything the model itself does wrong, and a narrow evaluation focused only on the final text will miss all of it.",
        ],
      },
      {
        heading: "What to measure in production",
        body: [
          "Beyond the rubric scores from periodic sampling, track operational signals continuously: refusal rate, average output length, latency per request, tool-call failure rate, and the rate at which users edit or reject the output where that signal is available.",
          "Segment these metrics by input type where possible. A system that performs well on average can still be quietly failing on a specific category of request, and averages are exactly the kind of number that hides that pattern until it has been happening for months.",
        ],
        bullets: [
          "Refusal rate and output length distribution",
          "Tool-call failure rate",
          "Latency per request",
          "User edit or rejection rate, segmented by input type",
        ],
      },
      {
        heading: "Frequently asked questions",
        body: [
          "How often should the golden set be updated? Add new cases every time a production failure is found, and do a broader review quarterly to check the set still reflects current usage patterns, since usage tends to shift as a product matures.",
          "Do we need a dedicated evaluation tool? Not initially — a spreadsheet and a scheduled script can get a small team most of the way there. A dedicated platform becomes worthwhile once the volume of changes and the number of contributors makes manual tracking unreliable.",
          "Can evaluation be fully automated? Structural and factual checks can be, largely. Tone, nuance and edge-case judgement calls still benefit from periodic human review, even in a mature, well-instrumented system.",
        ],
      },
      {
        heading: "What we would do first",
        body: [
          "Pull thirty to fifty real, recent inputs from production, including a handful you already suspect the system handles poorly, and score them by hand against three simple rubric dimensions before writing any automation at all.",
          "That manual pass alone will usually surface at least one failure mode worth fixing immediately, and it gives you the calibrated human baseline you will need before a model judge or any automated evaluation pipeline can be trusted.",
        ],
      },
    ],
  },
];
