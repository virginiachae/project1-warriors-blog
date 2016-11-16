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




});
