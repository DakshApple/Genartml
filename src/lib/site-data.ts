export type Product = {
  slug: "cortiva" | "evoluter" | "extutor";
  name: string;
  category: string;
  status: "Live" | "Coming Soon";
  logo?: string;
  website: string;
  oneLiner: string;
  cta: string;
  description: string[];
  problem: string;
  how: { step: string; text: string }[];
  capabilities: string[];
  useCases: string[];
  extra?: { label: string; items: string[] };
};

export const products: Product[] = [
  {
    slug: "cortiva",
    name: "Cortiva",
    category: "AI Voice Agents",
    status: "Coming Soon",
    website: "https://www.cortiva.in",
    oneLiner: "AI voice agents built for real business conversations.",
    cta: "Build With Cortiva",
    description: [
      "Cortiva is Genartml's AI voice technology platform designed to automate conversations between businesses and their customers.",
      "From customer support and sales to outbound calling and repetitive communication workflows, Cortiva lets businesses deploy intelligent voice agents that interact naturally with customers.",
    ],
    problem:
      "Businesses lose hours every day on repetitive phone conversations — qualifying leads, chasing follow-ups, answering the same twenty questions. Human teams don't scale linearly. Conversations do.",
    how: [
      { step: "01", text: "Define the conversation, the goal and the guardrails." },
      { step: "02", text: "Connect telephony, CRM and internal systems." },
      { step: "03", text: "Deploy voice agents for inbound and outbound calls." },
      { step: "04", text: "Review transcripts, outcomes and improve continuously." },
    ],
    capabilities: [
      "AI voice agents",
      "Automated calling",
      "Customer support",
      "Sales calls",
      "Lead qualification",
      "Outbound communication",
      "Business workflows",
      "Conversational AI",
    ],
    useCases: [
      "Support lines that never queue",
      "Outbound lead qualification at scale",
      "Appointment and payment reminders",
      "Post-sale follow-up conversations",
    ],
    extra: { label: "Languages", items: ["English", "Hindi", "Gujarati"] },
  },
  {
    slug: "evoluter",
    name: "Evoluter",
    category: "AI Evaluation & Assessment",
    status: "Live",
    website: "https://www.evoluter.in",
    logo: "evoluter",
    oneLiner: "AI-powered evaluation built for serious exam preparation.",
    cta: "Explore Evoluter",
    description: [
      "Evoluter is an AI-powered evaluation and assessment platform designed to help students improve through structured testing, evaluation and feedback.",
      "The platform focuses on competitive examination preparation, beginning with UPSC and expanding toward JEE and NEET.",
    ],
    problem:
      "Traditional preparation tells a student \u201cyou got 72/100.\u201d It never answers why they got 72, where the marks were lost, what to fix next, or whether they are actually improving.",
    how: [
      { step: "01", text: "Attempt structured tests modelled on the real exam." },
      { step: "02", text: "AI evaluates answers against examiner-style criteria." },
      { step: "03", text: "Receive marks with reasoning, gaps and corrections." },
      { step: "04", text: "Track progress across attempts, topics and time." },
    ],
    capabilities: [
      "AI evaluation",
      "Answer assessment",
      "Performance analysis",
      "Personalised feedback",
      "Test analysis",
      "Student progress tracking",
      "Exam preparation",
      "Institution-level assessment",
    ],
    useCases: [
      "UPSC aspirants",
      "JEE aspirants",
      "NEET aspirants",
      "Coaching and educational institutions",
    ],
    extra: { label: "Roadmap", items: ["UPSC", "JEE", "NEET"] },
  },
  {
    slug: "extutor",
    name: "Extutor",
    category: "AI Learning",
    status: "Live",
    website: "https://www.extuter.com",
    logo: "extutor",
    oneLiner: "Your AI learning companion.",
    cta: "Meet Extutor",
    description: [
      "Extutor is an AI-powered learning companion designed for students preparing for demanding competitive examinations.",
      "It uses AI to make learning more interactive, accessible and personalised for students preparing for exams such as JEE and NEET.",
    ],
    problem:
      "Students mostly consume educational content. Extutor creates a relationship instead \u2014 student, AI and knowledge in continuous conversation.",
    how: [
      { step: "01", text: "Bring a topic, a doubt or a chapter." },
      { step: "02", text: "Ask anything; get explanations at your level." },
      { step: "03", text: "Practise interactively until the concept holds." },
      { step: "04", text: "Learning adapts to how you actually study." },
    ],
    capabilities: [
      "Understand concepts",
      "Ask questions",
      "Get explanations",
      "Learn interactively",
      "Clarify doubts",
      "Study more efficiently",
      "Personalised learning",
    ],
    useCases: [
      "JEE students",
      "NEET students",
      "Competitive exam aspirants",
      "Self-paced learners",
    ],
  },
];

export const services = [
  {
    id: "ai-automation",
    title: "AI Automation",
    summary:
      "We identify repetitive, expensive or inefficient workflows and replace them with intelligent automated systems.",
    items: [
      "Customer support automation",
      "Sales automation",
      "Lead management",
      "Internal workflows",
      "Data processing",
      "Communication automation",
      "Business operations",
      "Reporting",
      "Administrative workflows",
    ],
  },
  {
    id: "ai-agents",
    title: "AI Agents",
    summary:
      "We build AI agents that understand context, make decisions, interact with systems and complete business tasks.",
    items: [
      "Customer service agents",
      "Sales agents",
      "Research agents",
      "Internal knowledge agents",
      "Voice agents",
      "Workflow agents",
      "Support agents",
    ],
  },
  {
    id: "custom-ai-software",
    title: "Custom AI Software",
    summary:
      "Have an AI product idea? We turn it into a working product \u2014 idea, architecture, design, development, AI integration, deployment.",
    items: [
      "SaaS platforms",
      "AI applications",
      "AI dashboards",
      "Internal tools",
      "AI assistants",
      "AI-powered marketplaces",
      "Education platforms",
      "Business platforms",
    ],
  },
  {
    id: "ai-integration",
    title: "AI Integration",
    summary:
      "Already have software? We integrate AI into the systems you're already using.",
    items: [
      "CRM integration",
      "API integrations",
      "AI models",
      "Knowledge bases",
      "RAG systems",
      "Chatbots",
      "Voice systems",
      "Automation platforms",
      "Internal databases",
    ],
  },
  {
    id: "knowledge-systems",
    title: "Knowledge-Based AI",
    summary:
      "We build AI systems that work with your company's own information \u2014 for teams with thousands of documents and no easy way to use them.",
    items: [
      "Internal knowledge assistants",
      "Document intelligence",
      "Company knowledge bases",
      "Customer support systems",
      "RAG applications",
      "Document Q&A",
      "Internal research tools",
    ],
  },
  {
    id: "product-engineering",
    title: "Product Engineering",
    summary:
      "AI is powerful, but great AI products still need great software. Software engineering with AI at the core.",
    items: [
      "Web applications",
      "SaaS products",
      "Dashboards",
      "Backend systems",
      "APIs",
      "Databases",
      "Mobile applications",
      "Admin panels",
      "Third-party integrations",
    ],
  },
  {
    id: "mvp-development",
    title: "From Idea to MVP",
    summary:
      "Have an idea but don't know how to build it? We turn concepts into functional products that can be tested with real users.",
    items: [
      "Product strategy",
      "UX/UI",
      "Development",
      "AI integration",
      "Launch",
      "Iteration",
    ],
  },
  {
    id: "ai-consulting",
    title: "Find Where AI Can Actually Help",
    summary:
      "Not every business needs an AI chatbot. Not every process should be automated. We analyse your workflows and recommend what should actually be built.",
    items: ["Analyse", "Identify", "Prioritise", "Build", "Automate"],
  },
] as const;

export const process = [
  { step: "01", title: "Understand", text: "The problem, the business, the users and the existing workflow." },
  { step: "02", title: "Identify", text: "Where AI, automation or software can create real leverage." },
  { step: "03", title: "Design", text: "Product architecture and the user experience around it." },
  { step: "04", title: "Build", text: "We develop the software and the AI systems." },
  { step: "05", title: "Test", text: "Functionality, AI performance, reliability, real-world use." },
  { step: "06", title: "Deploy", text: "We put the product into production." },
  { step: "07", title: "Improve", text: "Feedback and data drive continuous improvement." },
] as const;

export const difference = [
  { step: "01", title: "Product Mindset", text: "We build products ourselves, so we know what it takes to go from an idea to something people actually use." },
  { step: "02", title: "AI First", text: "AI isn't an add-on to our process. It's how we think about products, systems and automation." },
  { step: "03", title: "Business First", text: "Technology is only useful when it solves a real problem. We focus on outcomes, not features." },
  { step: "04", title: "Build Fast", text: "Ideas should reach users quickly. Build, test, learn, improve." },
  { step: "05", title: "End-to-End", text: "Strategy, design, development, AI integration, deployment and iteration." },
] as const;

export const audiences = [
  { title: "Startups", text: "Build your MVP or integrate AI into your product." },
  { title: "SMEs", text: "Automate repetitive operations and reduce manual work." },
  { title: "Enterprises", text: "Build intelligent internal systems and customer-facing AI." },
  { title: "Education", text: "AI-powered evaluation, learning and educational infrastructure." },
  { title: "Sales Teams", text: "Automate lead qualification, calling, follow-ups and support." },
  { title: "Support Teams", text: "Deploy AI systems that handle repetitive customer interactions." },
  { title: "Founders", text: "Turn an idea into a working product." },
] as const;

export const caseStudies = [
  {
    title: "AI Voice Automation",
    problem: "A business was spending most of its day on repetitive outbound and inbound customer calls.",
    solution: "We designed and developed an AI voice agent capable of handling those conversations automatically.",
    technology: ["Conversational AI", "Telephony", "CRM integration"],
    result: "Reduced manual calling and created a scalable communication workflow.",
  },
  {
    title: "Knowledge Assistant",
    problem: "A team held thousands of internal documents with no practical way to find answers inside them.",
    solution: "We built a retrieval-based assistant grounded in the company's own information.",
    technology: ["RAG", "Vector search", "Internal APIs"],
    result: "Answers sourced from real documents instead of manual searching.",
  },
  {
    title: "Workflow Automation",
    problem: "Manual data entry and reporting consumed a recurring share of operational hours.",
    solution: "We mapped the workflow and replaced the repetitive steps with automated processing.",
    technology: ["Workflow automation", "APIs", "LLM processing"],
    result: "Fewer manual steps and consistent, repeatable reporting.",
  },
] as const;

export const technology = [
  { group: "AI", items: ["Large Language Models", "Generative AI", "Conversational AI", "Voice AI", "RAG", "AI Agents"] },
  { group: "Engineering", items: ["Web Applications", "Backend Systems", "APIs", "Databases", "Cloud Infrastructure"] },
  { group: "Automation", items: ["Workflow Automation", "API Integrations", "Business Process Automation", "AI-powered Operations"] },
] as const;

export const otherProjects = ["ZeroTo", "Pinsta AI", "ClearPath", "Sunpathology"] as const;
