$(document).ready(function() {
    console.log('app.js loaded!');

    $.ajax({
        method: 'GET',
        url: '/api/blogs',
        success: getBlogSucc,
        error: getBlogErr

    });






    $('.form-horizontal').on('submit', createUserAccount);
    $('#blogsTarget').on('click', '.delete-blog', handleDeleteBlogClick);
    $('#blogsTarget').on('click', '.edit-blog', handleBlogEditClick);
    $('#blogsTarget').on('click', '.save-blog', handleSBlogChangesClick);

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
        location.reload();
    })

    function createCommErr(error) {
        console.error('error is ', error);
    }

    function createCommSucc(comment) {
      console.log(comment);
        renderBlog();
    };

});

function getBlogErr(error) {
    console.error(error);
}

function getBlogSucc(json) {
    json.forEach(function(ele) {
        renderBlog(ele);
        // console.log(ele);
    })
};

function renderBlog(blog) {
    var blogSource = $('#blog-template').html();
    var blogTemplate = Handlebars.compile(blogSource);
    var blogHtml = blogTemplate(blog);
    $('#blogsTarget').append(blogHtml);
}


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
    };
    location.reload();

};


function handleDeleteBlogClick(e) {
    var blogId = $(this).attr('data-id');
    console.log('someone wants to delete blog id=' + blogId);
    $.ajax({
        url: '/api/blogs/' + blogId,
        method: 'DELETE',
        success: handleDeleteBlogSuccess
    });
    location.reload();
}

// callback after DELETE /api/blog/:id
function handleDeleteBlogSuccess(data) {
    console.log(data);
    var deletedBlogId = data._id;
    console.log('removing the following blog from the page:', deletedBlogId);
    $('div[data-id=' + deletedBlogId + ']').remove();
}


function handleBlogEditClick(e) {
    var $blogRow = $(this).closest('.blogId');
    console.log($blogRow);
    var blogId = $(this).attr('data-id');
    // console.log('edit blog', blogId);
    // show the save changes button
    $blogRow.find('.save-blog').toggleClass('hidden');
    // hide the edit button
    $blogRow.find('.edit-blog').toggleClass('hidden');
    var editBlogContent = $blogRow.find('span.blog-body').text();
    console.log(editBlogContent);
    $blogRow.find('span.blog-body').html('<textarea class="edit-blog-body">' + editBlogContent + '</textarea>');
}

function handleSBlogChangesClick(e) {
    var blogId = $(this).attr('data-id'); // $(this).closest would have worked fine too
    var $blogRow = $(this).closest('#blogsTarget');

    var data = {
        blogBody: $blogRow.find('.edit-blog-body').val(),

    };
    console.log(data);

    console.log('PUTing data for Blog', blogId, 'with data', data);
    $.ajax({
        method: 'PUT',
        url: '/api/blogs/' + blogId,
        data: data,
        success: handleBlogUpdatedResponse
    });
    location.reload();
}

function handleBlogUpdatedResponse(data) {
    console.log('response to update', data);
    var blogId = data._id;
}
