const Post = require('../models/Post');

exports.createPost = async (req, res) => {
  try {
    // 获取所有posts并找到最大id
    const posts = await Post.find();
    const maxId = Math.max(...posts.map(post => parseInt(post.id) || 0), 0);
    const nextId = (maxId + 1).toString();

    const post = new Post({
      id: nextId,
      title: req.body.title,
      author: req.body.author
    });

    const newPost = await post.save();
    res.status(201).json(newPost);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.updatePost = async (req, res) => {
  try {
    const post = await Post.findOne({ id: req.params.id });
    if (!post) return res.status(404).json({ message: '找不到该帖子' });

    post.title = req.body.title;
    post.author = req.body.author;
    
    const updatedPost = await post.save();
    res.json(updatedPost);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findOne({ id: req.params.id });
    if (!post) return res.status(404).json({ message: '找不到该帖子' });
    
    await post.deleteOne();
    res.json({ message: '帖子已删除' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getPosts = async (req, res) => {
  try {
    const posts = await Post.find().sort({ id: 1 });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getPost = async (req, res) => {
  try {
    const post = await Post.findOne({ id: req.params.id });
    if (!post) return res.status(404).json({ message: '找不到该帖子' });
    res.json(post);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};