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

});

function getBlogErr(error){
    console.error(error);
  }

  function getBlogSucc(json){
    json.forEach(function(ele){
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


function createUserAccount(e){
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
  function createErr(error){
    console.error(error);
  }

  function createSucc(user){
    $('.clear').val('');
    renderAlbum(user);
  };
location.reload();

};


function handleDeleteBlogClick(e) {
  var blogId = $(this).attr('data-id');

  console.log('someone wants to delete blog id=' + blogId );
  $.ajax({
    url: '/api/blogs/' + blogId,
    method: 'DELETE',
    success: handleDeleteBlogSuccess
  });
}

// callback after DELETE /api/blog/:id
function handleDeleteBlogSuccess(data) {
  console.log(data);
  var deletedBlogId = data._id;
  console.log('removing the following blog from the page:', deletedBlogId);
  $('div[data-id=' + deletedBlogId + ']').remove();
}
