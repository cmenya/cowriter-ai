import { Ban, CheckCircle2, ArrowRight, ShieldAlert } from "lucide-react";

interface AvoidWordPair {
  bad: string;
  good: string;
  reason: string;
}

const AVOID_PAIRS: AvoidWordPair[] = [
  {
    bad: "底层逻辑 / 闭环 / 赋能",
    good: "最底层的道理 / 把事情做完 / 帮明天的自己省力",
    reason: "大厂公文腔，严重降低文章温度和可读性，产生浓重的 AI 翻译感。"
  },
  {
    bad: "众所周知 / 随着XX的发展",
    good: "我做过很多次这样的事 / 后来我发现",
    reason: "教科书式八股开场，缺乏个人经历切入点，无法拉近与读者的距离。"
  },
  {
    bad: "综上所述 / 总而言之",
    good: "写在最后 / 动一下就够了",
    reason: "强行总结的 AI 味尾巴，显得刻板生硬。优秀的个人叙事应当留白或温暖收尾。"
  },
  {
    bad: "然而 / 此外 / 值得注意",
    good: "然后 / 结果 / 其实还有一点",
    reason: "书面递进词，打断了口语连缀的叙事流。"
  }
];

export default function AvoidWordsCard() {
  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden shadow-sm flex flex-col h-full">
      {/* Header */}
      <div className="px-4 py-3 border-b border-border bg-muted/20 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <ShieldAlert className="w-4 h-full text-rose-500" />
          <span className="font-serif text-xs font-bold text-foreground uppercase tracking-wider">
            避坑大厂黑话词库
          </span>
        </div>
        <span className="text-[9px] font-mono text-rose-600 dark:text-rose-400 bg-rose-500/10 px-1.5 py-0.5 rounded border border-rose-500/15">
          Active Filter
        </span>
      </div>

      {/* Body */}
      <div className="p-4 flex flex-col gap-3 overflow-y-auto max-h-[340px]">
        {AVOID_PAIRS.map((pair, idx) => (
          <div key={idx} className="bg-background border border-border/60 rounded-lg p-2.5 flex flex-col gap-1.5 hover:border-border transition-colors">
            {/* Bad vs Good */}
            <div className="flex items-center justify-between gap-2 border-b border-border/30 pb-1.5">
              {/* Bad (Banned) */}
              <div className="flex items-center gap-1 shrink-0">
                <Ban className="w-3 h-full text-rose-500" />
                <span className="font-mono text-[11px] font-bold text-rose-600 dark:text-rose-400 line-through">
                  {pair.bad}
                </span>
              </div>

              {/* Arrow */}
              <ArrowRight className="w-3 h-full text-muted-foreground/40" />

              {/* Good (Allowed) */}
              <div className="flex items-center gap-1">
                <CheckCircle2 className="w-3 h-full text-emerald-500" />
                <span className="font-serif text-[11px] font-bold text-emerald-600 dark:text-emerald-400">
                  {pair.good}
                </span>
              </div>
            </div>

            {/* Reason */}
            <p className="font-serif text-[10px] text-muted-foreground leading-normal">
              {pair.reason}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
