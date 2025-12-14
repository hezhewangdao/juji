/**
 * 古诗词数据处理器
 * 将 chinese-poetry 项目中的古诗词数据转换为句子分享网站可用的格式
 */

export interface Poetry {
  title: string;
  author: string;
  paragraphs: string[];
  rhythmic?: string; // 词牌名（宋词特有）
  strains?: string[]; // 平仄信息
}

export interface Sentence {
  id: number;
  content: string;
  author: string;
  origin?: string; // 出处
  dynasty?: string; // 朝代
  likes?: number;
  createdAt?: string;
}

/**
 * 将古诗词转换为句子列表
 * @param poetries 古诗词数据数组
 * @returns 句子列表
 */
export const convertPoetriesToSentences = (poetries: Poetry[]): Sentence[] => {
  const sentences: Sentence[] = [];
  let idCounter = 1;

  poetries.forEach(poetry => {
    // 将每句诗词作为一个独立的句子
    poetry.paragraphs.forEach(paragraph => {
      // 有些段落包含多个句子，用逗号或句号分割
      const parts = paragraph.split(/[，。！？；]/).filter(part => part.trim().length > 0);
      
      parts.forEach(part => {
        if (part.trim().length > 0) {
          sentences.push({
            id: idCounter++,
            content: part.trim(),
            author: poetry.author || '未知',
            origin: poetry.title,
            // 根据诗词类型判断朝代（简化处理）
            dynasty: poetry.rhythmic ? '宋代' : '唐代',
            likes: Math.floor(Math.random() * 1000), // 随机点赞数
            createdAt: new Date(Date.now() - Math.floor(Math.random() * 365) * 24 * 60 * 60 * 1000).toISOString()
          });
        }
      });
    });
  });

  return sentences;
};

/**
 * 从诗词中提取名句
 * @param poetries 古诗词数据数组
 * @returns 名句列表
 */
export const extractFamousSentences = (poetries: Poetry[]): Sentence[] => {
  const famousPatterns = [
    '床前明月光', '春风吹又生', '锄禾日当午', '春眠不觉晓',
    '举头望明月', '低头思故乡', '粒粒皆辛苦', '处处闻啼鸟'
  ];
  
  const famousSentences: Sentence[] = [];
  let idCounter = 1;

  poetries.forEach(poetry => {
    poetry.paragraphs.forEach(paragraph => {
      const matchedPattern = famousPatterns.find(pattern => paragraph.includes(pattern));
      if (matchedPattern) {
        famousSentences.push({
          id: idCounter++,
          content: paragraph,
          author: poetry.author || '未知',
          origin: poetry.title,
          dynasty: poetry.rhythmic ? '宋代' : '唐代',
          likes: Math.floor(Math.random() * 10000), // 名句随机点赞数更高
          createdAt: new Date(Date.now() - Math.floor(Math.random() * 365) * 24 * 60 * 60 * 1000).toISOString()
        });
      }
    });
  });

  return famousSentences;
};