$(document).ready(function() {
    console.log('app.js loaded!');



    var hb = Handlebars;
    var userSource = $('#user-template').html();
    var userTemplate = hb.compile(userSource);

    function renderUser(user) {
        var userHtml = userTemplate(user);
        $('#userId').append(userHtml);
    }

    $.ajax({
        method: 'GET',
        url: '/api/users',
        success: getBlogSucc,
        error: getBlogErr
    });

    function getBlogErr(error) {
        console.error(error);
    };

    function getBlogSucc(json) {
        json.forEach(function(ele) {
            renderUser(ele);
        })
    };


$('#userId').on('click', '.delete-user', handleDeleteUserClick);

});

function handleDeleteUserClick(e) {
    var userId = $(this).attr('data-id');
    console.log('someone wants to delete user id=' + userId);
    $.ajax({
        url: '/api/users/' + userId,
        method: 'DELETE',
        success: handleDeleteUserSuccess
    });
    location.reload();
}

// callback after DELETE /api/blog/:id
function handleDeleteUserSuccess(data) {
    console.log(data);
    var deletedUserId = data._id;
    console.log('removing the following blog from the page:', deletedUserId);
    $('div[data-id=' + deletedUserId + ']').remove();
}
