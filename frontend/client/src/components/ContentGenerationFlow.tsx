import { useState } from "react";
import { FEEDBACK_STEPS } from "../const";
import { Sparkles, ArrowRight, ChevronDown, CheckCircle2, History, MessageSquare, AlertCircle } from "lucide-react";
import { toast } from "sonner";

interface ContentGenerationFlowProps {
  onSelectVersion: (version: "v1" | "v2" | "v3" | "final") => void;
  selectedVersion: "v1" | "v2" | "v3" | "final";
}

export default function ContentGenerationFlow({ onSelectVersion, selectedVersion }: ContentGenerationFlowProps) {
  const [expandedStep, setExpandedFeedback] = useState<string | null>(null);

  // Define 5 key evolution stages
  const STAGES = [
    {
      id: "whisper",
      title: "1. 原始碎碎念",
      badge: "INPUT",
      desc: "粗糙的、精疲力竭的深夜真实想法倾倒",
      action: () => {
        toast.info("原始碎碎念已在上方输入框展示，供 AI 提取灵感。");
      }
    },
    {
      id: "v1",
      title: "2. 原始初稿 (v1)",
      badge: "DRAFT v1",
      desc: "结合过去风格，但因过度去 AI 味删光了信息量",
      action: () => {
        onSelectVersion("v1");
        toast.success("已切换至 v1 原始初稿");
      }
    },
    {
      id: "v2",
      title: "3. 内容补全 (v2)",
      badge: "DRAFT v2",
      desc: "找回被删减的核心概念，字数翻倍但排版平淡",
      action: () => {
        onSelectVersion("v2");
        toast.success("已切换至 v2 内容补全版");
      }
    },
    {
      id: "v3",
      title: "4. 前额叶强化 (v3)",
      badge: "DRAFT v3",
      desc: "大篇幅扩充前额叶机制，引入 H2 标题和分隔线",
      action: () => {
        onSelectVersion("v3");
        toast.success("已切换至 v3 前额叶强化版");
      }
    },
    {
      id: "final",
      title: "5. 最终定稿 (Final)",
      badge: "FINAL",
      desc: "改换疑问式标题，核实文献引用，完美收尾排版",
      action: () => {
        onSelectVersion("final");
        toast.success("已切换至最终完美定稿！");
      }
    }
  ];

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden shadow-sm flex flex-col p-5">
      {/* 1. Header */}
      <div className="border-b border-border pb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-full text-primary" />
          <span className="font-serif text-xs font-bold text-foreground uppercase tracking-wider">
            五阶段文章打磨轨迹（从碎碎念到完美定稿）
          </span>
        </div>
        <span className="text-[10px] font-mono text-primary bg-primary/10 px-2 py-0.5 rounded border border-primary/20">
          SOP Evolution Trace
        </span>
      </div>

      {/* 2. Horizontal Stage Stepper */}
      <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 my-5">
        {STAGES.map((stage) => {
          const isSelected = 
            (stage.id === "whisper" && selectedVersion === "v1") || // whisper triggers v1 preview
            selectedVersion === stage.id;

          return (
            <button
              key={stage.id}
              onClick={stage.action}
              className={`p-3 rounded-lg border text-left flex flex-col gap-1 transition-all relative ${
                isSelected
                  ? "bg-primary/5 border-primary text-foreground shadow-sm ring-1 ring-primary/20"
                  : "bg-background border-border/70 hover:border-primary/30 text-muted-foreground"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className={`font-mono text-[8px] font-bold px-1.5 py-0.5 rounded ${
                  isSelected ? "bg-primary/15 text-primary" : "bg-muted text-muted-foreground"
                }`}>
                  {stage.badge}
                </span>
                {isSelected && <CheckCircle2 className="w-3.5 h-full text-primary animate-pulse" />}
              </div>
              <span className="font-serif text-xs font-bold text-foreground mt-1">
                {stage.title}
              </span>
              <span className="text-[10px] leading-relaxed line-clamp-2">
                {stage.desc}
              </span>
            </button>
          );
        })}
      </div>

      {/* 3. Feedback Details Accordion (打磨微调过程) */}
      <div className="flex flex-col gap-3 mt-2">
        <div className="flex items-center gap-1.5 border-b border-border/40 pb-2 mb-1">
          <History className="w-3.5 h-full text-muted-foreground" />
          <span className="font-serif text-xs font-bold text-muted-foreground">
            协同微调迭代记录 (来自 feedback/ 目录)
          </span>
        </div>

        <div className="flex flex-col gap-2">
          {FEEDBACK_STEPS.map((step, idx) => {
            const isExpanded = expandedStep === step.to;
            return (
              <div key={idx} className="border border-border/50 rounded-lg bg-background overflow-hidden">
                <button
                  onClick={() => {
                    setExpandedFeedback(isExpanded ? null : step.to);
                    onSelectVersion(step.to as any);
                  }}
                  className="w-full px-4 py-2.5 bg-muted/10 hover:bg-muted/30 transition-colors flex items-center justify-between text-left"
                >
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[9px] font-bold bg-amber-500/10 text-amber-600 dark:text-amber-400 px-1.5 py-0.5 rounded uppercase">
                      {step.from.toUpperCase()} ➔ {step.to.toUpperCase()}
                    </span>
                    <span className="font-serif text-xs font-bold text-foreground">
                      {step.title}
                    </span>
                  </div>
                  <ChevronDown className={`w-4 h-full text-muted-foreground transition-transform duration-200 ${isExpanded ? "transform rotate-180" : ""}`} />
                </button>

                {isExpanded && (
                  <div className="p-4 border-t border-border/30 flex flex-col gap-3 bg-card animate-in fade-in slide-in-from-top-1 duration-200">
                    <div className="text-[11px] font-serif italic text-amber-600 dark:text-amber-400 bg-amber-500/5 p-2.5 rounded border border-amber-500/10 leading-relaxed flex gap-1.5">
                      <MessageSquare className="w-3.5 h-full shrink-0 mt-0.5" />
                      <div>
                        <strong className="not-italic block text-[10px] uppercase font-mono text-amber-600 dark:text-amber-400 mb-0.5">Asuka 的反馈意见：</strong>
                        {step.feedback}
                      </div>
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <span className="text-[10px] font-mono font-bold text-muted-foreground uppercase flex items-center gap-1">
                        <AlertCircle className="w-3 h-full" />
                        改动明细 (CHANGES):
                      </span>
                      <ul className="list-disc list-inside text-[11px] font-serif text-foreground/80 flex flex-col gap-1 leading-relaxed pl-1">
                        {step.changes.map((change, cIdx) => (
                          <li key={cIdx}>{change}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
