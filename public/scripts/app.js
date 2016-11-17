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
          })
        };


$('.form-horizontal').on('submit', createUserAccount);

});


function createUserAccount({
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

});
)
