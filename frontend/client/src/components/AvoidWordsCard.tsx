import { STYLE_DNA } from "../const";
import { Ban, CheckCircle2, ArrowRight, ShieldAlert, Sparkles } from "lucide-react";

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
    bad: "众所周知 / 不得不说 / 随着XX的发展",
    good: "我做过很多次这样的事 / 后来我发现 / 以前我...",
    reason: "教科书式的八股文开场，缺乏个人经历切入点，无法拉近与读者的距离。"
  },
  {
    bad: "综上所述 / 总而言之 / 由此可见",
    good: "写在最后 / 就是这么一点事 / 动一下就够了",
    reason: "强行总结的 AI 味尾巴，显得刻板生硬。优秀的个人叙事应当留白或温暖收尾。"
  },
  {
    bad: "然而 / 此外 / 值得注意的是",
    good: "然后 / 结果 / 其实还有一点",
    reason: "书面递进词，打断了口语连缀的叙事流。口语连缀更像是在和朋友聊天。"
  }
];

export default function AvoidWordsCard() {
  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden shadow-sm flex flex-col">
      {/* Header */}
      <div className="px-5 py-3.5 border-b border-border bg-muted/20 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <ShieldAlert className="w-4 h-full text-rose-500 animate-pulse" />
          <span className="font-serif text-sm font-bold text-foreground">
            去 AI 味核心：避坑大厂黑话词
          </span>
        </div>
        <span className="text-[10px] font-mono text-rose-600 dark:text-rose-400 bg-rose-500/10 px-2 py-0.5 rounded border border-rose-500/20">
          Filter Active
        </span>
      </div>

      {/* Body */}
      <div className="p-5 flex flex-col gap-4">
        <p className="font-serif text-xs text-muted-foreground leading-relaxed">
          AI 写作最容易带上冰冷的“大厂公文腔”或“教科书说教感”。CoWriter 通过 <strong>/de-AI-writing</strong> 引擎，建立了一个黑名单拦截网络，在生成和迭代时进行强力过滤：
        </p>

        {/* Word Pair List */}
        <div className="flex flex-col gap-3">
          {AVOID_PAIRS.map((pair, idx) => (
            <div key={idx} className="bg-background border border-border rounded-lg p-3 flex flex-col gap-2.5">
              {/* Bad vs Good */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-border/40 pb-2">
                {/* Bad (Banned) */}
                <div className="flex items-center gap-1.5 shrink-0">
                  <Ban className="w-3.5 h-full text-rose-500" />
                  <span className="font-mono text-xs font-bold text-rose-600 dark:text-rose-400 line-through">
                    {pair.bad}
                  </span>
                </div>

                {/* Arrow */}
                <div className="hidden sm:block">
                  <ArrowRight className="w-3.5 h-full text-muted-foreground/50" />
                </div>

                {/* Good (Allowed) */}
                <div className="flex items-center gap-1.5 text-right sm:text-left">
                  <CheckCircle2 className="w-3.5 h-full text-emerald-500" />
                  <span className="font-serif text-xs font-bold text-emerald-600 dark:text-emerald-400">
                    {pair.good}
                  </span>
                </div>
              </div>

              {/* Reason */}
              <p className="font-serif text-[11px] text-muted-foreground leading-relaxed">
                <span className="font-mono font-bold text-rose-500/80 mr-1">[诊断]</span>
                {pair.reason}
              </p>
            </div>
          ))}
        </div>

        {/* DNA Note */}
        <div className="bg-emerald-500/5 border border-emerald-500/10 rounded-lg p-3.5 flex items-start gap-2.5">
          <Sparkles className="w-4 h-full text-emerald-500 shrink-0 mt-0.5" />
          <div className="flex flex-col gap-0.5">
            <span className="font-serif text-xs font-bold text-foreground">
              Style DNA 净化机制
            </span>
            <p className="font-serif text-[11px] text-muted-foreground leading-relaxed">
              系统在检测到此类词汇时，会自动挂载改写函数，结合您的 <strong>Style DNA</strong>，将其拆解并融化在口语化的情境叙事中。
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
