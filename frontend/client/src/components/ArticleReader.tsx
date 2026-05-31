import { useState, useEffect } from "react";
import { ARTICLE_VERSIONS } from "../const";
import { BookOpen, FileText, ChevronRight, HelpCircle, MessageSquare, Sparkles, Highlighter, AlertCircle, Eye } from "lucide-react";
import { toast } from "sonner";

interface ArticleReaderProps {
  selectedVersion: "v1" | "v2" | "v3" | "final";
  onSelectVersion: (version: "v1" | "v2" | "v3" | "final") => void;
}

export default function ArticleReader({ selectedVersion, onSelectVersion }: ArticleReaderProps) {
  const [activeComment, setActiveComment] = useState<string | null>(null);
  const [highlightDeAI, setHighlightDeAI] = useState(true);
  const [draftCompareMode, setDraftCompareMode] = useState(false); // Default to false: ONLY show Final!

  const currentArticle = ARTICLE_VERSIONS.find(v => v.version === selectedVersion)!;

  // Clear open comments when switching versions
  useEffect(() => {
    setActiveComment(null);
  }, [selectedVersion]);

  // If compare mode is off, always lock to "final" version
  useEffect(() => {
    if (!draftCompareMode && selectedVersion !== "final") {
      onSelectVersion("final");
    }
  }, [draftCompareMode]);

  // Render content with interactive sticky notes for brackets
  const renderFormattedContent = (text: string) => {
    const paragraphs = text.split("\n\n");

    return paragraphs.map((p, pIdx) => {
      if (p.startsWith("# ")) {
        return (
          <h1 key={pIdx} className="text-2xl md:text-3xl font-bold tracking-tight text-foreground mb-6 font-serif border-b border-border pb-4">
            {p.replace("# ", "")}
          </h1>
        );
      }
      if (p.startsWith("## ")) {
        return (
          <h2 key={pIdx} className="text-lg md:text-xl font-bold text-foreground mt-8 mb-4 font-serif flex items-center gap-2">
            <span className="w-1.5 h-5 bg-primary rounded-full inline-block" />
            {p.replace("## ", "")}
          </h2>
        );
      }
      if (p.startsWith("### ")) {
        return (
          <h3 key={pIdx} className="text-base font-bold text-foreground mt-6 mb-3 font-serif">
            {p.replace("### ", "")}
          </h3>
        );
      }
      if (p.startsWith("> ")) {
        return (
          <blockquote key={pIdx} className="border-l-4 border-primary pl-4 py-1.5 my-5 italic text-muted-foreground font-serif bg-muted/20 rounded-r text-sm leading-relaxed">
            {p.replace("> ", "")}
          </blockquote>
        );
      }
      if (p.startsWith("- ")) {
        return (
          <li key={pIdx} className="ml-4 mb-2 list-disc font-serif text-[14px] md:text-[15px] text-foreground/90 leading-relaxed">
            {p.replace("- ", "")}
          </li>
        );
      }
      if (p.trim() === "---") {
        return <hr key={pIdx} className="my-6 border-t border-border/60" />;
      }

      // Check for bracket comments in text (e.g. 😅 or other brackets)
      const hasBrackets = p.includes("（") && p.includes("）");
      if (hasBrackets) {
        const match = p.match(/（(.*?)）/);
        if (match) {
          const bracketText = match[1];
          const parts = p.split(/（.*?）/);
          
          return (
            <p key={pIdx} className="mb-4 leading-relaxed font-serif text-foreground/90 text-[14px] md:text-[15px]">
              {parts[0]}
              <span 
                onClick={() => {
                  setActiveComment(activeComment === pIdx.toString() ? null : String(pIdx));
                  if (activeComment !== pIdx.toString()) {
                    toast.info("💡 已展开 Asuka 的碎碎念（括号内真话）");
                  }
                }}
                className={`sticky-note px-2 py-0.5 mx-1 rounded text-[11px] inline-flex items-center gap-1 cursor-pointer transform -rotate-1 hover:scale-105 hover:shadow-md transition-all font-sans font-semibold ${
                  activeComment === pIdx.toString() 
                    ? "bg-amber-400 text-amber-950 shadow-sm" 
                    : "bg-amber-100 text-amber-900 dark:bg-amber-950/40 dark:text-amber-300"
                }`}
              >
                <MessageSquare className="w-3 h-full" />
                我的碎碎念 💬
              </span>
              {parts[1]}
              
              {activeComment === pIdx.toString() && (
                <span className="block my-3 p-4 bg-amber-500/10 border-l-4 border-amber-500 rounded-r-lg text-xs md:text-sm animate-in fade-in slide-in-from-top-2 duration-200 font-sans text-foreground/90 leading-relaxed">
                  <span className="font-bold block text-[10px] text-amber-600 dark:text-amber-400 uppercase tracking-wider mb-1 font-mono">
                    ASUKA'S WHISPER (括号吐槽)
                  </span>
                  “{bracketText}”
                  <span className="block mt-2 text-[10px] text-muted-foreground font-mono">
                    💡 de-AI-writing 诊断：此处融入了 Asuka 作为职场妈妈最真实的深夜带娃细节与自嘲，瞬间拉近了与读者的距离。
                  </span>
                </span>
              )}
            </p>
          );
        }
      }

      // De-AI Highlights
      if (highlightDeAI && selectedVersion === "final") {
        const highlightPhrases = [
          "我做过很多次这样的事",
          "一觉睡过去，任务就换了账",
          "买东西付了定金，尾款突然就没那么难接受",
          "前额叶的\"清障\"时刻",
          "大脑里负责理性判断的那个部门已经没有足够的资源了",
          "晚上是任务的起点，白天是续集",
          "替明天的自己存一点\"心理资产\"",
          "大脑会收到\"我赢了\"的信号",
          "不需要很多，动一下就够了"
        ];
        
        let formattedText = p;
        let hasMatch = false;
        
        highlightPhrases.forEach(phrase => {
          if (p.includes(phrase)) {
            hasMatch = true;
            formattedText = formattedText.replace(
              phrase, 
              `<span class="bg-emerald-500/15 border-b border-emerald-500/30 px-0.5 rounded text-emerald-950 dark:text-emerald-300 font-semibold" title="Style DNA 优秀句式">${phrase}</span>`
            );
          }
        });
        
        if (hasMatch) {
          return (
            <p 
              key={pIdx} 
              className="mb-4 leading-relaxed font-serif text-foreground/90 text-[14px] md:text-[15px]"
              dangerouslySetInnerHTML={{ __html: formattedText }}
            />
          );
        }
      }

      return (
        <p key={pIdx} className="mb-4 leading-relaxed font-serif text-foreground/90 text-[14px] md:text-[15px]">
          {p}
        </p>
      );
    });
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6 h-full min-h-[500px]">
      {/* Sidebar Controls */}
      <div className="w-full lg:w-64 flex flex-col gap-4 shrink-0">
        {/* Toggle Mode Card */}
        <div className="bg-card border border-border rounded-lg p-4 flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-serif font-bold text-foreground flex items-center gap-1.5">
              <Eye className="w-3.5 h-full text-primary" />
              草稿对比模式
            </span>
            <button
              onClick={() => {
                setDraftCompareMode(!draftCompareMode);
                toast.success(draftCompareMode ? "已切回【仅看最终定稿】模式" : "已开启【草稿对比】模式，可切换历史草稿");
              }}
              className={`w-10 h-5 rounded-full transition-colors relative ${
                draftCompareMode ? "bg-primary" : "bg-muted"
              }`}
            >
              <span className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-transform ${
                draftCompareMode ? "right-0.5" : "left-0.5"
              }`} />
            </button>
          </div>
          <p className="text-[10px] font-serif text-muted-foreground leading-relaxed">
            默认仅展示您的 <strong>Final 终稿原文</strong>。开启后，可切换并对比历史草稿 (v1-v3) 迭代轨迹。
          </p>
        </div>

        {/* Conditional Draft List */}
        {draftCompareMode && (
          <div className="bg-card border border-border rounded-lg p-4 flex flex-col gap-3 animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="flex items-center gap-2 text-xs font-mono font-bold tracking-wider text-muted-foreground uppercase">
              <FileText className="w-3.5 h-full text-primary" />
              <span>历史草稿版本 (Drafts)</span>
            </div>

            <div className="flex flex-col gap-2">
              {(["v1", "v2", "v3", "final"] as const).map(v => {
                const verData = ARTICLE_VERSIONS.find(item => item.version === v)!;
                const isSelected = selectedVersion === v;

                return (
                  <button
                    key={v}
                    onClick={() => {
                      onSelectVersion(v);
                      toast.success(`已切换到 ${v === "final" ? "最终定稿" : `${v.toUpperCase()} 草稿`}`);
                    }}
                    className={`p-2.5 rounded-lg text-left border transition-all flex flex-col gap-1 ${
                      isSelected
                        ? "bg-primary/10 border-primary/40 text-primary"
                        : "bg-background border-border hover:border-primary/20 text-foreground"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[8px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-muted">
                        {v === "final" ? "FINAL V4" : `DRAFT ${v.toUpperCase()}`}
                      </span>
                      {isSelected && <ChevronRight className="w-3 h-full text-primary" />}
                    </div>
                    <span className="font-serif text-[11px] font-bold text-foreground line-clamp-1">
                      {verData.title}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Highlight Control (Only available for Final) */}
        {selectedVersion === "final" && (
          <div className="bg-card border border-border rounded-lg p-4 flex flex-col gap-2.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-serif font-bold text-foreground flex items-center gap-1.5">
                <Highlighter className="w-3.5 h-full text-emerald-500" />
                高亮去味词
              </span>
              <button
                onClick={() => setHighlightDeAI(!highlightDeAI)}
                className={`w-10 h-5 rounded-full transition-colors relative ${
                  highlightDeAI ? "bg-emerald-500" : "bg-muted"
                }`}
              >
                <span className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-transform ${
                  highlightDeAI ? "right-0.5" : "left-0.5"
                }`} />
              </button>
            </div>
            <p className="text-[10px] font-serif text-muted-foreground leading-relaxed">
              开启后，将以绿色背景高亮文章中成功融入您 <strong>Style DNA</strong> 的个性化金句与自嘲表达。
            </p>
          </div>
        )}

        {/* Style Tip */}
        <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 flex flex-col gap-2">
          <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-primary">
            <HelpCircle className="w-3.5 h-full" />
            <span>STYLE TIP (风格贴士)</span>
          </div>
          <p className="font-serif text-[11px] text-muted-foreground leading-relaxed">
            {selectedVersion === "final" ? (
              <>
                <strong>最终定稿 (v4 Final)</strong> 深度融合了您的 <strong>Style DNA</strong>：使用口语化中短句、无破折号、括号碎碎念，并经学术出处严谨核实。
              </>
            ) : (
              <>
                当前查看的是历史迭代版本（草稿 {selectedVersion.toUpperCase()}）。可通过开启“对比模式”来观察 AI 腔如何一步步退散，最终变成有血有肉的个人叙事。
              </>
            )}
          </p>
        </div>
      </div>

      {/* Main Reader Panel */}
      <div className="flex-1 bg-card border border-border rounded-lg overflow-hidden flex flex-col">
        {/* Reader Topbar */}
        <div className="px-6 py-4 border-b border-border bg-muted/20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BookOpen className="w-4 h-full text-primary" />
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-muted-foreground">
              Obsidian Reader Panel (阅览窗口)
            </span>
          </div>
          <div className="text-[10px] font-mono text-muted-foreground">
            {selectedVersion === "final" ? "2200 字 • 4 个文献引用" : "历史草稿归档"}
          </div>
        </div>

        {/* Reader Content */}
        <div className="flex-1 p-6 md:p-8 overflow-y-auto max-h-[650px] prose-obsidian">
          {renderFormattedContent(currentArticle.content)}
        </div>
      </div>
    </div>
  );
}
