VK.init({
  apiId: 5447857 // ID вашего приложения VK
});

//Категоризация друзей по вступленным группам
// получаем информацию о группе и её участников
function getFiends() {
  var params = user_idидентификатор
  VK.Api.call('groups.getById', {group_id: group_id, fields: 'photo_50,members_count', v: '5.27'}, function(r) {
    if(r.response) {
      $('.group_info')
        .html('<img src="' + r.response[0].photo_50 + '"/><br/>'
          + r.response[0].name
          + '<br/>Участников: ' + r.response[0].members_count);
      getMembers20k(group_id, r.response[0].members_count); // получем участников группы и пишем в массив membersGroups
    }
  });
}