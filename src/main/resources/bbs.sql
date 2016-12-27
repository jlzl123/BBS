/*
Navicat MySQL Data Transfer

Source Server         : root
Source Server Version : 50622
Source Host           : localhost:3306
Source Database       : bbs

Target Server Type    : MYSQL
Target Server Version : 50622
File Encoding         : 65001

Date: 2016-12-27 17:46:43
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `admin`
-- ----------------------------
DROP TABLE IF EXISTS `admin`;
CREATE TABLE `admin` (
  `id` int(4) NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL,
  `password` varchar(50) NOT NULL,
  PRIMARY KEY (`id`,`username`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of admin
-- ----------------------------
INSERT INTO `admin` VALUES ('1', 'admin', 'admin');

-- ----------------------------
-- Table structure for `inreplays`
-- ----------------------------
DROP TABLE IF EXISTS `inreplays`;
CREATE TABLE `inreplays` (
  `inReplayId` int(4) NOT NULL AUTO_INCREMENT,
  `inReplayContent` varchar(100) NOT NULL,
  `noteId` int(4) NOT NULL,
  `replayId` int(4) NOT NULL,
  `inReplayUser` varchar(50) NOT NULL,
  `inReplayToUser` varchar(50) DEFAULT NULL,
  `addtime` datetime NOT NULL,
  PRIMARY KEY (`inReplayId`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of inreplays
-- ----------------------------
INSERT INTO `inreplays` VALUES ('1', '艾特什么艾特，葬爱家族是你能艾特的嘛，你到底懂不懂cf，dnf到底有多吃显卡', '1', '1', '123456', 'admin', '2016-12-27 16:57:02');
INSERT INTO `inreplays` VALUES ('2', '价格合理就还好，不过刚出价格应该会偏高点，首发价应该还是不错的~', '1', '1', 'admin', '123456', '2016-12-27 16:58:38');
INSERT INTO `inreplays` VALUES ('3', '真正等十系的不会去买1050这种。而跟风的买的人会多。', '1', '1', '123456', 'admin', '2016-12-27 17:00:04');
INSERT INTO `inreplays` VALUES ('4', '1050就和965一个德行，首发价那么难抢……说不定还要翻船，机智的我960美滋滋', '1', '1', '张三', 'admin', '2016-12-27 17:01:00');
INSERT INTO `inreplays` VALUES ('5', ' 等的是1050出来看965降不降价', '1', '1', '李四', '张三', '2016-12-27 17:01:27');
INSERT INTO `inreplays` VALUES ('6', '制程上去了差距就小了', '1', '1', '张三', '李四', '2016-12-27 17:01:51');
INSERT INTO `inreplays` VALUES ('7', '有一句说一句，和桌面版差距百分之十五已经很小了', '1', '2', '123456', 'admin', '2016-12-27 17:02:17');

-- ----------------------------
-- Table structure for `news`
-- ----------------------------
DROP TABLE IF EXISTS `news`;
CREATE TABLE `news` (
  `newId` int(4) NOT NULL AUTO_INCREMENT,
  `newTitle` varchar(50) NOT NULL,
  `type` varchar(50) NOT NULL,
  `content` varchar(50) NOT NULL,
  `addUser` varchar(50) NOT NULL,
  `addtime` datetime NOT NULL,
  PRIMARY KEY (`newId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of news
-- ----------------------------

-- ----------------------------
-- Table structure for `notes`
-- ----------------------------
DROP TABLE IF EXISTS `notes`;
CREATE TABLE `notes` (
  `noteId` int(4) NOT NULL AUTO_INCREMENT,
  `noteTitle` varchar(100) NOT NULL,
  `status` varchar(50) NOT NULL,
  `userName` varchar(50) NOT NULL,
  `content` varchar(500) NOT NULL,
  `addtime` datetime NOT NULL,
  `sectionId` int(4) NOT NULL,
  `newTime` datetime NOT NULL,
  `newReplayUser` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`noteId`,`noteTitle`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of notes
-- ----------------------------
INSERT INTO `notes` VALUES ('1', '社工到底是什么体系', '精华', 'admin', '1', '2016-12-22 10:04:04', '1', '2016-12-27 11:21:51', '123456');
INSERT INTO `notes` VALUES ('2', '菜鸟技术 大牛请过---------小技巧谈开机密码', '精华', 'admin', '2', '2016-12-22 10:04:47', '1', '2016-12-27 11:33:55', '123456');
INSERT INTO `notes` VALUES ('3', '乌云真的倒闭了么？', '精华', 'admin', '3', '2016-12-22 10:05:21', '2', '2016-12-22 10:32:37', 'admin');
INSERT INTO `notes` VALUES ('4', ' 一些手机/电脑模拟黑客破解入侵解密的游戏23', '最新', 'admin', '1', '2016-12-22 10:11:53', '1', '2016-12-22 10:32:40', 'admin');
INSERT INTO `notes` VALUES ('5', '偶然发现的太原理工大学注入点', '最新', 'admin', '1', '2016-12-22 10:12:13', '1', '2016-12-22 10:32:42', 'admin');
INSERT INTO `notes` VALUES ('6', '某网警查水表的工具(使用说明)', '最新', 'admin', '1', '2016-12-22 10:12:26', '1', '2016-12-22 10:32:45', 'admin');
INSERT INTO `notes` VALUES ('7', '免费翻墙DNS|测试可用上一些被墙网站', '最新', '张三', '1', '2016-12-22 10:12:38', '1', '2016-12-22 10:32:48', 'admin');
INSERT INTO `notes` VALUES ('8', '用不了google的戳进来，分享几个网站', '最新', '张三', '1', '2016-12-22 10:12:58', '1', '2016-12-22 10:32:51', 'admin');
INSERT INTO `notes` VALUES ('9', '手机短信，电话伪造来源！ ', '热门', '张三', '1', '2016-12-22 10:13:23', '1', '2016-12-22 10:32:54', 'admin');
INSERT INTO `notes` VALUES ('10', '求个社工库', '热门', '张三', '1', '2016-12-22 10:13:33', '2', '2016-12-22 10:32:57', 'admin');
INSERT INTO `notes` VALUES ('11', '哎 付了WB可惜网盘已经失效了埃', '置顶', '张三', '1', '2016-12-22 10:13:43', '1', '2016-12-22 10:33:00', 'admin');
INSERT INTO `notes` VALUES ('12', '发现360云盘挂了，推出一个拯救你的云盘的功能', '热门', '张三', '1', '2016-12-22 10:13:51', '2', '2016-12-22 10:33:03', 'admin');
INSERT INTO `notes` VALUES ('13', '有没有什么办法能网页代理YouTube', '置顶', '张三', '1', '2016-12-22 10:14:02', '1', '2016-12-22 10:33:05', 'admin');
INSERT INTO `notes` VALUES ('14', '乌云还没回来', '热门', '123456', '1', '2016-12-22 10:14:16', '2', '2016-12-22 10:33:07', 'admin');
INSERT INTO `notes` VALUES ('15', ' 分享一些书籍 ', '热门', '123456', '1', '2016-12-22 10:15:58', '1', '2016-12-22 10:33:11', 'admin');
INSERT INTO `notes` VALUES ('17', 'LinuxDe|Linux命令大全查询手册', '精华', '123456', '1', '2016-12-22 10:16:11', '2', '2016-12-22 10:33:17', 'admin');
INSERT INTO `notes` VALUES ('18', '分享一些书籍 ', '精华', '123456', '1', '2016-12-22 10:16:20', '1', '2016-12-22 10:33:20', 'admin');
INSERT INTO `notes` VALUES ('19', '范德萨立即返回键', '普通', '123456', '大厦法定抚养和化肥灰色调', '2016-12-23 11:30:50', '1', '2016-12-23 11:30:50', null);
INSERT INTO `notes` VALUES ('20', '发范德萨更高的风格', '普通', '123456', '撒地方工会还将依托', '2016-12-23 11:40:10', '1', '2016-12-23 11:40:10', null);
INSERT INTO `notes` VALUES ('22', '让弗格森个发给', '普通', '123456', 'dfiahifhadnfjkahag', '2016-12-26 17:05:58', '1', '2016-12-26 17:05:58', null);
INSERT INTO `notes` VALUES ('23', '噶符合和他复旦复华', '普通', '123456', '申购时间推移', '2016-12-26 17:07:40', '1', '2016-12-26 17:07:40', null);
INSERT INTO `notes` VALUES ('24', '让他也体会过很多', '普通', '123456', '电话解放军', '2016-12-26 17:08:05', '1', '2016-12-26 17:08:05', null);
INSERT INTO `notes` VALUES ('25', '经过海关hi个国家开发', '普通', '123456', '放松的好傻hi电话费i', '2016-12-26 17:29:53', '1', '2016-12-26 17:29:53', null);

-- ----------------------------
-- Table structure for `replays`
-- ----------------------------
DROP TABLE IF EXISTS `replays`;
CREATE TABLE `replays` (
  `replayId` int(4) NOT NULL AUTO_INCREMENT,
  `replayContent` varchar(500) NOT NULL,
  `userName` varchar(50) NOT NULL,
  `replayTime` datetime NOT NULL,
  `noteId` int(4) NOT NULL,
  PRIMARY KEY (`replayId`)
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of replays
-- ----------------------------
INSERT INTO `replays` VALUES ('1', '个人觉得社工也触及心理学，还有其他的，我也觉得有点复杂，抽象概念', 'admin', '2016-12-23 15:09:15', '1');
INSERT INTO `replays` VALUES ('2', '欺诈罢了， 有时间，多看看社工劫持域名的案列，经典的社工文章，比如说什么《社工余罪》就是得到一个群信息，进而得到电话信息，之后冒充工作人员，得到想要的东西', 'admin', '2016-12-23 15:10:17', '1');
INSERT INTO `replays` VALUES ('3', '来看看', '123456', '2016-12-23 15:14:14', '1');
INSERT INTO `replays` VALUES ('4', '谢谢', '123456', '2016-12-23 15:14:35', '1');
INSERT INTO `replays` VALUES ('5', 'thank you very match i need this', '123456', '2016-12-23 15:14:59', '1');
INSERT INTO `replays` VALUES ('6', '看看是不是和我差不多', 'admin', '2016-12-23 15:15:19', '1');
INSERT INTO `replays` VALUES ('7', '回帖是美德  ', 'admin', '2016-12-23 15:15:56', '1');
INSERT INTO `replays` VALUES ('8', ' 好羡慕楼主，这么小酒规划将来的方向，回想一下我上大学之后也没用想好自己的就业，直到毕业之后才着急起来，不过看你这么努力，我可以为你提供一些信息安全的课程，你可以注册一下 谷安网校 看看有没有自己感兴趣的联系我', 'admin', '2016-12-26 09:25:20', '1');
INSERT INTO `replays` VALUES ('9', ' 成信，安徽理工，不过在外省都是招一本。我安徽理工大学信安专业毕业，这个专业很好，不过有这个专业的学校真心少！', '123456', '2016-12-26 09:26:05', '1');
INSERT INTO `replays` VALUES ('10', '中国民航大学的信息安全在浙江是二本。', 'admin', '2016-12-26 09:26:29', '1');
INSERT INTO `replays` VALUES ('11', '上海电力欢迎你，我就是信安的！', 'admin', '2016-12-26 09:26:47', '1');
INSERT INTO `replays` VALUES ('12', '谢谢大家的回帖，我还以为会沉呢。。。在大家的帮助写lz的确得到了有用的信息。lz浙江的，还是希望在浙苏泸这带读书。之前定为杭电，然而杭电一本。以前不知道读一本有多难，没好好读书（lz学校不太好- -）。', '张三', '2016-12-26 09:27:17', '1');
INSERT INTO `replays` VALUES ('13', '好好学吧。去年的这个时候我也想上杭电，可惜学校不好，自己想上也上不去。只能捡个大专上', '张三', '2016-12-26 09:27:32', '1');
INSERT INTO `replays` VALUES ('14', ' 好好学吧。去年的这个时候我也想上杭电，可惜学校不好，自己想上也上不去。只能捡个大专上\r\n\r\n', 'admin', '2016-12-26 09:27:50', '1');
INSERT INTO `replays` VALUES ('15', ' 学信息安全的来找我领 谷安网校 在线课程啊，信息安全人员从业指南，Kali Linux渗透测试，数据库安全等等', '张三', '2016-12-26 09:28:06', '1');
INSERT INTO `replays` VALUES ('16', '表示今年刚录取南昌大学信息安全专业', '张三', '2016-12-26 09:28:27', '1');
INSERT INTO `replays` VALUES ('20', '646554法国红酒', '123456', '2016-12-26 16:28:45', '1');
INSERT INTO `replays` VALUES ('21', '敦煌石窟减肥哈合法化', '123456', '2016-12-26 16:31:48', '1');
INSERT INTO `replays` VALUES ('22', '分数的本赛季发挥', '123456', '2016-12-27 09:24:45', '1');
INSERT INTO `replays` VALUES ('23', 'good', '123456', '2016-12-27 09:44:13', '1');
INSERT INTO `replays` VALUES ('24', '贝多芬乖哈hi个', '123456', '2016-12-27 11:15:37', '1');
INSERT INTO `replays` VALUES ('25', 'test', '123456', '2016-12-27 11:21:51', '1');
INSERT INTO `replays` VALUES ('26', 'test1\n', '123456', '2016-12-27 11:33:55', '2');

-- ----------------------------
-- Table structure for `sections`
-- ----------------------------
DROP TABLE IF EXISTS `sections`;
CREATE TABLE `sections` (
  `sectionId` int(4) NOT NULL AUTO_INCREMENT,
  `sectionName` varchar(50) NOT NULL,
  `jianjie` varchar(50) NOT NULL,
  `sectionUser` varchar(50) NOT NULL,
  `addtime` datetime NOT NULL,
  PRIMARY KEY (`sectionId`,`sectionName`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of sections
-- ----------------------------
INSERT INTO `sections` VALUES ('1', 'web开发', 'java', '张三', '2016-12-21 14:51:29');
INSERT INTO `sections` VALUES ('2', 'jsp', 'jsp', '张三', '2016-12-21 14:53:17');
INSERT INTO `sections` VALUES ('3', '1', '1', '张三', '2016-12-21 14:53:42');
INSERT INTO `sections` VALUES ('4', '2', '2', '张三', '2016-12-21 14:53:58');
INSERT INTO `sections` VALUES ('5', '3', '3', '张三', '2016-12-21 14:54:12');
INSERT INTO `sections` VALUES ('6', '4', '4', '张三', '2016-12-21 14:54:27');
INSERT INTO `sections` VALUES ('7', '5', '5', '张三', '2016-12-21 14:54:36');
INSERT INTO `sections` VALUES ('8', 'a', 'a', 'admin', '2016-12-21 14:54:57');
INSERT INTO `sections` VALUES ('9', 'b', 'b', 'admin', '2016-12-21 14:55:11');
INSERT INTO `sections` VALUES ('10', 'c', 'c', 'admin', '2016-12-21 14:55:20');
INSERT INTO `sections` VALUES ('11', 'd', 'd', 'admin', '2016-12-21 14:55:34');
INSERT INTO `sections` VALUES ('12', 'e', 'e', 'admin', '2016-12-21 14:55:49');
INSERT INTO `sections` VALUES ('13', 'f', 'f', 'admin', '2016-12-21 14:55:56');

-- ----------------------------
-- Table structure for `users`
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `userId` int(4) NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL,
  `password` varchar(50) NOT NULL,
  `sex` varchar(10) NOT NULL,
  `age` int(4) NOT NULL,
  `email` varchar(50) NOT NULL,
  `addtime` datetime NOT NULL,
  `userStatus` int(4) NOT NULL,
  PRIMARY KEY (`userId`,`username`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of users
-- ----------------------------
INSERT INTO `users` VALUES ('1', '123456', 'e10adc3949ba59abbe56e057f20f883e', '男', '20', '123456@qq.com', '2016-12-19 16:18:31', '1');
INSERT INTO `users` VALUES ('2', 'admin', '96e79218965eb72c92a549dd5a330112', '女', '20', '5653454@wer', '2016-12-21 13:39:55', '1');
INSERT INTO `users` VALUES ('7', '张三', '1a100d2c0dab19c4430e7d73762b3423', '男', '20', '565345@df', '2016-12-21 14:11:59', '1');
INSERT INTO `users` VALUES ('8', '李四', '73882ab1fa529d7273da0db6b49cc4f3', '女', '21', '444444@qq.com', '2016-12-23 11:26:12', '1');
