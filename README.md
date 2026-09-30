# Zhixiang Shen — Academic Homepage

个人学术主页改版，2026-09-30。线上网址：https://zxlearningdeep.github.io/

## 先预览

解压后进入 `zxlearningdeep.github.io-main`，双击 `index.html`。所有头像、论文框架图、样式和脚本都在压缩包里，可以直接在本地打开。另附的 `Zhixiang-Shen-homepage-preview.html` 是独立预览文件，下载后双击即可查看。

## 上传到现有 GitHub Pages

1. 打开 https://github.com/zxlearningdeep/zxlearningdeep.github.io 。
2. 在仓库的根目录选择 **Add file → Upload files**。
3. 将本目录中的 `index.html`、`style.css`、`script.js`、`assets` 文件夹和 `README.md` 一起拖入上传区域。上传列表应显示根目录的 `index.html` 和 `assets/papers/...` 等路径。
4. 输入提交说明，例如 `Redesign academic homepage with publication figures`，点击 **Commit changes**。
5. 到仓库 **Actions** 查看 Pages 部署状态。完成后访问 https://zxlearningdeep.github.io/ ，按 **Ctrl + F5** 刷新。

上传时保持 `assets/papers` 和 `assets/bibtex` 的目录结构。主页使用普通 HTML、CSS 和 JavaScript，没有安装依赖或构建步骤。

## 本次变化

- 浅色背景、固定顶栏、头像侧栏和带边框的内容卡片。
- 四篇论文均展示完整标题、全部作者、共同一作标记、会议或期刊、年份和可核实的页码信息。
- 每篇论文加入原文框架图、方法简介，以及 Paper、arXiv、PDF、Code 和 BibTeX 入口。
- 配图放大、BibTeX 查看与复制、按年份筛选、研究摘要展开。
- 新增教育经历区块；保留原主页的简介、研究兴趣、动态、联系方式和审稿服务信息。
- 教育经历使用两所学校的正式标志图片；审稿信息采用更大、更深的字体，手机端保持清晰字号。
- 手机和桌面布局适配；停用 JavaScript 时仍能看到全部论文和资源链接。

## 后续怎么改

| 内容 | 修改位置 |
| --- | --- |
| 个人简介、联系方式、教育经历、审稿信息 | `index.html` 对应区块 |
| 论文标题、作者、发表信息和链接 | `index.html` 中对应的 `<article class="publication">` |
| 论文框架图 | `assets/papers/`，同时修改 `index.html` 中图片路径 |
| 头像 | 替换 `assets/profile.jpg` |
| 学校标志 | `assets/institutions/`，与 `index.html` 中的对应图片路径保持一致 |
| 配色、字号、间距和手机布局 | `style.css` |
| 引用内容 | `assets/bibtex/*.bib` 和 `index.html` 底部对应的 `bib-*` template，两处同步修改 |
| 筛选年份 | `index.html` 的 `.year-filters` 按钮和论文 `data-year` 属性 |

新增论文时，复制一张论文卡片，给它独立的 `id`，再添加配图、BibTeX 文件和对应的 template，并更新标题旁的论文数量。

论文与图像资料来源见 `assets/papers/SOURCES.md`。
