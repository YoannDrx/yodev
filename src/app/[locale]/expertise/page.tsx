"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Container } from "@/components/ui/container";
import { GlassPanel } from "@/components/ui/glass-panel";
import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button-link";
import { FadeIn, Parallax } from "@/components/motion";
import { LogoDots } from "@/components/ui/logo";
import { cn } from "@/lib/utils";

const techData = [
  // FRONTEND
  {
    id: "nextjs",
    name: "React / Next.js",
    category: "frontend",
    version: "16.1 (Turbopack)",
    perf: 98,
    security: 94,
    useCase: "SaaS, dashboards, e-commerce",
    stack: ["TypeScript", "Tailwind", "Zustand"],
    code: "export default async function Page() {\n  const data = await getAnalytics();\n  return <Dashboard data={data} />;\n}",
  },
  {
    id: "vuejs",
    name: "Vue.js",
    category: "frontend",
    version: "3.5 (Vapor Mode)",
    perf: 96,
    security: 92,
    useCase: "Apps réactives, dashboards, PWA",
    stack: ["Pinia", "Nuxt", "Vite"],
    code: "const count = ref(0)\nconst doubled = computed(() =>\n  count.value * 2\n)",
  },
  {
    id: "angularjs",
    name: "Angular",
    category: "frontend",
    version: "20 (Signals)",
    perf: 91,
    security: 95,
    useCase: "Apps enterprise, ERP, backoffices",
    stack: ["RxJS", "NgRx", "Material"],
    code: "@Component({ selector: 'app-root' })\nexport class AppComponent {\n  title = signal('Yodev');\n}",
  },
  {
    id: "tailwindcss",
    name: "Tailwind CSS",
    category: "frontend",
    version: "4.1",
    perf: 99,
    security: 100,
    useCase: "Design systems, UI rapide, prototypage",
    stack: ["PostCSS", "Headless UI", "Radix"],
    code: "<button className=\"bg-primary\n  hover:bg-primary-dark\n  px-4 py-2 rounded-lg\">\n  Click me\n</button>",
  },
  // BACKEND
  {
    id: "nodejs",
    name: "Node.js / NestJS",
    category: "backend",
    version: "24 LTS",
    perf: 92,
    security: 97,
    useCase: "Microservices, APIs temps réel",
    stack: ["Prisma", "PostgreSQL", "Redis"],
    code: "@Get(':id')\nasync findOne(@Param('id') id: string) {\n  return this.usersService.findById(id);\n}",
  },
  {
    id: "go",
    name: "Go (Golang)",
    category: "backend",
    version: "1.25",
    perf: 99,
    security: 96,
    useCase: "APIs haute perf, microservices, CLI",
    stack: ["Gin", "gRPC", "sqlc"],
    code: "func (s *Server) GetUser(ctx context.Context,\n  req *pb.GetUserRequest) (*pb.User, error) {\n  return s.db.GetUser(ctx, req.Id)\n}",
  },
  {
    id: "rust",
    name: "Rust",
    category: "backend",
    version: "1.92",
    perf: 100,
    security: 99,
    useCase: "Systèmes critiques, WebAssembly, perf",
    stack: ["Actix", "Tokio", "Serde"],
    code: "async fn get_user(Path(id): Path<u32>)\n  -> Result<Json<User>, AppError> {\n  Ok(Json(db.find(id).await?))\n}",
  },
  {
    id: "postgresql",
    name: "PostgreSQL",
    category: "backend",
    version: "18",
    perf: 94,
    security: 98,
    useCase: "BDD relationnelle, analytics, JSONB",
    stack: ["pgvector", "TimescaleDB", "PostGIS"],
    code: "SELECT u.name, COUNT(o.id) as orders\nFROM users u\nLEFT JOIN orders o ON u.id = o.user_id\nGROUP BY u.id;",
  },
  {
    id: "redis",
    name: "Redis",
    category: "backend",
    version: "8.2",
    perf: 100,
    security: 90,
    useCase: "Cache, sessions, queues, pub/sub",
    stack: ["Redis Stack", "Streams", "Lua"],
    code: "await redis.set('session:123', JSON.stringify({\n  user: 'john', role: 'admin'\n}), 'EX', 3600);",
  },
  // IA & DATA
  {
    id: "python",
    name: "Python / IA",
    category: "ai",
    version: "3.13 (PyTorch 2.5)",
    perf: 88,
    security: 91,
    useCase: "RAG, LLM agents, automation",
    stack: ["OpenAI API", "LangChain", "Pinecone"],
    code: "agent = create_react_agent(\n  llm=ChatOpenAI(model='gpt-4'),\n  tools=tools\n)",
  },
  {
    id: "tensorflow",
    name: "TensorFlow",
    category: "ai",
    version: "2.18",
    perf: 95,
    security: 93,
    useCase: "ML/Deep Learning, vision, NLP",
    stack: ["Keras", "TFLite", "TensorBoard"],
    code: "model = tf.keras.Sequential([\n  layers.Dense(128, activation='relu'),\n  layers.Dense(10, activation='softmax')\n])",
  },
  {
    id: "langchain",
    name: "LangChain",
    category: "ai",
    version: "0.3",
    perf: 90,
    security: 88,
    useCase: "Agents IA, RAG, chatbots, pipelines",
    stack: ["OpenAI", "Chroma", "Pinecone"],
    code: "chain = (\n  retriever | format_docs |\n  prompt | llm | StrOutputParser()\n)",
  },
  {
    id: "openai",
    name: "OpenAI API",
    category: "ai",
    version: "GPT-4o / o1",
    perf: 97,
    security: 94,
    useCase: "LLM, génération, assistants, vision",
    stack: ["Assistants API", "Embeddings", "Whisper"],
    code: "const response = await openai.chat.completions\n  .create({\n  model: 'gpt-4o',\n  messages: [{ role: 'user', content: prompt }]\n});",
  },
  // MOBILE
  {
    id: "swift",
    name: "Swift (iOS Native)",
    category: "mobile",
    version: "6.2 (SwiftUI)",
    perf: 99,
    security: 96,
    useCase: "Applications iOS premium",
    stack: ["SwiftUI", "Combine", "CoreData"],
    code: "struct HomeView: View {\n  var body: some View {\n    VStack { Text('Hello Yodev') }\n  }\n}",
  },
  {
    id: "kotlin",
    name: "Kotlin",
    category: "mobile",
    version: "2.3 (Jetpack Compose)",
    perf: 97,
    security: 95,
    useCase: "Applications Android natives",
    stack: ["Compose", "Coroutines", "Hilt"],
    code: "@Composable\nfun Greeting(name: String) {\n  Text(text = \"Hello $name!\")\n}",
  },
  {
    id: "flutter",
    name: "Flutter",
    category: "mobile",
    version: "3.38 (Impeller)",
    perf: 94,
    security: 92,
    useCase: "Apps cross-platform iOS/Android",
    stack: ["Dart", "Riverpod", "Firebase"],
    code: "Widget build(BuildContext context) {\n  return Scaffold(\n    body: Center(child: Text('Hello'))\n  );\n}",
  },
  // INFRA
  {
    id: "aws",
    name: "AWS Cloud",
    category: "infra",
    version: "2025",
    perf: 95,
    security: 99,
    useCase: "Scaling, serverless, DevSecOps",
    stack: ["Lambda", "RDS", "CloudFront"],
    code: "resource 'aws_lambda_function' 'app' {\n  function_name = 'yodev-api'\n  handler = 'index.handler'\n}",
  },
  {
    id: "docker",
    name: "Docker",
    category: "infra",
    version: "27",
    perf: 96,
    security: 93,
    useCase: "Conteneurisation, CI/CD, dev local",
    stack: ["Compose", "BuildKit", "Registry"],
    code: "FROM node:20-alpine\nWORKDIR /app\nCOPY . .\nRUN npm ci && npm run build\nCMD [\"npm\", \"start\"]",
  },
  {
    id: "kubernetes",
    name: "Kubernetes",
    category: "infra",
    version: "1.32",
    perf: 98,
    security: 97,
    useCase: "Orchestration, scaling, haute dispo",
    stack: ["Helm", "ArgoCD", "Istio"],
    code: "apiVersion: apps/v1\nkind: Deployment\nmetadata:\n  name: yodev-api\nspec:\n  replicas: 3",
  },
  {
    id: "terraform",
    name: "Terraform",
    category: "infra",
    version: "1.10",
    perf: 94,
    security: 96,
    useCase: "IaC, multi-cloud, provisioning",
    stack: ["HCL", "Modules", "State"],
    code: "module \"vpc\" {\n  source = \"./modules/vpc\"\n  cidr   = \"10.0.0.0/16\"\n  azs    = [\"eu-west-1a\", \"eu-west-1b\"]\n}",
  },
  {
    id: "vercel",
    name: "Vercel",
    category: "infra",
    version: "2025",
    perf: 99,
    security: 95,
    useCase: "Déploiement frontend, Edge, Preview",
    stack: ["Next.js", "Edge Functions", "Analytics"],
    code: "// vercel.json\n{\n  \"framework\": \"nextjs\",\n  \"regions\": [\"cdg1\", \"iad1\"]\n}",
  },
  {
    id: "cloudflare",
    name: "Cloudflare",
    category: "infra",
    version: "Workers",
    perf: 100,
    security: 98,
    useCase: "CDN, Edge computing, DDoS protection",
    stack: ["Workers", "Pages", "R2", "D1"],
    code: "export default {\n  async fetch(request) {\n    return new Response('Hello from Edge!');\n  }\n}",
  },
  {
    id: "ovhcloud",
    name: "OVH Cloud",
    category: "infra",
    version: "2025",
    perf: 92,
    security: 97,
    useCase: "Cloud souverain EU, VPS, Kubernetes",
    stack: ["Public Cloud", "Managed K8s", "Storage"],
    code: "# OVH Terraform Provider\nprovider \"ovh\" {\n  endpoint = \"ovh-eu\"\n}",
  },
  // BACKEND (suite)
  {
    id: "supabase",
    name: "Supabase",
    category: "backend",
    version: "v2",
    perf: 93,
    security: 94,
    useCase: "BaaS, auth, realtime, storage",
    stack: ["PostgreSQL", "Auth", "Edge Functions"],
    code: "const { data } = await supabase\n  .from('users')\n  .select('*')\n  .eq('active', true)",
  },
  {
    id: "neon",
    name: "Neon DB",
    category: "backend",
    version: "Serverless",
    perf: 96,
    security: 95,
    useCase: "PostgreSQL serverless, branching",
    stack: ["PostgreSQL", "Branching", "Autoscaling"],
    code: "import { neon } from '@neondatabase/serverless';\nconst sql = neon(process.env.DATABASE_URL);\nconst users = await sql`SELECT * FROM users`;",
  },
  {
    id: "resend",
    name: "Resend",
    category: "backend",
    version: "API v1",
    perf: 98,
    security: 96,
    useCase: "Emails transactionnels, React Email",
    stack: ["React Email", "Webhooks", "Analytics"],
    code: "await resend.emails.send({\n  from: 'hello@yodev.fr',\n  to: user.email,\n  subject: 'Bienvenue!',\n  react: <WelcomeEmail />\n});",
  },
  {
    id: "stripe",
    name: "Stripe",
    category: "backend",
    version: "API 2024",
    perf: 99,
    security: 99,
    useCase: "Paiements, abonnements, facturation",
    stack: ["Checkout", "Billing", "Connect"],
    code: "const session = await stripe.checkout.sessions\n  .create({\n  mode: 'subscription',\n  line_items: [{ price: priceId, quantity: 1 }]\n});",
  },
  {
    id: "prisma",
    name: "Prisma",
    category: "backend",
    version: "6.x",
    perf: 94,
    security: 93,
    useCase: "ORM TypeScript, migrations, studio",
    stack: ["PostgreSQL", "MySQL", "MongoDB"],
    code: "const users = await prisma.user.findMany({\n  where: { active: true },\n  include: { posts: true }\n});",
  },
  // FRONTEND (suite)
  {
    id: "figma",
    name: "Figma",
    category: "frontend",
    version: "2024",
    perf: 95,
    security: 92,
    useCase: "Design, prototypage, design system",
    stack: ["Dev Mode", "Variables", "Auto Layout"],
    code: "// Figma to Code\n<Frame\n  name=\"Button\"\n  width={120}\n  height={40}\n  cornerRadius={8}\n/>",
  },
  // MOBILE (suite)
  {
    id: "reactnative",
    name: "React Native",
    category: "mobile",
    version: "0.76",
    perf: 93,
    security: 91,
    useCase: "Apps cross-platform avec code natif",
    stack: ["Expo", "Reanimated", "React Navigation"],
    code: "export default function App() {\n  return (\n    <View style={styles.container}>\n      <Text>Hello Yodev!</Text>\n    </View>\n  );\n}",
  },
];

const categoryTabs = [
  { key: "all", label: "Tout voir" },
  { key: "frontend", label: "Frontend" },
  { key: "backend", label: "Backend" },
  { key: "ai", label: "IA & Data" },
  { key: "mobile", label: "Mobile" },
  { key: "infra", label: "Infra" },
];

const techMatrix = [
  {
    project: "Startup MVP (SaaS)",
    stack: "Next.js + Supabase + Tailwind",
    strengths: "Vitesse de dev, couts infra reduits",
    team: "1-2 devs fullstack",
    speed: "Extreme (4-6 sem.)",
    tone: "primary",
  },
  {
    project: "PME logiciel critique",
    stack: "React + NestJS + PostgreSQL",
    strengths: "Robustesse, typage strict, scalabilite",
    team: "2-4 devs specialises",
    speed: "Standard (12-16 sem.)",
    tone: "warning",
  },
  {
    project: "Integration IA / LLM",
    stack: "Python + LangChain + VectorDB",
    strengths: "Expertise algorithmique, automation",
    team: "1 AI engineer + 1 dev",
    speed: "Rapide (8-10 sem.)",
    tone: "secondary",
  },
  {
    project: "Grande echelle / Cloud native",
    stack: "Microservices Go/Node + K8s",
    strengths: "Haute dispo, multi-tenant",
    team: "5+ devs (staff aug)",
    speed: "Long terme",
    tone: "danger",
  },
];

export default function ExpertisePage() {
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredTech = useMemo(() => {
    if (activeCategory === "all") return techData;
    return techData.filter((tech) => tech.category === activeCategory);
  }, [activeCategory]);

  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-20 mesh-gradient overflow-hidden">
        <div className="hero-glow -top-20 -left-20" />
        <div
          className="hero-glow bottom-0 right-0 opacity-20"
          style={{
            background: "radial-gradient(circle, #FF6B35 0%, transparent 70%)",
          }}
        />

        <Container>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <FadeIn>
                <Badge variant="primary">Mastering the stack</Badge>
              </FadeIn>
              <FadeIn delay={0.1}>
                <h1 className="text-5xl lg:text-7xl font-display font-extrabold leading-tight text-gradient">
                  Excellence
                  <br />
                  <span className="text-primary">technologique</span>
                </h1>
              </FadeIn>
              <FadeIn delay={0.2}>
                <p className="text-lg text-muted max-w-lg">
                  Nous ne suivons pas les tendances, nous maitrisons les outils
                  qui construisent l'avenir. Decouvrez les fiches techniques de
                  notre stack de production.
                </p>
              </FadeIn>
              <FadeIn delay={0.3}>
                <div className="flex items-center gap-6 pt-4 text-sm text-muted">
                  <div>
                    <p className="text-2xl font-bold text-text">99.9%</p>
                    <p className="text-xs uppercase tracking-widest">Uptime garanti</p>
                  </div>
                  <div className="h-10 w-px bg-white/10" />
                  <div>
                    <p className="text-2xl font-bold text-text">&lt; 2s</p>
                    <p className="text-xs uppercase tracking-widest">Temps de chargement</p>
                  </div>
                  <div className="h-10 w-px bg-white/10" />
                  <div>
                    <p className="text-2xl font-bold text-text">SOC2</p>
                    <p className="text-xs uppercase tracking-widest">Compliance ready</p>
                  </div>
                </div>
              </FadeIn>
            </div>

            <Parallax className="hidden lg:block">
              <div className="w-full aspect-square border border-white/10 rounded-full flex items-center justify-center relative">
                <div className="absolute inset-0 animate-spin-slow opacity-20">
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3 h-3 bg-primary rounded-full blur-sm" />
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3 h-3 bg-secondary rounded-full blur-sm" />
                </div>
                <div className="w-2/3 h-2/3 border border-white/10 rounded-full flex items-center justify-center">
                  <div className="w-32 h-32 bg-dark glass-panel rounded-3xl flex items-center justify-center">
                    <LogoDots size="lg" />
                  </div>
                </div>
                <div className="absolute top-12 left-12 w-16 h-16 glass-panel rounded-2xl flex items-center justify-center animate-float">
                  <img
                    src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg"
                    className="w-8 h-8"
                    alt="React"
                  />
                </div>
                <div
                  className="absolute bottom-16 right-4 w-16 h-16 glass-panel rounded-2xl flex items-center justify-center animate-float"
                  style={{ animationDelay: "0.8s" }}
                >
                  <img
                    src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg"
                    className="w-8 h-8"
                    alt="Node.js"
                  />
                </div>
                <div
                  className="absolute top-1/2 -right-6 w-16 h-16 glass-panel rounded-2xl flex items-center justify-center animate-float"
                  style={{ animationDelay: "0.4s" }}
                >
                  <img
                    src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg"
                    className="w-8 h-8"
                    alt="Python"
                  />
                </div>
                {/* Nouveaux logos en orbite */}
                <div
                  className="absolute bottom-12 left-8 w-14 h-14 glass-panel rounded-2xl flex items-center justify-center animate-float"
                  style={{ animationDelay: "1.2s" }}
                >
                  <img
                    src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg"
                    className="w-7 h-7"
                    alt="Vue.js"
                  />
                </div>
                <div
                  className="absolute top-1/2 -left-4 w-14 h-14 glass-panel rounded-2xl flex items-center justify-center animate-float"
                  style={{ animationDelay: "1.6s" }}
                >
                  <img
                    src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg"
                    className="w-7 h-7"
                    alt="AWS"
                  />
                </div>
                <div
                  className="absolute top-4 right-16 w-14 h-14 glass-panel rounded-2xl flex items-center justify-center animate-float"
                  style={{ animationDelay: "2s" }}
                >
                  <img
                    src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg"
                    className="w-7 h-7"
                    alt="Docker"
                  />
                </div>
                <div
                  className="absolute bottom-4 left-1/3 w-14 h-14 glass-panel rounded-2xl flex items-center justify-center animate-float"
                  style={{ animationDelay: "2.4s" }}
                >
                  <img
                    src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg"
                    className="w-7 h-7"
                    alt="TypeScript"
                  />
                </div>
                <div
                  className="absolute top-1/4 -left-2 w-12 h-12 glass-panel rounded-xl flex items-center justify-center animate-float"
                  style={{ animationDelay: "2.8s" }}
                >
                  <img
                    src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg"
                    className="w-6 h-6"
                    alt="Figma"
                  />
                </div>
              </div>
            </Parallax>
          </div>
        </Container>
      </section>

      {/* Tech fact sheets */}
      <section className="py-24">
        <Container>
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12">
            <div className="bg-white/5 border border-white/10 p-1 rounded-2xl flex flex-wrap justify-center">
              {categoryTabs.map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveCategory(tab.key)}
                  className={cn(
                    "px-5 py-2.5 rounded-xl text-sm transition-all",
                    activeCategory === tab.key
                      ? "bg-primary text-dark font-bold"
                      : "text-muted hover:text-text"
                  )}
                >
                  {tab.label}
                </button>
              ))}
            </div>
            <div className="text-sm text-muted font-mono">
              <span className="text-primary">{filteredTech.length}</span> technologies actives
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {filteredTech.map((tech) => (
              <GlassPanel
                key={tech.id}
                className="p-8 rounded-[2.5rem] relative group hover:border-primary/40 transition-all duration-500"
              >
                <div className="flex items-start justify-between mb-8">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center">
                      <img
                        src={
                          {
                            // Simple Icons (pour les logos non disponibles dans Devicon)
                            openai: "https://cdn.simpleicons.org/openai/white",
                            stripe: "https://cdn.simpleicons.org/stripe/white",
                            langchain: "https://cdn.simpleicons.org/langchain/white",
                            supabase: "https://cdn.simpleicons.org/supabase/white",
                            vercel: "https://cdn.simpleicons.org/vercel/white",
                            cloudflare: "https://cdn.simpleicons.org/cloudflare/white",
                            neon: "https://cdn.simpleicons.org/neon/white",
                            resend: "https://cdn.simpleicons.org/resend/white",
                          }[tech.id] ||
                          `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${
                            {
                              nextjs: "nextjs/nextjs-original",
                              vuejs: "vuejs/vuejs-original",
                              angularjs: "angularjs/angularjs-original",
                              tailwindcss: "tailwindcss/tailwindcss-original",
                              nodejs: "nodejs/nodejs-original",
                              go: "go/go-original-wordmark",
                              rust: "rust/rust-original",
                              postgresql: "postgresql/postgresql-original",
                              redis: "redis/redis-original",
                              python: "python/python-original",
                              tensorflow: "tensorflow/tensorflow-original",
                              swift: "swift/swift-original",
                              kotlin: "kotlin/kotlin-original",
                              flutter: "flutter/flutter-original",
                              aws: "amazonwebservices/amazonwebservices-original-wordmark",
                              docker: "docker/docker-original",
                              kubernetes: "kubernetes/kubernetes-plain",
                              terraform: "terraform/terraform-original",
                              ovhcloud: "linux/linux-original",
                              prisma: "prisma/prisma-original",
                              figma: "figma/figma-original",
                              reactnative: "react/react-original",
                            }[tech.id] || `${tech.id}/${tech.id}-original`
                          }.svg`
                        }
                        className="w-10 h-10"
                        alt={tech.name}
                      />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold">{tech.name}</h3>
                      <p className="text-xs font-mono text-muted uppercase tracking-widest">
                        {tech.version}
                      </p>
                    </div>
                  </div>
                  <div className="text-xs uppercase tracking-widest text-muted">
                    {tech.category}
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div>
                      <p className="text-xs font-bold text-muted uppercase mb-3">
                        Cas d'usage optimal
                      </p>
                      <p className="text-sm text-muted leading-relaxed">
                        {tech.useCase}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs font-bold text-muted uppercase mb-3">
                        Core ecosystem
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {tech.stack.map((item) => (
                          <span
                            key={item}
                            className="px-2 py-1 bg-white/5 rounded text-[11px] font-mono text-primary border border-white/5"
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      {[
                        { label: "Performance", value: tech.perf, color: "bg-primary" },
                        { label: "Security", value: tech.security, color: "bg-secondary" },
                      ].map((metric) => (
                        <div key={metric.label}>
                          <div className="flex justify-between text-[10px] text-muted uppercase font-bold mb-1">
                            <span>{metric.label}</span>
                            <span className="text-primary">{metric.value}%</span>
                          </div>
                          <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                            <div
                              className={cn("h-full", metric.color)}
                              style={{ width: `${metric.value}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="relative">
                    <div className="absolute -top-3 -right-3 text-[10px] font-mono text-muted bg-dark px-2">
                      snippet.code
                    </div>
                    <div className="bg-black/40 rounded-2xl p-4 h-full font-mono text-xs border border-white/5 overflow-hidden">
                      <pre className="text-muted leading-relaxed whitespace-pre-wrap">
                        {tech.code}
                      </pre>
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-white/5 flex items-center justify-between text-xs text-muted">
                  <span>PROD READY</span>
                  <span className="inline-flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    Stable
                  </span>
                </div>
              </GlassPanel>
            ))}
          </div>
        </Container>
      </section>

      {/* Tech Matrix */}
      <section className="py-24 bg-dark border-y border-white/5">
        <Container>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-display font-bold mb-6">
              Quelle technologie pour votre projet ?
            </h2>
            <p className="text-muted max-w-2xl mx-auto">
              Nous choisissons la stack selon vos objectifs, pas nos preferences.
            </p>
          </div>

          <div className="overflow-x-auto no-scrollbar">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="text-left text-xs font-mono text-muted uppercase tracking-widest border-b border-white/10">
                  <th className="py-6 px-4">Type de projet</th>
                  <th className="py-6 px-4">Stack recommandee</th>
                  <th className="py-6 px-4">Points forts</th>
                  <th className="py-6 px-4">Equipe optimale</th>
                  <th className="py-6 px-4">Vitesse</th>
                </tr>
              </thead>
              <tbody>
                {techMatrix.map((row) => (
                  <tr
                    key={row.project}
                    className="border-b border-white/5 hover:bg-white/5 transition-colors"
                  >
                    <td className="py-6 px-4 font-bold">{row.project}</td>
                    <td className="py-6 px-4">{row.stack}</td>
                    <td className="py-6 px-4 text-muted">{row.strengths}</td>
                    <td className="py-6 px-4">{row.team}</td>
                    <td className="py-6 px-4">
                      <span
                        className={cn(
                          "px-3 py-1 rounded-full text-xs font-bold",
                          row.tone === "primary" && "bg-primary/20 text-primary",
                          row.tone === "secondary" && "bg-secondary/20 text-secondary",
                          row.tone === "warning" && "bg-yellow-500/20 text-yellow-500",
                          row.tone === "danger" && "bg-red-500/20 text-red-500"
                        )}
                      >
                        {row.speed}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="py-28">
        <Container>
          <GlassPanel className="p-12 md:p-20 rounded-[3rem] text-center relative overflow-hidden">
            <div className="hero-glow -top-40 -left-40 opacity-30" />
            <h2 className="text-4xl md:text-6xl font-display font-bold mb-8">
              Une architecture prete pour demain ?
            </h2>
            <p className="text-xl text-muted mb-12 max-w-2xl mx-auto">
              Nos architectes auditent votre stack et construisent une roadmap
              sans dette technique.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <ButtonLink
                href="/bookings/technical-roadmap"
                size="lg"
                className="px-10 py-5 rounded-full shadow-[0_0_30px_rgba(27,168,150,0.4)]"
              >
                Demander un audit technique
              </ButtonLink>
              <ButtonLink
                href="/work"
                variant="glass"
                size="lg"
                className="px-10 py-5 rounded-full"
              >
                Voir nos realisations
              </ButtonLink>
            </div>
          </GlassPanel>
        </Container>
      </section>
    </>
  );
}
