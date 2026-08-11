import type { BlogPost } from "@/lib/blog-types";

export const posts2: BlogPost[] = [
  {
    slug: "rag-that-actually-works",
    title: "Retrieval-Augmented Generation That Actually Works",
    description:
      "A practical playbook for RAG on real business documents: chunking, hybrid search, reranking, grounding, evaluation and the failure modes that break demos in production.",
    category: "Engineering",
    date: "2026-06-23",
    readMinutes: 11,
    tags: ["RAG", "Search", "Knowledge"],
    lead: "Most RAG systems fail at retrieval, not generation. Fix the search and the answers fix themselves.",
    sections: [
      {
        heading: "Why RAG demos and RAG products diverge",
        body: [
          "A RAG demo works because the demo documents are clean, short and picked to prove a point. A RAG product has to survive scanned PDFs, contradictory policy versions, spreadsheets with merged cells and a knowledge base nobody has weeded in three years. The gap between the two is almost never the language model. It is everything upstream of it.",
          "Teams that treat RAG as a generation problem spend weeks tuning prompts and get marginal gains. Teams that treat it as a search problem — get the right four passages in front of the model — see the biggest jump in answer quality from a single afternoon of retrieval work. Diagnose before you tune: pull ten wrong answers and check whether the correct passage was even retrieved.",
          "If the passage was never retrieved, no amount of prompt engineering will fix it. If it was retrieved but ignored, that is a generation or grounding problem. Separating these two failure classes early saves weeks of guessing.",
        ],
      },
      {
        heading: "Chunking is a content decision, not a parameter",
        body: [
          "Fixed-size chunking treats every document as an undifferentiated stream of characters and slices it at arbitrary boundaries, which routinely cuts a clause, a table row, or a definition in half. Structure-aware chunking — by heading, section, clause, or table row — keeps a complete idea inside one chunk and dramatically improves retrieval precision because the embedding represents something coherent.",
          "Chunk size should follow content type, not a single global setting. Policy documents often need paragraph-level chunks with the surrounding heading attached for context. Tabular data needs row-level chunks with column headers repeated in every row, otherwise a retrieved row is meaningless on its own. FAQ content is often best left as one chunk per question-answer pair.",
          "Attach metadata to every chunk at ingestion time: source document, section title, last-updated date, owner and access level. Half of retrieval quality in a business setting comes from filtering before you ever compute a similarity score — a query about current pricing should never even see a chunk from a superseded document.",
        ],
      },
      {
        heading: "Hybrid search beats pure vectors on real business content",
        body: [
          "Embeddings are excellent at capturing meaning and paraphrase but consistently weak on exact tokens: product codes, invoice numbers, error codes, proper names, acronyms. A pure vector search for 'error E204' can return semantically similar but factually wrong passages because the embedding barely distinguishes E204 from E240.",
          "Combine a keyword search (BM25 or similar) with vector search and merge the two result sets, either through reciprocal rank fusion or a weighted blend. The gain from adding keyword search is usually immediate and visible on the first test run against real business documents, well before any other tuning.",
          "Tune the blend per corpus. A support knowledge base full of codes and SKUs leans more on keyword matching. A narrative policy document leans more on semantic similarity. There is no single ratio that is correct everywhere, so test both weightings against your golden set rather than copying a default.",
        ],
      },
      {
        heading: "Rerank before you generate",
        body: [
          "Retrieve broadly — twenty or thirty candidates — then rerank the top candidates with a cross-encoder or a smaller, cheaper model before passing anything to the generator. First-stage retrieval optimises for recall; reranking optimises for precision on the exact query, and the two need to be separate stages.",
          "Feeding twenty mediocre chunks to a model produces worse answers than feeding four excellent ones, because the model has to guess which of the twenty is authoritative and often blends details from several. Reranking is one of the highest-leverage, lowest-cost additions to an existing RAG pipeline: it typically adds under 200ms and meaningfully improves answer accuracy.",
          "Cap the number of chunks that reach the prompt. More context is not free — it increases cost, increases latency, and increases the chance the model latches onto an irrelevant passage. Four to six well-ranked chunks outperform fifteen loosely ranked ones in almost every business RAG system we have measured.",
        ],
      },
      {
        heading: "Force grounding and verify it",
        body: [
          "Instruct the model explicitly to answer only from the supplied context and to say clearly when the context is insufficient, rather than filling gaps from its training data. This single instruction removes a large share of confident-sounding hallucinations, but it is not sufficient on its own — models still occasionally ignore it under ambiguous prompts.",
          "Verify grounding mechanically after generation: check that any cited passage actually exists in the retrieved set and that quoted figures match the source text exactly. This is a cheap string-matching step, not a model call, and it catches the cases where the instruction was ignored.",
          "Log every question the system could not answer from the corpus. These are not failures to hide; they are a live list of content gaps. Feeding this list back to whoever owns the knowledge base is often more valuable to the business than any model upgrade.",
        ],
        bullets: [
          "Require a citation or source reference for every factual claim",
          "Reject or flag answers with no supporting retrieved chunk",
          "Log unanswered and low-confidence questions as content gaps",
          "Spot-check that quoted numbers match the source text exactly",
        ],
      },
      {
        heading: "Treat the corpus as a product, not an archive",
        body: [
          "Stale, duplicated and contradictory documents cause more hallucination in production than any weakness in the model. If three versions of the same policy exist in the index, the retriever cannot know which one is current, and the model will confidently pick one and quote it. Retrieval quality is content quality with extra steps.",
          "Assign an owner for the corpus itself, separate from the engineering owner of the pipeline. Their job is deduplication, archiving superseded versions, and tagging documents with effective dates. Without this role, corpus rot is guaranteed within a few months of launch, no matter how good the pipeline is.",
          "Build a lightweight review cadence: monthly for fast-changing content like pricing or policy, quarterly for stable reference material. A RAG system's accuracy trends downward over time by default unless someone is actively maintaining the source documents it draws from.",
        ],
      },
      {
        heading: "A worked example: an internal policy assistant",
        body: [
          "A mid-sized operations team wanted staff to ask natural-language questions about HR and expense policy instead of searching a 40-page PDF. The first version used fixed 500-token chunks and pure vector search. It answered general questions reasonably but consistently got specific figures wrong — mixing up mileage rates from two different years of the same policy.",
          "The fix was threefold: chunk by section with the section heading and effective date carried into every chunk; add keyword search for numeric terms like rates and thresholds; and archive the previous year's policy PDF out of the live index rather than leaving both versions searchable. Answer accuracy on the golden set moved from roughly 60% to over 90% without changing the underlying model.",
          "The lesson generalises: the model was never the constraint. The index was serving it contradictory, badly segmented evidence and expecting good judgement to compensate. Good judgement cannot fix bad evidence reliably, and it is a mistake to expect it to.",
        ],
      },
      {
        heading: "Common failure modes and how to catch them",
        body: [
          "Silent retrieval failure: the system returns a fluent, confident answer built on the wrong chunk, and nobody notices because the output reads well. This is the most dangerous failure mode because it produces no error to alert on. Catch it with periodic manual review of a sample of live answers against source documents.",
          "Context dilution: too many chunks passed to the model cause it to blend details from several sources into one answer that is subtly wrong. The fix is tighter reranking and a lower chunk count, not a bigger model.",
          "Metadata blindness: a query correctly retrieves the right topic but the wrong scope — a UK policy answer served for a US-based question, for example — because filters were not applied before the similarity search. Always filter on hard metadata first, then rank semantically within the filtered set.",
        ],
        bullets: [
          "Silent wrong-source answers that read fluently",
          "Context dilution from too many retrieved chunks",
          "Metadata and scope blindness across regions, teams or versions",
          "Stale documents left in the index after policy changes",
        ],
      },
      {
        heading: "Metrics that tell you whether RAG is actually working",
        body: [
          "Retrieval recall@k: for a golden set of questions with known correct source passages, what fraction of the time is the correct passage in the top k retrieved results. This is the single most diagnostic number in the whole system, because everything downstream depends on it.",
          "Groundedness rate: the percentage of production answers where every factual claim maps to a retrieved chunk. Track this weekly on a sampled basis, not just at launch, since it drifts as the corpus and query patterns change.",
          "Unanswered-question rate and its trend line matter as much as accuracy — a rising rate usually signals a content gap opening up faster than the corpus is being maintained. Pair it with average chunks-per-answer and latency to catch context dilution before users complain.",
        ],
      },
      {
        heading: "FAQ: the questions teams actually ask",
        body: [
          "Do we need a vector database, or will keyword search alone do? For most business document sets, hybrid beats either alone; pure keyword search misses paraphrased questions, and pure vector search misses exact codes and names.",
          "How big should the golden set be before launch? Fifty to one hundred real questions with known correct sources is enough to catch the majority of retrieval problems before they reach users, and it should grow every time a production failure is found.",
          "Can we skip reranking to save cost? You can, but expect a measurable drop in precision on any corpus larger than a few hundred documents. Reranking is usually the best cost-to-benefit addition in the whole pipeline.",
        ],
      },
      {
        heading: "Where to start",
        body: [
          "Do not start by picking a vector database or a chunking library. Start by writing thirty real questions your users actually ask, along with the exact passage that should answer each one. This golden set is the tool you will use to judge every other decision.",
          "Build the simplest pipeline that could work — one chunking strategy, one retriever — and run it against the golden set before adding hybrid search or reranking. Fix whichever failure class dominates first: missing retrieval, or bad generation from correctly retrieved context.",
          "Add hybrid search and reranking once basic retrieval is proven, then put a corpus owner in place before launch, not after the first complaint about a wrong answer. RAG is a maintenance discipline as much as it is an engineering pattern.",
        ],
      },
    ],
  },
  {
    slug: "ai-adoption-roadmap-90-days",
    title: "A 90-Day AI Adoption Roadmap for Growing Companies",
    description:
      "A detailed quarter-long plan — with weekly checkpoints, metrics and failure modes — for moving from AI curiosity to a deployed, measured system without stalling in pilot purgatory.",
    category: "AI Strategy",
    date: "2026-06-16",
    readMinutes: 9,
    tags: ["Strategy", "Adoption", "Change"],
    lead: "Most companies do not fail at AI because of technology. They fail because the pilot never gets a deadline.",
    sections: [
      {
        heading: "Why 90 days, and not a proof of concept",
        body: [
          "A proof of concept has no deadline pressure and no owner accountable for a result, so it tends to run for months and end in a slide deck rather than a system. A 90-day roadmap forces the opposite: a fixed window, a single named process, and a working piece of software at the end of it that someone actually depends on.",
          "The number matters less than the discipline it implies. Ninety days is long enough to build something real and short enough that leadership attention does not wander before there is a result to show. Shorter windows tend to produce toy demos; longer ones tend to drift.",
          "The goal at day 90 is not a finished AI strategy. It is one deployed system with real usage data, and a repeatable process for choosing the next one. Everything in the roadmap below is designed to protect that single outcome.",
        ],
      },
      {
        heading: "Days 1–15: map the work, not the ambition",
        body: [
          "Interview the people doing the repetitive work directly, not the leadership describing it secondhand. Frontline staff know the shortcuts, the spreadsheet nobody mentions in planning meetings, and the step that actually eats the most time — details that never survive a management summary.",
          "Document each candidate process as it actually runs today, step by step, including exceptions. A process description that only covers the happy path will produce a system that fails on the first edge case a real user hits.",
          "Score every candidate on three factors: frequency (how often it happens), clarity (can you describe correct output in one paragraph), and data availability (does the required information already exist somewhere accessible). Pick the single highest-scoring candidate and set it aside — resist the temptation to start two in parallel.",
        ],
        bullets: [
          "Interview five to ten people who do the work daily",
          "Write the process down including exceptions and workarounds",
          "Score by frequency, clarity and data availability",
          "Commit to exactly one process for this quarter",
        ],
      },
      {
        heading: "Days 16–45: build one thing end to end",
        body: [
          "Ship a complete, narrow system rather than a broad prototype. End to end means it reads from the real data source, performs the real task, and writes to the real destination — not a spreadsheet export that someone manually re-uploads. Anything short of that is a demo, and demos do not generate the operational learning you need.",
          "Resist scope expansion during this window. Every new stakeholder who hears about the project will suggest a related use case worth adding. Write those down for later and keep building the one thing that was scoped in days 1–15.",
          "Get one real user depending on the output by week five, even if only for a subset of cases. Nothing exposes a flawed assumption faster than a person who needs the answer to be right, today, for their actual job.",
        ],
      },
      {
        heading: "Days 46–70: measure and correct in public",
        body: [
          "Instrument everything from day one of live use: volume processed, error rate, escalation rate to a human, time saved per run, and cost per run. Without these numbers, every subsequent decision about the system is a guess dressed up as judgement.",
          "Run a weekly thirty-minute review with the people actually using the system, not just the engineering team. Ask one question: what was the worst thing it did this week? Fix that specific thing before the next review rather than attempting a broad rewrite.",
          "Expect the error rate to fall in a step pattern rather than smoothly — most improvement comes from three or four targeted fixes to specific, recurring failure patterns, not from general tuning. Track which fixes moved the needle so the pattern is repeatable on the next process.",
        ],
      },
      {
        heading: "Days 71–90: institutionalise before you expand",
        body: [
          "Write down what actually worked: the prompts or logic that survived, the guardrails that caught real problems, the review cadence, and who owns what. This document is what makes the next 90 days faster than this one — treat it as a reusable playbook, not paperwork.",
          "Assign a single named owner for the live system going forward, separate from the project team that built it. Systems without a named owner degrade quietly because nobody notices when upstream data changes break something.",
          "Only now choose the next one or two processes, using the same scoring method from days 1–15. The second and third systems are typically far cheaper to build because the infrastructure, review process and organisational trust are already in place.",
        ],
        bullets: [
          "One named owner per live AI system, not a team",
          "A weekly quality review lasting no more than thirty minutes",
          "A documented escalation path to a human for edge cases",
          "A one-page playbook of what worked, written down before moving on",
        ],
      },
      {
        heading: "A worked example: invoice processing at a distribution company",
        body: [
          "A 60-person distribution business chose invoice data extraction as its first process: high frequency, clear correct output, and the source documents already existed as email attachments. In the first three weeks, the team built extraction and validation against the existing accounting system, deliberately leaving exception handling manual.",
          "By week six, roughly 70% of invoices processed without any human touch, and the remaining 30% were flagged clearly with the reason for the flag rather than a generic error. That transparency was what got the finance team to trust the system enough to rely on it daily.",
          "By day 90, the automation rate had reached 85% through three specific fixes: handling a second invoice template a major supplier used, correcting a date-format mismatch, and adding a duplicate-detection check. None of these were visible in the original process map — they only surfaced from live volume.",
        ],
      },
      {
        heading: "The failure mode to avoid: pilot purgatory",
        body: [
          "Pilot purgatory is when a system technically works in a controlled test but never gets a deadline to go live, a named owner, or real users depending on it. It is comfortable because nobody has to defend a failure, and it is expensive because the organisation spends real money proving something works without ever capturing the value.",
          "The clearest early symptom is a project that has been 'almost ready' for more than four weeks without a specific blocking issue named. If nobody can say precisely what is broken, the project has usually run out of decisions and just needs to launch to a small real audience.",
          "The fix is structural, not motivational: set the go-live date before the project starts, attach it to a specific process and a specific first user, and treat the 90-day window as fixed rather than a target to slip.",
        ],
      },
      {
        heading: "Metrics to track across the quarter",
        body: [
          "Weekly: volume processed, error rate, escalation rate, and the single worst failure identified in review. These four numbers should appear in the same short update every week so trends are visible at a glance rather than buried in narrative.",
          "By day 90: automation rate (the share of volume handled without human correction), time saved per week in hours, and cost per run including model usage and monitoring. These three roll up into the return-on-investment conversation with leadership.",
          "Track one leading indicator too: how quickly the weekly review identifies and closes the top complaint. A team that fixes its worst issue within the same week is building a system that improves faster than it degrades.",
        ],
      },
      {
        heading: "FAQ: common objections to the 90-day plan",
        body: [
          "What if the first process turns out to be the wrong choice? That is a valid outcome and cheaper to discover in week three than after months of planning. The scoring method in days 1–15 reduces this risk but does not eliminate it, and a fast, narrow build makes course correction inexpensive.",
          "Should leadership see weekly updates? Yes, but keep them to the same four metrics every week rather than a narrative report. Consistency in reporting format is what lets people trust the trend rather than the story.",
          "What if the process needs a system integration that takes longer than 45 days? Scope the first version to a narrower slice of the process that avoids the slow integration, and add the integration in the next 90-day cycle rather than delaying the whole launch.",
        ],
      },
      {
        heading: "Where to start",
        body: [
          "Pick a date exactly 90 days from now and put it in the diaries of the people who need to be involved before you do anything else. A roadmap without a fixed end date is a wish list, not a plan.",
          "Spend the first week talking to the people doing the actual work, not designing an architecture. The process you choose matters more than any technical decision you will make in the following weeks.",
          "Commit, in writing, to shipping something narrow and real by day 45 rather than something broad and impressive by day 90. Narrow and live beats broad and theoretical every time we have run this.",
        ],
      },
    ],
  },
  {
    slug: "prompt-engineering-for-teams",
    title: "Prompt Engineering for Teams, Not Individuals",
    description:
      "How to treat prompts as shared engineering assets — version control, testing, review and ownership — instead of personal tricks scattered across notes apps and Slack threads.",
    category: "Engineering",
    date: "2026-06-09",
    readMinutes: 10,
    tags: ["Prompts", "Process", "LLM"],
    lead: "A clever prompt in someone's notes app is technical debt. Prompts belong in version control with everything else.",
    sections: [
      {
        heading: "The individual-prompt problem",
        body: [
          "In most teams, the best prompt for a given task lives in one person's notes app, refined over weeks of trial and error, and known to nobody else. When that person is on leave, changes role, or leaves the company, the quality of the AI feature quietly drops and nobody can explain why.",
          "This is not a people problem, it is a process gap. Code goes through version control, review and testing as a matter of course. Prompts, which are just as load-bearing for product behaviour, are frequently treated as informal text that anyone can edit in a config field without review.",
          "The fix is straightforward in principle and requires discipline in practice: prompts are engineering assets. They get a file, a version history, an owner, and a test suite, the same as any other piece of logic that customers depend on.",
        ],
      },
      {
        heading: "Put prompts in version control, literally",
        body: [
          "Store prompts as files in the same repository as the code that calls them, not as strings embedded inline in application code or, worse, in a database field editable from an admin panel with no history. A file in version control gives you diffs, blame, and a rollback path for free.",
          "Every prompt change should go through the same pull request process as a code change: a description of what changed and why, a reviewer, and a link to test results. This single habit catches a surprising number of regressions before they reach production, because a second person reads the change with fresh eyes.",
          "Tag prompt versions to the release they shipped with, so that when someone reports a change in behaviour, you can identify exactly which prompt version was live at the time. Without this, debugging a behaviour regression turns into guesswork about what might have changed.",
        ],
      },
      {
        heading: "Build a shared test suite before you need one",
        body: [
          "A prompt test suite is a set of representative inputs with expected properties of a good output, run automatically whenever the prompt changes. It does not need to check for an exact string match — it checks for the presence of required elements, absence of forbidden ones, and rough adherence to format.",
          "Include the awkward cases deliberately: ambiguous requests, edge-case inputs, and the specific inputs that caused past failures. A test suite that only contains easy examples will pass every time and catch nothing, which is worse than no suite at all because it creates false confidence.",
          "Run the suite automatically on every proposed prompt change and require it to pass, or require an explicit, reviewed reason for any regression that is accepted anyway. This turns prompt tuning from an act of faith into an act of evidence.",
        ],
        bullets: [
          "Ten to thirty representative inputs including known hard cases",
          "Automatic scoring against defined criteria, not exact match",
          "Required to run and pass before a prompt change merges",
          "Updated with every production failure found after launch",
        ],
      },
      {
        heading: "Structure prompts so teams can actually collaborate",
        body: [
          "Separate a prompt into distinct, labelled sections — role and context, task instructions, output format, and examples — rather than one long paragraph. This structure makes it obvious which part to edit for a given change and reduces the chance that fixing one issue accidentally breaks an unrelated instruction elsewhere in the text.",
          "Use consistent formatting conventions across every prompt in the codebase: the same way of marking instructions versus examples, the same placeholder syntax for variables. Consistency lets any engineer read any prompt in the system without relearning a personal style each time.",
          "Keep prompts as short as they can be while still reliable. Long prompts accumulate defensive instructions added one at a time to patch specific past failures, and eventually contradict each other. Periodically rewrite rather than only ever append.",
        ],
      },
      {
        heading: "Assign ownership the way you would for a service",
        body: [
          "Every prompt that ships to production should have a named owner responsible for its quality, the same as a named owner for a backend service. Ownership without a name defaults to nobody's job, and quality drifts silently until a customer notices.",
          "The owner's job includes reviewing prompt change proposals, watching the production metrics for that prompt, and updating the test suite when new failure patterns emerge. This is a real, ongoing responsibility, not a one-off task completed at launch.",
          "Rotate ownership deliberately when someone changes teams, and hand over the test suite and recent failure log as part of that transition — not just the prompt file itself. Context about why a prompt looks the way it does is as valuable as the prompt.",
        ],
      },
      {
        heading: "A worked example: a support-ticket triage prompt",
        body: [
          "A customer support team had three different versions of a ticket-categorisation prompt in use across three regional teams, each tweaked independently over a year with no communication between them. Categorisation accuracy varied by region by more than fifteen percentage points, and nobody could explain why until the prompts were compared side by side.",
          "Consolidating into one version-controlled prompt, with a shared test suite covering the hardest tickets from all three regions, took about two weeks. It also surfaced a genuine disagreement between regions about how a specific ticket type should be categorised, which had been silently encoded as three different, undocumented answers.",
          "The result was a single prompt with documented reasoning for the categorisation rules, a test suite that would catch regressions across all three regions, and one named owner. Accuracy became consistent across regions within a month, and prompt changes since then have gone through review rather than being made silently by whoever noticed a problem.",
        ],
      },
      {
        heading: "Failure modes specific to team prompt management",
        body: [
          "Silent drift: someone edits a live prompt directly in a config panel to fix an urgent issue, without going through review or updating the test suite, and the fix is lost the next time the file is redeployed from version control. Prevent this by making the config panel read-only or by removing it entirely in favour of the versioned file.",
          "Prompt sprawl: near-duplicate prompts accumulate for slightly different use cases because nobody wants to touch the shared version and risk breaking something else. Periodically audit for duplicates and consolidate, using the test suite to confirm the merged version covers all the original cases.",
          "Untested confidence: a prompt change looks obviously correct on a couple of manual tries and ships without running the full suite. The manual tries are almost always the easy cases; the suite exists specifically to catch what a quick manual check misses.",
        ],
        bullets: [
          "Silent drift from direct edits outside version control",
          "Prompt sprawl from unmerged near-duplicate variants",
          "Untested confidence from skipping the suite on 'obvious' changes",
          "Ownership gaps after a team member moves on",
        ],
      },
      {
        heading: "Metrics to track for prompt quality over time",
        body: [
          "Test suite pass rate over time, tracked per prompt, flags gradual drift as underlying models or upstream data change even when nobody has edited the prompt itself. A previously passing suite that starts failing without a prompt change usually means the model provider updated something.",
          "Time from failure report to test-suite addition measures whether the feedback loop is actually closing. If failures are reported but never turned into test cases, the suite stops improving and stays permanently behind production reality.",
          "Number of prompt changes per month per owner is a useful proxy for whether ownership is active or nominal. A prompt with zero changes in six months despite known issues in the backlog usually signals an ownership gap rather than a stable, finished prompt.",
        ],
      },
      {
        heading: "FAQ: getting started with prompt engineering as a team practice",
        body: [
          "Do we need special tooling to version-control prompts? No — a plain text or YAML file in your existing repository is sufficient to start. Dedicated prompt-management tools help at scale but are not a prerequisite for getting the basics right.",
          "How do we test something as subjective as tone or helpfulness? Use a rubric with a small number of concrete criteria and either human review or a calibrated model-as-judge for scoring, rather than trying to match an exact expected string.",
          "What if two teams genuinely need different behaviour from a similar prompt? That is a legitimate reason for two prompts, but document the difference explicitly so it is a deliberate decision rather than an accident of independent editing.",
        ],
      },
      {
        heading: "Where to start",
        body: [
          "Find every prompt currently living outside version control — in notes apps, admin panels, or scattered code comments — and move them into a single, reviewed location this week. This alone usually surfaces duplicate or contradictory versions nobody knew existed.",
          "Write ten test cases for your single most important prompt, including the two or three inputs that have caused real problems before. This is a half-day task that pays back the first time someone proposes a change.",
          "Name an owner for each production prompt before the end of the month. Ownership is the cheapest, highest-leverage change on this list, and it is the one most teams skip.",
        ],
      },
    ],
  },
  {
    slug: "ai-in-education-personalised-learning",
    title: "AI in Education: Beyond the Homework Panic",
    description:
      "A grounded look at how AI is actually reshaping teaching and learning — personalised pacing, formative feedback, academic integrity, and what schools should build or buy first.",
    category: "Products",
    date: "2026-06-02",
    readMinutes: 12,
    tags: ["Education", "Extutor", "Learning"],
    lead: "The interesting question is not whether students use AI. It is whether teaching adapts to what AI makes cheap.",
    sections: [
      {
        heading: "The wrong debate and the right one",
        body: [
          "Most public discussion about AI in education is stuck on whether students will use it to cheat on homework. That debate is largely settled — they will, the same way calculators and search engines were used before — and it is the less interesting question. Homework as a take-home writing exercise was already a weak way to verify understanding before AI made it weaker.",
          "The more useful question is what teaching should look like once producing a competent first draft, a summary, or a set of practice questions is nearly free. That shift changes which skills are actually worth spending class time on, and it changes what a teacher's time is best spent doing.",
          "Schools that treat AI purely as a threat to police tend to end up with detection tools and stricter rules, and little else. Schools that treat it as a shift in what is cheap to produce end up rethinking assessment design, which is a harder but more durable response.",
        ],
      },
      {
        heading: "Where personalisation genuinely helps",
        body: [
          "Personalised pacing is the clearest, most defensible use of AI in education: identifying that a specific student has not grasped a specific prerequisite concept, and adjusting the next set of practice problems accordingly, rather than moving the whole class forward on a fixed schedule regardless of individual gaps.",
          "This works well because it is a narrow, well-defined task with a clear correct answer — did the student demonstrate the prerequisite skill or not — rather than an open-ended judgement call. Systems that stick to this narrow, verifiable scope tend to be reliable. Systems that try to fully replace a teacher's broader judgement tend to disappoint.",
          "The gain compounds over a term. A student who gets targeted practice on their specific weak point each week, rather than generic revision, closes gaps faster than one working through a one-size-fits-all workbook. The effect is largest for students furthest from the class average in either direction.",
        ],
      },
      {
        heading: "Formative feedback, not just marking",
        body: [
          "The highest-value use of AI in a classroom is rarely final grading — that still benefits from a human's judgement and accountability. It is fast, specific formative feedback on drafts: pointing out a weak argument structure or an unsupported claim before the final submission, so the student can act on it while it still matters.",
          "This matters because feedback speed strongly affects whether students act on it. Feedback returned a week after submission, once attention has moved on, is far less useful than feedback available within minutes on a first draft. AI-assisted feedback loops can close that gap without adding hours to a teacher's marking load.",
          "The design detail that makes this work is specificity: 'improve your introduction' is nearly useless, while 'your introduction states a claim in the second sentence but does not preview your three supporting points' is actionable. Systems worth adopting are judged on the second kind of feedback, not the first.",
        ],
      },
      {
        heading: "What breaks: over-reliance and shallow verification",
        body: [
          "The clearest failure mode is students using AI to produce a plausible-looking answer without ever engaging with the underlying material, especially when assessment only checks the final output and not the process. If the only artefact evaluated is a finished essay, a fully AI-produced one is often indistinguishable from a mediocre human one.",
          "The second failure mode is teachers over-trusting an AI tool's assessment of student understanding without spot-checking it, particularly for automated feedback on open-ended writing where the tool's judgement is imperfect. A tool that is right 85% of the time can still systematically miss a specific kind of misunderstanding, which is a costly blind spot if uncaught.",
          "Both failures share a root cause: treating the AI's output as a final answer instead of an input to a human decision. The durable fix is process-based assessment — checking drafts, requiring a short oral explanation of the work, or including in-class components that cannot be outsourced — rather than relying on detection tools to catch AI-produced work after the fact.",
        ],
      },
      {
        heading: "Redesigning assessment around what AI makes cheap",
        body: [
          "If AI makes producing a competent first draft nearly free, the assessment should shift toward what it cannot cheaply produce: a live defence of the reasoning, an in-class problem that requires reasoning under time pressure, or a portfolio that shows the evolution of the work across drafts rather than only the final version.",
          "This is more work to design than a single take-home essay prompt, and it is more expensive to run at scale. It is also considerably harder to shortcut, and it tends to more accurately reflect whether a student actually understands the material, which was the point of the assessment in the first place.",
          "A practical middle path many schools are adopting: keep some fully AI-open assignments explicitly framed as AI-collaboration exercises, graded on how well the student directs and critiques the AI's output, alongside separate, closed-book or in-class assessments that measure unaided understanding. Being explicit about which is which avoids the ambiguity that drives most disputes.",
        ],
      },
      {
        heading: "A framework for choosing what to build or buy",
        body: [
          "Start by separating three distinct jobs that get lumped together under 'AI in education': content generation (practice questions, summaries), feedback and tutoring (responding to a specific student's work), and administrative automation (scheduling, reporting, grading logistics). Each has different accuracy requirements and different consequences for getting it wrong.",
          "Administrative automation has the lowest risk from AI error and is usually the easiest, fastest win — automating report drafting or timetable adjustments rarely affects a student's learning directly. Feedback and tutoring have the highest stakes because a wrong or misleading response can actively mislead a student, so these need the tightest evaluation and human oversight before wide rollout.",
          "Buy for well-solved, low-differentiation problems like general content generation where established tools already perform well. Build or customise for anything tied closely to your specific curriculum, assessment rubric, or student population, where an off-the-shelf tool's generic behaviour will not match your actual standards.",
        ],
        bullets: [
          "Content generation: lower stakes, buy an established tool",
          "Feedback and tutoring: high stakes, needs evaluation and oversight",
          "Administrative automation: lowest risk, often the fastest win",
          "Curriculum-specific needs usually justify custom build",
        ],
      },
      {
        heading: "A worked example: a maths practice platform",
        body: [
          "A secondary school piloted an AI-assisted maths practice tool that generated additional problems targeted at each student's specific error pattern, identified from their recent homework mistakes rather than a generic topic list. The first version generated problems that were technically on-topic but sometimes trivially easy or, occasionally, testing a different skill than intended.",
          "The fix was narrowing scope: instead of asking the model to freely generate new problems, the team built a bank of pre-validated problem templates tagged by specific sub-skill, and used the model only to select the right template and vary the numbers, with a human-reviewed answer key. This traded some novelty for reliability, which was the right trade for a tool used unsupervised by students at home.",
          "Over a term, students using the targeted practice closed specific skill gaps measurably faster than a comparison group using generic revision worksheets, and teachers reported the weekly gap report — which sub-skills were most commonly missed across the class — as more useful for planning than the personalised practice itself.",
        ],
      },
      {
        heading: "Metrics that matter for an education AI tool",
        body: [
          "Time-to-actionable-feedback: how long after a student submits work before they receive feedback specific enough to act on. This is the metric most directly tied to whether the tool changes behaviour, as opposed to simply automating something that was happening anyway.",
          "Skill-gap closure rate over a term, measured against pre-tool baselines for comparable cohorts, is a slower but more meaningful metric than engagement or usage statistics. A highly used tool that does not close gaps faster than the status quo has not proven its value yet.",
          "Teacher time reallocated, not just time saved: track whether time freed from marking or admin is actually spent on higher-value activity like one-to-one support, or simply absorbed elsewhere. This distinction determines whether the tool delivers real educational value or just operational relief.",
        ],
      },
      {
        heading: "FAQ: questions schools ask before adopting",
        body: [
          "Will this replace teachers? No credible deployment we have seen aims to, and the tools that try to fully automate teaching judgement tend to underperform ones that support a teacher's existing judgement with better information, faster.",
          "How do we handle academic integrity concerns without a full ban? Redesign assessment to include process checks and in-class components, and be explicit with students about which assignments are open to AI assistance and which are not, rather than relying solely on detection software.",
          "What is the biggest first mistake schools make? Buying a broad, all-purpose AI platform before identifying the one specific problem — a marking bottleneck, a persistent skill gap, an admin burden — it needs to solve. General-purpose tools rarely fit a specific curriculum well without customisation.",
        ],
      },
      {
        heading: "Where to start",
        body: [
          "Pick one narrow, well-defined problem — feedback turnaround time on a specific assignment type, or targeted practice for one persistent skill gap — rather than a general AI adoption initiative. Narrow scope makes evaluation possible and failure cheap to correct.",
          "Redesign one assessment this term to include a process check — a draft review, a short oral explanation, an in-class component — before investing heavily in AI tooling. This addresses the integrity question directly and pays off regardless of which tools you eventually adopt.",
          "Run any new tool with a small group of students and teachers for a full term before wider rollout, and measure skill-gap closure, not just usage. Adoption numbers look good quickly; educational impact takes a term to show up honestly.",
        ],
      },
    ],
  },
  {
    slug: "custom-software-vs-saas-ai-era",
    title: "Custom Software vs SaaS in the AI Era",
    description:
      "AI-assisted development has moved the economics of custom software. A practical framework for deciding when to buy a SaaS tool and when owning your own system now makes more sense.",
    category: "Business",
    date: "2026-05-26",
    readMinutes: 13,
    tags: ["Build vs Buy", "Custom Software", "Cost"],
    lead: "Custom software got dramatically cheaper to build. That shifts the line between buying a tool and owning a system.",
    sections: [
      {
        heading: "The old rule and why it is out of date",
        body: [
          "The traditional build-versus-buy rule of thumb was simple: buy unless you have a genuinely unique process, because custom software took months and a substantial team to build and maintain, and that cost was rarely justified below a certain company size. This rule was sound advice for a long time because it reflected the real cost of custom development.",
          "AI-assisted development has changed that cost structure meaningfully. Tasks that previously required a multi-person engineering team for several months — a working internal tool, a customer-facing workflow, an integration layer between two systems — can now often be built by a small team in weeks, with AI handling a large share of boilerplate, scaffolding and first-draft implementation.",
          "This does not mean custom software is now always cheaper than SaaS. It means the threshold at which custom software becomes worthwhile has moved down significantly, and companies that dismissed it out of hand two years ago should genuinely reconsider it for specific cases, not adopt it wholesale.",
        ],
      },
      {
        heading: "What SaaS still does better",
        body: [
          "SaaS remains the right default for genuinely commodity problems where your process does not differ meaningfully from any other company's: accounting, standard CRM workflows, email, basic project tracking. Paying a subscription for software maintained by a dedicated vendor team is almost always cheaper than owning an equivalent system for these categories.",
          "SaaS also wins where compliance, security certification, or integration breadth matters more than fit — payment processing being the clearest example, where the cost of getting security wrong vastly outweighs any customisation benefit. Do not build custom software in categories where a mistake is regulatory or reputational, not just operational.",
          "The vendor's incremental cost of serving one more customer is close to zero, which is exactly why the pricing works for standard needs and exactly why it works badly once your requirements diverge from the median customer the product was built for. SaaS pricing assumes you fit the mould; the further you are from it, the worse the economics become.",
        ],
      },
      {
        heading: "Where custom now wins that didn't before",
        body: [
          "Custom software increasingly makes sense wherever a workflow is core to how you actually compete, rather than a shared back-office function. If the process is genuinely distinctive — how you triage inbound leads, how you match supply to demand, how you handle a specific regulatory workflow — a generic SaaS tool will always be a compromise, forcing your process to bend to its assumptions.",
          "It also makes sense where you are paying for SaaS seats or usage tiers that scale with growth in a way that decouples from your actual usage of the value it provides — a common pattern once a company outgrows a tool's original pricing assumptions. At a certain scale, the SaaS subscription cost curve crosses above the cost of owning an equivalent, right-sized system.",
          "The AI-assisted development cost reduction specifically helps here because it lowers the fixed cost of getting a first working version live, which used to be the main barrier. The ongoing maintenance cost of owned software has not dropped as much, so the decision should still weigh total cost of ownership over several years, not just build cost.",
        ],
      },
      {
        heading: "A decision framework, step by step",
        body: [
          "Step one: is this process a genuine source of differentiation, or a shared utility function every company in your industry performs roughly the same way? Utility functions default to buy. Differentiating processes are worth evaluating further.",
          "Step two, for differentiating processes: does an existing SaaS tool cover 80% or more of the requirement out of the box, with the remaining 20% workable as a manual workaround? If yes, buy and accept the workaround rather than building a whole system to close a small gap.",
          "Step three: model the three-year total cost of both paths — SaaS subscription cost projected against your expected growth, versus build cost plus ongoing maintenance and hosting for a custom system. Include the cost of your team's time managing vendor limitations under the SaaS path; that cost is real even though it rarely appears on an invoice.",
          "Step four: weigh switching risk. A SaaS vendor can change pricing, sunset a feature, or get acquired and change direction, all outside your control. Owned software carries the opposite risk — internal knowledge walking out the door if the team that built it leaves without documentation. Neither risk is zero; choose the one you can manage better.",
        ],
        bullets: [
          "Is the process a genuine differentiator or a shared utility function",
          "Does SaaS cover 80%+ of the need with a workable manual gap",
          "What is the honest three-year total cost of each path",
          "Which switching risk can your organisation manage better",
        ],
      },
      {
        heading: "The hidden costs on both sides",
        body: [
          "On the SaaS side, the hidden cost is process distortion: teams quietly reshape how they work to fit what the tool supports, and that reshaping accumulates into real inefficiency that is hard to see because it never shows up as a single line item. Ask your team where they currently work around a tool's limitations — that list is the real cost of the SaaS choice.",
          "On the custom side, the hidden cost is maintenance drift: a system built quickly with AI assistance still needs someone accountable for keeping it working as upstream APIs change, security patches are needed, and the original requirements evolve. AI lowers the cost of the first version substantially; it lowers the cost of years two through five by less.",
          "Both hidden costs are underestimated in most build-versus-buy decisions because they are diffuse and easy to defer mentally. Making them explicit in the decision — even as a rough estimate — produces a more honest comparison than build cost versus subscription price alone.",
        ],
      },
      {
        heading: "A worked example: a bespoke quoting tool",
        body: [
          "A specialist manufacturing company was using a generic CRM's quoting module to price custom orders, but the module could not represent their actual pricing logic — which depended on material cost fluctuations, order complexity, and a rotating set of supplier discounts. Sales staff maintained a parallel spreadsheet to calculate real prices, then manually re-entered the result into the CRM, which was the actual source of both delay and errors.",
          "A custom quoting tool, built in about six weeks with substantial AI-assisted development, replaced the spreadsheet entirely and integrated directly with the existing CRM through its API rather than replacing it. The CRM stayed for what it was good at — contact and pipeline management — while the differentiating pricing logic moved into owned software.",
          "The total build cost was recovered within the first quarter through reduced quoting errors and faster turnaround, and the company retained full control over pricing logic that changes several times a year as supplier terms shift. A SaaS quoting add-on existed but assumed a pricing model too generic to fit their actual business.",
        ],
      },
      {
        heading: "Failure modes on both sides of the decision",
        body: [
          "Buying: adopting a SaaS tool for a genuinely differentiating process because it looked cheap upfront, then spending years working around its limitations and never fully realising the differentiation the process could provide. This is the more common mistake because the initial cost comparison always favours SaaS on price alone.",
          "Building: building custom software for a genuinely commodity process out of a general enthusiasm for owning systems, then bearing years of maintenance cost for something that added no competitive value over a subscription. This mistake is more likely to happen now that AI has made the initial build tempting to attempt.",
          "Both mistakes share the same root cause: skipping step one of the framework — is this actually differentiating — and jumping straight to a cost comparison. The differentiation question should be answered first and honestly, before any pricing model is built.",
        ],
      },
      {
        heading: "Metrics to revisit this decision over time",
        body: [
          "For SaaS tools: subscription cost growth rate versus your headcount or usage growth rate, and the number of active workarounds your team maintains around the tool's limitations. A widening gap in either signals it is time to re-run the framework.",
          "For custom systems: actual maintenance hours per month versus the original estimate, and how many people currently understand the system well enough to modify it safely. A system understood by only one person is a risk regardless of how well it currently performs.",
          "Revisit the decision annually for any tool or system tied to a process that is actually changing — pricing models, regulatory requirements, competitive dynamics. A decision made correctly two years ago can become wrong simply because the underlying process has evolved.",
        ],
      },
      {
        heading: "FAQ: common questions on build versus buy",
        body: [
          "Does AI-assisted development mean we should build more things ourselves now? It means the option is worth evaluating more often, not that it is now the default answer. The framework above still applies in full.",
          "What about combining both — SaaS for the core, custom for the edges? This is often the strongest pattern in practice, as the manufacturing example shows: keep SaaS for genuinely commodity functions and build custom, integrated tools for the specific process that differentiates you.",
          "How do we avoid vendor lock-in if we do choose SaaS? Favour vendors with solid data export and API access, and avoid designing critical, differentiating workflows entirely inside a tool you do not control, even if you use that tool for supporting functions.",
        ],
      },
      {
        heading: "Where to start",
        body: [
          "List every SaaS tool your team currently pays for, and mark which ones support a genuinely differentiating process versus a shared utility function. This alone usually reveals one or two candidates worth a proper build-versus-buy evaluation.",
          "For each candidate, spend a day estimating the honest three-year total cost of both paths, including the hidden costs of process distortion or maintenance drift described above. A rough estimate done honestly beats a precise estimate that ignores hidden costs.",
          "If a build case looks strong, start with the narrowest version that replaces the worst workaround first, integrated with your existing systems rather than replacing them wholesale — as in the quoting tool example. Prove the value before expanding scope.",
        ],
      },
    ],
  },
];
