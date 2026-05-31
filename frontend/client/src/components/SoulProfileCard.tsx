import { SOUL_PROFILE, STYLE_DNA } from "../const";
import { Sparkles, BookOpen, Compass, Award, Heart, ShieldAlert } from "lucide-react";

export default function SoulProfileCard() {
  return (
    <div className="w-full bg-card border border-border rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300">
      {/* Upper Section: Avatar & Quick Stats */}
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 border-b border-border/60 pb-5">
        <div className="relative shrink-0">
          <img 
            src={SOUL_PROFILE.avatar} 
            alt={SOUL_PROFILE.name} 
            className="w-16 h-16 rounded-full border-2 border-primary/20 object-cover shadow-inner"
          />
          <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-amber-500 flex items-center justify-center border-2 border-background">
            <Sparkles className="w-3 h-3 text-white" />
          </div>
        </div>

        <div className="flex-1 flex flex-col gap-2 text-center sm:text-left">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2">
            <h3 className="font-serif text-lg font-bold text-foreground tracking-tight">
              {SOUL_PROFILE.name}
            </h3>
            <span className="text-[10px] font-mono font-bold text-primary bg-primary/10 px-2.5 py-0.5 rounded-full border border-primary/20 self-center">
              Obsidian Power User
            </span>
          </div>
          <p className="font-serif text-xs text-muted-foreground leading-relaxed max-w-xl">
            {SOUL_PROFILE.bio}
          </p>
        </div>
      </div>

      {/* Middle Section: Style DNA Attributes */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-5">
        {/* Left Col: Persona & Voice */}
        <div className="flex flex-col gap-3.5">
          <div className="flex items-center gap-2 border-b border-border/40 pb-1.5">
            <Compass className="w-4 h-full text-primary" />
            <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
              人设与创作语调 (Tone & Persona)
            </span>
          </div>

          <div className="flex flex-col gap-2">
            <div className="bg-muted/30 rounded-lg p-3 border border-border/40">
              <span className="font-serif text-xs font-semibold text-foreground flex items-center gap-1 mb-1">
                <Heart className="w-3.5 h-full text-rose-500" />
                真实人设
              </span>
              <p className="font-serif text-xs text-foreground/80 leading-relaxed">
                {STYLE_DNA.persona}
              </p>
            </div>

            <div className="bg-muted/30 rounded-lg p-3 border border-border/40">
              <span className="font-serif text-xs font-semibold text-foreground flex items-center gap-1 mb-1">
                <Award className="w-3.5 h-full text-amber-500" />
                语言态度
              </span>
              <p className="font-serif text-xs text-muted-foreground leading-relaxed">
                {STYLE_DNA.voice}
              </p>
            </div>
          </div>
        </div>

        {/* Right Col: Grammar & Habits */}
        <div className="flex flex-col gap-3.5">
          <div className="flex items-center gap-2 border-b border-border/40 pb-1.5">
            <BookOpen className="w-4 h-full text-primary" />
            <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
              句式习惯与结构 (Grammar & Structure)
            </span>
          </div>

          <div className="bg-muted/30 rounded-lg p-4 border border-border/40 flex-1 flex flex-col gap-2.5">
            <ul className="list-disc list-inside font-serif text-xs text-foreground/80 leading-relaxed flex flex-col gap-2">
              {STYLE_DNA.grammar.map((g, idx) => (
                <li key={idx} className="marker:text-primary">
                  {g}
                </li>
              ))}
            </ul>
            <div className="mt-auto pt-2 border-t border-border/40">
              <span className="text-[10px] font-mono text-muted-foreground block mb-1">
                括号吐槽机制 (Brackets Mechanism):
              </span>
              <p className="text-[10px] font-serif italic text-primary/80 bg-primary/5 px-2 py-1.5 rounded border border-primary/10">
                {STYLE_DNA.bracketsExample}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section: Avoid Words inline summary */}
      <div className="mt-5 pt-4 border-t border-border/60 flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between bg-red-500/5 dark:bg-red-500/2 rounded-lg p-3 border border-red-500/10">
        <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-red-600 dark:text-red-400 shrink-0">
          <ShieldAlert className="w-4 h-full animate-pulse" />
          <span>大厂黑话禁词库 (Avoid Words List)：</span>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {STYLE_DNA.avoidWords.map((word, idx) => (
            <span 
              key={idx} 
              className="text-[10px] font-mono bg-background text-red-600 dark:text-red-400 border border-red-500/15 px-2 py-0.5 rounded shadow-sm"
            >
              {word}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
