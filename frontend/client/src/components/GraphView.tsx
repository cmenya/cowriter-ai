import React, { useState } from "react";
import { BookOpen, Brain, Lightbulb, Sparkles, User, FileText, Activity } from "lucide-react";

interface Node {
  id: string;
  label: string;
  type: "soul" | "concept" | "draft" | "final" | "material";
  x: number;
  y: number;
  icon: React.ComponentType<any>;
  desc: string;
}

interface Link {
  source: string;
  target: string;
}

export default function GraphView() {
  const [activeNode, setActiveNode] = useState<string | null>("final-v4");
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  const nodes: Node[] = [
    { id: "soul", label: "Cmenya (作者灵魂)", type: "soul", x: 100, y: 180, icon: User, desc: "在日15年银行IT出身的职场妈妈" },
    { id: "style-dna", label: "Style DNA (写作风格)", type: "soul", x: 220, y: 100, icon: Sparkles, desc: "坦诚、自嘲、中短句、括号吐槽" },
    { id: "material-1", label: "参考文章：为什么晚上做一点？", type: "material", x: 120, y: 300, icon: FileText, desc: "小红书剪报，最原始的痛点与素材" },
    { id: "concept-1", label: "心理账户 (Richard Thaler)", type: "concept", x: 380, y: 80, icon: Brain, desc: "睡一觉，待办任务自动在脑中分账" },
    { id: "concept-2", label: "决策消耗 (Danziger & Levav)", type: "concept", x: 420, y: 200, icon: Activity, desc: "帮前额叶提前清障，降低冷启动阻力" },
    { id: "concept-3", label: "蔡加尼克效应 (Zeigarnik)", type: "concept", x: 360, y: 320, icon: Lightbulb, desc: "未完结的尾巴在脑中形成持续债" },
    { id: "draft-v1", label: "草稿 v1 (原始叙事)", type: "draft", x: 580, y: 260, icon: FileText, desc: "最本真的故事，但缺乏硬核学术深度" },
    { id: "draft-v3", label: "草稿 v3 (框架分层)", type: "draft", x: 620, y: 120, icon: FileText, desc: "引入前额叶、决策消耗等硬核概念" },
    { id: "final-v4", label: "定稿 v4 (最终成品)", type: "final", x: 780, y: 180, icon: BookOpen, desc: "去AI味极致、论证硬核的2200字正式稿" }
  ];

  const links: Link[] = [
    { source: "soul", target: "style-dna" },
    { source: "soul", target: "material-1" },
    { source: "style-dna", target: "draft-v1" },
    { source: "material-1", target: "draft-v1" },
    { source: "concept-1", target: "draft-v3" },
    { source: "concept-2", target: "draft-v3" },
    { source: "concept-3", target: "draft-v3" },
    { source: "draft-v1", target: "draft-v3" },
    { source: "draft-v3", target: "final-v4" },
    { source: "style-dna", target: "final-v4" }
  ];

  const handleNodeClick = (id: string) => {
    setActiveNode(id === activeNode ? null : id);
  };

  const isLinkActive = (link: Link) => {
    const current = hoveredNode || activeNode;
    if (!current) return false;
    return link.source === current || link.target === current;
  };

  const getSelectedNodeDesc = () => {
    const node = nodes.find(n => n.id === (hoveredNode || activeNode));
    return node ? node.desc : "点击或悬浮在节点上，查看其在知识网络中的关联";
  };

  return (
    <div className="flex flex-col h-full bg-card border border-border rounded-lg overflow-hidden">
      <div className="p-4 border-b border-border bg-muted/30 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Brain className="w-4 h-full text-primary" />
          <span className="font-mono text-sm font-semibold tracking-wider uppercase">Graph View (知识图谱)</span>
        </div>
        <div className="text-xs text-muted-foreground bg-background px-2 py-1 rounded border border-border font-mono">
          Obsidian Engine v1.0
        </div>
      </div>

      {/* SVG Canvas Area */}
      <div className="relative flex-1 bg-background/50 overflow-hidden min-h-[360px]">
        <svg className="w-full h-full absolute inset-0" viewBox="0 0 900 400">
          {/* Grid Background */}
          <defs>
            <pattern id="grid" width="30" height="30" patternUnits="userSpaceOnUse">
              <path d="M 30 0 L 0 0 0 30" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-border/40" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />

          {/* Render Connections */}
          {links.map((link, idx) => {
            const sourceNode = nodes.find(n => n.id === link.source);
            const targetNode = nodes.find(n => n.id === link.target);
            if (!sourceNode || !targetNode) return null;

            const active = isLinkActive(link);

            return (
              <g key={`link-${idx}`}>
                <line
                  x1={sourceNode.x}
                  y1={sourceNode.y}
                  x2={targetNode.x}
                  y2={targetNode.y}
                  stroke={active ? "var(--primary)" : "currentColor"}
                  strokeWidth={active ? 2 : 1}
                  className={`transition-colors duration-300 ${active ? "" : "text-border/60"}`}
                />
                {active && (
                  <circle r="4" fill="var(--primary)">
                    <animateMotion
                      dur="2.5s"
                      repeatCount="indefinite"
                      path={`M ${sourceNode.x} ${sourceNode.y} L ${targetNode.x} ${targetNode.y}`}
                    />
                  </circle>
                )}
              </g>
            );
          })}

          {/* Render Nodes */}
          {nodes.map(node => {
            const Icon = node.icon;
            const isHovered = hoveredNode === node.id;
            const isActive = activeNode === node.id;
            const isRelated = hoveredNode || activeNode ? links.some(l => 
              (l.source === node.id && (l.target === hoveredNode || l.target === activeNode)) ||
              (l.target === node.id && (l.source === hoveredNode || l.source === activeNode))
            ) : false;

            let colorClass = "text-muted-foreground border-border bg-card";
            if (isActive || isHovered) {
              if (node.type === "soul") colorClass = "text-primary border-primary bg-primary/10";
              else if (node.type === "concept") colorClass = "text-amber-600 border-amber-500 bg-amber-500/10 dark:text-amber-400";
              else if (node.type === "material") colorClass = "text-blue-600 border-blue-500 bg-blue-500/10 dark:text-blue-400";
              else colorClass = "text-emerald-600 border-emerald-500 bg-emerald-500/10 dark:text-emerald-400";
            } else if (isRelated) {
              colorClass = "text-foreground border-primary/40 bg-primary/5";
            }

            return (
              <g
                key={node.id}
                transform={`translate(${node.x}, ${node.y})`}
                className="cursor-pointer group"
                onClick={() => handleNodeClick(node.id)}
                onMouseEnter={() => setHoveredNode(node.id)}
                onMouseLeave={() => setHoveredNode(null)}
              >
                {/* Node Outer Halo */}
                <circle
                  r="22"
                  className={`fill-transparent stroke-current transition-all duration-300 ${
                    isActive || isHovered ? "scale-110 opacity-100" : "scale-100 opacity-0 group-hover:opacity-40"
                  } ${colorClass}`}
                />
                {/* Node Core */}
                <circle
                  r="16"
                  className={`fill-card stroke-current transition-all duration-300 ${colorClass}`}
                  strokeWidth="1.5"
                />
                {/* Icon */}
                <g transform="translate(-8, -8)" className={`transition-colors duration-300 ${colorClass}`}>
                  <Icon className="w-4 h-full" />
                </g>
                {/* Text Label */}
                <text
                  y="34"
                  textAnchor="middle"
                  className={`font-mono text-[11px] font-medium tracking-wide select-none transition-colors duration-300 ${
                    isActive || isHovered ? "fill-foreground font-semibold" : "fill-muted-foreground"
                  }`}
                >
                  {node.label}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Info Bar */}
      <div className="p-3 border-t border-border bg-muted/10 min-h-[56px] flex items-center">
        <p className="font-serif text-xs text-muted-foreground leading-relaxed transition-all duration-300">
          {(hoveredNode || activeNode) && (
            <span className="font-mono text-[10px] uppercase font-bold tracking-wider mr-2 px-1.5 py-0.5 rounded bg-primary/10 text-primary">
              {nodes.find(n => n.id === (hoveredNode || activeNode))?.type}
            </span>
          )}
          {getSelectedNodeDesc()}
        </p>
      </div>
    </div>
  );
}
