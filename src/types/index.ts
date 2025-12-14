export interface Sentence {
  id: number;
  content: string;
  author: string;
  createdAt?: string;
  likes?: number;
  origin?: string; // 出处
  dynasty?: string; // 朝代
}

export interface User {
  id: number;
  username: string;
  avatar?: string;
}

// 古诗词数据接口
export interface Poetry {
  title: string;
  author: string;
  paragraphs: string[];
  rhythmic?: string; // 词牌名（宋词特有）
  strains?: string[]; // 平仄信息
}