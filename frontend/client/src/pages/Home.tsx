import { useState } from "react";
import { ThemeProvider, useTheme } from "../contexts/ThemeContext";
import { SOUL_PROFILE } from "../const";
import CoreWhisperWindow from "../components/CoreWhisperWindow";
import ContentGenerationFlow from "../components/ContentGenerationFlow";
import AvoidWordsCard from "../components/AvoidWordsCard";
import ArticleReader from "../components/ArticleReader";
import SoulProfileCard from "../components/SoulProfileCard";
import { Sparkles, Moon, Sun, Laptop, FileText, Compass, Settings, ExternalLink, RefreshCw } from "lucide-react";
import { toast } from "sonner";

export default function Home() {
  const { theme, toggleTheme } = useTheme();
  const [selectedVersion, setSelectedVersion] = useState<"v1" | "v2" | "v3" | "final">("final");

  const handleTriggerGenerate = (whisperText: string) => {
    // When user triggers generate, we switch the active step in content flow to v1 (Step 2)
    setSelectedVersion("v1");
  };

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground transition-colors duration-200">
      {/* 1. TOPBAR (Obsidian Workspace Header) */}
      <header className="sticky top-0 z-40 w-full border-b border-border bg-background/95 backdrop-blur">
        <div className="container h-14 flex items-center justify-between">
          {/* Logo & Title */}
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center border border-primary/20">
              <Sparkles className="w-4.5 h-full text-primary" />
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-sm font-bold tracking-tight text-foreground flex items-center gap-1.5">
                CoWriter AI Frontend
                <span className="text-[10px] font-mono font-bold bg-amber-500/10 text-amber-600 dark:text-amber-400 px-1.5 py-0.5 rounded border border-amber-500/20">
                  v2.0
                </span>
              </span>
              <span className="text-[10px] font-mono text-muted-foreground leading-none mt-0.5">
                Obsidian-inspired Minimalist Digital Journal
              </span>
            </div>
          </div>

          {/* Controls & Theme Switcher */}
          <div className="flex items-center gap-3">
            {/* Quick Refresh */}
            <button
              onClick={() => {
                toast.success("✨ 前端数据已与本地仓库同步，工作流就绪！");
              }}
              className="p-2 rounded-lg border border-border hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
              title="同步仓库状态"
            >
              <RefreshCw className="w-4 h-full" />
            </button>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg border border-border hover:bg-muted text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1.5 font-mono text-xs"
              title="切换主题"
            >
              {theme === "light" ? (
                <>
                  <Sun className="w-4 h-full text-amber-500" />
                  <span className="hidden sm:inline">Light</span>
                </>
              ) : (
                <>
                  <Moon className="w-4 h-full text-indigo-400" />
                  <span className="hidden sm:inline">Dark</span>
                </>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* 2. HERO / HERO BANNER */}
      <section className="bg-muted/10 border-b border-border py-8 md:py-10">
        <div className="container flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex-1 flex flex-col gap-2.5 max-w-2xl">
            <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-primary bg-primary/10 px-2 py-0.5 rounded self-start border border-primary/20">
              AI-Powered Writing Workflow
            </span>
            <h1 className="font-serif text-2xl md:text-3xl font-bold tracking-tight text-foreground leading-tight">
              CoWriter AI：让文字找回您的灵魂
            </h1>
            <p className="font-serif text-xs md:text-sm text-muted-foreground leading-relaxed">
              这是一个专为<strong>职场妈妈、在日华侨、IT 银行出身的创作者 Cmenya</strong> 打造的去 AI 味写作工作流。
              在这里，您的碎碎念将与专业心理学文献完美交织，融合成带有您独家 Style DNA 的高质感文章。
            </p>
          </div>

          {/* Small Profile Card inline */}
          <div className="w-full md:w-80 shrink-0">
            <SoulProfileCard />
          </div>
        </div>
      </section>

      {/* 3. MAIN WORKSPACE */}
      <main className="flex-1 container py-8 flex flex-col gap-8">
        {/* TOP ROW: Whisper Input & Avoid Words Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Whisper Window & Logic (8 cols) */}
          <div className="lg:col-span-7 xl:col-span-8 flex flex-col gap-8">
            <CoreWhisperWindow onTriggerGenerate={handleTriggerGenerate} />
          </div>

          {/* Right: Avoid Words (4 cols) */}
          <div className="lg:col-span-5 xl:col-span-4">
            <AvoidWordsCard />
          </div>
        </div>

        {/* MIDDLE SECTION: Content Generation Flow SOP */}
        <section className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-primary" />
            <h3 className="font-serif text-sm font-bold text-foreground uppercase tracking-wider">
              Content Generation Flow (内容生成流展示)
            </h3>
          </div>
          <ContentGenerationFlow 
            selectedVersion={selectedVersion} 
            onSelectVersion={setSelectedVersion} 
          />
        </section>

        {/* BOTTOM SECTION: Obsidian Reader (The Output Vault) */}
        <section className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
              <h3 className="font-serif text-sm font-bold text-foreground uppercase tracking-wider">
                Document Reader (成品与草稿阅览器)
              </h3>
            </div>
            <span className="text-[10px] font-mono text-muted-foreground flex items-center gap-1">
              <FileText className="w-3 h-full" />
              final/为什么前一天晚上做一点第二天就会轻松很多_final.md
            </span>
          </div>
          <ArticleReader 
            selectedVersion={selectedVersion} 
            onSelectVersion={setSelectedVersion} 
          />
        </section>
      </main>

      {/* 4. FOOTER */}
      <footer className="border-t border-border bg-muted/20 py-6 mt-12">
        <div className="container flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex flex-col gap-1">
            <span className="font-serif text-xs font-bold text-foreground">
              CoWriter AI • Built with Passion & Vibe Coding
            </span>
            <span className="text-[10px] font-mono text-muted-foreground">
              © 2026 Cmenya. Open sourced under MIT License.
            </span>
          </div>
          <div className="flex items-center gap-4 text-[10px] font-mono text-muted-foreground">
            <a 
              href="https://github.com/cmenya/cowriter-ai" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-foreground transition-colors flex items-center gap-1"
            >
              GitHub Repository
              <ExternalLink className="w-3 h-full" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
