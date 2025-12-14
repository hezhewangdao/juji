-- 设置字符集为 utf8mb4，支持 Emoji 和生僻字
SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- 1. 用户表 (users)
-- ----------------------------
CREATE TABLE `users` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(64) NOT NULL COMMENT '用户名',
  `email` varchar(128) NOT NULL COMMENT '邮箱（用于登录）',
  `password_hash` varchar(255) NOT NULL COMMENT '加密后的密码',
  `avatar` varchar(255) DEFAULT NULL COMMENT '头像URL',
  `bio` varchar(255) DEFAULT NULL COMMENT '个人简介',
  `role` enum('user','editor','admin') NOT NULL DEFAULT 'user' COMMENT '角色权限',
  `status` tinyint(1) NOT NULL DEFAULT '1' COMMENT '状态: 1正常 0封禁',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_email` (`email`),
  UNIQUE KEY `uk_username` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='用户核心表';

-- ----------------------------
-- 2. 作者/名人表 (authors)
-- 设计意图：将“鲁迅”等名人与“网友”区分开。
-- ----------------------------
CREATE TABLE `authors` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(128) NOT NULL COMMENT '作者姓名',
  `dynasty` varchar(64) DEFAULT NULL COMMENT '朝代/国籍',
  `bio` text COMMENT '作者生平简介',
  `avatar` varchar(255) DEFAULT NULL COMMENT '作者肖像',
  `is_verified` tinyint(1) DEFAULT '1' COMMENT '是否系统收录的知名人物',
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='名人/作者库';

-- ----------------------------
-- 3. 作品/出处表 (works)
-- 设计意图：书籍、电影、歌曲。与作者关联。
-- ----------------------------
CREATE TABLE `works` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL COMMENT '作品名',
  `sub_title` varchar(255) DEFAULT NULL COMMENT '副标题',
  `category` enum('book','movie','anime','music','speech','other') NOT NULL DEFAULT 'book' COMMENT '作品分类',
  `author_id` int(10) unsigned DEFAULT NULL COMMENT '关联作者ID (若是多人创作可为空)',
  `cover_url` varchar(255) DEFAULT NULL COMMENT '封面图',
  `douban_link` varchar(255) DEFAULT NULL COMMENT '豆瓣链接（用于抓取元数据）',
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_title` (`title`),
  KEY `idx_author` (`author_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='作品出处库';

-- ----------------------------
-- 4. 句子表 (sentences) - 核心表
-- 专家级考量：
-- 1. content_hash 用于快速去重。
-- 2. origin_type 区分“原创”和“引用”。
-- 3. 冗余 count 字段减少 COUNT(*) 查询压力。
-- ----------------------------
CREATE TABLE `sentences` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `uuid` char(36) NOT NULL COMMENT '对外暴露的UUID，防止ID遍历',
  
  -- 内容核心
  `content` text NOT NULL COMMENT '句子正文',
  `content_hash` char(32) NOT NULL COMMENT '正文MD5值，用于防重复提交检查',
  
  -- 归属关系
  `author_id` int(10) unsigned DEFAULT NULL COMMENT '原句作者ID (FK)',
  `work_id` int(10) unsigned DEFAULT NULL COMMENT '出处作品ID (FK)',
  `uploader_id` bigint(20) unsigned NOT NULL COMMENT '上传/分享的用户ID (FK)',
  
  -- 类型区分
  `origin_type` enum('original','quote') NOT NULL DEFAULT 'quote' COMMENT '类型：original原创, quote摘录',
  `is_official` tinyint(1) NOT NULL DEFAULT '0' COMMENT '是否官方精选/收录',
  
  -- 审核与状态
  `status` enum('pending','published','rejected','deleted') NOT NULL DEFAULT 'pending' COMMENT '审核状态',
  `audit_reason` varchar(255) DEFAULT NULL COMMENT '审核拒绝理由',
  
  -- 统计数据 (反范式化设计，提升读取性能)
  `view_count` int(10) unsigned NOT NULL DEFAULT '0',
  `like_count` int(10) unsigned NOT NULL DEFAULT '0',
  `collect_count` int(10) unsigned NOT NULL DEFAULT '0',
  `share_count` int(10) unsigned NOT NULL DEFAULT '0',
  
  -- 长度信息 (便于前端排版筛选)
  `length` int(10) unsigned NOT NULL DEFAULT '0',
  
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_uuid` (`uuid`),
  KEY `idx_content_hash` (`content_hash`), -- 查重索引
  KEY `idx_uploader` (`uploader_id`),
  KEY `idx_author_work` (`author_id`, `work_id`), -- 关联查询索引
  KEY `idx_status_created` (`status`, `created_at`) -- 首页最新发布筛选索引
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='句子主表';

-- ----------------------------
-- 5. 标签表 (tags)
-- 设计意图：实现“雨天”、“深夜”、“励志”等分类。
-- ----------------------------
CREATE TABLE `tags` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(32) NOT NULL COMMENT '标签名',
  `type` enum('emotion','scene','weather','topic') NOT NULL DEFAULT 'topic' COMMENT '标签类型',
  `usage_count` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '被引用次数',
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- 6. 句子-标签关联表 (sentence_tags)
-- ----------------------------
CREATE TABLE `sentence_tags` (
  `sentence_id` bigint(20) unsigned NOT NULL,
  `tag_id` int(10) unsigned NOT NULL,
  PRIMARY KEY (`sentence_id`,`tag_id`),
  KEY `idx_tag_id` (`tag_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- 7. 用户点赞/收藏记录表 (user_interactions)
-- 设计意图：将点赞和收藏合并或分开。这里分开写更清晰，这里演示点赞。
-- ----------------------------
CREATE TABLE `user_likes` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` bigint(20) unsigned NOT NULL,
  `sentence_id` bigint(20) unsigned NOT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_user_sentence` (`user_id`,`sentence_id`) -- 防止重复点赞
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `user_collections` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` bigint(20) unsigned NOT NULL,
  `sentence_id` bigint(20) unsigned NOT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_user_sentence` (`user_id`,`sentence_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;