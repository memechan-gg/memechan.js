'use strict';

const Posts = require(__dirname+'/../../db-models/posts.js');

module.exports = async (req, res, next) => {

    //get the recently bumped thread & preview posts
    let thread;
    try {
        thread = await Posts.getThread(req.params.board, req.params.id);
    } catch (err) {
		console.error(err);
        return next();
    }

    if (!thread) {
        return res.status(404).render('404');
    }

    //render the page
    res.render('thread', {
        csrf: req.csrfToken(),
        thread: thread
    });
}
