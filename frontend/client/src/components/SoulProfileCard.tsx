import { SOUL_PROFILE, STYLE_DNA } from "../const";
import { User, Sparkles, BookOpen, Ban, Compass } from "lucide-react";

export default function SoulProfileCard() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Column 1: Soul Card */}
      <div className="bg-card border border-border rounded-lg p-5 flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <img 
            src={SOUL_PROFILE.avatar} 
            alt={SOUL_PROFILE.name} 
            className="w-12 h-12 rounded-full border border-primary/30 object-cover"
          />
          <div>
            <h3 className="font-serif text-lg font-bold text-foreground">{SOUL_PROFILE.name}</h3>
            <span className="text-[11px] font-mono text-primary bg-primary/10 px-2 py-0.5 rounded-full">
              Obsidian Author
            </span>
          </div>
        </div>

        <p className="font-serif text-xs text-muted-foreground leading-relaxed">
          {SOUL_PROFILE.bio}
        </p>

        <div className="flex flex-wrap gap-1.5 pt-2 border-t border-border/60">
          {SOUL_PROFILE.tags.map((tag, idx) => (
            <span 
              key={idx} 
              className="text-[10px] font-mono bg-muted text-muted-foreground px-2 py-0.5 rounded border border-border/40"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>

      {/* Column 2: Style DNA Card */}
      <div className="bg-card border border-border rounded-lg p-5 flex flex-col gap-4 md:col-span-2">
        <div className="flex items-center justify-between border-b border-border pb-3">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-full text-amber-500" />
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-muted-foreground">
              Style DNA (写作风格基因)
            </span>
          </div>
          <span className="text-[10px] font-mono text-emerald-600 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
            Active Patch
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 flex-1">
          {/* Tone & Voice */}
          <div className="flex flex-col gap-1.5">
            <span className="text-xs font-mono font-semibold text-primary flex items-center gap-1">
              <Compass className="w-3.5 h-full" />
              人设与语调
            </span>
            <p className="font-serif text-xs text-foreground/90 leading-relaxed">
              <strong>人设：</strong>{STYLE_DNA.persona}
            </p>
            <p className="font-serif text-xs text-muted-foreground leading-relaxed">
              <strong>语调：</strong>{STYLE_DNA.voice}
            </p>
          </div>

          {/* Grammar & Habits */}
          <div className="flex flex-col gap-1.5">
            <span className="text-xs font-mono font-semibold text-primary flex items-center gap-1">
              <BookOpen className="w-3.5 h-full" />
              句式与结构习惯
            </span>
            <ul className="list-disc list-inside font-serif text-xs text-foreground/80 leading-relaxed flex flex-col gap-1">
              {STYLE_DNA.grammar.map((g, idx) => (
                <li key={idx} className="line-clamp-2">{g}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Avoid List */}
        <div className="mt-2 pt-3 border-t border-border/60 flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
          <div className="flex items-center gap-1.5 text-xs font-mono font-semibold text-red-600 dark:text-red-400 shrink-0">
            <Ban className="w-3.5 h-full" />
            <span>避坑黑话词：</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {STYLE_DNA.avoidWords.map((word, idx) => (
              <span 
                key={idx} 
                className="text-[10px] font-mono bg-red-500/5 text-red-600 dark:text-red-400 border border-red-500/10 px-2 py-0.5 rounded"
              >
                {word}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
