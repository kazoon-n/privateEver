var posts = [
    {title: 'tilte0', body: 'body0'},
    {title: 'tilte1', body: 'body1'},
    {title: 'tilte2', body: 'body2'}

];

exports.index = function(req,res){
    res.render('posts/index', {posts: posts});
};

exports.show = function(req,res){
    res.render('posts/show', {post: posts[req.params.id]});
};

exports.new = function(req,res){
    res.render('posts/new');
};

exports.edit = function(req,res){
    res.render('posts/edit', {post: posts[req.params.id], id: req.params.id});
};

exports.update = function(req,res, next){
    if(req.body.id !== req.params.id){
        next(new Error('ID is not valid'));
    }else{
        posts[req.params.id] = {
            title: req.body.title,
            body: req.body.body
        };
        res.redirect("/");
    }
};

exports.destroy = function(req,res){
    posts.splice(req.params.id, 1);
    res.redirect("/");
};

exports.create = function(req,res){
    var post = {
        title: req.body.title,
        body: req.body.body
    };
    posts.push(post);
    res.redirect("/");

};