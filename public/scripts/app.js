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

        function getBlogErr(error){
            console.error(error);
          }

          function getBlogSucc(json){
            json.forEach(function(ele){
            renderBlog(ele);
            console.log(ele);
          })
        };


$('.form-horizontal').on('submit', createUserAccount);
$('#blogs').on('click', '.delete-blog', handleDeleteBlogClick);

});


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
  console.log('clicked');
  var blogId = $(this).parents('#blog').data('blog-id');
  
  console.log('someone wants to delete blog id=' + blogId );
  $.ajax({
    url: '/api/blogs/' + blogId,
    method: 'DELETE',
    success: handleDeleteBlogSuccess
  });
}

// callback after DELETE /api/blog/:id
function handleDeleteBlogSuccess(data) {
  var deletedBlogId = data._id;
  console.log('removing the following blog from the page:', deletedBlogId);
  $('div[data-blog-id=' + deletedBlogId + ']').remove();
}
