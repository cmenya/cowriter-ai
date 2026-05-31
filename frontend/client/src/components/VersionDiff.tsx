import { useState } from "react";
import { ArrowRight, Sparkles, CheckCircle2, AlertCircle } from "lucide-react";

interface DiffItem {
  before: string;
  after: string;
  reason: string;
  rule: string;
}

export default function VersionDiff() {
  const [activeIndex, setActiveIndex] = useState(0);

  const diffs: DiffItem[] = [
    {
      before: "作为一名长期深耕于IT系统开发的职场妈妈，在面对双重压力的底层逻辑时，我不得不说，拖延症的闭环正严重赋能于我的内耗底色。",
      after: "我是一个银行IT出身的职场妈妈。每天在工作、家务、育儿之间找平衡，不甘平庸但又高度内耗。这种“拧巴”是我最真实的素材。",
      reason: "彻底清除了“深耕、底层逻辑、不得不说、闭环、赋能、底色”等一整套 AI 惯用的宏大叙事与大厂黑话，回归到真实、直白的个人自白。",
      rule: "快速硬门槛 10：高频分析词与术语壳（赛道、底层逻辑、赋能、闭环、打造）命中清零。"
    },
    {
      before: "心理账户在某种程度上决定了我们的认知。正如以色列法官假释案所精准揭示的那样，人类的决策消耗是相当巨大的，我们很容易陷入疲惫的泥潭。",
      after: "这就解释了那种奇妙的感觉。昨晚那40分钟，睡一觉之后就从“待办”变成了“已经做了的事”。大脑做决定的能力有限，会随着使用而消耗。",
      reason: "删除了“在某种程度上、精准揭示、相当巨大、很容易陷入泥潭”等AI包装腔，用短句推进，并把学术概念直接落地到具体的动作和感受上。",
      rule: "快速硬门槛 8：伪坦率与伪严谨评价词（精准、审慎、很容易）默认清零，让事实自己说话。"
    },
    {
      before: "字面上我们看似在积极准备明天的计划，但背后却藏着对夜间执行力的深深怀疑。我们必须通过提前开个头，来打破这个无法逃避的怪圈。",
      after: "（我对自己夜里的执行力，其实心里比谁都清楚😅）重点不是做了多少，而是“跨过了今晚”，心理重量就跑掉了一大半。",
      reason: "将生硬工整的“看似……却……”二元对照，替换为作者最具辨识度的标志性“括号吐槽 + emoji”气泡，声音瞬间变得放松、诚实且具有人情味。",
      rule: "Style DNA 二：括号是重要装置，常放自我评论与吐槽，是声音最放松的地方。"
    },
    {
      before: "综上所述，与其把所有的压力和未完成的蔡加尼克效应当作挡箭牌，我们不如践行前夜清障的路径，给大脑一个赢的信号，去拥抱更加轻松的明天。",
      after: "与其把所有压力都堆在今天，不如前一天晚上先做一点，让大脑睡一觉之后重新分账。剩下的量缩水了，启动的阻力小了。动一下就够了。",
      reason: "清除了“综上所述”（路标词）、“挡箭牌”（万能修辞）、“路径/拥抱”（AI高频词），结尾干净利落，没有说教与宏大口号，只有具体而微的行动方向。",
      rule: "快速硬门槛 5 & 9：清除路标词与AI隐喻。结尾不说教，给行动方向或一句留白。"
    }
  ];

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b border-border bg-muted/30 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-full text-amber-500" />
          <span className="font-mono text-sm font-semibold tracking-wider uppercase">Style DNA Diff (去AI味对比)</span>
        </div>
        <div className="text-xs text-muted-foreground bg-background px-2.5 py-1 rounded border border-border font-mono">
          de-AI-writing Engine
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 p-4 md:p-6 flex flex-col gap-6">
        {/* Navigation Tabs */}
        <div className="flex gap-2 overflow-x-auto pb-2 border-b border-border/60">
          {diffs.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIndex(idx)}
              className={`px-3 py-1.5 rounded text-xs font-mono whitespace-nowrap border transition-all ${
                activeIndex === idx
                  ? "bg-primary/10 text-primary border-primary/30 font-semibold"
                  : "bg-background text-muted-foreground border-transparent hover:text-foreground"
              }`}
            >
              CASE 0{idx + 1}
            </button>
          ))}
        </div>

        {/* Comparison Slider / Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 flex-1">
          {/* Before: AI Style */}
          <div className="flex flex-col border border-red-200/50 dark:border-red-900/30 rounded-lg overflow-hidden bg-red-50/10 dark:bg-red-950/5">
            <div className="px-3 py-2 border-b border-red-200/50 dark:border-red-900/30 bg-red-50/30 dark:bg-red-950/20 flex items-center gap-2 text-red-600 dark:text-red-400">
              <AlertCircle className="w-3.5 h-full" />
              <span className="font-mono text-[11px] font-bold uppercase tracking-wider">AI Draft (去味前)</span>
            </div>
            <div className="p-4 flex-1 font-serif text-sm leading-relaxed text-muted-foreground line-through decoration-red-300/50">
              {diffs[activeIndex].before}
            </div>
          </div>

          {/* After: Human Style */}
          <div className="flex flex-col border border-emerald-200/50 dark:border-emerald-900/30 rounded-lg overflow-hidden bg-emerald-50/10 dark:bg-emerald-950/5">
            <div className="px-3 py-2 border-b border-emerald-200/50 dark:border-emerald-900/30 bg-emerald-50/30 dark:bg-emerald-950/20 flex items-center gap-2 text-emerald-600 dark:text-emerald-400">
              <CheckCircle2 className="w-3.5 h-full" />
              <span className="font-mono text-[11px] font-bold uppercase tracking-wider">CoWriter Final (去味后)</span>
            </div>
            <div className="p-4 flex-1 font-serif text-sm leading-relaxed text-foreground font-medium bg-emerald-500/5">
              {diffs[activeIndex].after.split("（").map((part, i) => {
                if (i === 0) return part;
                const subParts = part.split("）");
                return (
                  <span key={i}>
                    <span className="sticky-note px-2 py-1 mx-1 rounded text-xs inline-block transform -rotate-1 font-sans">
                      （{subParts[0]}）
                    </span>
                    {subParts[1]}
                  </span>
                );
              })}
            </div>
          </div>
        </div>

        {/* Diagnosis Card */}
        <div className="bg-muted/30 border border-border rounded-lg p-4 flex flex-col gap-2">
          <div className="flex items-center gap-2 text-xs font-mono font-semibold text-primary">
            <span>DIAGNOSIS (修补诊断)</span>
            <ArrowRight className="w-3 h-full" />
          </div>
          <p className="font-serif text-xs text-foreground leading-relaxed">
            {diffs[activeIndex].reason}
          </p>
          <div className="mt-2 pt-2 border-t border-border/60 font-mono text-[10px] text-muted-foreground">
            {diffs[activeIndex].rule}
          </div>
        </div>
      </div>
    </div>
  );
}
