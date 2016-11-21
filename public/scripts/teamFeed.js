$(document).ready(function() {
    console.log('app.js loaded!');



    var hb = Handlebars;
    var blogSource = $('#blog-template').html();
    var blogTemplate = hb.compile(blogSource);

    function renderWarrior(blog) {
        var blogHtml = blogTemplate(blog);
        $('#teamFeed').append(blogHtml);
    }

    $.ajax({
        method: 'GET',
        url: '/api/blogs',
        success: getBlogSucc,
        error: getBlogErr
    });

    function getBlogErr(error) {
        console.error(error);
    };

    function getBlogSucc(json) {
        json.forEach(function(ele) {
            renderBlog(ele);
        })
    };

    loadLatestTweet();



});


function loadLatestTweet(){
    var _url = 'https://api.twitter.com/1.1/users/show.json?warriors=twitterdev';
    $.getJSON(_url,function(data){
        //data is holding a JSON object
        var tweet = data[0].text;
        $("#teamFeed").html('<p>'+tweet+'</p>');
    });
}
