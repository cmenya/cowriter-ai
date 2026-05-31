import { WORKFLOW_STEPS } from "../const";
import { FolderInput, Cpu, FileCode, Sparkles, LucideIcon } from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  FolderInput: FolderInput,
  Cpu: Cpu,
  FileCode: FileCode,
  Sparkles: Sparkles
};

export default function WorkflowTimeline() {
  return (
    <div className="bg-card border border-border rounded-lg p-5 flex flex-col gap-6">
      {/* Header */}
      <div className="border-b border-border pb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Cpu className="w-4 h-full text-primary" />
          <span className="font-mono text-xs font-bold uppercase tracking-wider text-muted-foreground">
            CoWriter AI Workflow (写作工作流)
          </span>
        </div>
        <span className="text-[10px] font-mono text-muted-foreground bg-muted px-2 py-0.5 rounded border border-border/40">
          Git-backed Pipeline
        </span>
      </div>

      {/* Timeline List */}
      <div className="relative pl-6 border-l border-border/60 flex flex-col gap-6 my-2">
        {WORKFLOW_STEPS.map((step, idx) => {
          const IconComponent = iconMap[step.icon] || Cpu;

          return (
            <div key={step.id} className="relative group">
              {/* Timeline Dot */}
              <div className="absolute -left-[33px] top-1.5 w-4 h-4 rounded-full border-2 border-primary bg-background flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:bg-primary/10">
                <div className="w-1.5 h-1.5 rounded-full bg-primary" />
              </div>

              {/* Timeline Content */}
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[10px] font-bold text-primary bg-primary/10 px-1.5 py-0.5 rounded">
                    STAGE 0{idx + 1}
                  </span>
                  <span className="font-mono text-[10px] text-muted-foreground font-semibold">
                    {step.badge}
                  </span>
                </div>

                <h4 className="font-serif text-sm font-bold text-foreground flex items-center gap-1.5 mt-1">
                  <IconComponent className="w-3.5 h-full text-muted-foreground" />
                  {step.title}
                </h4>

                <p className="font-serif text-xs text-muted-foreground leading-relaxed mt-0.5">
                  {step.desc}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
