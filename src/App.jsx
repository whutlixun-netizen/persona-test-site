import React, { useMemo, useState } from "react";
import { ArrowLeft, ArrowRight, RotateCcw, Sparkles, Share2, ShieldCheck } from "lucide-react";

const TRAITS = {
  A: { name: "Action", zh: "行动力", color: "#ff7a59" },
  M: { name: "Mind", zh: "洞察力", color: "#7c5cff" },
  C: { name: "Care", zh: "共情力", color: "#ff5fa2" },
  S: { name: "System", zh: "秩序力", color: "#2ca58d" },
  X: { name: "Explore", zh: "探索力", color: "#2f80ed" },
  L: { name: "Lore", zh: "叙事力", color: "#b7791f" },
};

const TYPE_CARDS = {
  AM: {
    code: "AM",
    name: "星舰策士",
    subtitle: "行动 × 洞察",
    motto: "先看见局势，再切开局势。",
    imageSeed: "strategist",
    portrait:
      "你像一位在战场边缘安静推演星图的指挥官。你并不迷信蛮力，真正让你兴奋的是找到关键节点，然后用一次精准行动改变全局。你擅长在混乱里看见结构，在拖延里制造突破。",
    strengths: ["判断快，抓重点能力强", "能把复杂问题拆成可执行步骤", "遇到压力时反而更清醒"],
    blindspots: ["容易低估他人的情绪缓冲需求", "对低效率和反复解释比较不耐烦", "有时会把人生过成项目管理"],
    advice:
      "给自己保留一点“非效率时间”。不是所有关系都需要被推进，也不是所有问题都要立刻解决。"
  },
  AC: {
    code: "AC",
    name: "赤心队长",
    subtitle: "行动 × 共情",
    motto: "我会带大家一起冲过去。",
    imageSeed: "captain",
    portrait:
      "你是那种能把人从低气压里拉出来的人。你不只是会安慰别人，也愿意真的站到前面承担麻烦。你身上有一种热量，既能鼓舞团队，也能把抽象的善意变成具体行动。",
    strengths: ["感染力强，容易凝聚人心", "愿意保护弱势者和新人", "能在关键时刻做出担当"],
    blindspots: ["容易替别人扛太多", "被误解时情绪消耗较大", "有时会用热情掩盖疲惫"],
    advice:
      "学会区分“我愿意帮”和“这必须由我来扛”。真正稳定的善意，需要边界来保护。"
  },
  AS: {
    code: "AS",
    name: "铁壁执行官",
    subtitle: "行动 × 秩序",
    motto: "混乱可以存在，但不能由我负责的地方存在。",
    imageSeed: "executor",
    portrait:
      "你是可靠感很强的人，喜欢把事情推进到真正落地。你不太相信空谈，更相信流程、节点、责任和结果。只要你接手，事情往往会变得清楚、稳定、可追踪。",
    strengths: ["执行稳定，抗压能力强", "重视承诺和交付", "擅长整理流程与资源"],
    blindspots: ["可能对变化和模糊地带焦虑", "容易把他人的随性看成不负责", "不太习惯展示脆弱"],
    advice:
      "给计划留出弹性。秩序不是为了消灭变化，而是为了让变化发生时你依然有余裕。"
  },
  AX: {
    code: "AX",
    name: "疾风开拓者",
    subtitle: "行动 × 探索",
    motto: "地图没有标出的地方，才最值得去。",
    imageSeed: "explorer",
    portrait:
      "你天然对新机会敏感，讨厌被一成不变的生活困住。你喜欢试、喜欢冲、喜欢从真实反馈里成长。你的人生更像一场开放世界游戏，走出去才会触发剧情。",
    strengths: ["适应力强，敢于尝试", "能快速启动新项目", "不容易被失败长期困住"],
    blindspots: ["容易三分钟热度", "细节收尾可能薄弱", "在自由和承诺之间摇摆"],
    advice:
      "给每次探索设置一个最小闭环。不是限制自由，而是让你的冒险真的留下成果。"
  },
  AL: {
    code: "AL",
    name: "燃灯造梦师",
    subtitle: "行动 × 叙事",
    motto: "我要把想象做成别人看得见的东西。",
    imageSeed: "creator",
    portrait:
      "你不满足于只在脑内幻想，真正吸引你的是把故事、画面、概念做出来。你有创作者的冲动，也有推动作品成形的行动力。你适合做能把个人风格转化为现实影响的事情。",
    strengths: ["创作欲强，表达有画面感", "能把灵感变成作品", "容易形成独特个人标签"],
    blindspots: ["容易被评价牵动", "可能在灵感期过度透支", "对平淡重复的维护工作耐心不足"],
    advice:
      "建立一个低压力创作系统。灵感负责点火，习惯负责让火不灭。"
  },
  MC: {
    code: "MC",
    name: "月相读心师",
    subtitle: "洞察 × 共情",
    motto: "你没说出口的部分，我也听见了。",
    imageSeed: "empath",
    portrait:
      "你对人的细微信号很敏感，能读到话语背后的情绪和动机。你通常不是最吵的人，却常常是最懂局面的人。你适合做观察者、分析者、陪伴者，也适合处理复杂的人际问题。",
    strengths: ["感知细腻，理解力强", "擅长洞察关系中的潜台词", "能提供温和但准确的判断"],
    blindspots: ["容易过度解读", "吸收太多他人情绪", "做决定时可能顾虑过多"],
    advice:
      "把直觉变成可验证的信息。你可以相信感受，但不必被每一种感受牵着走。"
  },
  MS: {
    code: "MS",
    name: "白塔智库",
    subtitle: "洞察 × 秩序",
    motto: "真正的安全感，来自清楚的模型。",
    imageSeed: "scholar",
    portrait:
      "你喜欢把世界整理成系统：概念、资料、框架、因果链。你不轻易下判断，但一旦完成分析，结论通常比较扎实。你适合研究、规划、写作、策略和长期知识积累。",
    strengths: ["逻辑严密，学习能力强", "擅长建立体系", "能从细节里推出结构性问题"],
    blindspots: ["可能陷入准备过度", "表达上显得冷或难懂", "容易把不确定性视为威胁"],
    advice:
      "允许自己用七成把握先交付。很多认知只有进入现实，才会继续长出新的证据。"
  },
  MX: {
    code: "MX",
    name: "迷宫观测者",
    subtitle: "洞察 × 探索",
    motto: "我不是迷路，我是在发现隐藏路线。",
    imageSeed: "observer",
    portrait:
      "你对未知世界有强烈好奇心，也有把现象看深一层的习惯。别人看到热闹，你会追问机制；别人满足答案，你会继续寻找例外。你适合前沿议题、研究探索、跨界创意。",
    strengths: ["好奇心强，思维开放", "能发现别人忽略的可能性", "适合处理非标准问题"],
    blindspots: ["容易被新概念分散注意", "落地节奏不稳定", "可能对常规任务耐心不足"],
    advice:
      "每次深入迷宫前，先写下你要带回什么。探索不需要被驯服，但需要有出口。"
  },
  ML: {
    code: "ML",
    name: "幽蓝编年史官",
    subtitle: "洞察 × 叙事",
    motto: "万物都有暗线，我负责把它写出来。",
    imageSeed: "archivist",
    portrait:
      "你擅长把复杂经验转化为有层次的叙述。你关注人的命运、时代的纹理、故事背后的结构。你的表达常常不是单纯漂亮，而是带有解释世界的力量。",
    strengths: ["叙事能力强，思想密度高", "擅长总结经验与意义", "审美和分析可以互相支撑"],
    blindspots: ["容易沉入过去或象征系统", "可能想太多而行动偏慢", "对浅层表达容忍度低"],
    advice:
      "让作品和现实保持连接。深度不是远离生活，而是把生活看得更透。"
  },
  CS: {
    code: "CS",
    name: "暖炉守护者",
    subtitle: "共情 × 秩序",
    motto: "我会把重要的人和事照顾好。",
    imageSeed: "guardian",
    portrait:
      "你重视稳定、信任和长期关系。你不是只会温柔的人，你的温柔往往落实在安排、提醒、维护和承担里。你给人的安全感不是口号，而是日复一日的可靠。",
    strengths: ["责任感强，照顾细致", "适合维护团队氛围", "能让混乱关系重新稳定"],
    blindspots: ["容易忽略自己的需要", "害怕冲突导致忍耐过度", "可能对变化比较谨慎"],
    advice:
      "不要把被需要误认为被爱。你值得在不付出那么多的时候，也被认真对待。"
  },
  CX: {
    code: "CX",
    name: "花火旅伴",
    subtitle: "共情 × 探索",
    motto: "世界这么大，我们一起去看看。",
    imageSeed: "companion",
    portrait:
      "你既喜欢新鲜感，也重视同行者的感受。你很适合连接不同的人、文化和场景。你带来的不是单纯热闹，而是一种让人愿意放下防备、一起体验世界的轻盈感。",
    strengths: ["亲和力强，适应不同圈层", "能让陌生环境变得轻松", "擅长发现生活里的乐趣"],
    blindspots: ["不喜欢沉重承诺", "容易回避长期矛盾", "可能为了气氛牺牲真实想法"],
    advice:
      "快乐不等于没有冲突。真正亲密的关系，也需要你说出不那么轻松的部分。"
  },
  LS: {
    code: "LS",
    name: "银纹匠人",
    subtitle: "叙事 × 秩序",
    motto: "美感需要骨架，作品需要耐心。",
    imageSeed: "artisan",
    portrait:
      "你有审美，也有把审美稳定打磨出来的能力。你适合做需要风格、细节、结构和长期耐性的事情。相比一闪而过的灵感，你更相信反复修整后的完成度。",
    strengths: ["审美稳定，细节敏锐", "能长期打磨作品或技能", "适合建立个人风格体系"],
    blindspots: ["容易完美主义", "对粗糙结果比较难忍", "可能不太愿意快速试错"],
    advice:
      "先允许作品存在，再追求作品完美。完成不是审美的敌人，而是审美的容器。"
  }
};

const FALLBACK_TYPES = ["AM", "AC", "AS", "AX", "AL", "MC", "MS", "MX", "ML", "CS", "CX", "LS"];

const questions = [
  {
    q: "当你面对一个全新的任务时，第一反应更接近：",
    options: [
      { text: "先找突破口，立刻做一个小动作推进", add: { A: 3, X: 1 } },
      { text: "先分析任务背后的结构和风险", add: { M: 3, S: 1 } },
      { text: "先确认相关人的期待和感受", add: { C: 3, S: 1 } },
      { text: "先想象它最后能呈现成什么样子", add: { L: 3, M: 1 } }
    ]
  },
  {
    q: "朋友陷入低谷找你聊天，你通常会：",
    options: [
      { text: "陪他梳理原因，帮他看清问题", add: { M: 2, C: 2 } },
      { text: "直接带他出去走走，换个状态", add: { A: 2, X: 2 } },
      { text: "安静听完，让他知道自己不是一个人", add: { C: 3, L: 1 } },
      { text: "帮他列一个恢复生活秩序的小计划", add: { S: 3, C: 1 } }
    ]
  },
  {
    q: "你最容易被哪种作品打动？",
    options: [
      { text: "世界观严密、伏笔回收漂亮的作品", add: { M: 2, L: 2 } },
      { text: "角色关系细腻、情绪很真的作品", add: { C: 3, L: 1 } },
      { text: "节奏很快、爽点明确、行动感强的作品", add: { A: 3, X: 1 } },
      { text: "形式新奇、风格独特、很难归类的作品", add: { X: 3, L: 1 } }
    ]
  },
  {
    q: "团队合作时，你最自然承担的角色是：",
    options: [
      { text: "定方向和关键策略的人", add: { M: 2, A: 2 } },
      { text: "推动进度、催交付的人", add: { A: 2, S: 2 } },
      { text: "照顾气氛、协调矛盾的人", add: { C: 3, S: 1 } },
      { text: "提出创意、包装表达的人", add: { L: 2, X: 2 } }
    ]
  },
  {
    q: "你对“稳定生活”的态度更像：",
    options: [
      { text: "稳定很好，它让我有余力积累", add: { S: 3, M: 1 } },
      { text: "可以稳定，但不能没有变化和新鲜感", add: { X: 3, A: 1 } },
      { text: "稳定的人际关系比稳定日程更重要", add: { C: 3, S: 1 } },
      { text: "稳定适合打磨作品和审美", add: { L: 2, S: 2 } }
    ]
  },
  {
    q: "别人夸你时，哪一句最接近真实？",
    options: [
      { text: "你真的很靠谱", add: { S: 3, C: 1 } },
      { text: "你总能看得很深", add: { M: 3, L: 1 } },
      { text: "你行动力好强", add: { A: 3, S: 1 } },
      { text: "你总有很特别的想法", add: { X: 2, L: 2 } }
    ]
  },
  {
    q: "遇到规则不合理的情况，你会：",
    options: [
      { text: "研究规则漏洞，再设计更优方案", add: { M: 3, A: 1 } },
      { text: "先保证事情正常运转，再慢慢修正", add: { S: 3, A: 1 } },
      { text: "看它伤害了谁，优先保护具体的人", add: { C: 3, A: 1 } },
      { text: "想办法换一个新玩法，不被旧框架困住", add: { X: 3, L: 1 } }
    ]
  },
  {
    q: "你最害怕自己变成：",
    options: [
      { text: "只会空想、没有任何成果的人", add: { A: 3, S: 1 } },
      { text: "麻木重复、失去好奇心的人", add: { X: 3, L: 1 } },
      { text: "冷漠迟钝、无法理解他人的人", add: { C: 3, M: 1 } },
      { text: "表达贫乏、没有精神世界的人", add: { L: 3, M: 1 } }
    ]
  },
  {
    q: "做决定时，你更信任：",
    options: [
      { text: "可验证的信息和逻辑链条", add: { M: 3, S: 1 } },
      { text: "实际试一下后的反馈", add: { A: 2, X: 2 } },
      { text: "自己对人和氛围的感受", add: { C: 3, M: 1 } },
      { text: "它是否符合我想成为的故事", add: { L: 3, X: 1 } }
    ]
  },
  {
    q: "如果给你一周自由时间，你更想：",
    options: [
      { text: "做完一个拖了很久的项目", add: { A: 2, S: 2 } },
      { text: "系统学习一个感兴趣的主题", add: { M: 3, S: 1 } },
      { text: "去陌生地方体验新鲜生活", add: { X: 3, A: 1 } },
      { text: "写、画、剪视频或搭建个人作品", add: { L: 3, A: 1 } }
    ]
  },
  {
    q: "你在人际关系里比较在意：",
    options: [
      { text: "彼此是否真诚理解", add: { C: 3, M: 1 } },
      { text: "承诺是否稳定可靠", add: { S: 3, C: 1 } },
      { text: "能不能一起成长和行动", add: { A: 2, C: 2 } },
      { text: "能不能分享精神世界和审美", add: { L: 2, C: 2 } }
    ]
  },
  {
    q: "你处理压力的方式更像：",
    options: [
      { text: "列清单，逐项处理", add: { S: 3, A: 1 } },
      { text: "独自思考，把问题看透", add: { M: 3, S: 1 } },
      { text: "找信任的人说出来", add: { C: 3, L: 1 } },
      { text: "换环境或做新事情打断内耗", add: { X: 2, A: 2 } }
    ]
  },
  {
    q: "你对失败的看法更接近：",
    options: [
      { text: "失败是信息，复盘后继续推进", add: { A: 2, M: 2 } },
      { text: "失败说明流程需要修正", add: { S: 3, M: 1 } },
      { text: "失败会痛，但也能让我更理解人", add: { C: 2, L: 2 } },
      { text: "失败至少证明我走过新路", add: { X: 3, A: 1 } }
    ]
  },
  {
    q: "你更喜欢哪种称号？",
    options: [
      { text: "破局者", add: { A: 3, M: 1 } },
      { text: "守护者", add: { C: 2, S: 2 } },
      { text: "观测者", add: { M: 2, X: 2 } },
      { text: "造梦者", add: { L: 3, X: 1 } }
    ]
  },
  {
    q: "面对信息爆炸，你会优先：",
    options: [
      { text: "建立分类和资料库", add: { S: 2, M: 2 } },
      { text: "抓核心结论，决定下一步", add: { A: 2, M: 2 } },
      { text: "寻找有趣的新方向", add: { X: 3, L: 1 } },
      { text: "把它整理成好懂的故事", add: { L: 3, M: 1 } }
    ]
  },
  {
    q: "你最欣赏的人通常具备：",
    options: [
      { text: "清醒、果断、有战略眼光", add: { M: 2, A: 2 } },
      { text: "温柔、坚定、能照顾别人", add: { C: 2, S: 2 } },
      { text: "自由、勇敢、不怕未知", add: { X: 3, A: 1 } },
      { text: "有审美、有表达、有精神深度", add: { L: 3, M: 1 } }
    ]
  },
  {
    q: "如果要组织一次活动，你会先关注：",
    options: [
      { text: "目标、流程、时间表", add: { S: 3, A: 1 } },
      { text: "主题、氛围、视觉呈现", add: { L: 3, C: 1 } },
      { text: "参与者是否舒服、有参与感", add: { C: 3, S: 1 } },
      { text: "有没有新鲜玩法和记忆点", add: { X: 3, L: 1 } }
    ]
  },
  {
    q: "你最容易在哪件事上投入过度？",
    options: [
      { text: "把事情做到有结果", add: { A: 3, S: 1 } },
      { text: "把一个问题想清楚", add: { M: 3, S: 1 } },
      { text: "照顾别人的情绪", add: { C: 3, S: 1 } },
      { text: "打磨一个表达或作品", add: { L: 3, M: 1 } }
    ]
  },
  {
    q: "你的“盲区”更可能是：",
    options: [
      { text: "太急，忘记别人需要时间", add: { A: 3, C: 1 } },
      { text: "想太多，迟迟不开始", add: { M: 3, S: 1 } },
      { text: "太顾及别人，不敢拒绝", add: { C: 3, S: 1 } },
      { text: "太追求有趣，不想收尾", add: { X: 3, L: 1 } }
    ]
  },
  {
    q: "你觉得“成熟”更像：",
    options: [
      { text: "有能力承担后果", add: { A: 2, S: 2 } },
      { text: "能理解复杂性，不轻易评判", add: { M: 2, C: 2 } },
      { text: "能稳定照顾自己和他人", add: { C: 2, S: 2 } },
      { text: "依然保有好奇心和创造力", add: { X: 2, L: 2 } }
    ]
  },
  {
    q: "你更愿意被安排到哪类任务？",
    options: [
      { text: "紧急、关键、需要推进的任务", add: { A: 3, S: 1 } },
      { text: "复杂、抽象、需要分析的任务", add: { M: 3, L: 1 } },
      { text: "沟通、陪伴、协调人的任务", add: { C: 3, S: 1 } },
      { text: "创意、探索、没有标准答案的任务", add: { X: 2, L: 2 } }
    ]
  },
  {
    q: "你的房间或工作区更像：",
    options: [
      { text: "为了效率服务，东西放哪都有原因", add: { S: 3, A: 1 } },
      { text: "资料很多，但我知道它们之间的关系", add: { M: 3, L: 1 } },
      { text: "有生活痕迹，让人感觉舒服", add: { C: 2, L: 2 } },
      { text: "经常变化，取决于最近迷上什么", add: { X: 3, L: 1 } }
    ]
  },
  {
    q: "你对竞争的态度是：",
    options: [
      { text: "可以竞争，但要赢在策略和执行", add: { A: 2, M: 2 } },
      { text: "不讨厌竞争，但要规则清楚", add: { S: 3, A: 1 } },
      { text: "比起赢，我更在意关系是否被伤害", add: { C: 3, S: 1 } },
      { text: "我更喜欢开辟自己的赛道", add: { X: 2, L: 2 } }
    ]
  },
  {
    q: "当别人误解你时，你通常：",
    options: [
      { text: "直接解释重点，尽快解决", add: { A: 3, M: 1 } },
      { text: "先判断是否值得解释", add: { M: 3, S: 1 } },
      { text: "会难受，希望对方理解我的感受", add: { C: 3, L: 1 } },
      { text: "把它消化成经验、创作或自我叙事", add: { L: 3, M: 1 } }
    ]
  },
  {
    q: "你最喜欢的成长方式是：",
    options: [
      { text: "接真实项目，在实战里升级", add: { A: 3, X: 1 } },
      { text: "读书研究，形成自己的方法论", add: { M: 2, S: 2 } },
      { text: "和不同的人交流，理解更多人生", add: { C: 2, X: 2 } },
      { text: "持续创作，积累个人表达", add: { L: 3, S: 1 } }
    ]
  },
  {
    q: "你更容易被哪类场景激活？",
    options: [
      { text: "危机出现，需要有人站出来", add: { A: 3, C: 1 } },
      { text: "谜题出现，需要推理和解释", add: { M: 3, X: 1 } },
      { text: "关系紧张，需要有人缓和", add: { C: 3, S: 1 } },
      { text: "灵感出现，需要立刻记录和塑造", add: { L: 3, A: 1 } }
    ]
  },
  {
    q: "你更希望别人如何与你合作？",
    options: [
      { text: "目标明确，少绕弯，直接推进", add: { A: 3, S: 1 } },
      { text: "给我足够信息和思考空间", add: { M: 3, S: 1 } },
      { text: "尊重感受，别把人当工具", add: { C: 3, L: 1 } },
      { text: "保留弹性，允许尝试新方法", add: { X: 3, A: 1 } }
    ]
  },
  {
    q: "你心中理想的一天包含：",
    options: [
      { text: "完成重要事项，晚上安心休息", add: { A: 2, S: 2 } },
      { text: "弄懂一个困扰很久的问题", add: { M: 3, S: 1 } },
      { text: "和重要的人有高质量交流", add: { C: 3, L: 1 } },
      { text: "经历一点计划外的惊喜", add: { X: 3, L: 1 } }
    ]
  },
  {
    q: "当你拥有影响力后，你最想用它来：",
    options: [
      { text: "推动真正有价值的改变", add: { A: 2, M: 2 } },
      { text: "建立更稳定可靠的系统", add: { S: 3, M: 1 } },
      { text: "保护更多具体的人", add: { C: 3, A: 1 } },
      { text: "创造让人记住的作品或文化", add: { L: 3, X: 1 } }
    ]
  },
  {
    q: "最后，哪句话最像你的底层驱动力？",
    options: [
      { text: "我要让事情真的发生", add: { A: 4 } },
      { text: "我要看清世界的运行方式", add: { M: 4 } },
      { text: "我要守住人与人之间的温度", add: { C: 4 } },
      { text: "我要创造属于自己的意义", add: { L: 3, X: 1 } }
    ]
  }
];

function pairCodeFromScores(scores) {
  const sorted = Object.entries(scores).sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]));
  const candidates = [];
  for (let i = 0; i < sorted.length; i++) {
    for (let j = i + 1; j < sorted.length; j++) {
      const code = [sorted[i][0], sorted[j][0]].sort().join("");
      candidates.push(code);
    }
  }
  const match = candidates.find(code => TYPE_CARDS[code]);
  return match || FALLBACK_TYPES[Math.abs(sorted[0][1] + sorted[1][1]) % FALLBACK_TYPES.length];
}

function calculateResult(answers) {
  const scores = { A: 0, M: 0, C: 0, S: 0, X: 0, L: 0 };
  answers.forEach((choiceIndex, qIndex) => {
    const option = questions[qIndex].options[choiceIndex];
    if (!option) return;
    Object.entries(option.add).forEach(([trait, value]) => {
      scores[trait] += value;
    });
  });
  const code = pairCodeFromScores(scores);
  return { code, card: TYPE_CARDS[code], scores };
}

function AnimeAvatar({ seed, code }) {
  const left = TRAITS[code[0]]?.color || "#7c5cff";
  const right = TRAITS[code[1]]?.color || "#ff5fa2";
  return (
    <svg viewBox="0 0 420 420" role="img" aria-label={`${seed} anime avatar`} className="avatar">
      <defs>
        <linearGradient id={`bg-${code}`} x1="0" x2="1">
          <stop offset="0%" stopColor={left} />
          <stop offset="100%" stopColor={right} />
        </linearGradient>
        <radialGradient id={`glow-${code}`} cx="50%" cy="35%" r="55%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity=".9" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity=".08" />
        </radialGradient>
      </defs>
      <rect width="420" height="420" rx="38" fill={`url(#bg-${code})`} />
      <circle cx="210" cy="150" r="128" fill={`url(#glow-${code})`} />
      <path d="M92 340c25-78 76-116 118-116s93 38 118 116" fill="#242033" opacity=".92" />
      <path d="M112 149c14-74 61-111 101-111 51 0 98 47 95 119-13-22-30-35-51-39-48-10-85 10-145 31z" fill="#2b2440" />
      <path d="M128 170c8-58 43-91 86-91 46 0 82 38 82 92 0 67-38 111-84 111s-84-45-84-112z" fill="#ffd8c8" />
      <path d="M120 169c70-16 112-46 149-88 22 24 32 52 36 90-28-12-49-28-68-54-28 28-64 45-117 52z" fill="#33284c" />
      <circle cx="177" cy="184" r="8" fill="#34283e" />
      <circle cx="244" cy="184" r="8" fill="#34283e" />
      <path d="M189 226c16 13 35 13 51 0" stroke="#a95f66" strokeWidth="7" strokeLinecap="round" fill="none" />
      <path d="M118 288c30 36 158 36 188 0" stroke="#fff" strokeOpacity=".35" strokeWidth="4" fill="none" />
      <text x="210" y="372" textAnchor="middle" fontFamily="ui-sans-serif, system-ui" fontSize="54" fontWeight="900" fill="#fff" opacity=".92">{code}</text>
      <circle cx="84" cy="74" r="8" fill="#fff" opacity=".65" />
      <circle cx="340" cy="94" r="6" fill="#fff" opacity=".55" />
      <circle cx="336" cy="285" r="10" fill="#fff" opacity=".35" />
    </svg>
  );
}

export default function App() {
  const [started, setStarted] = useState(false);
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState(Array(questions.length).fill(null));
  const [showResult, setShowResult] = useState(false);

  const progress = Math.round((answers.filter(v => v !== null).length / questions.length) * 100);
  const result = useMemo(() => calculateResult(answers), [answers]);
  const answeredCurrent = answers[current] !== null;

  function choose(index) {
    const next = [...answers];
    next[current] = index;
    setAnswers(next);
  }

  function next() {
    if (current < questions.length - 1) setCurrent(current + 1);
    else setShowResult(true);
  }

  function prev() {
    if (current > 0) setCurrent(current - 1);
  }

  function reset() {
    setAnswers(Array(questions.length).fill(null));
    setCurrent(0);
    setShowResult(false);
    setStarted(false);
  }

  async function shareResult() {
    const text = `我的十二人格测试结果是：${result.card.code}·${result.card.name}｜${result.card.subtitle}`;
    if (navigator.share) {
      await navigator.share({ title: "十二人格卡片测试", text, url: window.location.href });
    } else {
      await navigator.clipboard.writeText(text + " " + window.location.href);
      alert("结果已复制，可以发给朋友啦。");
    }
  }

  if (!started) {
    return (
      <main className="page">
        <section className="hero card">
          <div className="badge"><Sparkles size={16} /> 30题 · 12人格 · 即时生成卡片</div>
          <h1>十二人格卡片测试</h1>
          <p className="lead">
            这是一套以六种心理倾向为基础的轻量人格测试：行动力、洞察力、共情力、秩序力、探索力与叙事力。
            完成30道选择题后，你会得到一张带有人格名称、人物画像、优势、盲区和建议的动漫风人格卡片。
          </p>
          <div className="heroGrid">
            <div><strong>适合测试：</strong><span>性格气质、优势位置、潜在盲区</span></div>
            <div><strong>测试时间：</strong><span>约3-5分钟</span></div>
            <div><strong>说明：</strong><span>请选择“更像你”的选项，不必追求标准答案</span></div>
          </div>
          <button className="primary" onClick={() => setStarted(true)}>开始测试</button>
        </section>
      </main>
    );
  }

  if (showResult) {
    const sortedScores = Object.entries(result.scores).sort((a, b) => b[1] - a[1]);
    return (
      <main className="page resultPage">
        <section className="resultCard">
          <div className="resultTop">
            <AnimeAvatar seed={result.card.imageSeed} code={result.card.code} />
            <div className="resultInfo">
              <div className="badge"><ShieldCheck size={16} /> 你的结果</div>
              <h1>{result.card.code}·{result.card.name}</h1>
              <h2>{result.card.subtitle}</h2>
              <p className="motto">“{result.card.motto}”</p>
              <p>{result.card.portrait}</p>
            </div>
          </div>

          <div className="sections">
            <div className="miniCard">
              <h3>你的优势</h3>
              <ul>{result.card.strengths.map(item => <li key={item}>{item}</li>)}</ul>
            </div>
            <div className="miniCard">
              <h3>可能盲区</h3>
              <ul>{result.card.blindspots.map(item => <li key={item}>{item}</li>)}</ul>
            </div>
            <div className="miniCard advice">
              <h3>给你的建议</h3>
              <p>{result.card.advice}</p>
            </div>
          </div>

          <div className="scoreBox">
            <h3>六维得分</h3>
            {sortedScores.map(([key, value]) => (
              <div className="scoreRow" key={key}>
                <span>{key} · {TRAITS[key].zh}</span>
                <div className="bar"><i style={{ width: `${Math.min(100, value * 2.2)}%`, background: TRAITS[key].color }} /></div>
                <b>{value}</b>
              </div>
            ))}
          </div>

          <div className="actions">
            <button className="secondary" onClick={reset}><RotateCcw size={18} /> 重新测试</button>
            <button className="primary" onClick={shareResult}><Share2 size={18} /> 分享结果</button>
          </div>
        </section>
      </main>
    );
  }

  const q = questions[current];

  return (
    <main className="page">
      <section className="quiz card">
        <div className="topline">
          <span>第 {current + 1} / {questions.length} 题</span>
          <span>{progress}% 已完成</span>
        </div>
        <div className="progress"><i style={{ width: `${progress}%` }} /></div>
        <h1>{q.q}</h1>
        <div className="options">
          {q.options.map((op, index) => (
            <button
              className={`option ${answers[current] === index ? "selected" : ""}`}
              onClick={() => choose(index)}
              key={op.text}
            >
              <span>{String.fromCharCode(65 + index)}</span>
              {op.text}
            </button>
          ))}
        </div>
        <div className="nav">
          <button className="secondary" onClick={prev} disabled={current === 0}><ArrowLeft size={18} /> 上一题</button>
          <button className="primary" onClick={next} disabled={!answeredCurrent}>
            {current === questions.length - 1 ? "查看结果" : "下一题"} <ArrowRight size={18} />
          </button>
        </div>
      </section>
    </main>
  );
}
