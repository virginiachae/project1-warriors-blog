$(document).ready(function() {
    console.log('app.js loaded!');

    var hb = Handlebars;
    var blogSource = $('#blog-template').html();
    var blogTemplate = hb.compile(blogSource);

    function renderBlog(blog) {
        var blogHtml = blogTemplate(blog);
        $('#blogs').append(blogHtml);
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

    $('#continuebutton').on("click", function() {
        location.reload();
    });

    $('.form-horizontal').on('submit', createUserAccount);
    $('#blogs').on('submit', '#addCommentForm', function(e) {
        e.preventDefault();
        var commentData = $(this).serialize();
        //commentData.id = //put the respective id in here
        console.log(commentData);
        $.ajax({
            method: 'POST',
            url: '/api/blogs/' + $(this).attr('data-id') + '/comments',
            data: commentData,
            success: createCommSucc,
            error: createCommErr
        })

        function createCommErr(error) {
            console.error('error is ', error);
        }

        function createCommSucc() {
            // renderBlog(ele);
            console.log(commentData);
            swal("Good job!", "You clicked the button!", "success");
        };
        location.reload();
    })
});


function createUserAccount(e) {
    e.preventDefault();
    var userData = $(this).serialize();
    console.log(userData);
    $.ajax({
        method: 'POST',
        url: '/api/users',
        data: userData,
        success: createSucc,
        error: createErr
    });

    function createErr(error) {
        console.error(error);
    }

    function createSucc(user) {
        $('.clear').val('');
        $('#le-alert').addClass('in');
    };
};
