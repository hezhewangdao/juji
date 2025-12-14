/**
 * 诗词数据服务
 * 用于加载和管理来自 chinese-poetry 项目的古诗词数据
 */

import { Poetry, Sentence, convertPoetriesToSentences, extractFamousSentences } from './poetryProcessor';
import sampleTangPoetry from './sampleTangPoetry.json';
import sampleSongCi from './sampleSongCi.json';

export class PoetryService {
  private tangPoetries: Poetry[] = [];
  private songCi: Poetry[] = [];

  constructor() {
    this.loadSampleData();
  }

  /**
   * 加载示例数据
   */
  private loadSampleData() {
    try {
      this.tangPoetries = sampleTangPoetry as Poetry[];
      this.songCi = sampleSongCi as Poetry[];
    } catch (error) {
      console.error('加载诗词数据失败:', error);
    }
  }

  /**
   * 获取所有诗词转换成的句子
   * @returns 句子列表
   */
  getAllSentences(): Sentence[] {
    const tangSentences = convertPoetriesToSentences(this.tangPoetries);
    const songSentences = convertPoetriesToSentences(this.songCi);
    return [...tangSentences, ...songSentences];
  }

  /**
   * 获取名句
   * @returns 名句列表
   */
  getFamousSentences(): Sentence[] {
    const tangFamous = extractFamousSentences(this.tangPoetries);
    const songFamous = extractFamousSentences(this.songCi);
    return [...tangFamous, ...songFamous];
  }

  /**
   * 根据作者获取句子
   * @param author 作者姓名
   * @returns 该作者的句子列表
   */
  getSentencesByAuthor(author: string): Sentence[] {
    const authorTangPoetries = this.tangPoetries.filter(p => p.author === author);
    const authorSongCi = this.songCi.filter(c => c.author === author);
    
    const tangSentences = convertPoetriesToSentences(authorTangPoetries);
    const songSentences = convertPoetriesToSentences(authorSongCi);
    
    return [...tangSentences, ...songSentences];
  }

  /**
   * 搜索句子
   * @param keyword 关键词
   * @returns 匹配的句子列表
   */
  searchSentences(keyword: string): Sentence[] {
    const allSentences = this.getAllSentences();
    return allSentences.filter(sentence => 
      sentence.content.includes(keyword) || 
      sentence.author.includes(keyword) ||
      (sentence.origin && sentence.origin.includes(keyword))
    );
  }
}

// 创建全局实例
export const poetryService = new PoetryService();