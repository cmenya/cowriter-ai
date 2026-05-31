import { useState } from "react";
import { ARTICLE_VERSIONS, STYLE_DNA } from "../const";
import { BookOpen, FileText, ChevronRight, HelpCircle, MessageSquare } from "lucide-react";

export default function ArticleReader() {
  const [selectedVersion, setSelectedVersion] = useState<"v1" | "v3" | "v4">("v4");
  const [activeComment, setActiveVersionComment] = useState<string | null>(null);

  const currentArticle = ARTICLE_VERSIONS.find(v => v.version === selectedVersion)!;

  // Render content with interactive sticky notes for brackets
  const renderFormattedContent = (text: string) => {
    // Split by paragraph
    const paragraphs = text.split("\n\n");

    return paragraphs.map((p, pIdx) => {
      if (p.startsWith("# ")) {
        return <h1 key={pIdx} className="text-2xl md:text-3xl font-bold tracking-tight text-foreground mb-6 font-serif border-b border-border pb-4">{p.replace("# ", "")}</h1>;
      }
      if (p.startsWith("## ")) {
        return <h2 key={pIdx} className="text-xl md:text-2xl font-semibold text-foreground mt-8 mb-4 font-serif flex items-center gap-2">
          <span className="w-1.5 h-6 bg-primary rounded-full inline-block" />
          {p.replace("## ", "")}
        </h2>;
      }
      if (p.startsWith("### ")) {
        return <h3 key={pIdx} className="text-lg font-semibold text-foreground mt-6 mb-3 font-serif">{p.replace("### ", "")}</h3>;
      }
      if (p.startsWith("> ")) {
        return <blockquote key={pIdx} className="border-l-4 border-primary pl-4 py-1 my-4 italic text-muted-foreground font-serif bg-muted/20 rounded-r">{p.replace("> ", "")}</blockquote>;
      }
      if (p.trim() === "---") {
        return <hr key={pIdx} className="my-8 border-t border-border/60" />;
      }

      // Check for bracket comments in text
      const hasBrackets = p.includes("（") && p.includes("）");
      if (hasBrackets && selectedVersion === "v4") {
        const parts = p.split(/（|）/);
        return (
          <p key={pIdx} className="mb-4 leading-relaxed font-serif text-foreground/90 text-[15px] md:text-[16px]">
            {parts[0]}
            <span 
              onClick={() => setActiveVersionComment(activeComment === pIdx.toString() ? null : String(pIdx))}
              className="sticky-note px-2 py-0.5 mx-1 rounded text-xs inline-flex items-center gap-1 cursor-pointer transform -rotate-1 hover:scale-105 hover:shadow-md transition-all font-sans font-medium"
            >
              <MessageSquare className="w-3 h-full text-primary/70" />
              作者碎碎念 💬
            </span>
            {parts[2]}
            {activeComment === pIdx.toString() && (
              <span className="block my-3 p-4 sticky-note rounded-lg text-sm border-l-4 border-primary shadow-sm animate-in fade-in slide-in-from-top-2 duration-200 font-sans">
                <span className="font-bold block text-xs text-primary/80 uppercase tracking-wider mb-1 font-mono">SOUL WHISPER (括号内真话)</span>
                “{parts[1]}”
                <span className="block mt-2 text-[11px] text-muted-foreground font-mono">
                  💡 de-AI-writing 诊断：此处将生硬逻辑词替换为了真实人设自嘲，大大增加了文本的呼吸感。
                </span>
              </span>
            )}
          </p>
        );
      }

      return (
        <p key={pIdx} className="mb-4 leading-relaxed font-serif text-foreground/90 text-[15px] md:text-[16px]">
          {p}
        </p>
      );
    });
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6 h-full min-h-[600px]">
      {/* Sidebar - Version Controller */}
      <div className="w-full lg:w-64 flex flex-col gap-4 shrink-0">
        <div className="bg-card border border-border rounded-lg p-4 flex flex-col gap-3">
          <div className="flex items-center gap-2 text-xs font-mono font-bold tracking-wider text-muted-foreground uppercase">
            <FileText className="w-3.5 h-full text-primary" />
            <span>Document Vault (草稿库)</span>
          </div>

          <div className="flex flex-col gap-2">
            {(["v1", "v3", "v4"] as const).map(v => {
              const verData = ARTICLE_VERSIONS.find(item => item.version === v)!;
              const isSelected = selectedVersion === v;

              return (
                <button
                  key={v}
                  onClick={() => {
                    setSelectedVersion(v);
                    setActiveVersionComment(null);
                  }}
                  className={`p-3 rounded-lg text-left border transition-all flex flex-col gap-1.5 ${
                    isSelected
                      ? "bg-primary/10 border-primary/40 text-primary"
                      : "bg-background border-border hover:border-primary/20 text-foreground"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-muted">
                      {v === "v4" ? "FINAL V4" : `DRAFT ${v.toUpperCase()}`}
                    </span>
                    {isSelected && <ChevronRight className="w-3.5 h-full text-primary" />}
                  </div>
                  <span className="font-serif text-xs font-semibold line-clamp-1">
                    {verData.title}
                  </span>
                  <span className="text-[10px] text-muted-foreground line-clamp-2 leading-relaxed">
                    {verData.description}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Style Tip */}
        <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 flex flex-col gap-2">
          <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-primary">
            <HelpCircle className="w-3.5 h-full" />
            <span>STYLE TIP (风格贴士)</span>
          </div>
          <p className="font-serif text-xs text-muted-foreground leading-relaxed">
            {selectedVersion === "v4" ? (
              <>
                <strong>最终定稿 (v4)</strong> 深度融合了作者的 <strong>Style DNA</strong>：使用大量口语化中短句、取消二分对照、并在括号内进行真实的情感自嘲。
              </>
            ) : selectedVersion === "v3" ? (
              <>
                <strong>框架版 (v3)</strong> 引入了行为经济学与心理学概念，但语调仍稍显生硬，缺乏作者声音。
              </>
            ) : (
              <>
                <strong>原始版 (v1)</strong> 虽真实口语，但篇幅较短，且缺乏系统性的科学支撑。
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
              Obsidian Reader Panel
            </span>
          </div>
          <div className="text-[10px] font-mono text-muted-foreground">
            {selectedVersion === "v4" ? "2200 字 • 4 个文献引用" : "约 1500 字 • 快速迭代中"}
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
