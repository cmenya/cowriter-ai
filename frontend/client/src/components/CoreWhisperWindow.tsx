import { useState } from "react";
import { INITIAL_WHISPER, SKILLS } from "../const";
import { MessageSquare, Sparkles, Brain, ArrowRight, Settings, Play } from "lucide-react";
import { toast } from "sonner";

interface CoreWhisperWindowProps {
  onTriggerGenerate: (whisperText: string) => void;
}

export default function CoreWhisperWindow({ onTriggerGenerate }: CoreWhisperWindowProps) {
  const [whisperText, setWhisperText] = useState(INITIAL_WHISPER);
  const [showLogic, setShowLogic] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = () => {
    if (!whisperText.trim()) {
      toast.error("碎碎念窗口不能为空哦，写点什么吧！");
      return;
    }
    setIsGenerating(true);
    toast.info("✨ CoWriter 正在深度融合您的碎碎念、参考素材和 Style DNA...", {
      duration: 3000
    });
    
    setTimeout(() => {
      setIsGenerating(false);
      onTriggerGenerate(whisperText);
      toast.success("🚀 融合成功！初稿 v1 已生成，请查看下方的内容生成流程！");
    }, 2000);
  };

  return (
    <div className="flex flex-col gap-6 w-full">
      {/* 1. Core Window: Whisper Input */}
      <div className="bg-card border border-border rounded-lg overflow-hidden shadow-sm flex flex-col w-full">
        {/* Window Header */}
        <div className="px-5 py-3.5 border-b border-border bg-muted/20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MessageSquare className="w-4 h-full text-amber-500" />
            <span className="font-serif text-xs font-bold text-foreground uppercase tracking-wider">
              1. “碎碎念”灵感沙盒窗口 (Whisper Box)
            </span>
          </div>
          <span className="text-[10px] font-mono text-muted-foreground bg-muted px-2 py-0.5 rounded border border-border/40">
            notes/2026-06-01_拖延灵感.md
          </span>
        </div>

        {/* Window Body: Interactive Textarea */}
        <div className="p-5 flex flex-col gap-4">
          <p className="font-serif text-xs text-muted-foreground leading-relaxed">
            💡 <strong>在这里输入或倾倒您的灵感想法</strong>。不需要任何精美排版，随手记下一句话、一个自嘲、或者一段粗糙的想法。CoWriter 写作流将以此为“灵魂”进行扩写。
          </p>

          <div className="relative w-full">
            <textarea
              value={whisperText}
              onChange={(e) => setWhisperText(e.target.value)}
              placeholder="在这里输入您的灵感碎碎念..."
              className="w-full min-h-[160px] p-4 font-serif text-xs bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/40 resize-y leading-relaxed text-foreground/90"
            />
            {/* Post-it Note Corner Aesthetic */}
            <div className="absolute bottom-2 right-2 w-3 h-3 bg-amber-500/20 rounded-tl-md border-t border-l border-amber-500/30 pointer-events-none" />
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-3 pt-1">
            <button
              onClick={handleGenerate}
              disabled={isGenerating}
              className={`w-full sm:flex-1 py-2.5 px-4 rounded-lg font-mono text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-sm ${
                isGenerating
                  ? "bg-muted text-muted-foreground border border-border cursor-not-allowed"
                  : "bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-md active:scale-[0.98]"
              }`}
            >
              <Sparkles className="w-4 h-full" />
              {isGenerating ? "AI 融合生成中..." : "一键融合生成初稿"}
            </button>

            <button
              onClick={() => {
                setShowLogic(!showLogic);
                toast.info(showLogic ? "已收起生成逻辑面板" : "💡 已展开 CoWriter 核心生成逻辑图！");
              }}
              className={`w-full sm:w-auto py-2.5 px-4 rounded-lg font-mono text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 border transition-all ${
                showLogic
                  ? "bg-amber-500/10 border-amber-500/30 text-amber-600 dark:text-amber-400"
                  : "bg-background border-border hover:bg-muted text-muted-foreground hover:text-foreground"
              }`}
            >
              <Brain className="w-4 h-full" />
              {showLogic ? "隐藏生成逻辑" : "显示生成逻辑"}
            </button>
          </div>
        </div>
      </div>

      {/* 2. Visualized Generation Logic Panel (Conditional Render) */}
      {showLogic && (
        <div className="bg-amber-500/5 border border-amber-500/20 rounded-lg p-5 flex flex-col gap-4 animate-in fade-in slide-in-from-top-3 duration-300 w-full">
          <div className="flex items-center gap-2 border-b border-amber-500/15 pb-2.5">
            <Brain className="w-4 h-full text-amber-500" />
            <h4 className="font-serif text-xs font-bold text-foreground uppercase tracking-wider">
              CoWriter AI 核心生成逻辑可视化
            </h4>
          </div>

          <p className="font-serif text-xs text-muted-foreground leading-relaxed">
            CoWriter 不是简单的扩写，而是通过一个<strong>多源约束网络</strong>。在生成初稿时，AI 会在底层建立三个核心锚点，以确保产出的内容兼具<strong>您的灵魂、充足的信息量和极高的人性化质感</strong>：
          </p>

          {/* Flow Diagram (Pure Tailwind) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-2">
            {/* Input 1: Soul Whisper */}
            <div className="bg-background border border-amber-500/15 rounded-lg p-3 flex flex-col gap-1.5 relative">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-amber-500" />
                <span className="font-mono text-[9px] font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
                  灵魂输入 (Soul)
                </span>
              </div>
              <span className="font-serif text-xs font-semibold text-foreground">您的碎碎念</span>
              <p className="text-[10px] text-muted-foreground leading-relaxed font-serif">
                提取最真实的个人直觉、情绪、自嘲和切入点。
              </p>
              <div className="hidden md:block absolute -right-3.5 top-1/2 -translate-y-1/2 z-10">
                <ArrowRight className="w-4 h-full text-amber-500/40" />
              </div>
            </div>

            {/* Input 2: Style DNA & Skills */}
            <div className="bg-background border border-amber-500/15 rounded-lg p-3 flex flex-col gap-1.5 relative">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-primary" />
                <span className="font-mono text-[9px] font-bold uppercase tracking-wider text-primary">
                  风格约束 (Style DNA)
                </span>
              </div>
              <span className="font-serif text-xs font-semibold text-foreground">写作基因与 Skill</span>
              <p className="text-[10px] text-muted-foreground leading-relaxed font-serif">
                强制注入中短句、口语连缀、括号吐槽，封禁大厂黑话词。
              </p>
              <div className="hidden md:block absolute -right-3.5 top-1/2 -translate-y-1/2 z-10">
                <ArrowRight className="w-4 h-full text-amber-500/40" />
              </div>
            </div>

            {/* Input 3: Reference Material */}
            <div className="bg-background border border-amber-500/15 rounded-lg p-3 flex flex-col gap-1.5">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span className="font-mono text-[9px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                  素材扩充 (Material)
                </span>
              </div>
              <span className="font-serif text-xs font-semibold text-foreground">参考文章 / 学术文献</span>
              <p className="text-[10px] text-muted-foreground leading-relaxed font-serif">
                补充心理账户、前额叶等科学论据，拒绝空洞说教。
              </p>
            </div>
          </div>

          {/* Logic Engine Pipeline details */}
          <div className="bg-background/50 border border-amber-500/10 rounded-lg p-3.5 flex flex-col gap-2">
            <span className="font-mono text-[9px] font-bold text-amber-600 dark:text-amber-400 flex items-center gap-1">
              <Settings className="w-3 h-full animate-spin" />
              ENGINE PIPELINE (运行期指令装载)
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[11px] font-serif leading-relaxed text-muted-foreground">
              {SKILLS.map((skill, idx) => (
                <div key={idx} className="flex flex-col gap-1 bg-background/30 p-2.5 rounded border border-border/40">
                  <span className="font-mono font-bold text-foreground text-[10px] flex items-center gap-1">
                    <Play className="w-2.5 h-full text-primary" />
                    {skill.name}
                  </span>
                  <p className="text-[10px]">{skill.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
