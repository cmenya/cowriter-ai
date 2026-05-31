import { useState } from "react";
import { STYLE_DNA, SKILLS, REFERENCE_MATERIAL, FEEDBACK_STEPS, ARTICLE_VERSIONS } from "../const";
import { Sparkles, ArrowDown, ChevronDown, CheckCircle2, History, RefreshCw, FileText, ArrowRight, BookOpen, AlertCircle, Ban } from "lucide-react";
import { toast } from "sonner";

interface ContentGenerationFlowProps {
  onSelectVersion: (version: "v1" | "v2" | "v3" | "final") => void;
  selectedVersion: "v1" | "v2" | "v3" | "final";
}

export default function ContentGenerationFlow({ onSelectVersion, selectedVersion }: ContentGenerationFlowProps) {
  const [activeStep, setActiveStep] = useState<1 | 2 | 3>(1);
  const [expandedFeedback, setExpandedFeedback] = useState<string | null>(null);

  const handleStepClick = (step: 1 | 2 | 3) => {
    setActiveStep(step);
    if (step === 1) {
      onSelectVersion("v1");
    } else if (step === 2) {
      onSelectVersion("v1"); // or v2
    } else if (step === 3) {
      onSelectVersion("final");
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden shadow-sm flex flex-col gap-6 p-5">
      {/* Header */}
      <div className="border-b border-border pb-3.5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-full text-primary" />
          <span className="font-serif text-sm font-bold text-foreground">
            CoWriter 核心内容生成流程
          </span>
        </div>
        <span className="text-[10px] font-mono text-emerald-600 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 animate-pulse">
          SOP 运行面板
        </span>
      </div>

      {/* Step Tabs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {/* Step 1 Tab */}
        <button
          onClick={() => handleStepClick(1)}
          className={`p-4 rounded-lg border text-left flex flex-col gap-1.5 transition-all relative ${
            activeStep === 1
              ? "bg-primary/5 border-primary text-foreground shadow-sm"
              : "bg-background border-border hover:border-primary/20 text-muted-foreground"
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="font-mono text-[10px] font-bold uppercase tracking-wider bg-primary/10 text-primary px-1.5 py-0.5 rounded">
              STEP 01
            </span>
            <CheckCircle2 className={`w-4 h-full ${activeStep === 1 ? "text-primary" : "text-muted-foreground/30"}`} />
          </div>
          <span className="font-serif text-xs font-bold text-foreground">结合过去风格 (DNA)</span>
          <span className="text-[10px] leading-relaxed">
            从 my-writing/ 中提炼您的写作习惯、自嘲口吻和吐槽。
          </span>
        </button>

        {/* Step 2 Tab */}
        <button
          onClick={() => handleStepClick(2)}
          className={`p-4 rounded-lg border text-left flex flex-col gap-1.5 transition-all relative ${
            activeStep === 2
              ? "bg-primary/5 border-primary text-foreground shadow-sm"
              : "bg-background border-border hover:border-primary/20 text-muted-foreground"
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="font-mono text-[10px] font-bold uppercase tracking-wider bg-primary/10 text-primary px-1.5 py-0.5 rounded">
              STEP 02
            </span>
            <CheckCircle2 className={`w-4 h-full ${activeStep === 2 ? "text-primary" : "text-muted-foreground/30"}`} />
          </div>
          <span className="font-serif text-xs font-bold text-foreground">装载 Skill 形成初稿</span>
          <span className="text-[10px] leading-relaxed">
            加载 de-AI-writing 指令，结合素材输出自然初稿 (v1)。
          </span>
        </button>

        {/* Step 3 Tab */}
        <button
          onClick={() => handleStepClick(3)}
          className={`p-4 rounded-lg border text-left flex flex-col gap-1.5 transition-all relative ${
            activeStep === 3
              ? "bg-primary/5 border-primary text-foreground shadow-sm"
              : "bg-background border-border hover:border-primary/20 text-muted-foreground"
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="font-mono text-[10px] font-bold uppercase tracking-wider bg-primary/10 text-primary px-1.5 py-0.5 rounded">
              STEP 03
            </span>
            <CheckCircle2 className={`w-4 h-full ${activeStep === 3 ? "text-primary" : "text-muted-foreground/30"}`} />
          </div>
          <span className="font-serif text-xs font-bold text-foreground">协同微调，迭代至定稿</span>
          <span className="text-[10px] leading-relaxed">
            经历 v2、v3 多轮反馈与学术核实，打磨至完美 final 稿。
          </span>
        </button>
      </div>

      {/* Step Detail Content Panel */}
      <div className="bg-background border border-border rounded-lg p-5">
        {/* STEP 1: STYLE DNA MATCHING */}
        {activeStep === 1 && (
          <div className="flex flex-col gap-4 animate-in fade-in duration-300">
            <div className="flex items-center justify-between border-b border-border/60 pb-2">
              <span className="font-serif text-xs font-bold text-foreground flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-full text-primary" />
                第一步：如何完美对标您的 Style DNA？
              </span>
              <span className="text-[10px] font-mono text-muted-foreground">my-writing/style-dna.md</span>
            </div>

            <p className="font-serif text-xs text-muted-foreground leading-relaxed">
              CoWriter 写作流会在启动时优先解析您在 <code>my-writing/</code> 目录下的真实过往文章，并提取出核心的<strong>写作风格基因</strong>。生成时，系统会严格遵循以下语言习惯：
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-1">
              <div className="bg-card border border-border/60 rounded-lg p-3.5 flex flex-col gap-2">
                <span className="text-[11px] font-mono font-bold text-primary">✓ 句式与结构习惯</span>
                <ul className="list-disc list-inside font-serif text-[11px] text-foreground/80 flex flex-col gap-1.5 leading-relaxed">
                  {STYLE_DNA.grammar.map((g, idx) => (
                    <li key={idx}>{g}</li>
                  ))}
                </ul>
              </div>

              <div className="bg-card border border-border/60 rounded-lg p-3.5 flex flex-col gap-2">
                <span className="text-[11px] font-mono font-bold text-amber-600 dark:text-amber-400">💬 括号吐槽/自嘲机制</span>
                <p className="font-serif text-[11px] text-foreground/80 leading-relaxed">
                  在情感流露、自我调侃或内耗时，自动在行文间穿插<strong>括号碎碎念</strong>，打破 AI 的冰冷与客观。
                </p>
                <div className="bg-background p-2 rounded border border-border/40 text-[10px] font-serif italic text-muted-foreground">
                  {STYLE_DNA.bracketsExample}
                </div>
              </div>
            </div>

            <div className="bg-amber-500/5 border border-amber-500/10 rounded-lg p-3.5 flex flex-col gap-1.5">
              <span className="text-xs font-mono font-bold text-amber-600 dark:text-amber-400 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-full" />
                风格锚定状态
              </span>
              <p className="font-serif text-[11px] text-muted-foreground leading-relaxed">
                当前风格锚定成功。CoWriter 将以您<strong>“在日本生活的 15 年中年女性、IT 银行背景、拧巴纠结但充满行动力”</strong>的真实人设进行视角展开，绝不使用空洞的第三人称说教。
              </p>
            </div>
          </div>
        )}

        {/* STEP 2: SKILL & INITIAL DRAFT */}
        {activeStep === 2 && (
          <div className="flex flex-col gap-4 animate-in fade-in duration-300">
            <div className="flex items-center justify-between border-b border-border/60 pb-2">
              <span className="font-serif text-xs font-bold text-foreground flex items-center gap-1.5">
                <RefreshCw className="w-3.5 h-full text-primary" />
                第二步：装载 Skill 与素材，融合输出首版初稿 (v1)
              </span>
              <span className="text-[10px] font-mono text-muted-foreground">drafts/v1_我和拖延症的十几年.md</span>
            </div>

            <p className="font-serif text-xs text-muted-foreground leading-relaxed">
              在这个阶段，系统会将您的<strong>碎碎念灵感</strong>与 <code>articles/</code> 目录下的<strong>参考素材</strong>进行核心对齐，并自动挂载已安装的 <strong>Skill 指令</strong>，输出第一版初稿：
            </p>

            {/* Visual mapping */}
            <div className="flex flex-col sm:flex-row items-stretch gap-3 my-1">
              <div className="flex-1 bg-card border border-border/60 rounded-lg p-3 flex flex-col gap-1">
                <span className="font-mono text-[10px] font-bold text-amber-600 uppercase">Input Material</span>
                <span className="font-serif text-xs font-semibold text-foreground">参考素材与灵感</span>
                <p className="text-[10px] text-muted-foreground font-serif leading-relaxed mt-1">
                  融合心理账户、决策消耗、前额叶机制、蔡加尼克效应等核心原理。
                </p>
              </div>

              <div className="flex items-center justify-center shrink-0">
                <ArrowRight className="w-4 h-full text-muted-foreground hidden sm:block" />
                <ArrowDown className="w-4 h-full text-muted-foreground sm:hidden" />
              </div>

              <div className="flex-1 bg-card border border-border/60 rounded-lg p-3 flex flex-col gap-1">
                <span className="font-mono text-[10px] font-bold text-primary uppercase">Active Skill</span>
                <span className="font-serif text-xs font-semibold text-foreground">/de-AI-writing</span>
                <p className="text-[10px] text-muted-foreground font-serif leading-relaxed mt-1">
                  过滤黑话、首段经历切入、控制破折号数量、注入连贯流水口语。
                </p>
              </div>

              <div className="flex items-center justify-center shrink-0">
                <ArrowRight className="w-4 h-full text-muted-foreground hidden sm:block" />
                <ArrowDown className="w-4 h-full text-muted-foreground sm:hidden" />
              </div>

              <div className="flex-1 bg-primary/5 border border-primary/20 rounded-lg p-3 flex flex-col gap-1 justify-center">
                <span className="font-mono text-[10px] font-bold text-primary uppercase">Output</span>
                <span className="font-serif text-xs font-bold text-foreground">初稿 (Draft v1)</span>
                <button 
                  onClick={() => {
                    onSelectVersion("v1");
                    toast.success("已为您在右侧/下方切换展示 Draft v1 原始初稿！");
                  }}
                  className="mt-1.5 py-1 px-2 bg-primary text-primary-foreground rounded text-[9px] font-mono font-bold uppercase tracking-wider hover:bg-primary/90 transition-all text-center"
                >
                  查看初稿内容
                </button>
              </div>
            </div>

            {/* Reference material card preview */}
            <div className="bg-muted/50 border border-border rounded-lg p-3">
              <span className="text-[10px] font-mono font-bold text-muted-foreground uppercase block mb-1">
                素材来源 (REFERENCE DATA)
              </span>
              <pre className="text-[10px] font-serif text-muted-foreground whitespace-pre-wrap leading-relaxed">
                {REFERENCE_MATERIAL}
              </pre>
            </div>
          </div>
        )}

        {/* STEP 3: MULTI-ROUND FEEDBACK & FINAL */}
        {activeStep === 3 && (
          <div className="flex flex-col gap-4 animate-in fade-in duration-300">
            <div className="flex items-center justify-between border-b border-border/60 pb-2">
              <span className="font-serif text-xs font-bold text-foreground flex items-center gap-1.5">
                <History className="w-3.5 h-full text-primary" />
                第三步：人机协同多轮微调，迭代至最终定稿
              </span>
              <span className="text-[10px] font-mono text-muted-foreground">feedback/ & final/</span>
            </div>

            <p className="font-serif text-xs text-muted-foreground leading-relaxed">
              好文章是改出来的。在初稿基础上，您可以通过对话或写入 <code>feedback/</code> 文件夹，指导 CoWriter 经历多轮迭代（补全信息、突出核心、核实文献引用），最终输出完美定稿：
            </p>

            {/* Interactive Feedback Steps Timeline */}
            <div className="flex flex-col gap-2 my-1">
              {FEEDBACK_STEPS.map((step, idx) => {
                const isExpanded = expandedFeedback === step.to;
                return (
                  <div key={idx} className="border border-border/60 rounded-lg bg-card overflow-hidden">
                    <button
                      onClick={() => {
                        setExpandedFeedback(isExpanded ? null : step.to);
                        if (step.to === "final") {
                          onSelectVersion("final");
                        } else {
                          onSelectVersion(step.to as any);
                        }
                      }}
                      className="w-full px-4 py-2.5 bg-muted/20 hover:bg-muted/40 transition-colors flex items-center justify-between text-left"
                    >
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-[9px] font-bold bg-primary/10 text-primary px-1.5 py-0.5 rounded uppercase">
                          {step.from.toUpperCase()} ➔ {step.to.toUpperCase()}
                        </span>
                        <span className="font-serif text-xs font-bold text-foreground">
                          {step.title}
                        </span>
                      </div>
                      <ChevronDown className={`w-4 h-full text-muted-foreground transition-transform duration-200 ${isExpanded ? "transform rotate-180" : ""}`} />
                    </button>

                    {isExpanded && (
                      <div className="p-4 border-t border-border/40 flex flex-col gap-3 animate-in fade-in slide-in-from-top-1 duration-200">
                        <div className="text-[11px] font-serif italic text-amber-600 dark:text-amber-400 bg-amber-500/5 p-2.5 rounded border border-amber-500/10 leading-relaxed">
                          {step.feedback}
                        </div>
                        <div className="flex flex-col gap-1.5">
                          <span className="text-[10px] font-mono font-bold text-muted-foreground uppercase">改动明细 (CHANGES):</span>
                          <ul className="list-disc list-inside text-[11px] font-serif text-foreground/80 flex flex-col gap-1 leading-relaxed">
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

            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2 border-t border-border/60">
              <span className="font-serif text-[11px] text-muted-foreground">
                💡 点击上方折叠面板，可查看具体的反馈内容，并在右侧/下方同步查看该版本文章！
              </span>
              <button
                onClick={() => {
                  onSelectVersion("final");
                  toast.success("已为您切换至最终完美定稿！");
                }}
                className="py-1.5 px-3 bg-emerald-600 text-white rounded text-[10px] font-mono font-bold uppercase tracking-wider hover:bg-emerald-500 transition-all flex items-center gap-1 shrink-0"
              >
                <FileText className="w-3.5 h-full" />
                查看最终定稿 (v4 Final)
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
