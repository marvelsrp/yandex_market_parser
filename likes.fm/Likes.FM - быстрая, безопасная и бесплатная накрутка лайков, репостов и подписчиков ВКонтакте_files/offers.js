var numBuyOffers = 0;
var offerTypes = ["like", "sub", "repost", "comment", "group", "poll"];
var offerActions = {
  like: ["лайкни", "лайкнули", "лайкнуть", "лайкать"],
  repost: ["репостни", "репостнули", "репостнуть", "репостить"],
  comment: ["прокомментируй", "прокомментировали", "прокомментировать", "комментировать"],
  sub: ["подпишись на", "подписались на", "подписаться на"],
  group: ["подпишись на", "подписались на", "подписаться на"],
  poll: ["проголосуй за", "проголосовали за", "проголосовать за"]
};
var offerActions2 = {
  like: "лайкали",
  repost: "репостили",
  comment: "комментировали",
  sub: "подписывались",
  group: "подписывались",
  poll: "голосовали"
};
var offerSubjects = {
  like: ["лайк", "лайкам", "лайков", "лайки"],
  repost: ["репост", "репостам", "репостов", "репосты"],
  comment: ["комментарий", "комментариям", "комментариев", "комментарии"],
  sub: ["подписчиков", "подписчикам", "подписчиков", "подписчиков"],
  group: ["участников", "участникам", "участников", "участников"],
  poll: ["голоса", "опросам", "голосов", "голоса"]
};
var offerSubjects2 = {
  like: "лайки",
  repost: "репосты",
  comment: "комменатрии",
  sub: "подписчики",
  group: "подписчики",
  poll: "голоса"
};
var buyOfferSuccess = {
  like: "лайков успешно обработана.<br>Лайки будут прирастать по мере того, как люди будут лайкать вашу",
  repost: "репостов успешно обработана.<br>Репосты будут прирастать по мере того, как люди будут репостить вашу",
  comment: "комментариев успешно обработана.<br>Комментарии будут прирастать по мере того, как люди будут комментировать вашу",
  poll: "голосов в опрос успешно обработана.<br>Голоса в опросе будут прирастать по мере того, как люди будут голосовать за ваш вариант ответа",
  sub: "подписчиков успешно обработана.<br>Подписчики будут прирастать по мере того, как люди будут подписываться на вашу",
  group: "подписчиков успешно обработана.<br><br>Обратите внимание, что мы лимитируем максимальное количетсво участников, которое может вступить в группу за день. Когда суточный лимит исчерпывается, подписчики перестают добавляться. На следующий день лимит сбрасывается и подписчики снова начинают добавляться. Такие меры безопасности. Поскольку ВК очень строго следит за группами, при раскрутке группы лучше не спешить раскручивать её быстрей и не превышать лимиты. Особенно актуально это для новосозданных групп"
};
var penaltyReason = {
  like: ["сняли лайк с", "снимать лайки", "снимать лайки"],
  repost: ["удалили репост", "удалять репосты", "удалять репосты"],
  sub: ["отписались от", "отписываться от страничек", "отписываться"]
};
var banReason = {
  like: "снимали лайки",
  repost: "удаляли репосты",
  sub: "отписывались от страничек",
  group: "отписывались от страничек"
};
var offerWords1 = {
  wall: "запись на стене",
  photo: "фотографию",
  video: "видеозапись",
  club: "группу",
  "public": "группу",
  id: "страничку",
  event: "встречу"
};
var offerWords2 = {
  wall: "запись на стене",
  photo: "фотография",
  video: "видеозапись",
  club: "группа",
  "public": "группа",
  id: "страничка",
  event: "встреча"
};
var offerWords3 = {
  wall: "записи на стене",
  photo: "фотографии",
  video: "видеозаписи",
  club: "группы",
  "public": "группы",
  id: "странички",
  event: "встречи"
};
var offerRegexp = {
  like: /(wall|photo|video)([0-9-]+_[0-9]+)/i,
  sub: /(?:[^a-z0-9_.]|^)(id)([0-9-]+)(?![a-z0-9_.]+)/i,
  group: /(?:[^a-z0-9_.]|^)(club|public|event)([0-9-]+)(?![a-z0-9_.]+)/i
};
offerRegexp.poll = offerRegexp.comment = offerRegexp.repost = offerRegexp.like;
var openedOffers = [];
var offersList = {};
var increaseCity;
var offersCities = {};
var closedOffers = {};
var offersDict = {};
var offersSettings = {};
_.each(offerTypes, function (a) {
  offersList[a] = [];
  offersCities[a] = [];
  closedOffers[a] = [];
  offersDict[a] = {};
  offersSettings[a] = {}
});
function getOffersDict(b) {
  var a = {};
  _.each(b, function (c) {
    var d = c.split(".")[1];
    if (!a[d]) {
      a[d] = []
    }
    a[d].push(c.split(".")[0])
  });
  return a
}
function getOpenedOffers(b) {
  var a = [];
  _.each(openedOffers, function (c) {
    if (c.split(".")[1] == b) {
      a.push(c.split(".")[0])
    }
  });
  return a
}
function initOffers() {
  function b() {
    for (var c in offer_price) {
      if ((c == "like" || viewer_profile.agreement[c]) && ($(".module[type=" + c + "] .offer:not(.closed)").length < 3 || $.bbq.getState("page") == 1 && $(".box_body[type=" + c + "]").length && $(".box_body .offer:not(.closed)").length < 3)) {
        return true
      }
    }
    return false
  }

  function a(d) {
    if (!d && (isStatsModule() || (!viewer_profile.update_offers || new Date - mouseMoveDt > 30000) && !b())) {
      return
    }
    var c = _.pick(viewer_profile, profile_fields);
    if (viewer_profile.sex) {
      c.sx = viewer_profile.sex
    }
    $.ajax({
      url: "https://likes.fm/get_offers", data: d ? c : {}, global: false, type: "POST", success: function (e) {
        processOffers(e, $("#soundSwitch").hasClass("on") && !d)
      }
    })
  }

  mouseMoveDt = 0;
  $(document).mousemove(function () {
    mouseMoveDt = +new Date
  });
  a(true);
  setInterval(a, 5000);
  recheckOffers();
  if (viewer_profile.agreement.sub) {
    setTimeout(function () {
      updateDisplayOffers("sub")
    }, 700)
  }
  $(document).delegate(".agreement", "click", function (c) {
    createAgreementPopup("Прочтите, перед тем как начать пользоваться разделом", $(this).attr("type"), null, a);
    c.preventDefault();
    return false
  })
}
function createAgreementPopup(d, c, e, b) {
  var a = createPopup(d, "#" + c + "AgreementTPL");
  $(".tooltipHelper", a).tooltip({effect: "slide", position: ["bottom", "center"], offset: [15, 0], relative: true});
  if (e) {
    e(a)
  }
  $(".accept button", a).click(function () {
    $(this).parent().addClass("button_lock");
    $.get("https://likes.fm/accept_agreement", {type: c}, function (f) {
      viewer_profile.agreement[c] = f;
      b();
      _.defer(function () {
        $(".close", a).click()
      })
    })
  })
}
var subRequests = [];
var rawSubs = [];
var subRejects = [];
var offers_dt = 0;
var need_vk_token;
function processOffers(a, b) {
  if (!_.isObject(a) || !a.offers_dt || a.offers_dt < offers_dt) {
    return
  }
  offers_dt = a.offers_dt;
  if (!a.active_vk_token) {
    $('.module[type="poll"] .offer.private').remove()
  }
  need_vk_token = a.need_vk_token;
  _.each(offerTypes, function (c) {
    if (!a[c] || !_.include(["like"], c) && !viewer_profile.agreement[c]) {
      return updateDisplayOffers(c)
    }
    a[c] = _.filter(a[c], function (d) {
      return !_.include(closedOffers[c], d.id)
    });
    if (c == "sub") {
      a[c] = _.filter(a[c], function (d) {
        return !_.include(subRejects, d.id)
      });
      rawSubs = _.pluck(a[c], "id");
      offersList[c] = _.intersection(offersList[c], rawSubs);
      _.each(_.difference(rawSubs, offersList[c], subRequests), function (d) {
        if (_.include(viewer_profile.friends_uids, parseInt(d.substr(2)))) {
          subRejects = _.union(subRejects, d)
        } else {
          subRequests.push(d);
          $.getJSON("https://api.vk.com/method/users.getFollowers?callback=?", {
            user_id: d.substr(2),
            count: 1000
          }, function (g) {
            if (_.include(g.response.items, viewer_profile.uid)) {
              subRejects = _.union(subRejects, d);
              subRequests = _.without(subRequests, d)
            } else {
              if (_.include(rawSubs, d)) {
                var f = [];
                for (var e = 1; e < Math.ceil(Math.min(g.response.count, 101000) / 1000); e++) {
                  f.push($.getJSON("https://api.vk.com/method/users.getFollowers?callback=?", {
                    user_id: d.substr(2),
                    offset: e * 1000,
                    count: 1000
                  }))
                }
                $.when.apply(this, f).always(function () {
                  subRequests = _.without(subRequests, d);
                  if (!_.include(rawSubs, d)) {
                    return
                  }
                  arguments = f.length == 1 ? [arguments] : arguments;
                  for (var h = 0; h < arguments.length; h++) {
                    if (_.include(arguments[h][0].response.items, viewer_profile.uid)) {
                      subRejects = _.union(subRejects, d);
                      return
                    }
                  }
                  offersList[c].push(d)
                })
              }
            }
          })
        }
      })
    } else {
      offersList[c] = _.pluck(a[c], "id")
    }
    _.each(a[c], function (d) {
      if (!offersDict[c][d.id] || d.reward > offersDict[c][d.id].reward) {
        offersDict[c][d.id] = d
      }
    });
    replaceOffers(".module[type=" + c + "]");
    replaceOffers(".box_body[type=" + c + "]");
    if (updateDisplayOffers(c) && b) {
      b = false;
      notifySound.play()
    }
  })
}
function replaceOffers(a) {
  a = $(a);
  var d = a.attr("type");
  var e = _.difference(offersList[d], _.map($(".offer", a), function (f) {
    return $(f).attr("entity")
  }));
  var b = _.difference(_.map($(".offer:not(.closed)", a), function (f) {
    return $(f).attr("entity")
  }), getOpenedOffers(d).concat(offersList[d]));
  e = e.slice(0, b.length);
  b = b.slice(0, e.length);
  for (var c in b) {
    $(".offer:not(.closed)[entity=" + b[c] + "]", a).after(createOfferCell(e[c], d)).remove()
  }
}
function removeOffers(a) {
  if (_.isEmpty(a)) {
    return
  }
  openedOffers = _.difference(openedOffers, a);
  _.each(a, function (b) {
    var c = b.split(".")[1];
    b = b.split(".")[0];
    offersList[c] = _.without(offersList[c], b);
    $(".module[type=" + c + "] .offer:not(.closed)[entity=" + b + "]").slideUp(function () {
      var d = $(this).closest(".module_body");
      $(this).remove();
      if ($(".offer", d).length == 0) {
        setEmptyOffersModule(c)
      } else {
        $("span.do_offer", d).each(function () {
          $(this).after($(this).clone()).remove()
        })
      }
    }).addClass("closed");
    $(".box_body[type=" + c + "] .offer:not(.closed)[entity=" + b + "]").animate({width: 0}, function () {
      $(this).remove();
      if (offersList[c].length <= ($.bbq.getState("page") - 1) * 21) {
        $.bbq.pushState({page: Math.ceil(offersList[c].length / 21) || 1})
      }
      lastHash = ""
    }).addClass("closed")
  })
}
function createOfferCell(b, a) {
  var c = $(_.template($(_.include(["comment", "poll"], a) ? "#" + a + "OfferCellTPL" : "#offerCellTPL").html(), {
    offer: b,
    type: a
  }));
  if (_.include(["comment", "poll"], a)) {
    _.defer(function () {
      var d = $(".info_msg div", c).click(function () {
        $(this).selectText()
      }).height();
      if (d > 102) {
        $("span", $(".info_msg div", c).height(102).parent().css({paddingBottom: 3})).show().mouseenter(function () {
          $(this).stop().animate({color: "#2B587A"}, "fast")
        }).mouseleave(function () {
          $(this).stop().animate({color: "#91A4B8"}, "fast")
        }).click(function () {
          var e = $('<div class="info_msg overlay">').text($(".info_msg div", c).text()).mouseleave(function () {
            $(this).remove()
          }).click(function () {
            $(this).selectText()
          }).animate({height: d}, "fast");
          $(".info_msg", c).before(e)
        })
      }
      c.css({marginTop: (c.parent().height() - c.innerHeight()) * 0.5});
      $(".x_button", c).css({top: parseInt(c.css("marginTop")) + 31})
    })
  }
  return c
}
function updateDisplayOffers(d) {
  var c = 0;
  if (offersList[d].length > 0) {
    $(".module[type=" + d + "]").removeClass("empty")
  }
  var e = _.shuffle(offersList[d]);
  e.sort(function (g, f) {
    return offersDict[d][f].reward - offersDict[d][g].reward
  });
  var a = _.uniq(_.map($(".offer:not(.closed)", ".box_body[type=" + d + "],.module[type=" + d + "]"), function (f) {
    return $(f).attr("entity")
  }));
  for (var b in e) {
    if ($(".module[type=" + d + "] .offer:not(.closed)").length >= (_.include(["comment", "poll"], d) ? 1 : 5) || d in viewer_profile.limits && a.length >= viewer_profile.limits[d] && !_.include(a, e[b])) {
      break
    }
    if (!$(".module[type=" + d + "] .offer[entity=" + e[b] + "]").length) {
      $(".module[type=" + d + "] .module_body").append(createOfferCell(e[b], d).hide().fadeIn());
      a = _.union(a, e[b]);
      c++
    }
  }
  if (!_.include(["group", "comment"], d) && $.bbq.getState("page") == 1 && $(".box_body[type=" + d + "]").length && $(".box_body .offer:not(.closed)").length < 3) {
    for (var b in offersList[d]) {
      if ($(".box_body .offer:not(.closed)").length >= 9 || d in viewer_profile.limits && a.length >= viewer_profile.limits[d] && !_.include(a, offersList[d][b])) {
        break
      }
      if (!$(".box_body .offer[entity=" + offersList[d][b] + "]").length) {
        $(".box_body .content").append(createOfferCell(offersList[d][b], d).hide().fadeIn());
        a = _.union(a, offersList[d][b]);
        c++
      }
    }
  }
  if ($(".module[type=" + d + "] .offer").length == 0) {
    setEmptyOffersModule(d)
  }
  if (_.any(_.map(offerTypes, function (f) {
      return $(".module[type=" + f + "] .offer").length < 5
    }))) {
    $("#soundSwitch").stop().fadeTo(400, 1)
  } else {
    if (!$("#soundSwitch").hasClass("on")) {
      $("#soundSwitch").stop().fadeOut()
    }
  }
  return c
}
function setEmptyOffersModule(a) {
  $(".module[type=" + a + "] .module_body").empty();
  $(".module[type=" + a + "]").addClass("empty");
  $(".module[type=" + a + "] .module_description").html(_.template($(viewer_profile.agreement[a] || _.include(["like"], a) ? "#emptyOffersModuleTPL" : "#moduleAgreementTPL").html(), {type: a}))
}
var saveErrors = {
  badOffer: "Для этой <%= offerWords3[entityType] %> нельзя заказать <%= offerSubjects[type][3] %>. Попробуйте заказать <%= offerSubjects[type][3] %> для любой другой <%= offerWords3[entityType] %>.",
  badOfferBan: "Вы пытаетесь заказать <%= offerSubjects[type][3] %> для <%= offerWords3[entityType] %>, нарушающей правила ВКонтакте. К ней нельзя заказать <%= offerWords3[entityType] %>.",
  badGroupLike: "<%= offerWords2[entityType] %> к которой вы пытаетесь получить <%= offerSubjects[type][3] %> находится на страничке, нарушающей правила ВКонтакте. К ней нельзя заказать <%= offerSubjects[type][3] %>.",
  lawBan: "<%= offerWords2[entityType] %> к которой вы пытаетесь получить <%= offerSubjects[type][3] %> находится на страничке, заблокированной роскомнадзором на территории РФ.<br><br>Сделайте репост этой <%= offerWords3[entityType] %> себе на стену и заказывайте <%= offerSubjects[type][3] %> к записи на своей стене.",
  newPageRepost: "Вы пытаетесь заказать <%= offerSubjects[type][3] %> для <%= offerWords3[entityType] %>, которая была создана совсем недавно.<br>Поскольку ВК часто расценивает репосты с новозарегистрированных страничек как спам и морозит за них, к ней нельзя заказать <%= offerSubjects[type][3] %>.",
  badContest: "Не учавствуйте в подозрительных конкурсах. ВК любит замораживать странички всем, кто делает репосты записей с подозрительными конкурсами, поэтому заказать репосты этой записи нельзя. Также рекомендуем вам удалить эту запись со своей стены.",
  badGroup: "К группе вашей тематики нельзя заказать подписчиков, поскольку она нарушает правила ВК и модераторы очень часто блокируют такие группы.<br>Пытаясь раскрутить подписчиками группу такой тематики, вы только ускорите её блокировку модераторами ВК.",
  blockedGroup: "К заблокированной группе нельзя заказать подписчиков. Попробуйте повторить свой заказ в случае, если группа будет разблокирована.",
  groupAppRepost: "В записи, к которой вы пытаетесь заказать репосты, содержится ссылка на приложение, что может быть расценено как спам. Уберите ссылку на приложение из вашей записи на стене, чтобы заказать репосты к ней.",
  removedRepost: "Вы пытаетесь заказать репост к записи, содержащей репост другой записи, которая была удалена.<br>ВКонтакт не пользволяет делать репосты таких записей, поэтому попытайтесь заказать репосты к чему-нибудь ещё.",
  repostsOidError: function (a) {
    var b = offerRegexp.like.exec(a)[2].split("_")[0];
    return "Указанная запись оставлена не " + (b == viewer_profile.uid ? "вами" : "владельцем стены") + ".<br>ВКонтакт не позволяет делать репосты записей, которые оставил не владелец стены, поэтому прорепостите что-нибудь другое." + (b < 0 ? "<br><br>Записи в группах должны быть отправлены от имени группы, соответственно.<br>Иначе люди не смогут их репостить" : "")
  }
};
var res;
function buyOffer(a, d, b, f) {
  console.log('buyOffer', a,d ,b,f);
  numBuyOffers += 1;
  var e = b * cur_offer_price[d];

  function h() {
    return $.post("https://likes.fm/save_offer", _.extend({
      entity: a,
      type: d,
      num: b,
      is_admin: f
    }, offersSettings[$.bbq.getState("module").indexOf("Subs") > 0 ? "sub" : d]), function (i) {
      if (!i) {
        return
      }
      if (i in saveErrors) {
        if (i == "badOffer" && d == "like") {
          i += "Ban"
        }
        createAlertPopup("Ошибка", _.isFunction(saveErrors[i]) ? saveErrors[i](a) : _.template(saveErrors[i], {
          type: d,
          entityType: /[a-z]+/i.exec(a)[0]
        }).capitalize())
      } else {
        if (_.include(["firstBlPenalty", "blPenalty"], i)) {
          c(g, i)
        } else {
          while (popups.length && !blockMaskClose) {
            popups.pop().remove()
          }
          if (i == "noLikes") {
            createSendLikesPopup(offerRegexp.like.exec(a)[2].split("_")[0], e)
          } else {
            show_active_offers = true;
            $("a.activeOffers").slideDown();
            if (!blockMaskClose) {
              createAlertPopup("Поздравляем!", "Ваша заявка на получение " + buyOfferSuccess[d] + (_.include(["group", "poll"], d) ? "" : " " + offerWords1[offerRegexp[d].exec(a)[1]]) + '.<br><br>Узнать состояние вашего заказа или отменить его можно в разделе <a href="#" class="setModule" module="activeOffers">Активные заказы</a>, под аватаркой.')
            }
          }
        }
      }
      _.last(popups).stop(true, true)
    })
  }

  function g() {
    processPayment(e, h, d != "like" && viewer_profile.sub_penalty)
  }

  function c(i, j) {
    createAgreementPopup("Не удаляйте лайки, которые вам поставят!", "likeRemove", function (k) {
      if (j) {
        $(".prefix", k).html({
          firstBlPenalty: "Мы зафиксировали, что вы заказывали лайки, но потом по какой-то причине снимали лайки некоторых людей, которые были поставлены вам через Likes.FM<br>",
          blPenalty: 'Вы уже были оштрафованы на <div class="icon like"></div><b>50</b> за то, что удаляли лайки,<br>которые вам ставили люди из Likes.FM<br>',
          blNotify: "Просто напоминаем вам, чтобы вы не забыли.<br>"
        }[j])
      }
      $("a.setModule", k).click(function () {
        _.defer(function () {
          $(".close", k).click();
          _.delay(function () {
            if (!$(".box_body .hider").hasClass("on")) {
              $(".box_body .hider").click()
            }
          }, 100)
        })
      });
      k.onClose = function () {
        $(".box_controls .button_blue").show();
        $(".buyAvaLikes").removeClass("button_lock")
      }
    }, i)
  }

  g()
}
function votesToPrice(b, a) {
  return Math.max(0, Math.ceil(Math.round(b - Math.max(a || 0, 0)) * 7 / 10) / 100).toFixed(2)
}
var tipOffset = {
  like: [[0, 0], [0, 0]],
  repost: [[0, 0], [0, 0]],
  comment: [[0, 0], [0, 0]],
  poll: [[0, 0], [0, 0]],
  sub: [[0, 0], [13, 13]],
  group: [[0, 0], [13, 13]]
};
var lastAddr = {}, lastNum = {};
function buyModulesCreator(a, n, m) {
  if (m) {
    setTimeout(function () {
      var q = $("input[placeholder]", a).tooltip({
        effect: "slide",
        position: ["center", "right"],
        offset: [40, 10],
        relative: true,
        events: {input: "showTooltip,hideTooltip"}
      });
      if (!lastAddr[n] || lastAddr[n] == m) {
        q.trigger("showTooltip")
      }
    }, 0);
    $("input[placeholder]", a).val(m).attr("placeholder", m).on("paste propertychange input", function () {
      var q = $(this);
      setTimeout(function () {
        if (q.val() == m) {
          q.trigger("showTooltip")
        } else {
          q.trigger("hideTooltip")
        }
      }, 0)
    })
  }
  $("input[placeholder]", a).placeholder();
  if (lastAddr[n]) {
    $("input[placeholder]", a).eq(0).val(lastAddr[n]).trigger("paste")
  }
  $("input.spinner", a).bind("change keydown", function (r) {
    var q = $(this);
    setTimeout(function () {
      var t = parseInt(q.val() ? q.val() : 0);
      var s = votesToPrice(t * cur_offer_price[n], o());
      $(".cost", a).text("за " + s + " рублей")
    }, 1)
  }).val(lastNum[n] && k() > lastNum[n] && o() >= cur_offer_price[n] ? lastNum[n] : k());
  function h(q) {
    _.defer(function () {
      q = q && !$.fx.off;
      if (q) {
        $.fx.off = true
      }
      if (cur_offer_price[n] > speedup_offer_price[n]) {
        $("div[type=speedup]", a).parent().stop().slideUp("fast")
      } else {
        $("div[type=speedup]", a).parent().stop().slideDown("fast")
      }
      if (offersSettings[n].limitMin) {
        $("input.spinner", a).spinner({min: Math.floor(1000 / speedup_offer_price[n]), max: 999999})
      } else {
        $("input.spinner", a).spinner({min: offer_min[n], max: 999999})
      }
      $(".timeHelp", a)[cur_offer_price[n] > offer_price[n] * 3 ? "slideDown" : "slideUp"](200);
      if (q) {
        $.fx.off = false
      }
    })
  }

  function o() {
    return n != "like" && viewer_profile.sub_penalty ? viewer_profile.paid : viewer_profile.prepaid
  }

  function k(q) {
    q = q || cur_offer_price[n];
    return Math.floor((o() >= q ? o() : 1000) / q)
  }

  function e(q) {
    $(".footer", a).html(q ? q : "Бесплатных " + offerSubjects[n][2] + (cur_offer_price[n] != offer_price[n] ? " с настройками" : "") + ' у вас: <a href="#" class="setLikes imgUnderline"><div class="icon ' + (n == "group" ? "sub" : n) + '"></div><b>' + k() + "</b></a>")[o() >= cur_offer_price[n] ? "show" : "hide"]()
  }

  $(".box_controls", a).append('<div style="margin-left: 52px; margin-top: 7px; text-align: center; display: none" class="footer"></div>').find(".progress").css({"float": "left"}).end().find("tbody").html(_.template($("#yesNoControlsTPL").html())).find(".button_blue button").text("Купить").closest("td").css({width: 79});
  a.css({width: 500, marginLeft: -500 / 2}).delegate(".setLikes", "click", function (q) {
    $("input.spinner", a).val($("b", this).text()).change();
    q.preventDefault();
    return false
  }).onClose = function () {
    clearInterval(b)
  };
  function j() {
    $(".city .results_container", a).html($(".results_container", _.template($("#comboboxTPL").html(), {
      items: offersCities[n],
      width: 85,
      maxHeight: 201
    })));
    if (offersCities[n] && offersSettings[n].city && $(".city input").val() == "Загрузка..") {
      $(".city input").val(htmlDecode(_.find(offersCities[n], function (q) {
        return q.cid == offersSettings[n].city
      }).name))
    }
  }

  function c() {
    $.ajax({
      url: "https://likes.fmget_cities_ids", data: _.extend({type: n}, offersSettings[n]), global: false, success: function (q) {
        q = _.without(q.cities, viewer_profile.city);
        if (increaseCity && _.indexOf(q, increaseCity) < 0) {
          q.push(increaseCity)
        }
        if (viewer_profile.city) {
          q.unshift(viewer_profile.city)
        }
        $.getJSON("https://api.vk.com/method/places.getCityById?callback=?", {cids: q.join(",")}, function (s) {
          _.each(s.response, function (t) {
            t.index = _.indexOf(q, parseInt(t.cid))
          });
          s = s.response.sort(function (u, t) {
            return u.index - t.index
          });
          var r = [{name: "Вся Россия", cid: -1}, {name: "Вся Украина", cid: -2}, {
            name: "Вся Беларусь",
            cid: -3
          }, {name: "Весь Казахстан", cid: -4}];
          if (s.length && s[0].cid == viewer_profile.city) {
            s[0].name = "<b>" + s[0].name + "</b>";
            s = s.slice(0, 1).concat(r).concat(s.slice(1))
          } else {
            s = r.concat(s)
          }
          s = [{name: "Любой"}].concat(s);
          offersCities[n] = s;
          j()
        })
      }
    })
  }

  if (_.isEmpty(offersCities[n])) {
    c()
  } else {
    j()
  }
  var f = $(".offersSettings.target", a).tooltip({
    effect: "slide",
    position: ["top", "right"],
    offset: [135 + tipOffset[n][1][0], -110 + tipOffset[n][1][1]],
    relative: true,
    events: {def: "showTooltip,hideTooltip", tooltip: ""}
  });
  var g = $(".hider", a).click(function () {
    $(this).toggleClass("on");
    $(".offersSettings.target", a).stop().slideToggle("fast");
    if ($(this).hasClass("on")) {
      g.trigger("hideTooltip");
      f.trigger("showTooltip")
    } else {
      g.trigger("showTooltip");
      f.trigger("hideTooltip")
    }
  }).tooltip({
    effect: "slide",
    position: ["top", "right"],
    offset: [80, -420],
    relative: true,
    events: {def: "showTooltip,hideTooltip", tooltip: ""}
  });

  function p() {
    $.fx.off = true;
    $(".selector_container", a).each(function () {
      $("li", this).eq(0).mousedown()
    });
    $(".checkbox", a).each(function () {
      $(this).removeClass("on")
    });
    if (offersSettings[n].country) {
      $(".city input").val(["", "Вся Россия", "Вся Украина", "Вся Беларусь", "Весь Казахстан"][offersSettings[n].country])
    }
    for (var s in offersSettings[n]) {
      if (_.isArray(offersSettings[n][s])) {
        $(".x_button", $("div[type=" + s + "]", a).empty().parent()).show();
        for (var r = 0; r < offersSettings[n][s].length + 1; r++) {
          var q = $(_.template($("#varInputTPL").html(), {first: r == 0, type: n}));
          $("input", q).val(offersSettings[n][s][r]);
          $("div[type=" + s + "]", a).append(q)
        }
      } else {
        if ($("div[type=" + s + "]", a).hasClass("checkbox")) {
          $("div[type=" + s + "]", a).click()
        } else {
          $("." + s + ' li[val="' + offersSettings[n][s] + '"]', a).mousedown()
        }
      }
    }
    $.fx.off = false;
    e();
    $(document).mousedown()
  }

  if (_.isEmpty(_.pick(offersSettings[n], settings_fields, "speedup"))) {
    g.trigger("showTooltip")
  } else {
    $(".hider", a).click()
  }
  if (!_.isEmpty(offersSettings[n])) {
    p()
  }
  h(true);
  e();
  i();
  function i(s, t) {
    if ($.fx.off) {
      return
    }
    var q = _.clone(offersSettings[n]);
    if (s) {
      q[s] = t;
      if (s == "city") {
        delete q.country;
        if (t < 0) {
          q.country = -t;
          delete q[s]
        }
      }
      if (!q[s]) {
        delete q[s]
      }
    }
    function r(u) {
      d = new Date(new Date() - utcFix - 19798000);
      offersSettings[n] = q;
      if (u.limitMin) {
        offersSettings[n].limitMin = true
      } else {
        delete offersSettings[n].limitMin
      }
      if ($("input.spinner", a).val() == k()) {
        $("input.spinner", a).val(k(u.price))
      }
      cur_offer_price[n] = u.price;
      h();
      e();
      $("input.spinner", a).change()
    }

    if (_.isEmpty(q)) {
      r({price: offer_price[n]})
    } else {
      e("Подождите. Пересчёт цены с учётом таргетинга..");
      a.addClass("price_getting");
      $.ajax({
        url: "https://likes.fm/get_offer_price",
        data: _.extend({type: n}, q),
        global: false,
        success: r,
        onError: p,
        complete: function () {
          a.removeClass("price_getting")
        }
      })
    }
  }

  function l() {
    var q = $(this).closest("div[type]");
    var r = q.attr("type");
    offersSettings[n][r] = [];
    $("input", q).each(function () {
      var s = $.trim($(this).val());
      if (s) {
        offersSettings[n][r].push(s)
      }
    });
    if (_.isEmpty(offersSettings[n][r])) {
      delete offersSettings[n][r]
    }
  }

  $(".offersSettings", a).delegate("input", "paste propertychange input", l).delegate("input", "keydown", function () {
    var q = this;
    _.defer(function () {
      l.call(q)
    })
  }).delegate("li", "mousedown", function () {
    var q = $(this).closest(".selector_container").attr("type");
    i(q, Number($(this).attr("val")))
  }).delegate(".radiobtn_container", "click", function () {
    offersSettings[n][$(this).closest("div[type]").attr("type")] = $(this).attr("val")
  }).delegate(".checkbox", "click", function () {
    var q = $(this);
    _.defer(function () {
      i(q.attr("type"), q.hasClass("on"))
    })
  });
  var d = new Date(new Date() - utcFix - 19798000);
  var b = setInterval(function () {
    var q = new Date(new Date() - utcFix - 19798000);
    if (q.getDate() != d.getDate()) {
      i()
    }
  }, 2000)
}
offerPlaceholder = {comment: ["Сюда можно ввести текст ещё одного комментария", "Введите сюда текст первого комментария"]};
function buyLikesModulesCreator(g, b) {
  function i(j) {
    return /(wall)([0-9-]+_[0-9]+)/i.exec(j.replace("poll", "wall"))
  }

  var a = g.indexOf("Like") > 0 ? "like" : (g.indexOf("Comment") > 0 ? "comment" : (g.indexOf("Poll") > 0 ? "poll" : "repost"));
  if (a == "like") {
    offersSettings[a]["speed"] = 1
  } else {
    if (a == "comment") {
      $(".offersSettings .x_button").click(function () {
        $("div[type=comment_vars]", b).html(_.template($("#varInputTPL").html(), {first: true, type: a}));
        $(this).hide()
      });
      $(".comment_type", b).delegate("li", "mousedown", function () {
        var j = $(this).closest(".selector_container").attr("type");
        $("div[type=comment_vars]", b).stop()[$(this).attr("val") == 3 ? "slideDown" : "slideUp"]("fast")
      });
      function d() {
        return $("div[type=comment_vars] input", b).filter(function () {
          return !$(this).val().trim()
        }).length
      }

      function f() {
        if (!d() && $("div[type=comment_vars] input", b).length < 25) {
          var j = $(_.template($("#varInputTPL").html(), {type: a})).hide();
          $("div[type=comment_vars]", b).append(j);
          _.defer(function () {
            j.slideDown("fast")
          });
          $(".offersSettings .x_button").stop().fadeTo("fast", 0.3)
        }
      }

      $("div[type=comment_vars]", b).delegate("input", "paste propertychange input", f).delegate("input", "keydown", function () {
        _.defer(f)
      }).delegate("input", "focusout", function (k) {
        var j = $("div[type=comment_vars] input", b).length >= 25 && !$(this).val().trim();
        if (d() > 1 || j) {
          if (d() == 2 && $("div[type=comment_vars] input", b).length == 2) {
            $(".offersSettings .x_button").stop().fadeTo("fast", 0)
          }
          $(this).parent().slideUp("fast", function () {
            $(this).remove();
            if (j) {
              $("div[type=comment_vars] input").keydown()
            }
          });
          if ($("div[type=comment_vars] input", b).get(0) == this) {
            $("div[type=comment_vars] input", b).eq(1).attr({placeholder: offerPlaceholder[a][1]}).animate({marginTop: 0}, "fast")
          }
        }
      })
    } else {
      if (a == "poll") {
        var e = "";
        var h = true;
        $("input[placeholder]", b).on("paste propertychange input", _.throttle(function () {
          var j = i($(this).val());
          if (!j || e != j[0]) {
            e = "";
            $(".pollView", b).empty()
          }
          if (j && e != j[0]) {
            proxy({
              url: "http://vk.com/wkview.php?act=show&al=1&w=" + j[0].replace("wall", "poll"),
              decode: true
            }, function (k) {
              var o = k.indexOf('class="wk_poll_title">');
              if (o < 0) {
                return
              }
              e = j[0];
              var n = {title: k.substring(o + 22, k.indexOf("</", o)), vars: [{val: 0, text: "Любой вариант"}]};
              var l = 1;
              while (true) {
                o = k.indexOf('class="wk_poll_text">');
                if (o < 0) {
                  break
                }
                var m = k.substring(o + 21, k.indexOf("</", o));
                o = k.indexOf('id="wk_poll_row_count', o);
                n.vars.push({val: l++, text: m});
                k = k.substr(o + 21)
              }
              $(".pollView", b).html(_.template($("#pollViewTPL").html(), n));
              $(".vars .radiobtn_container", b).eq(h ? Math.min(offersSettings.poll.poll_var, $('div[type="poll_var"]').length - 1) || 0 : 0).click();
              h = false
            })
          }
        }, 100, {leading: false}))
      }
    }
  }
  buyModulesCreator(b, a, g == "buyPhotoLikes" && viewer_profile.profile_photo ? "http://vk.com/" + viewer_profile.profile_photo : "");
  $("a.wallPostDate", b).tooltip({
    effect: "slide",
    position: ["bottom", "center"],
    offset: [19, 0],
    relative: true
  }).next().css({zIndex: 16});
  var c = this;
  $(".button_blue button", b).click(function () {
    if (b.hasClass("price_getting")) {
      return false
    }
    var o, m = $(this).parent();

    function n(s) {
      m.show();
      $(".error", b).slideUp();
      buyOffer(s, a, $("input.spinner", b).val(), o)
    }

    function l(s) {
      $(".box_controls .progress", b).hide();
      m.show();
      $(".error", b).html(s).slideDown();
      $("input[placeholder]", b).focus()
    }

    var q = $.trim($("input[placeholder]", b).val());
    if (!q) {
      return l("Введите адрес " + c.title.toLowerCase() + ", " + (a == "like" ? "которую вы хотите пролайкать" : "для " + (a == "poll" ? "которого" : "которой") + " вы хотите получить " + offerSubjects2[a]))
    }
    var p = {buyPoll: "wall", buyWallLikes: "wall", buyPhotoLikes: "photo", buyVideoLikes: "video"}[c.getType()];
    if (/^\d+$/.exec(q)) {
      q = p + viewer_profile.uid + "_" + q
    }
    function r(u) {
      if (!u) {
        return l(_.template($("#" + p + "LinkIncorrectTPL").html(), {}))
      }
      lastAddr[a] = q;
      lastNum[a] = parseInt($("input.spinner", b).val());
      m.hide();
      var t = u[2].split("_")[0];

      function s() {
        var w = $(_.template($("#noPollErrorTPL").html(), {entityType: u[1]}));
        $("a", w).click(function () {
          lastAddr.like = q
        });
        return l(w)
      }

      if (a == "poll" && u[1] != "wall") {
        return s()
      }
      function v() {
        var y = t == viewer_profile.uid;
        var x = "Обнаружена попытка подделать кнопку <u>Мне нравится ♥ 10</u> с целью введения в заблуждение пользователей ставящих лайки.<br>Уберите поддельную кнопку <u>Мне нравится ♥ 10</u>, чтобы получить лайки к этой записи.";

        function w(A) {
          A = A.replace(/\\/g, "");
          return /(>|\|)\s*мн(е|e|&#7865;|&#279;|&#232;)\s*н(р|p)(а|a|&#7841;|&#551;|&#224;)вить?ся\s*(♥|❤|&#9829;|&#10084;|<img [^>]+>)?\s*(\d)*\s*<\/a>/i.test(A) || /(>|\|)\s*эт(о|o|&#7885;|&#559;|&#242;)\s*(с|c)п(а|a|&#7841;|&#551;|&#224;)м\s*<\/a>/i.test(A) || /([^<>]{1,15}<br\/>\s*){7,}/i.test(A) || /<a class="wk_photo"([^>]*)href="(?!\/photo\d+_\d+)([^>]*)><img/i.test(A)
        }

        function z() {
          m.show();
          createPopup("Вы пытаетесь прорекламировать вредоносный сайт", "#linkPenaltyTPL", {type: a});
          return $.ajax({url: "https://likes.fm/penalty_link", global: false, type: "POST"})
        }

        switch (u[1]) {
          case"wall":
            proxy({url: "http://vk.com/" + u[0], decode: true, loggedIn: true}, function (C) {
              C = C.replace(/<script([\w\W]*?)\/script>/ig, "");
              if (autoban_words_re.test(C.substr(0, C.indexOf("replies_wrap"))) && !/travel-blog\.ml/.test(C.substr(0, C.indexOf("replies_wrap")))) {
                return z()
              }
              var B = _.template($("#wallPrivacyErrorTPL").html(), {notFound: true, entity: u[0], offerType: a});
              if (C.indexOf("<title>Error | VK</title>") > 0 || C.indexOf("<title>Error</title>") > 0) {
                if (C.indexOf("not found") > 0) {
                  return l(B)
                }
                if (C.indexOf("hide this page") > 0 || C.indexOf("not allowed to view") > 0 || C.indexOf("Access denied") > 0) {
                  return l(_.template($("#wallPrivacyErrorTPL").html(), {isYourProfile: y, offerType: a}))
                }
              }
              if (C.indexOf("/wall" + u[2]) < 0 && C.indexOf("same page more than once") < 0) {
                var A = /href="\/wall([0-9-]+_[0-9]+)/i.exec(C);
                if (!A) {
                  return l(B)
                }
                return r(offerRegexp.like.exec("wall" + A[1]))
              }
              if (a == "repost" && C.indexOf('<span class="published_by_date sm">Post</span>') > 0) {
                return l(saveErrors.removedRepost)
              }
              if (a == "comment" && C.indexOf(">Your comment<") < 0) {
                return l(_.template($("#commentPrivacyErrorTPL").html(), {isYourProfile: y, entityType: u[1]}))
              }
              if (a == "poll" && C.indexOf('class="page_media_poll_wrap"') < 0) {
                return s()
              }
              if (w(C)) {
                return l(x)
              }
              _.defer(function () {
                $(".box_controls .progress", b).show()
              });
              $.getJSON("https://api.vk.com/method/wall.getById?callback=?", {posts: u[2]}, function (H) {
                if (H.response && H.response.length) {
                  H = H.response[0];
                  if (a == "repost" && H.from_id != H.to_id) {
                    return l(saveErrors.repostsOidError(u[0]))
                  }
                  if (a == "poll" && H.copy_owner_id) {
                    u[0] = "wall" + H.copy_owner_id + "_" + H.copy_post_id
                  }
                  if (H.attachments && H.attachments.length) {
                    if (!H.text && H.attachments.length == 1 && H.attachments[0].photo && H.attachments[0].photo.aid == -6 && H.to_id == H.attachments[0].photo.owner_id) {
                      return r(offerRegexp.like.exec("photo" + H.attachments[0].photo.owner_id + "_" + H.attachments[0].photo.pid))
                    }
                    var K = /(photo|video)([0-9-]+_[0-9]+)/i.exec(q);
                    if ((H.attachments[0].album || H.attachments.length > 1) && K) {
                      return r(K)
                    }
                  }
                }
                $(".box_controls .progress", b).hide();
                var F = $("div.wall_post_text", C).html();
                if (a == "repost" && F) {
                  if (parseInt(t) < 0 && /<a href="([^"]*)(%2F||\/)app\d+/i.test(F)) {
                    return l(saveErrors.groupAppRepost)
                  }
                  var G = 'href="/away.php?to=';
                  var E = [];
                  var I = [];
                  var D = 0;
                  while (F.indexOf(G) > 0) {
                    if (++D > 10) {
                      break
                    }
                    var J = F.indexOf(G) + G.length;
                    I.push(unescape(F.substring(J, F.indexOf("&", J))));
                    E.push($.getJSON("https://api.vk.com/method/utils.checkLink?callback=?", {url: unescape(F.substring(J, F.indexOf("&", J)))}));
                    F = F.substr(J)
                  }
                  _.defer(function () {
                    $(".box_controls .progress", b).show()
                  });
                  $.when.apply(this, E).always(function () {
                    $(".box_controls .progress", b).hide();
                    arguments = E.length == 1 ? [arguments] : arguments;
                    if (_.find(arguments, function (L) {
                        return L[0].response.status == "banned"
                      })) {
                      z()
                    } else {
                      n(u[0])
                    }
                  })
                } else {
                  n(u[0])
                }
              })
            });
            break;
          case"photo":
            proxy({url: "http://vk.com/" + u[0], decode: true, loggedIn: true}, function (B) {
              if (w(B)) {
                return l(x)
              }
              if (autoban_words_re.test(B.substring(B.indexOf('"id":"' + u[2] + '"'), B.indexOf('"hash":', B.indexOf('"id":"' + u[2] + '"'))))) {
                return z()
              }
              if (_.include([81305100, 132819462], viewer_profile.uid)) {
                var D = B.indexOf('"x_src":"', B.indexOf('"id":"%s"' % u[2])) + 9;
                if (D > 0) {
                  res = B.substring(D, B.indexOf('"', D)).replace(/\\\//ig, "/")
                }
              }
              var A = B.indexOf('"comm":1') > 0;
              B = B.replace(/<script([\w\W]*?)\/script>/ig, "");
              if (B.indexOf("<title>Error | VK</title>") > 0 || B.indexOf("<title>Error</title>") > 0 || B.indexOf("<title>404 Not Found</title>") > 0) {
                if (B.indexOf("Unknown error") > 0 || B.indexOf("Photo not found") > 0 || B.indexOf("<title>404 Not Found</title>") > 0) {
                  return l(_.template($("#photoPrivacyErrorTPL").html(), {notFound: true, entity: u[0], offerType: a}))
                }
                if (B.indexOf("Access denied") > 0 || B.indexOf("Security error") > 0) {
                  return l(_.template($("#photoPrivacyErrorTPL").html(), {
                    isYourProfile: y,
                    entity: u[0],
                    offerType: a
                  }))
                }
              }
              var C = _.last(/href="\/album\d+_(\d+)/.exec(B));
              if (a == "repost" && C == "0000") {
                return l("Указанная фотография находится в альбоме граффити.<br>ВКонтакт не позволяет делать репосты самого граффити, однако вы можете заказать репосты к записи на стене, к которой прикреплено граффити или перенести граффити в другой альбом и попытаться заказать к нему репосты снова.")
              }
              if (a == "comment" && !A) {
                return l(_.template($("#commentPrivacyErrorTPL").html(), {
                  isYourProfile: y,
                  entityType: u[1],
                  aid: parseInt(C),
                  oid: t
                }))
              }
              n(u[0])
            });
            break;
          case"video":
            proxy({url: "http://vk.com/" + u[0], decode: true, loggedIn: true}, function (C) {
              var A = C.indexOf('id=\\"mv_your_comment\\"') > 0;
              var B = C.indexOf('"noPublicAdd":true') > 0;
              C = C.replace(/<script([\w\W]*?)\/script>/ig, "");
              if (C.indexOf("<title>Error | VK</title>") > 0 && (C.indexOf("Access denied") > 0 || C.indexOf("You need to be a member of this group") > 0)) {
                return l(_.template($("#videoPrivacyErrorTPL").html(), {isYourProfile: y, entity: u[0], offerType: a}))
              }
              var D = C.substring(C.indexOf('description" content="'), C.indexOf("<title>"));
              _.each(["title", "description"], function (E) {
                E = "og:" + E + '" content="';
                var F = C.indexOf(E);
                if (F > 0) {
                  D += C.substring(F + E.length, C.indexOf('"', F + E.length)) + " "
                }
              });
              if (autoban_words_re.test(D)) {
                return z()
              }
              if (/\| *мн(е|e) *н(р|p)(а|a)вить?ся *(♥|❤)? *(\d)* *]/i.test(D) || /\[ *(id|app|event|public|club)\d* *\| *д(о|o)б(а|a)вл(е|e)н(а|a)/i.test(D)) {
                return l(x)
              }
              if (a == "comment" && !A) {
                return l(_.template($("#commentPrivacyErrorTPL").html(), {isYourProfile: y, entityType: u[1], oid: t}))
              }
              if (a == "repost" && B) {
                return l($("#adultVideoErrorTPL").html())
              }
              n(u[0])
            });
            break
        }
      }

      if (t.charAt(0) == "-") {
        $.getJSON("https://api.vk.com/method/groups.getById?callback=?", {gid: t.substr(1)}, function (w) {
          if (!w.response || !w.response.length || isEmptyGroup(w.response[0])) {
            return l("Группа в которой вы хотите пролайкать " + offerWords1[u[1]] + " удалена или ещё не создана.<br>Проверьте ссылку, которую вы указали в поле адреса.<br>Возможно вы ошиблись в написании ссылки.<br>" + urlize("http://vk.com/" + u[0]))
          }
          var x = w.response[0];
          if (x.is_closed) {
            return l(_.template($("#groupPrivacyErrorTPL").html(), {group: x, type: u[1], offerType: a}))
          }
          if (u[1] == "photo") {
            $.getJSON("https://api.vk.com/method/likes.getList?callback=?", {
              type: "photo",
              owner_id: t,
              item_id: u[2].split("_")[1]
            }, function (y) {
              if (y.error && y.error.error_code == 15) {
                l(_.template($("#groupDisabledWallErrorTPL").html(), {group: x, type: u[1], offerType: a}))
              } else {
                v()
              }
            })
          } else {
            v()
          }
        })
      } else {
        v()
      }
    }

    var k = q.split("#");
    if (k.length > 1 && offerRegexp.like.exec(k[1])) {
      q = k[1]
    }
    var j = i(q);
    if (j) {
      r(j)
    } else {
      r(offerRegexp.like.exec(q))
    }
  })
}
function parseVkEntity(a) {
  var b = a.split("#");
  a = b.length > 1 && (!offerRegexp.like.exec(b[1]) && /([a-z0-9_.]+)/.exec(b[1])) ? b[1] : b[0];
  if (a.indexOf("/") >= 0) {
    a = a.substr(a.lastIndexOf("/") + 1)
  }
  b = offerRegexp.group.exec(a);
  if (b) {
    a = "club" + b[2]
  }
  return a.split("?")[0]
}
function buySubsModulesCreator(d, b) {
  var a = d.indexOf("Group") > 0 ? "group" : "sub";
  buyModulesCreator(b, a, a == "sub" ? "http://vk.com/" + viewer_profile.domain : "");
  var c = this;
  $(".button_blue button", b).click(function () {
    if (b.hasClass("price_getting")) {
      return false
    }
    var f = $(this).parent();

    function g(i) {
      f.show();
      $(".error", b).slideUp();
      buyOffer(i, i.substr(0, 2) == "id" ? "sub" : "group", $("input.spinner", b).val())
    }

    function e(i) {
      f.show();
      $(".error", b).html(i).slideDown();
      $("input[placeholder]", b).focus()
    }

    var h = $.trim($("input[placeholder]", b).val());
    if (!h) {
      return e("Введите адрес странички, для которой вы хотите получить " + (a == "sub" ? "друзей или " : "") + "подписчиков.")
    }
    h = parseVkEntity(h);
    f.hide();
    if (h) {
      lastAddr[a] = $.trim($("input[placeholder]", b).val());
      lastNum[a] = parseInt($("input.spinner", b).val());
      $.when($.getJSON("https://api.vk.com/method/users.get?callback=?", {
        user_ids: h,
        fields: "photo_medium"
      }), $.getJSON("https://api.vk.com/method/groups.getById?callback=?", {
        group_id: h,
        fields: "photo_medium"
      })).always(function () {
        data = _.first(arguments[0][0].response);
        if (!data || a == "group" && arguments[1][0].response) {
          data = _.first(arguments[1][0].response)
        }
        if (!data || isEmptyProfile(data) || isEmptyGroup(data) || data.deactivated) {
          e(_.template($("#pageNotExistsErrorTPL").html(), {entity: h, page: data, offerType: a}))
        } else {
          if (data.is_closed > 1 || data.type == "event" && data.is_closed) {
            e(_.template($("#groupClosedErrorTPL").html(), {group: data}))
          } else {
            g(data.gid ? "club" + data.gid : "id" + data.uid)
          }
        }
      })
    } else {
      e(_.template($("#pageNotExistsErrorTPL").html(), {}))
    }
  })
}
_.extend(modulesSets, {
  offers: ["likeOffersOverview", "subOffersOverview", "repostOffersOverview"],
  buyLikes: ["buyPhotoLikes", "buyWallLikes", "buyVideoLikes"],
  buyReposts: ["buyPhotoReposts", "buyWallReposts", "buyVideoReposts"],
  buyReposts: ["buyPhotoComments", "buyWallComments", "buyVideoComments"],
  buyPageSubs: ["buySubs", "buyGroup"],
});
var yvar = "y";
_.extend(modulesDescriptors, {
  likeOffersOverview: _.extend({
    popupTitle: "Ставь лайки другим и получай лайки себе",
    title: "Обмен лайками",
    template: "#offersOverviewTPL",
    offerType: "like",
    offerWord: "лайки",
    activatorClick: function (b, c) {
      var a = this;
      if (c == undefined) {
        return $.bbq.pushState({page: 1}, 1)
      }
      a.create({pageIndex: c + 1, offerType: a.offerType})
    },
    creator: function (c, a) {
      $(".box_controls", a).append('<div style="margin-left: 52px; margin-top: 7px; text-align: center"><a href="#" class="bu' + yvar + "_" + this.offerType + 's_button">Купить ' + this.offerWord + "!</a></div>").find(".progress").css({"float": "left"});
      var b = this;
      $(".box_body", a).attr({type: this.offerType});
      a.css({width: 570, marginLeft: -570 / 2});
      a.delegate(".pageList a", "click", function (f) {
        var e = $(f.target).text();
        if (e == "»") {
          var d = Math.ceil(offersList[b.offerType].length / 21)
        } else {
          if (e == "«") {
            d = 1
          } else {
            d = parseInt(e)
          }
        }
        $.bbq.pushState({page: d})
      });
      if (!$(".offer", a).length && $.bbq.getState("page") > 1) {
        _.defer(function () {
          $.bbq.pushState({page: $.bbq.getState("page") - 1})
        })
      }
    }
  }, moduleDescriptor),
  buyVideoLikes: _.extend({
    popupTitle: "Получить лайки для",
    title: "Видеозаписи",
    template: "#buyVideoLikesTPL",
    creator: buyLikesModulesCreator
  }, moduleDescriptor),
  buyWallLikes: _.extend({
    popupTitle: "Получить лайки для",
    title: "Записи на стене",
    template: "#buyWallLikesTPL",
    creator: buyLikesModulesCreator
  }, moduleDescriptor),
  buyPhotoLikes: _.extend({
    popupTitle: "Получить лайки для",
    title: "Фотографии",
    template: "#buyPhotoLikesTPL",
    activator: ".buy_likes_button",
    creator: buyLikesModulesCreator
  }, moduleDescriptor),
  buyVideoReposts: _.extend({
    popupTitle: "Получить репосты для",
    title: "Видеозаписи",
    template: "#buyVideoLikesTPL",
    creator: buyLikesModulesCreator
  }, moduleDescriptor),
  buyWallReposts: _.extend({
    popupTitle: "Получить репосты для",
    title: "Записи на стене",
    template: "#buyWallLikesTPL",
    activator: ".buy_reposts_button",
    creator: buyLikesModulesCreator
  }, moduleDescriptor),
  buyPhotoReposts: _.extend({
    popupTitle: "Получить репосты для",
    title: "Фотографии",
    template: "#buyPhotoLikesTPL",
    creator: buyLikesModulesCreator
  }, moduleDescriptor),
  buyVideoComments: _.extend({
    popupTitle: "Получить комментарии для",
    title: "Видеозаписи",
    template: "#buyVideoLikesTPL",
    creator: buyLikesModulesCreator
  }, moduleDescriptor),
  buyWallComments: _.extend({
    popupTitle: "Получить комментарии для",
    title: "Записи на стене",
    template: "#buyWallLikesTPL",
    creator: buyLikesModulesCreator
  }, moduleDescriptor),
  buyPhotoComments: _.extend({
    popupTitle: "Получить комментарии для",
    title: "Фотографии",
    template: "#buyPhotoLikesTPL",
    activator: ".buy_comments_button",
    creator: buyLikesModulesCreator
  }, moduleDescriptor),
  buySubs: _.extend({
    popupTitle: "Получить подписчиков для",
    title: "странички пользователя",
    template: "#buySubsTPL",
    activator: ".buy_subs_button",
    creator: buySubsModulesCreator
  }, moduleDescriptor),
  buyGroup: _.extend({
    popupTitle: "Получить подписчиков для",
    title: "группы, встречи, паблика",
    template: "#buySubsTPL",
    activator: ".buy_group_button",
    creator: buySubsModulesCreator
  }, moduleDescriptor),
  buyPoll: _.extend({
    popupTitle: "Получить голоса для варианта ответа в опросе",
    title: "Опроса",
    template: "#buyPollTPL",
    activator: ".buy_poll_button",
    creator: buyLikesModulesCreator
  }, moduleDescriptor),
});
_.extend(modulesDescriptors.likeOffersOverview, {
  forms: ["предложение", "предложений", "предложения"],
  activator: ".module[type=like] .module_header"
});
modulesDescriptors.subOffersOverview = _.extend(_.clone(modulesDescriptors.likeOffersOverview), {
  popupTitle: "Подписывайся на других и получай новых подписчиков себе",
  title: "Обмен подписчиками",
  offerType: "sub",
  offerWord: "подписчиков",
  activator: ".module[type=sub] .module_header"
});
modulesDescriptors.repostOffersOverview = _.extend(_.clone(modulesDescriptors.likeOffersOverview), {
  popupTitle: "Репости фотки и записи других и получай репосты себе",
  title: "Обмен репостами",
  offerType: "repost",
  offerWord: "репостов",
  activator: ".module[type=repost] .module_header"
});
$(document).delegate("a.open_offer", "mouseup", function (b) {
  var a = $(this).closest(".offer").attr("entity") + "." + $(this).closest(".module,.box_body").attr("type");
  $.ajax({url: "https://likes.fm/open_offer", data: {entity: a}, global: false});
  if (_.include(openedOffers, a)) {
    return
  }
  openedOffers.unshift(a);
  openedOffers = openedOffers.slice(0, 21)
});
$(document).delegate("span.do_offer", "click", function (a) {
  doOffers([$(this).closest(".offer").attr("entity") + "." + $(this).closest(".module,.box_body").attr("type")]);
  a.preventDefault();
  return false
});
$(document).delegate(".line_cell .x_button", "click", function () {
  var a = $(this).closest(".offer").attr("entity");
  var b = $(this).closest(".module,.box_body").attr("type");
  removeOffers([a + "." + b]);
  updateDisplayOffers(b);
  closedOffers[b].push(a);
  $.ajax({url: "https://likes.fm/close_offer", data: {entity: a + "." + b}, global: false})
});
$(document).delegate(".x_button:visible", "mouseenter", function () {
  $(this).stop().fadeTo("fast", 1)
});
$(document).delegate(".x_button:visible", "mouseleave", function () {
  $(this).stop().fadeTo("fast", 0.3)
});
$(document).delegate(".module_body .line_cell", "mouseenter", function () {
  $(".x_button", this).stop().fadeTo("fast", 0.3)
});
$(document).delegate(".module_body .line_cell", "mouseleave", function () {
  $(".x_button", this).stop().fadeTo("fast", 0)
});
var vk_app_connected;
$(document).delegate(".connect_vk_app", "click", function () {
  vk_app_connected = true
});
$(document).delegate(".save_vk_token button", "click", function () {
  var b = $(this).parent();
  var c = b.parent();
  var a = $("input", c).val();
  if (!vk_app_connected || !a) {
    return $(".error", c).html(!vk_app_connected ? 'Сначала необходимо нажать кнопку "Подключить приложение"' : "Вставьте текст из адресной строки приложения в текстовое поле ниже").slideDown()
  }
  $(".error", c).slideUp();
  $.get("https://likes.fm/save_vk_token", {token: a}, function (d) {
    if (d == "bad_token") {
      b.removeClass("button_lock");
      $(".error", c).html('Вы вставили неверный текст.<br>Нажмите кнопку "Подключить приложение" ещё раз и скопируйте текст из адресной строки появившегося окна в текстовое поле ниже:').slideDown()
    } else {
      processOffers(d);
      c.html("Поздравляем! Теперь вам доступны задания на голосования в анонимных опросах.<br><br>Доступ предоставляется на сутки, после чего вам будет предложено повторить операцию, чтобы продлить раширенный доступ.")
    }
  });
  b.addClass("button_lock")
});
var recheckOffersInterval = -1, addRecheckOffersInterval = -1, addRecheckOffers = [], penaltyOffers = [], failedOffers = 0;
function checkBlacklist(a, c) {
  var b = a.split(".")[1];
  a = a.split(".")[0];
  vk_api("wall.get", {owner_id: offerRegexp[b].exec(a)[2].split("_")[0], count: 1}, function (d) {
    if (d.error && d.error.error_code == 15) {
      $.ajax({
        url: "https://likes.fm/penalty_blacklist",
        data: {entity: a + "." + b},
        global: false,
        type: "POST",
        success: processPrepaid
      })
    } else {
      vk_running_calls++;
      proxy({url: "http://vk.com/" + a}, function (e) {
        if (e && e.indexOf("<title>Error | VK</title>") < 0 && e.indexOf("<title>404 Not Found</title>") < 0 && e.indexOf('src="/images/pics/spamfight.gif"') < 0 && e.indexOf('src="/images/deactivated_a.gif"') < 0) {
          c()
        }
        vk_running_calls--;
        vk_complete_handler()
      }, false)
    }
  })
}
function blockPopupClose(a, b) {
  $(".box_x_button", a).remove();
  $(".box_controls .button_blue", a).remove();
  $(".profile_menu").css({zIndex: 100});
  blockMaskClose = true;
  $("button.close", a).click(function () {
    $(".profile_menu").css({zIndex: 3000});
    blockMaskClose = false;
    if (b) {
      $.ajax({url: "https://likes.fm/reset_penalty_popup", data: {type: $(".penaltyPopup", a).attr("type")}, global: false})
    }
  })
}
function resetAgreements(a) {
  _.each(a, function (b) {
    delete viewer_profile.agreement[b];
    offersList[b] = [];
    offersDict[b] = {};
    setEmptyOffersModule(b)
  })
}
function createCommentPenaltyPopup(c, b) {
  resetAgreements(["comment"]);
  var a = createPopup((b && viewer_profile.penalty_popup ? "Также в" : "В") + "ы оштрафованы", "#commentPenaltyPopupTPL", c);
  blockPopupClose(a, b)
}
function createPenaltyPopup(d, c) {
  var a = createPopup("Вы оштрафованы", "#penaltyOfferTPL", {entity: d[0]});
  if (d.length < 3) {
    _.defer(function () {
      a.css({top: 30})
    });
    $(".info_msg", a).show()
  }
  processPrepaid(c);
  resetAgreements(c.reset_agreements);
  _.each(d.slice(1), function (h) {
    var i = h.split(".")[1];
    if (i == "group") {
      i = "sub"
    }
    var g = $("." + i + "_urls", a);
    if (g.length) {
      g.append($("<div>" + urlize("http://vk.com/" + h.split(".")[0]) + "</div>").hide().fadeIn())
    } else {
      $(".penaltyWarnings", a).append(" и " + penaltyReason[i][1]);
      $(".penaltyUrls", a).append($("<div>и <b>" + penaltyReason[i][0] + '</b>:<div class="' + i + '_urls">' + urlize("http://vk.com/" + h.split(".")[0]) + "</div></div><br>").hide().fadeIn())
    }с
  });
  var f = getOffersDict(d);
  if (f.group) {
    f.sub = 1;
    delete f.group
  }
  var e = _.template($("#penaltyOfferButtonTPL").html(), {
    reasons: _.map(_.keys(f), function (g) {
      return penaltyReason[g][2]
    })
  });
  if (f.sub) {
    e += _.template($("#subPenaltyFooterTPL").html(), {})
  }
  $(".loading", a).after(e).remove();
  $(".filterNewsHelp", a).tooltip({effect: "slide", position: ["bottom", "center"], offset: [13, 0], relative: true});
  $(".penaltyValues", a).html("на" + _.map(_.pairs(c.penalty_delta), function (g) {
      return _.template($("#penaltyValueTPL").html(), {type: g[0], val: g[1]})
    }).join(" и ")).fadeIn();
  var b = !("prepaid" in c);
  blockPopupClose(a, b);
  if (viewer_profile.comment_penalty_popup) {
    $("button.close", a).click(function () {
      setTimeout(function () {
        createCommentPenaltyPopup(viewer_profile.comment_penalty_popup, b)
      }, 50)
    })
  }
}
function recheckOffersStep() {
  var a = viewer_profile.check_offers.slice(0, 25);
  viewer_profile.check_offers = viewer_profile.check_offers.slice(25);
  if (!viewer_profile.check_offers.length) {
    clearInterval(recheckOffersInterval);
    recheckOffersInterval = -1
  }
  check_offers(a, function (b) {
    if (_.isEmpty(b)) {
      return
    }
    viewer_profile.check_offers = viewer_profile.check_offers.concat(_.pluck(addRecheckOffers, "entity"));
    clearInterval(addRecheckOffersInterval);
    addRecheckOffersInterval = -1;
    addRecheckOffers = [];
    check_offers(viewer_profile.check_offers, function (c) {
      b = b.concat(c);
      $.ajax({
        url: "https://likes.fm/penalty_offers", data: {entities: b}, global: false, type: "POST", success: function (d) {
          createPenaltyPopup(b, d)
        }
      })
    })
  })
}
function recheckOffers() {
  if (recheckOffersInterval >= 0 || !viewer_profile.check_offers.length) {
    return
  }
  recheckOffersInterval = setInterval(function () {
    if (!isStatsModule()) {
      recheckOffersStep()
    }
  }, 5000)
}
var badComments = {
  urlComment: ["содержит ссылку или упоминание", "не используйте в комментариях ссылки и упоминания"],
  shortComment: ["слишком короток и бессмысленен", "пишите более качественные и осмысленные комментарии"]
};
var resetTime = 0;
function getResetTime() {
  var b = Math.floor(Math.max(0, resetTime - new Date()) / 1000);
  var c = Math.floor(b / 60);
  var a = b - c * 60;
  return c + ":" + (a < 10 ? "0" + a : a)
}
var waningEntities = [];
var doOffersTimestamp = 0;
function doOffers(h, c) {
  if (isStatsModule() || new Date - doOffersTimestamp < 200) {
    return
  }
  doOffersTimestamp = +new Date;
  h = h.slice(0, 25);
  var b = h[0].split(".")[0];
  var a = h[0].split(".")[1];
  var e = /[a-z]+/i.exec(h[0])[0];
  var g = {};
  h = _.filter(h, function (i) {
    var j = i.split(".")[1];
    if (_.include(["comment", "poll"], j)) {
      var k = $(".module[type=" + j + "] .offer[entity=" + i.split(".")[0] + "]").data();
      if (!k) {
        return false
      }
      g[i] = k
    }
    return true
  });
  function d() {
    f();
    if (!c) {
      createAlertPopup("Вы не " + offerActions[a][1] + " " + offerWords1[e], _.template($("#checkFailedTPL").html(), {
        offerType: a,
        entityType: e,
        entity: b
      })).find(".box_body").css({textAlign: "center"})
    }
  }

  function f(i) {
    _.each(h, function (j) {
      var k = j.split(".")[1];
      $(".offer[entity=" + j.split(".")[0] + "]", ".module[type=" + k + "],.box_body[type=" + k + "]")[i ? "addClass" : "removeClass"]("loading")
    })
  }

  f(true);
  $.ajax({
    url: "https://likes.fm/do_offers", data: _.extend({
      entities: h, domain: viewer_profile.domain, onError: function () {
        return f
      }
    }, g), global: false, type: "POST", success: function (j) {
      f();
      if (!j) {
        d()
      } else {
        if (!c) {
          setTimeout(function () {
            if (!_.isEmpty(j.not_exist)) {
              createAlertPopup("Предложение уже не актуально", "Эта " + offerWords2[e] + " уже набрала заказанное количество " + offerSubjects[a][2] + ".<br>Попробуйте " + offerActions[a][2] + " что-нибудь ещё.")
            } else {
              if (!_.isEmpty(j.already_used)) {
                createAlertPopup("Вы уже " + offerActions[a][1] + " эту " + offerWords1[e], "Вы уже " + offerActions[a][1] + " эту " + offerWords1[e] + ".<br>Попробуйте " + offerActions[a][2] + " что-нибудь ещё.")
              }
            }
          }, 700)
        }
        if (j.warning_popup && (!c || !_.include(waningEntities, j.warning_popup.id))) {
          waningEntities = _.union(waningEntities, j.warning_popup.id);
          createAlertPopup("Вы оставили некачественный комментарий", "#badCommentWarningTPL", j.warning_popup)
        }
        if (!_.isEmpty(j.checked)) {
          viewer_profile.update_offers = true;
          _.extend(viewer_profile, _.pick(j, "limits"));
          var i = new Date(parseInt($.cookie("lastUsedOfferDate") || 0));
          if (j.comment_penalty) {
            createCommentPenaltyPopup(j.comment_penalty)
          } else {
            if (i.add(1).days().isBefore(new Date()) && !firstOfferInfoShowed) {
              setTimeout(function () {
                var k = createPopup("Поздравляем!", "#firstOfferInfoTPL", {reward: j.reward});
                $(".setModule", k).click(function () {
                  closePopup(popups.pop())
                });
                $("a.balanceHelper", k).tooltip({
                  effect: "slide",
                  position: ["bottom", "center"],
                  offset: [19, 0],
                  relative: true
                });
                $.cookie("lastUsedOfferDate", new Date().valueOf());
                firstOfferInfoShowed = true
              }, 700)
            }
          }
          _.each(j.checked, function (k) {
            if (!_.include(["comment", "poll"], k.split(".")[1])) {
              addRecheckOffers.push({entity: k, dt: +new Date - Math.random() * 15000})
            }
          });
          if (addRecheckOffersInterval < 0 && addRecheckOffers.length) {
            addRecheckOffersInterval = setInterval(function () {
              var k = +new Date;
              _.each(addRecheckOffers, function (l) {
                if (k - l.dt > 30000) {
                  addRecheckOffers = _.filter(addRecheckOffers, function (m) {
                    return m.entity != l.entity
                  });
                  viewer_profile.check_offers.unshift(l.entity);
                  recheckOffers()
                }
              });
              if (!addRecheckOffers.length) {
                clearInterval(addRecheckOffersInterval);
                addRecheckOffersInterval = -1
              }
            }, 5000)
          }
        }
        removeOffers(_.compact([].concat(j.checked, j.not_exist, j.already_used)));
        processOffers(j);
        processPrepaid(j)
      }
    }
  })
}
function check_offers(d, b) {
  var c = [];

  function a(f, g) {
    var e = offerRegexp.like.exec(f.split(".")[0]);
    e[2] = e[2].split("_");
    return $.getJSON("https://api.vk.com/method/likes.getList?callback=?", {
      type: e[1] == "wall" ? "post" : e[1],
      owner_id: e[2][0],
      item_id: e[2][1],
      filter: f.split(".")[1] == "like" ? "likes" : "copies",
      count: 1000,
      offset: g || 0,
      v: 5.21
    })
  }

  _.each(d, function (f) {
    var g = f.split(".")[1];
    var e = offerRegexp[g].exec(f.split(".")[0]);
    if (g == "sub") {
      c.push($.getJSON("https://api.vk.com/method/users.getFollowers?callback=?", {user_id: e[2], count: 1000}))
    } else {
      if (g == "group") {
        c.push($.getJSON("https://api.vk.com/method/groups.isMember?callback=?", {
          group_id: e[2],
          user_id: viewer_profile.uid,
          extended: 1
        }))
      } else {
        c.push(a(f))
      }
    }
  });
  $.when.apply(this, c).always(function () {
    var f = [];
    arguments = c.length == 1 ? [arguments] : arguments;
    c = [];
    function e(l, m) {
      var n = [];
      for (var i = 1; i < Math.ceil(m / 1000); i++) {
        n.push(a(l, i * 1000))
      }
      c.push($.when.apply(this, n).always(function () {
        arguments = n.length == 1 ? [arguments] : arguments;
        for (var o = 0; o < arguments.length; o++) {
          if (!arguments[o][0].response.count || _.include(arguments[o][0].response.items, viewer_profile.uid)) {
            return
          }
        }
        f.push(l)
      }))
    }

    function j(i) {
      var k = parseInt(d[g].substr(2));
      if (_.include(viewer_profile.friends_uids, k)) {
        return
      }
      c.push($.getJSON("https://api.vk.com/method/friends.get?callback=?", {user_id: viewer_profile.uid}, function (l) {
        if (l.response && !_.include(l.response, k)) {
          f.push(i)
        }
      }))
    }

    for (var g = 0; g < arguments.length; g++) {
      var h = d[g].split(".")[1];
      if (h == "group" && !arguments[g][0].response.member && !arguments[g][0].response.request) {
        f.push(d[g])
      } else {
        if (arguments[g][0].response.count > 0 && !_.include(arguments[g][0].response.items, viewer_profile.uid)) {
          if (_.include(["like", "repost"], h) && arguments[g][0].response.count > 1000) {
            e(d[g], arguments[g][0].response.count)
          } else {
            if (h == "sub") {
              j(d[g])
            } else {
              f.push(d[g])
            }
          }
        }
      }
    }
    $.when.apply(this, c).always(function () {
      b(f)
    })
  })
}
function createSendLikesPopup(b, c) {
  var a = createPopup("Владелец странички ограничил возможность накрутки лайков", "#noLikeTPL", {price: c});
  $(".sendLikes button", a).click(function () {
    $(this).parent().addClass("button_lock");
    $.post("https://likes.fm/send_likes_to_user", {uid: b, num: c}, function (d) {
      processPrepaid(d);
      _.defer(function () {
        $("button.close", a).click()
      })
    })
  })
}
function isEmptyProfile(a) {
  return a.first_name == "DELETED" && !a.last_name && a.photo_medium.indexOf("/vk.com/images/") >= 0
}
function isEmptyGroup(a) {
  return a.name == "DELETED" && a.photo.indexOf("/vk.com/images/") >= 0
};
