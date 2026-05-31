import { Sparkles } from "lucide-react";

export default function SoulProfileCard() {
  return (
    <div className="w-full bg-card border border-border rounded-lg p-5 shadow-sm flex flex-col sm:flex-row items-center sm:items-start gap-4 hover:shadow-md transition-all duration-300">
      <div className="relative shrink-0">
        <div className="w-12 h-12 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center">
          <span className="font-serif text-lg font-bold text-primary">A</span>
        </div>
        <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-amber-500 flex items-center justify-center border border-background">
          <Sparkles className="w-2.5 h-2.5 text-white" />
        </div>
      </div>

      <div className="flex-1 flex flex-col gap-1 text-center sm:text-left">
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 justify-center sm:justify-start">
          <h3 className="font-serif text-sm font-bold text-foreground tracking-tight">
            我是谁 (About Me)
          </h3>
          <span className="text-[9px] font-mono font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-full border border-primary/15 self-center">
            Asuka (明日香)
          </span>
        </div>
        <p className="font-serif text-xs text-muted-foreground leading-relaxed">
          15 年在日银行 IT 职场妈妈。纠结、拧巴、不服输。正深度拥抱 AI，致力于用 Obsidian 打造去 AI 腔、饱含温度的个人数字手记与硬核写作流。
        </p>
      </div>
    </div>
  );
}
