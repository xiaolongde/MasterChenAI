# 陈老师问前程 🔮

一个基于**增删卜易**方法的六爻占卜系统，结合 AI 智能解卦。

## ✨ 功能特点

- 🎲 **铜钱起卦**：模拟传统三枚铜钱抛掷过程
- 📊 **卦象展示**：本卦、变卦对照显示
- 🏛️ **增删卜易**：严格按照增删卜易的纳甲法配置地支
- 👨‍👩‍👧‍👦 **六亲标注**：自动计算父母、兄弟、子孙、妻财、官鬼
- 🎯 **世应标注**：明确标注世爻、应爻位置
- 🔴 **动爻高亮**：动爻用红色醒目标识
- 🤖 **AI 解卦**：接入 Google Gemini API，智能分析卦象吉凶
- 📝 **提示词导出**：可复制提示词到其他 AI 工具使用

## 🚀 在线使用

部署到 GitHub Pages 后访问：`https://你的用户名.github.io/MasterChenAI/`

## 🛠️ 本地运行

1. 克隆仓库：
   ```bash
   git clone https://github.com/你的用户名/MasterChenAI.git
   cd MasterChenAI
   ```

2. 启动本地服务器（任选一种）：
   ```bash
   # Python 3
   python -m http.server 3000
   
   # Node.js
   npx serve -l 3000
   ```

3. 浏览器访问：`http://localhost:3000`

## 🔑 配置 AI 解卦

AI 解卦功能需要 Google Gemini API Key：

1. 访问 [Google AI Studio](https://aistudio.google.com/app/apikey) 获取免费 API Key
2. 在网页顶部的输入框中填入 API Key
3. 点击「保存」按钮（Key 会保存在浏览器本地）
4. 点击「测试连接」确认 API 可用

> ⚠️ **注意**：访问 Google API 需要科学上网

## 📖 使用方法

1. 从下拉框选择要询问的问题
2. 点击「开始算卦」
3. 依次点击「抛掷铜钱」6 次
4. 查看生成的本卦和变卦
5. 点击「AI 解卦」获取智能分析

## 🎲 起卦规则（增删卜易）

| 结果 | 记法 | 含义 |
|------|------|------|
| 1背2字 | ━━━ 单 | 阳爻（不动） |
| 2背1字 | ━ ━ 拆 | 阴爻（不动） |
| 3背 | ○ 重 | 阳动（老阳变阴） |
| 3字 | ✕ 交 | 阴动（老阴变阳） |

## 📁 项目结构

```
MasterChenAI/
├── index.html      # 主页面
├── style.css       # 样式文件
├── script.js       # 核心逻辑
└── README.md       # 说明文档
```

## 🔧 技术栈

- **前端**：原生 HTML/CSS/JavaScript
- **AI**：Google Gemini API
- **部署**：GitHub Pages

## 📚 参考资料

- 《增删卜易》- 野鹤老人
- 六爻纳甲法

## 📄 License

MIT License

---

**免责声明**：本项目仅供娱乐和学习传统文化，占卜结果仅供参考，请勿迷信。

