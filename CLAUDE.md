# CoWriter AI — 协同写作系统

AI 辅助写作协同工作流，将多篇参考文章融合生成初稿，再通过人机协作迭代打磨为正式稿。

---

## 目录结构

```
CoWriter AI/
├── articles/       # 用户提供的参考文章（输入）
├── drafts/         # AI 生成的初稿
├── feedback/       # 修改意见与批注
├── final/          # 最终正式稿
└── .claude/
    └── commands/   # 从 GitHub 安装的自定义 Skill
```

---

## 工作流程

### 第一阶段：输入参考文章

1. 将参考文章放入 `articles/` 目录，文件命名格式：`{序号}_{主题角度}.md`
   - 例：`01_技术角度.md`、`02_用户视角.md`、`03_商业分析.md`
2. 告诉我文章主题和写作目标（目标读者、篇幅、风格）

### 第二阶段：安装 Skill（可选）

如果需要使用 GitHub 上的自定义 Skill：

1. 把 GitHub 链接发给我
2. 我会下载 `.md` 文件并安装到 `.claude/commands/` 目录
3. 安装后即可通过 `/skill名称` 调用

Skill 文件命名规则：`.claude/commands/{skill-name}.md`

### 第三阶段：生成初稿

我会：
1. 读取 `articles/` 中的所有参考文章
2. 分析各文章的核心论点、独特角度、关键数据
3. 融合生成约 2000 字初稿，保存到 `drafts/YYYY-MM-DD_{主题}.md`
4. 附上参考来源标注

### 第四阶段：协作修改

1. 将修改意见写入 `feedback/{版本号}_意见.md`，或直接在对话中告知
2. 我会根据意见修改初稿，生成新版本（`drafts/v2_...md`、`v3_...md`...）
3. 定稿后将最终版本移至 `final/`

---

## 命名约定

| 目录 | 格式 | 示例 |
|------|------|------|
| `articles/` | `{序号}_{角度描述}.md` | `01_技术角度.md` |
| `drafts/` | `v{版本}_{主题}.md` | `v1_AI写作趋势.md` |
| `feedback/` | `v{版本}_feedback.md` | `v1_feedback.md` |
| `final/` | `{主题}_final.md` | `AI写作趋势_final.md` |

---

## Skill 安装说明

从 GitHub 安装 Skill 的步骤：

```bash
# 方式一：我来执行（推荐）
# 直接把 GitHub 链接发给我，我会下载并安装

# 方式二：手动安装
# 将 .md 文件下载到 .claude/commands/ 目录
# 重启 Claude Code 后生效
```

已安装的 Skill 列表见 `.claude/commands/` 目录。

---

## 写作参数（每次启动前确认）

- **目标篇幅**：约 2000 字（可调整）
- **目标读者**：待定
- **文章风格**：待定（严肃/轻松/专业/口语化）
- **输出格式**：Markdown
