import { useState } from "react";
import { useTheme } from "../contexts/ThemeContext";
import CoreWhisperWindow from "../components/CoreWhisperWindow";
import ContentGenerationFlow from "../components/ContentGenerationFlow";
import AvoidWordsCard from "../components/AvoidWordsCard";
import ArticleReader from "../components/ArticleReader";
import { Sparkles, Moon, Sun, FileText, ExternalLink, RefreshCw, Eye, Ban, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";

export default function Home() {
  const { theme, toggleTheme } = useTheme();
  const [selectedVersion, setSelectedVersion] = useState<"v1" | "v2" | "v3" | "final">("final");

  const handleTriggerGenerate = (whisperText: string) => {
    setSelectedVersion("v1");
  };

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground transition-colors duration-200">
      {/* 1. TOPBAR */}
      <header className="sticky top-0 z-40 w-full border-b border-border bg-background/95 backdrop-blur">
        <div className="container h-14 flex items-center justify-between">
          {/* Logo & Title */}
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center border border-primary/20">
              <Sparkles className="w-4 h-full text-primary" />
            </div>
            <span className="font-serif text-xs font-bold tracking-tight text-foreground flex items-center gap-1.5">
              CoWriter AI
              <span className="text-[9px] font-mono font-bold bg-amber-500/10 text-amber-600 dark:text-amber-400 px-1.5 py-0.5 rounded border border-amber-500/20">
                Asuka v4.0
              </span>
            </span>
          </div>

          {/* Controls & Theme Switcher */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                toast.success("✨ 写作偏好与 final/ 目录数据已同步成功！");
              }}
              className="p-1.5 rounded-lg border border-border hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
              title="同步偏好数据"
            >
              <RefreshCw className="w-3.5 h-full" />
            </button>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-1.5 rounded-lg border border-border hover:bg-muted text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1 font-mono text-[10px]"
              title="切换主题"
            >
              {theme === "light" ? (
                <>
                  <Sun className="w-3.5 h-full text-amber-500" />
                  <span className="hidden sm:inline">Light</span>
                </>
              ) : (
                <>
                  <Moon className="w-3.5 h-full text-indigo-400" />
                  <span className="hidden sm:inline">Dark</span>
                </>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* 2. HERO / 我是谁 (极致精简) */}
      <section className="bg-muted/10 border-b border-border py-6">
        <div className="container">
          <div className="flex flex-col gap-1.5 max-w-3xl">
            <h1 className="font-serif text-lg font-bold tracking-tight text-foreground flex items-center gap-2">
              我是谁 (About Asuka)
            </h1>
            <p className="font-serif text-xs text-muted-foreground leading-relaxed">
              一个在日本生活了 15 年的职场妈妈，银行 IT 出身。我深度拥抱 AI，拒绝无趣的说教与冰冷的大厂黑话，只写有温度、有呼吸感的个人叙事。
            </p>
          </div>
        </div>
      </section>

      {/* 3. MAIN WORKSPACE */}
      <main className="flex-1 container py-6 flex flex-col gap-6">
        {/* TOP ROW: Whisper Input (Left, Large) & Avoid Words Card (Right, Small) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left: Whisper Window (8 cols) */}
          <div className="lg:col-span-8">
            <CoreWhisperWindow onTriggerGenerate={handleTriggerGenerate} />
          </div>

          {/* Right: Avoid Words Card (4 cols) - 轻量化小文本框 */}
          <div className="lg:col-span-4 h-full">
            <AvoidWordsCard />
          </div>
        </div>

        {/* MIDDLE SECTION: Content Generation Flow (重点展示五阶段迭代轨迹) */}
        <section className="flex flex-col gap-3">
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-primary" />
            <h3 className="font-serif text-xs font-bold text-foreground uppercase tracking-wider">
              文章迭代轨迹（从碎碎念到完美定稿）
            </h3>
          </div>
          <ContentGenerationFlow 
            selectedVersion={selectedVersion} 
            onSelectVersion={setSelectedVersion} 
          />
        </section>

        {/* BEFORE & AFTER: 终极对比面板 */}
        <section className="bg-card border border-border rounded-lg overflow-hidden shadow-sm flex flex-col">
          <div className="px-4 py-3 border-b border-border bg-muted/20 flex items-center gap-1.5">
            <Eye className="w-3.5 h-full text-emerald-500" />
            <span className="font-serif text-xs font-bold text-foreground uppercase tracking-wider">
              Before & After：去 AI 味前后终极对比
            </span>
          </div>
          <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Before (AI Style) */}
            <div className="bg-red-500/2 border border-red-500/10 rounded-lg p-3 flex flex-col gap-2">
              <span className="font-mono text-[9px] font-bold text-red-600 dark:text-red-400 uppercase tracking-wider flex items-center gap-1.5">
                <Ban className="w-3 h-full" />
                Before：AI 腔 / 大厂黑话版（冰冷堆砌）
              </span>
              <p className="font-serif text-[11px] text-muted-foreground leading-relaxed italic bg-background/50 p-2.5 rounded border border-border/30">
                “我们必须深刻理解拖延症背后的<strong>底层逻辑</strong>，通过建立科学的<strong>抓手</strong>，在日常任务中形成执行力<strong>闭环</strong>。此外，众所周知，早起规划具有重要意义，然而由于前额叶在刚开始任务时处于未激活光谱，我们需要对其进行<strong>赋能</strong>以顺势而为……”
              </p>
              <span className="text-[10px] text-rose-500 font-serif leading-normal">
                ❌ 诊断：充斥着“底层逻辑、闭环、赋能”等生硬大厂黑话，缺乏真实的带娃细节与自嘲，冰冷说教。
              </span>
            </div>

            {/* After (Asuka Style) */}
            <div className="bg-emerald-500/2 border border-emerald-500/10 rounded-lg p-3 flex flex-col gap-2">
              <span className="font-mono text-[9px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                <CheckCircle2 className="w-3 h-full animate-pulse" />
                After：Asuka 风格版（有呼吸感、有自嘲）
              </span>
              <p className="font-serif text-[11px] text-foreground/90 leading-relaxed italic bg-background/50 p-2.5 rounded border border-border/30">
                “我做过很多次这样的事。一觉睡过去，任务就换了账。买东西付了定金，尾款突然就没那么难接受，是同一个原理。晚上是任务的起点，白天是续集。（我家有个6岁的小孩，哄睡要一个小时，等他终于睡着，我的专注力也基本耗完了。这种时候我非常了解自己晚上的德性🤪）不需要很多，动一下就够了。”
              </p>
              <span className="text-[10px] text-emerald-600 font-serif leading-normal">
                ✓ 净化：用口语中短句和“定金尾款”生动比喻替代大厂黑话，融入了哄娃、深夜精疲力竭的真实自嘲。
              </span>
            </div>
          </div>
        </section>

        {/* BOTTOM SECTION: Obsidian Reader (阅览窗口：默认仅展示 Final 真实原文) */}
        <section className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
              <h3 className="font-serif text-xs font-bold text-foreground uppercase tracking-wider">
                Obsidian Reader Panel (阅览窗口)
              </h3>
            </div>
            <span className="text-[9px] font-mono text-muted-foreground flex items-center gap-1">
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
      <footer className="border-t border-border bg-muted/20 py-4 mt-8">
        <div className="container flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <div className="flex flex-col gap-0.5">
            <span className="font-serif text-[10px] font-bold text-foreground">
              CoWriter AI • Built for Asuka with Passion
            </span>
            <span className="text-[9px] font-mono text-muted-foreground">
              © 2026 Asuka. Open sourced under MIT License.
            </span>
          </div>
          <div className="flex items-center gap-4 text-[9px] font-mono text-muted-foreground">
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
