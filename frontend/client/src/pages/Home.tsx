import { useState } from "react";
import GraphView from "../components/GraphView";
import VersionDiff from "../components/VersionDiff";
import ArticleReader from "../components/ArticleReader";
import SoulProfileCard from "../components/SoulProfileCard";
import WorkflowTimeline from "../components/WorkflowTimeline";
import { Brain, FileText, Sparkles, User, Github, Moon, Sun } from "lucide-react";
import { useTheme } from "../contexts/ThemeContext";

export default function Home() {
  const { theme, toggleTheme } = useTheme();
  const [activeTab, setActiveTab] = useState<"reader" | "diff" | "graph">("reader");

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground transition-colors duration-300">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur sticky top-0 z-50">
        <div className="container py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center shadow-sm">
              <Brain className="w-5 h-full text-primary-foreground" />
            </div>
            <div>
              <h1 className="font-serif text-lg font-bold tracking-tight">CoWriter AI</h1>
              <p className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider">
                Obsidian-Style Writing Workflow
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <a 
              href="https://github.com/cmenya/cowriter-ai" 
              target="_blank" 
              rel="noreferrer"
              className="p-2 rounded-lg border border-border hover:bg-muted transition-colors flex items-center gap-1.5 text-xs font-mono"
            >
              <Github className="w-4 h-full" />
              <span className="hidden sm:inline">GitHub</span>
            </a>

            <button 
              onClick={toggleTheme}
              className="p-2 rounded-lg border border-border hover:bg-muted transition-colors"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun className="w-4 h-full" /> : <Moon className="w-4 h-full" />}
            </button>
          </div>
        </div>
      </header>

      {/* Main Body */}
      <main className="flex-1 container py-8 flex flex-col gap-8">
        {/* Hero Section */}
        <section className="relative rounded-xl overflow-hidden border border-border bg-card shadow-sm min-h-[220px] md:min-h-[260px] flex flex-col justify-end p-6 md:p-8">
          {/* Hero Image Background */}
          <div className="absolute inset-0 z-0">
            <img 
              src="https://d2xsxph8kpxj0f.cloudfront.net/310519663109545918/bencZK72M7MQDUiTg3d9Fv/cowriter-hero-7AqEDaBoNHX8ynn2723Q5P.webp" 
              alt="CoWriter AI Hero" 
              className="w-full h-full object-cover opacity-15 dark:opacity-20"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
          </div>

          {/* Hero Content */}
          <div className="relative z-10 max-w-2xl flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-primary bg-primary/10 px-2 py-0.5 rounded">
                Personal Hackathon Project
              </span>
            </div>
            <h2 className="font-serif text-2xl md:text-3xl font-bold tracking-tight mt-1">
              用 AI 辅助写作，但保留百分之百的“自己”
            </h2>
            <p className="font-serif text-xs md:text-sm text-muted-foreground leading-relaxed">
              这是一个专为追求独特表达的创作者设计的 AI 写作工作流。它深度提取作者的 <strong>Style DNA</strong>（包括括号吐槽、连贯口语、自嘲语调），融合多源素材，彻底清除 AI 的大厂黑话与总结套话，让 AI 真正写出“我的声音”。
            </p>
          </div>
        </section>

        {/* Profile Card Section */}
        <section className="flex flex-col gap-3">
          <div className="flex items-center gap-2 px-1">
            <User className="w-4 h-full text-primary" />
            <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-muted-foreground">
              Author Profile & DNA (作者画像与风格基因)
            </h3>
          </div>
          <SoulProfileCard />
        </section>

        {/* Workspace Console (Multi-panel) */}
        <section className="flex flex-col gap-4">
          <div className="flex items-center justify-between px-1 border-b border-border/60 pb-2">
            <div className="flex items-center gap-2">
              <Brain className="w-4 h-full text-primary" />
              <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Obsidian Workspace Console (工作流控制台)
              </h3>
            </div>

            {/* Mobile / Tablet Tab Switcher */}
            <div className="flex bg-muted p-1 rounded-lg border border-border/40">
              {(["reader", "diff", "graph"] as const).map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-3 py-1 rounded text-xs font-mono font-medium transition-all ${
                    activeTab === tab
                      ? "bg-background text-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {tab === "reader" ? "Reader" : tab === "diff" ? "Diff" : "Graph"}
                </button>
              ))}
            </div>
          </div>

          {/* Desktop Layout: Multi-panel Grid */}
          <div className="hidden lg:grid grid-cols-12 gap-6">
            {/* Left Side: Timeline (Col span 3) */}
            <div className="col-span-3 flex flex-col gap-6">
              <WorkflowTimeline />
            </div>

            {/* Middle Side: Main Interactive Area (Col span 6) */}
            <div className="col-span-6 flex flex-col gap-6">
              <div className="bg-card border border-border rounded-lg p-1.5 flex bg-muted/40 gap-1.5">
                <button
                  onClick={() => setActiveTab("reader")}
                  className={`flex-1 py-2 rounded-md text-xs font-mono font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 ${
                    activeTab === "reader"
                      ? "bg-background text-primary border border-border shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <FileText className="w-3.5 h-full" />
                  Reader (文章阅读器)
                </button>
                <button
                  onClick={() => setActiveTab("diff")}
                  className={`flex-1 py-2 rounded-md text-xs font-mono font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 ${
                    activeTab === "diff"
                      ? "bg-background text-primary border border-border shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <Sparkles className="w-3.5 h-full" />
                  Diff Tool (改写对比)
                </button>
              </div>

              <div className="flex-1">
                {activeTab === "reader" && <ArticleReader />}
                {activeTab === "diff" && <VersionDiff />}
                {activeTab === "graph" && <GraphView />}
              </div>
            </div>

            {/* Right Side: Graph View (Col span 3) */}
            <div className="col-span-3 h-full">
              <GraphView />
            </div>
          </div>

          {/* Mobile / Tablet Layout: Single active panel */}
          <div className="lg:hidden flex flex-col gap-6">
            {activeTab === "reader" && <ArticleReader />}
            {activeTab === "diff" && <VersionDiff />}
            {activeTab === "graph" && <GraphView />}
            <WorkflowTimeline />
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-card/30 py-8 mt-12">
        <div className="container flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-serif text-xs text-muted-foreground text-center sm:text-left">
            © 2026 CoWriter AI. Designed with 💜 in Tokyo. 
            <span className="font-mono text-[10px] block sm:inline sm:ml-2">
              Powered by Cursor × Obsidian Style Engine
            </span>
          </p>
          <p className="font-serif text-xs text-muted-foreground text-center sm:text-right">
            不甘平庸，持续折腾，用 AI 放大真诚的声音。
          </p>
        </div>
      </footer>
    </div>
  );
}
