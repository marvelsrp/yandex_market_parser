var relationTexts = ["Не женат", "Встречается", "Помолвлен", "Женат", "Всё сложно", "В активном поиске", "Влюблён"];
var modulesSets = {
  popularity: ["kinghill"],
};
var moduleDescriptor = {
  getType: function() {
    for (var a in modulesDescriptors) {
      if (modulesDescriptors[a] == this) {
        return a
      }
    }
  },
  activate: function() {
    this.activatorClick ? this.activatorClick(this.getType()) : this.create()
  },
  create: function(e) {
    var c = this.getType();
    e = _.extend(e || {}, {
      type: c
    });
    var d = this.popupTitle || _.template(this.title, {});
    var b = _.find(modulesSets, function(f) {
      return _.include(f, c)
    });
    var a = b ? createTabbedPopup(d, this.template, e) : createPopup(d, this.template, e);
    if (this.creator) {
      this.creator(c, a)
    }
    return a
  }
};
var modulesDescriptors = {
  kinghill: _.extend({
    popupTitle: "Выиграй лайки, став Царём Горы",
    title: "Царь горы",
    template: "#kinghillPopupBoxContentTPL",
    activator: ".kinghill > a",
    creator: function(b, a) {
      var c = 0;
      $(".roll_kinghill", a).click(function() {
        if (new Date - c < 200) {
          return
        }
        c = +new Date;
        var e = $(this).parent();

        function d() {
          var f = -1;
          e.add(".kinghill_result_text").stop().slideUp("fast");
          $(".kinghill_result", a).css({
            color: "black"
          }).stop().slideDown("fast");
          clearTimeout(kinghillLabelTimeout);
          var g = 50;

          function h() {
            if (g > 1500) {
              $(".kinghill_result", a).text(f);
              if (f < 8) {
                $(".kinghill_result", a).css({
                  color: "#a82828"
                });
                e.slideDown("fast");
                $(".kinghill_result_text").text("Вы проиграли. Попробуйте ещё раз!").slideDown("fast");
                $(".kinghill_wins").text(declineWord(++kinghill.cur_wins, "раз", "раз", "раза"))
              } else {
                $(".kinghill_result", a).css({
                  color: "#2fb742"
                });
                $(".kinghill_result_text").html("Вы выиграли.<br>Поздравляю вас, новый Царь!").add(".kinghill_winner").slideDown("fast");
                $(".kinghill_cost").slideUp("fast");
                kinghill = viewer_profile;
                kinghill.cur_wins = 1;
                kinghill.cur_fails = 0;
                processBalance();
                $(".popup_box_container .info").html(_.template($("#kinghillInfoContentTPL").html()));
                initKinghillModule()
              }
              return
            }
            $(".kinghill_result", a).text(Math.floor(Math.random() * 10) + 1);
            kinghillLabelTimeout = setTimeout(function() {
              clearTimeout(kinghillLabelTimeout);
              h();
              if (f > 0) {
                g = g * 2
              }
            }, g)
          }
          h();
          return $.get("/kinghill_roll", {
            kinghill_id: kinghill.uid,
            attacker_name: viewer_profile.first_name + " " + viewer_profile.last_name,
            attacker_sx: viewer_profile.sex
          }, function(i) {
            f = i.result
          })
        }
        processPayment(1000, d)
      })
    }
  }, moduleDescriptor),
  balanceView: _.extend({
    title: "Как можно использовать ваши лайки на Likes.FM",
    template: "#balanceViewTPL",
    activator: "a.balanceMenu"
  }, moduleDescriptor),
  paymentView: _.extend({
    title: "Пополнение счёта",
    template: "#paymentViewTPL",
    activator: ".profile_actions .plus",
    creator: function(b, a) {
      $("input.spinner", a).spinner({
        min: 1,
        max: 999999
      });
      $("input.likes", a).bind("change keydown", function(d) {
        var c = $(this);
        setTimeout(function() {
          var e = parseInt(c.val() ? c.val() : 0);
          $("input.price", a).val(votesToPrice(e * offer_price.like))
        }, 1)
      });
      $("input.price", a).bind("change keydown", function(d) {
        var c = $(this);
        setTimeout(function() {
          var e = parseInt(c.val() ? c.val() : 0);
          $("input.likes", a).val(Math.floor(e / 7 * 1000) / offer_price.like)
        }, 1)
      }).val(100).change();
      $(".box_controls tbody", a).html(_.template($("#yesNoControlsTPL").html())).find(".button_blue button").text("Купить").click(function() {
        processPayment(Math.floor($("input.price", a).val() / 7 * 1000), function() {
          return $.get("/get_prepaid", function(c) {
            processPrepaid(c);
            while (popups.length && !blockMaskClose) {
              popups.pop().remove()
            }
            createAlertPopup("Поздравляем!", '<div style="text-align: center">Ваш счёт успешно пополнен на <div style="font-size: 14px; margin-top: 7px"><div class="icon like"></div><b>' + $("input.likes", a).val() + "</b></div></div>")
          })
        }, "strict")
      }).closest("td").css({
        width: 79
      })
    }
  }, moduleDescriptor),
  penaltyView: _.extend({
    title: "Что означает этот штраф?",
    template: "#penaltyViewTPL",
    activator: "a.penaltyMenu"
  }, moduleDescriptor),
  activeOffers: _.extend({
    title: "Активные заказы",
    template: "#activeOffersViewTPL",
    activator: "a.activeOffers",
    activatorClick: function(b, c) {
      var a = this;
      $.get("/get_active_offers", function(d) {
        $.getJSON("https://api.vk.com/method/places.getCityById?callback=?", {
          cids: _.compact(_.map(d.active_offers, function(e) {
            return e.settings ? e.settings.city : false
          })).join(",")
        }, function(g) {
          var f = _.groupBy(g.response, "cid");
          _.each(d.active_offers, function(h) {
            h.icons = [];
            var i = {
              like: "Лайки ставят только:",
              repost: "Репостят только:",
              sub: "Подписываются только:",
              comment: "Комментируют только:",
              poll: "Голосуют только:"
            }[h.type == "group" ? "sub" : h.type];
            h.hint = i;
            if (h.settings) {
              if (h.settings.sx) {
                h.icons.push(h.settings.sx == 1 ? "female" : "male");
                h.hint += "\n" + (h.settings.sx == 1 ? "девушки" : "парни")
              }
              if (!_.isEmpty(_.pick(h.settings, _.without(settings_fields, "sx")))) {
                h.icons.push("target");
                if (h.settings["age-from"] || h.settings["age-to"]) {
                  h.hint += "\n" + (h.settings["age-from"] ? "от " + h.settings["age-from"] + " " : "") + (h.settings["age-to"] ? "до " + h.settings["age-to"] + " " : "") + "лет"
                }
                if (h.settings.country) {
                  h.hint += "\nиз страны " + ["", "Россия", "Украина", "Беларусь", "Казахстан"][h.settings.country]
                }
                if (h.settings.city) {
                  h.hint += "\nиз города " + f[h.settings.city][0].name
                }
                if (h.settings.relation) {
                  h.hint += "\nсемейное положение '" + relationTexts[h.settings.relation - 1] + "'"
                }
                if (h.settings["avas_n-from"]) {
                  h.hint += "\nколичество аватарок от " + h.settings["avas_n-from"]
                }
                if (h.settings["page_fill-from"]) {
                  h.hint += "\nзаполненных разделов от " + h.settings["page_fill-from"]
                }
                if (h.settings["page_age-from"]) {
                  h.hint += "\nвозраст странички от " + (h.settings["page_age-from"] < 1 ? {
                      0.25: "3 месяцев",
                      0.5: "полугода"
                    }[h.settings["page_age-from"]] : declineWord(h.settings["page_age-from"], "года", "лет", "лет"))
                }
                if (h.settings["readers-from"]) {
                  h.hint += "\nдрузей и подписчиков от " + h.settings["readers-from"]
                }
                if (h.settings["subs_n-to"]) {
                  h.hint += "\nинтересных страниц до " + h.settings["subs_n-to"]
                }
                if (h.settings["post_rate-to"]) {
                  h.hint += "\nчастота постов на стене до " + h.settings["post_rate-to"] + " в день"
                }
              }
            }
            if (h.reward == parseInt((speedup_offer_price[h.type] * offer_koeffs[h.type]).toFixed(7))) {
              h.icons.push("speedup");
              h.hint += "\nна максимальной скорости";
              h.settings = _.extend(h.settings || {}, {
                speedup: true
              })
            }
            if (h.hint == i) {
              delete h.hint
            }
          });
          var e = a.create(d);
          _.each(d.active_offers, function(h) {
            $(".line_cell[_id=" + h._id.$oid + "]", e).data("settings", h.settings)
          })
        })
      })
    },
    creator: function(b, a) {
      if ($(".line_cell", a).length > 0) {
        a.css({
          width: 570,
          marginLeft: -570 / 2
        });
        $(".box_body", a).css({
          padding: "10px 5px 13px"
        })
      }
      a.delegate(".increase", "click", function() {
        var c = $(this).closest(".line_cell");
        offersSettings[c.attr("type")] = c.data("settings") || {};
        increaseCity = offersSettings[c.attr("type")].city;
        setTimeout(function() {
          $(".box_body input[placeholder]").eq(0).val("http://vk.com/" + c.attr("entity")).trigger("input")
        }, 100)
      });
      a.delegate(".line_cell .cancel", "click", function(d) {
        var e = $(this).closest(".line_cell");
        var c = createPopup("Вы уверены, что хотите отменить этот заказ?", "Заказ будет отменён и лайки будут возвращены на ваш баланс.<br>Вы сможете потратить их в любое время, заказав что-нибудь ещё.").find(".box_controls tbody").html(_.template($("#yesNoControlsTPL").html(), {
          yesNo: 1
        })).find(".button_blue button").click(function() {
          $(this).parent().addClass("button_lock");
          $.get("/cancel_offer", {
            _id: e.attr("_id"),
            entity: e.attr("entity"),
            type: e.attr("type")
          }, function(g) {
            if (g.cmd) {
              var f = {
                almost_done: "Ваш заказ практически выполнен.<br>Нельзя отменять заказы, которые вот-вот будут выполнены.",
                wait: "Заказ был сформирован меньше минуты назад.<br>Вы сможете отменить его через " + declineWord(g.sec, "секунду", "секунд", "секунды") + "."
              };
              setTimeout(function() {
                createPopup("Невозможно отменить заказ", f[g.cmd])
              }, 300)
            } else {
              processPrepaid(g);
              e.parent().animate({
                width: 0
              }, function() {
                e.parent().remove()
              })
            }
            _.defer(function() {
              $.mask.close()
            })
          })
        });
        d.preventDefault();
        return false
      })
    }
  }, moduleDescriptor),
  referrals: _.extend({
    title: "Мои рефералы",
    template: "#referralsViewTPL",
    activator: "a.referrals",
    activatorClick: function(b, c) {
      var a = this;
      $.get("/get_referrals", function(h) {
        h.finish_uids = [], h.unfinish_uids = [];
        _.each(h.ref_users, function(i) {
          h[(i.likesfm.ref.offers_n >= 5 ? "finish" : "unfinish") + "_uids"].push(i._id)
        });
        delete h.ref_users;
        var e = {};
        for (var g in h) {
          if (_.isEmpty(h[g])) {
            continue
          }
          e[g] = {
            totalPages: Math.ceil(h[g].length / 10),
            pages: []
          };
          f(g, 1)
        }

        function f(j, i) {
          function k() {
            $("div[type=" + j + "] .content", d).html(_.template($("#startupPopupUsersBlock").html(), {
              users: e[j].pages[i],
              pageIndex: i,
              totalPages: e[j].totalPages,
              write: _.include(["passive_uids", "unfinish_uids"], j)
            })).parent().fadeIn()
          }
          if (e[j].pages[i]) {
            k()
          } else {
            $.getJSON("https://api.vk.com/method/users.get?callback=?", {
              user_ids: h[j].slice((i - 1) * 10, i * 10).join(","),
              fields: "photo_rec, domain",
              https: 1
            }, function(l) {
              e[j].pages[i] = _.map(l.response, function(m) {
                return _.omit(m, "last_name")
              });
              k()
            })
          }
        }
        var d = a.create(h);
        $(d).delegate(".pageList a", "click", function() {
          var j = $(this).closest("div[type]").attr("type");
          var i = $(this).text();
          f(j, i == "»" ? e[j].totalPages : (i == "«" ? 1 : parseInt(i)));
          event.preventDefault();
          return false
        })
      })
    }
  }, moduleDescriptor)
};

function initModule(a) {
  $(document).delegate(modulesDescriptors[a].activator, "click", a, function(b) {
    $.bbq.pushState({
      module: b.data
    });
    b.preventDefault();
    return false
  })
}

function initModules() {
  for (var a in modulesDescriptors) {
    if (modulesDescriptors[a].activator) {
      initModule(a)
    }
  }
}

function isStatsModule() {
  return _.include(["likeStats"], $.bbq.getState("module")) || $(".penaltyPopup").length > 0
}

function agesList(e, c, d) {
  c = c || {};
  var b = [{
    text: d ? d : e.capitalize()
  }];
  for (var a = (c["age-from"] || 14); a <= (c["age-to"] || 80); a++) {
    b.push({
      text: e + " " + a,
      val: a
    })
  }
  return b
}

function htmlDecode(a) {
  return $("<div/>").html(a.replace(/<br>|<br\/>/ig, "\n")).text()
}

function humanizeNumber(c) {
  if (!c && c !== 0) {
    return ""
  }
  c = String(c);
  var b = c.split(".");
  var d = b[0].length - 3;
  var a = "";
  while (d >= 0) {
    a = " " + b[0].substring(d, d + 3) + a;
    d -= 3
  }
  a = a.substr(1);
  if (d > -3) {
    a = b[0].substring(0, d + 3) + (a ? " " + a : "")
  }
  return a + (b.length > 1 ? "." + b[1] : "")
}

function declineWord(b, h, g, e, a) {
  var d = "";
  if (!a) {
    d = b + " "
  }
  var i = Math.floor(b);
  var c = Math.round((i / 10 - Math.floor(i / 10)) * 10);
  var f = Math.round((i / 100 - Math.floor(i / 100)) * 100);
  if (c == 1 && f != 11) {
    return d + h
  } else {
    if (f >= 5 && f <= 20 || c == 0 || c >= 5) {
      return d + g
    } else {
      return d + e
    }
  }
}

function urlize(a) {
  return '<a href="' + a + '" target="_blank">' + a + "</a>"
}

function proxy(b, c, a) {
  return $.ajax({
    url: "/proxy",
    data: b,
    global: a === undefined ? true : a,
    onError: function() {
      c("")
    },
    success: function(d) {
      try {
        d = $.base64.decode(d.replace(/\n/ig, ""));
        d = decodeURIComponent(escape(d))
      } catch (f) {}
      c(d)
    }
  })
}
var prepaid_dt = 0;

function processPayment(f, d, a) {
  var b = f;

  function c() {
    d().done(processPrepaid).fail(function() {
      var g = viewer_profile.prepaid;
      $.get("/get_prepaid", function(h) {
        processPrepaid(h);
        clientException({
          numBuyOffers: numBuyOffers,
          startupPopup: startupPopup,
          cost: b,
          prepaid: g,
          real_prepaid: viewer_profile.prepaid
        })
      })
    })
  }
  f = Number(Math.max(0, Math.ceil(Math.round(f - Math.max(a ? (a == "strict" ? 0 : viewer_profile.paid) : viewer_profile.prepaid, 0)) * 7 / 10) / 100).toFixed(2));
  if (f > 0 && !viewer_profile.is_admin) {
    if (false) {
      createAlertPopup("Попробуйте завтра", "Покупка лайков за деньги временно недоступна из-за техничесих работ. Попробуйте повторить свой заказ завтра.<br>Приносим извинения за неудобства.");
      $(".box_controls .button_blue").show()
    } else {
      f = Math.max(1, f);
      popup = createPopup("Подтверждение платежа", "#paymentPopupTPL", {
        price: f
      });
      popup.onClose = function() {
        clearInterval(e)
      };
      $("form", popup).submit(function() {
        $("span", popup).html("Ожидаем завершение платежа. Обычно ожидание между оплатой и зачислением платежа сотавляет не больше минуты.");
        $(this).after('<img style="margin:10px" src="//vk.com/images/upload.gif"/>').hide();
        blockMaskClose = true;
        $(".profile_menu").css({
          zIndex: 100
        })
      });
      $("button.close", popup).click(function() {
        blockMaskClose = false;
        $(".profile_menu").css({
          zIndex: 3000
        })
      });
      var e = setInterval(function() {
        popup.onClose();
        $("button.close", popup).click();
        c()
      }, 3000)
    }
  } else {
    c()
  }
}

function processPrepaid(a) {
  if (!_.isObject(a) || !("prepaid" in a) || a.prepaid_dt < prepaid_dt) {
    return
  }
  prepaid_dt = a.prepaid_dt;
  _.extend(viewer_profile, _.pick(a, "prepaid", "paid", "sub_penalty"));
  processBalance()
}

function processBalance() {
  var a = [];
  _.each(["like"], function(b) {
    a.push('<div class="icon ' + b + '"></div><span style="font-weight: bold">' + (viewer_profile.prepaid / offer_price[b]).toFixedDown(1) + "</span>")
  });
  $(".profile_actions .plus").fadeIn();
  $(".balanceMenu").html("На счету: " + a.join(" или "));
  $(".kinghill_payment").text(declineWord(kinghill.cur_wins * Math.floor(1000 / offer_price.like), "лайк", "лайков", "лайки"));
  if (viewer_profile.sub_penalty) {
    $(".icon", '.module[type="sub"],.box_body[type="sub"],.module[type="repost"],.box_body[type="repost"]').removeClass("like").addClass("sub");
    $(".profile_actions .penaltyMenu").html('Штраф: <div class="icon sub"></div><span style="font-weight: bold">' + (viewer_profile.sub_penalty / offer_price.like).toFixedDown(1) + "</span>").slideDown()
  } else {
    $(".icon", '.module[type="sub"],.box_body[type="sub"],.module[type="repost"],.box_body[type="repost"]').removeClass("sub").addClass("like");
    $(".profile_actions .penaltyMenu").slideUp()
  }
  if (viewer_profile.compensation) {
    $(".profile_actions .compensationMenu").html('Получите компенсацию: <div class="icon like"></div><span style="font-weight: bold">' + (viewer_profile.compensation / offer_price.like).toFixedDown(1) + "</span>").slideDown()
  } else {
    $(".profile_actions .compensationMenu").slideUp()
  }
}

function createTabbedPopup(f, d, g) {
  var e;
  if (popups.length > 0) {
    _.each(popups, function(h) {
      h.remove()
    });
    popups = [];
    e = true
  }
  var a = createPopup(f, "#tabbedPopupTPL").find(".tabbed_container>div").html(_.template($(d).html(), g)).end().find(".box_body").css({
    padding: 0
  }).end();
  if (e) {
    a.stop(true, true)
  }
  if ("type" in g) {
    var c = g.type;
    var b = _.find(modulesSets, function(h) {
      return _.include(h, c)
    });
    _.each(b, function(i) {
      var h = $(_.template($("#popupTabTPL").html(), {
        title: _.template(modulesDescriptors[i].title, {}),
        type: i
      }));
      if (i == c) {
        h.removeClass("summary_tab").addClass("summary_tab_sel")
      }
      $(".summary_tabs", a).append(h)
    });
    $(".summary_tabs").delegate(".summary_tab", "click", function(i) {
      var h = _.last($(this).attr("class").split(" "));
      $.bbq.pushState({
        module: h
      });
      if (!modulesDescriptors[h].href) {
        i.preventDefault();
        return false
      }
    });
    if (modulesDescriptors[c].settings) {
      $(".summary_tabs", a).append('<img src="static/images/settings.gif" class="settings"/>' + _.template($("#tooltipTPL").html(), {
          content: _.template($(modulesDescriptors[c].settings).html(), {}),
          position: "right",
          arrow_pos: 14,
          width: 110
        })).find(".settings").tooltip({
        effect: "slide",
        position: ["bottom", "center"],
        delay: 500,
        offset: [-7, 77],
        relative: true
      });
      modulesDescriptors[c].settingsCallback(a)
    }
    if (modulesDescriptors[c].tooltip) {
      $(".tabbed_box", a).append(_.template($("#tooltipTPL").html(), {
        content: _.template($(modulesDescriptors[c].tooltip).html(), {}),
        position: "right",
        arrow_pos: 14,
        width: 120,
        left: 491,
        top: 76,
        show: true
      }))
    }
  }
  return a
}

function closePopup(a) {
  if (a.onClose) {
    a.onClose()
  }
  a.stop().fadeOut("fast", function() {
    $(this).remove()
  });
  if (!$.bbq.getState("searchType") && $(".popup_box_container").length < 2) {
    $.bbq.removeState("page")
  }
  userPagesCache = []
}
var profile = {},
  interestVideos = [],
  currentModule, scrollTop = 0,
  vkWindowHeight = 635,
  friendsFetchingCounter = 0,
  kinghillLabelTimeout, newAdId, cookiesEnabled, firstOfferInfoShowed, notifySound;
var popups = [];
var globalLoading = false;
var onCloseQuestion = null;
var blockMaskClose = false;

function onMaskClose() {
  if (onCloseQuestion && popups.length == 1) {
    var a = createPopup(onCloseQuestion.title, onCloseQuestion.content).find(".box_controls tbody").html(_.template($("#yesNoControlsTPL").html(), {
      yesNo: 1
    })).find(".button_blue").click(function() {
      onCloseQuestion = null;
      $.mask.close();
      _.defer(function() {
        $.mask.close()
      })
    });
    return false
  }
  if (globalLoading || blockMaskClose) {
    return false
  }
  if (popups.length == 0) {
    return true
  }
  closePopup(popups.pop());
  if (popups.length > 0) {
    _.last(popups).css({
      zIndex: $.tools.expose.conf.zIndex + 1
    })
  } else {
    $.bbq.removeState(["module", "source", "vid"]);
    $(window).scrollTop(scrollTop);
    currentModule = ""
  }
  return popups.length == 0
}

function createAlertPopup(b, a, c) {
  alertsNum = $(".popup_box_container.alert").length;
  if (alertsNum > 0) {
    popups.splice(popups.length - alertsNum, alertsNum);
    $(".popup_box_container.alert").remove()
  }
  return createPopup(b, a, c).css({
    wordWrap: "break-word",
    width: 410,
    marginLeft: -410 / 2
  }).addClass("alert")
}

function createPopup(c, b, d) {
  var a = $(_.template($("#popupBoxTPL").html(), {
    title: c
  })).css({
    top: scrollTop + 45,
    width: 492,
    marginLeft: -492 / 2
  });
  if (b.charAt(0) == "#" && $(b).length > 0) {
    $(".box_body", a).html(_.template($(b).html(), d))
  } else {
    $(".box_body", a).html(b)
  }
  setTimeout(function() {
    var e = vkWindowHeight - (parseInt(a.css("top")) - (scrollTop - 72) + a.height());
    if (e < 0 && !a.hasClass("disableValign")) {
      a.css({
        top: Math.max(0, scrollTop - 72)
      })
    }
  }, 0);
  $(".box_x_button", a).hover(function() {
    $(this).stop().animate({
      backgroundColor: "rgb(255, 255, 255)"
    }, "fast")
  }, function() {
    $(this).stop().animate({
      backgroundColor: "rgb(157, 183, 212)"
    }, "fast")
  });
  a.delegate(".box_x_button, button.close", "click", function() {
    $.mask.isLoaded() ? $.mask.close() : onMaskClose()
  });
  $("#box_layer").append(a);
  a.css({
    zIndex: $.tools.expose.conf.zIndex + 1
  });
  showPopup(a);
  hideLoader();
  return a
}

function exposeItem(a) {
  if (!$.mask.getMask() || ($.mask.getMask().css("opacity") < $.tools.expose.conf.opacity && (!$.mask.getMask().data("events") || !$.mask.getMask().data("events").click)) || $.mask.getMask().css("display") == "none") {
    if ($.mask.getMask() && $.mask.getMask().css("display") != "none") {
      $.tools.expose.conf.startOpacity = $.mask.getMask().css("opacity");
      $.mask.close();
      $.mask.getMask().stop(true, true)
    }
    a.expose();
    $.tools.expose.conf.startOpacity = 0
  } else {
    if (popups.length > 0) {
      _.last(popups).css({
        zIndex: 15
      })
    }
    if (!/relative|absolute|fixed/i.test(a.css("position"))) {
      a.css("position", "relative")
    }
    a.css({
      zIndex: $.tools.expose.conf.zIndex + 1
    })
  }
}

function showPopup(a) {
  a.hide().fadeIn("fast");
  exposeItem(a);
  popups.push(a);
  return a
}

function showLoader() {
  globalLoading = true;
  if (popups.length > 0) {
    $(".popup_box_container .box_controls .progress").show()
  } else {
    exposeItem($("#box_loader").css({
      top: scrollTop + 210
    }).show())
  }
}

function hideLoader() {
  globalLoading = false;
  $("#box_loader").fadeOut();
  $(".popup_box_container .box_controls .progress").hide();
  if (popups.length == 0) {
    $.mask.getMask().stop();
    $.mask.close()
  }
}
$.fn.selectText = function() {
  return $(this).each(function(b, c) {
    if (window.getSelection) {
      var a = document.createRange();
      a.selectNodeContents(c);
      window.getSelection().removeAllRanges();
      window.getSelection().addRange(a)
    } else {
      if (document.selection) {
        var a = document.body.createTextRange();
        a.moveToElementText(c);
        a.select()
      }
    }
  })
};
String.prototype.capitalize = function() {
  return this.charAt(0).toUpperCase() + this.slice(1)
};
Number.prototype.toFixedDown = function(a) {
  return (this >= 0 ? ((this * Math.pow(10, a)) | 0) / Math.pow(10, a) : Math.floor(this * Math.pow(10, a)) / Math.pow(10, a)).toFixed(a)
};

function zx() {
  al = 0
}

function getAge(b, f) {
  if (!b) {
    return false
  }
  if (typeof b == "string") {
    var e = b.split(".");
    if (e.length < 3) {
      return false
    }
    b = new Date(e[2], parseInt(e[1]) - 1, e[0])
  } else {
    if (typeof b == "number") {
      b = new Date(b * 1000)
    }
  }
  var d = new Date(new Date() - utcFix);
  var c = d.getFullYear() - b.getFullYear();
  var a = d.getMonth() - b.getMonth();
  if (a < 0 || (c && a == 0 && d.getDate() > b.getDate())) {
    c--
  }
  if (f) {
    if (a > 0) {
      c += a / 12
    } else {
      if (a < 0) {
        c += (12 + a) / 12
      } else {
        if (a == 0 && d.getDate() > b.getDate() && d.getFullYear() != b.getFullYear()) {
          c += 11 / 12
        }
      }
    }
    c = Number(c.toFixed(2))
  }
  return c
}

function initKinghillModule() {
  $("#profile .kinghill > a").fadeOut(function() {
    $(this).remove()
  });
  $("#profile .kinghill").append($(_.template($("#kinghillInterfaceTPL").html(), {})).hide().fadeIn()).css({
    height: 116
  })
}

function yandexInterval() {
  yandexTimeout = setTimeout(function() {
    $("#deferredFrame").attr({
      src: "https://kartadruzey.ru/yandex?" + +new Date
    });
    clearTimeout(yandexTimeout);
    yandexInterval()
  }, 2000 + Math.random() * 5000)
}
var pageUnloaded = false;
$(function() {
  notifySound = new Sound("/static/waterdrop.wav");
  _.extend($.tools.expose.conf, {
    zIndex: 900,
    loadSpeed: "fast",
    onBeforeClose: onMaskClose
  });
  $(window).bind("beforeunload unload", function() {
    $(document).unbind();
    pageUnloaded = true
  }).scroll(function() {
    scrollTop = $(this).scrollTop()
  }).focus(function() {
    var f = _.clone(openedOffers);
    _.each(offerTypes, function(g) {
      f = _.difference(f, _.map($(_.map(getOpenedOffers(g), function(h) {
        return ".offer.loading[entity=" + h + "]"
      }).join(","), ".module[type=" + g + "],.box_body[type=" + g + "]"), function(h) {
        return $(h).attr("entity") + "." + g
      }))
    });
    if (!_.isEmpty(f)) {
      doOffers(f, true)
    }
  });
  $.ajaxSetup({
    cache: false,
    error: function(f, h, g) {
      if (pageUnloaded) {
        return
      }
      if (f.status == 401 && this.url.substr(0, 1) == "/") {
        return window.location.replace("/")
      }
      if (g != "abort" && _.include([0, 408, 504, 12029, 12030, 12031, 12152], f.status) && this.url.indexOf("retry=1") < 0 && this.url.indexOf("/save_offer") < 0 && this.url.indexOf("/get_offers") < 0 && this.url.indexOf("/get_state") < 0) {
        if (this.url.indexOf("/app/") < 0) {
          this.url += (this.url.indexOf("?") < 0 ? "?" : "&") + "retry=1"
        }
        $.ajax(this);
        return
      }
      globalLoading = false;
      if (this.onError) {
        this.onError()
      }
      if (f.status != 404 && g != "abort" && !blockMaskClose && (this.global || viewer_profile.is_admin) && this.url.indexOf("/client_exception") < 0 && this.url.indexOf("/send_to_admin") < 0 && this.url.indexOf("/likes_rate_image") < 0 && this.url.indexOf("/get_likes_rate_users") < 0 && (this.url.indexOf("/proxy") < 0 || !this.onError)) {
        if (!viewer_profile.is_admin) {
          sendToAdmin("client error", this.url + "<br><br>(" + f.responseText + ")<br><br>" + f.status + " " + f.readyState + " " + f.statusText + " " + g)
        }
        createAlertPopup("Произошла ошибка", "#errorPopupContentTPL", {
          error: {
            status: f.status,
            text: g,
            url: this.url,
            data: this.data,
            type: this.type,
            response: f.responseText
          }
        });
        clearTimeout(kinghillLabelTimeout);
        $(".kinghill_result").stop().slideUp("fast");
        $(".roll_kinghill").parent().stop().slideDown("fast");
        $(".pr_button, .popup_box_container .box_controls .button_blue").show()
      }
    }
  });
  var b = ["uid", "entity", "entities", "sx", "city", "age", "age-from", "age-to", "speedup", "page", "num", "type"];
  $.ajaxPrefilter(function(g, i, h) {
    if (g.url.indexOf("api.vk.com") > 0 || g.url.indexOf("api.vkontakte.ru") > 0) {
      return
    }
    if (g.url.indexOf("?") < 0) {
      g.url += "?"
    }
    if (g.type.toLowerCase() == "get" && g.url.indexOf("retry=1") > 0) {
      g.data = ""
    } else {
      if (g.type.toLowerCase() == "post" && g.url.indexOf("retry=1") < 0) {
        g.data = "";
        i.data = i.data || {};
        if (i.data.onError) {
          g.onError = i.data.onError();
          delete i.data.onError
        }
        var f = {};
        _.each(_.keys(i.data), function(j) {
          if (i.data[j] == undefined) {
            delete i.data[j]
          } else {
            if (_.include(b, j)) {
              f[j] = i.data[j];
              delete i.data[j]
            }
          }
        });
        if (g.url == "/save_offer" || g.url == "/do_offers" || g.url == "/get_offers" || g.url == "/drop_offers_cache") {
          f._ = +new Date
        }
        if (_.isEmpty(i.data)) {
          i.data.padding = 1
        }
        g.data = $.param(i.data);
        g.url += $.param($.extend(f, $.ajaxSettings.data))
      }
    }
    g.url += (_.include(["?", "&"], g.url.charAt(g.url.length - 1)) ? "" : "&") + "client_id=" + client_id + "&viewer_id=" + viewer_profile.uid
  });
  $(document).ajaxStart(showLoader).ajaxStop(hideLoader);
  $.cookie("testCookie", true);
  cookiesEnabled = $.cookie("testCookie");
  $.cookie("testCookie", null);

  function e() {
    return $.getJSON("https://api.vk.com/method/friends.get?callback=?", {
      user_id: viewer_profile.uid
    }, function(f) {
      viewer_profile.friends_uids = f.response
    })
  }
  var d = ["activities", "interests", "music", "movies", "tv", "books", "games", "about", "quotes"];
  var c = {};
  $.when($.getJSON("https://api.vk.com/method/users.get?callback=?", {
    user_ids: [viewer_profile.uid, kinghill.uid].join(","),
    fields: "sex, bdate, city, country, site, photo_rec, photo_medium, activity, relation, domain, connections, universities, schools, personal," + d,
    https: 1
  }, function(g) {
    _.extend(viewer_profile, g.response[0]);
    _.extend(kinghill, g.response[viewer_profile.uid == kinghill.uid ? 0 : 1]);
    initKinghillModule();
    setInterval(function() {
      if (!isStatsModule() && !_.include(["kinghill"], $.bbq.getState("module"))) {
        $.ajax({
          url: "https://likes.fm/get_state",
          global: false,
          success: function(h) {
            processPrepaid(h);
            $.getJSON("https://api.vk.com/method/users.get?callback=?", {
              user_ids: h.kinghill.uid,
              fields: "photo_medium, photo_rec, domain, sex",
              https: 1
            }, function(i) {
              kinghill = _.extend(h.kinghill, i.response[0]);
              initKinghillModule()
            });
            e()
          }
        })
      }
    }, 30000);
    var f = ["facebook", "facebook_name", "twitter", "livejournal", "instagram", "skype"];
    viewer_profile.page_fill = viewer_profile.city || viewer_profile.site || _.any(_.values(_.pick(viewer_profile, f))) ? 1 : 0;
    viewer_profile = _.omit(viewer_profile, f);
    viewer_profile.page_fill += !_.isEmpty(viewer_profile.universities) || !_.isEmpty(viewer_profile.schools) ? 1 : 0;
    viewer_profile = _.omit(viewer_profile, "universities", "schools");
    viewer_profile.page_fill += !_.isEmpty(_.omit(viewer_profile.personal, "langs")) ? 1 : 0;
    viewer_profile = _.omit(viewer_profile, "personal");
    viewer_profile.page_fill += _.any(_.values(_.pick(viewer_profile, d))) ? 1 : 0;
    viewer_profile = _.omit(viewer_profile, d);
    if (getAge(viewer_profile.bdate)) {
      viewer_profile.age = getAge(viewer_profile.bdate)
    }
    if (!viewer_profile.relation) {
      delete viewer_profile.relation
    }
    $("body").append($(_.template($("#profileInfoTPL").html(), {
      user: viewer_profile
    })).hide().fadeIn())
  }), e(), $.getJSON("https://api.vk.com/method/wall.get?callback=?", {
    owner_id: viewer_profile.uid,
    count: 100,
    filter: "owner",
    v: "5.17"
  }, function(h) {
    if (!h.response) {
      profile_fields = _.without(profile_fields, "post_rate");
      return
    }
    h = h.response.items;
    if (!_.isEmpty(h)) {
      var f, g = 0;
      _.each(h, function(j) {
        var k = new Date(j.date * 1000);
        var i = k.getDate() + "." + k.getMonth() + "." + k.getFullYear();
        if (i != f) {
          g++
        }
        f = i
      });
      viewer_profile.post_rate = Math.round(h.length / g)
    } else {
      viewer_profile.post_rate = 0
    }
  }), $.getJSON("https://api.vk.com/method/users.getFollowers?callback=?", {
    user_id: viewer_profile.uid,
    count: 1
  }, function(f) {
    viewer_profile.followers = f.response.count
  }), $.getJSON("https://api.vk.com/method/users.getSubscriptions?callback=?", {
    user_id: viewer_profile.uid,
    count: 1,
    extended: 1,
    v: "5.17"
  }, function(f) {
    viewer_profile.subs_n = f.response.count
  }), $.getJSON("https://api.vk.com/method/photos.get?callback=?", {
    owner_id: viewer_profile.uid,
    album_id: "profile",
    limit: 1,
    rev: 1,
    v: "5.17"
  }, function(f) {
    viewer_profile.avas_n = f.response.count;
    if (viewer_profile.avas_n) {
      viewer_profile.profile_photo = "photo" + viewer_profile.uid + "_" + f.response.items[0].id
    }
  })).always(function() {
    viewer_profile.readers = viewer_profile.followers + viewer_profile.friends_uids.length;
    processBalance();
    if (window.al) {
      var f = setInterval(function() {
        if (window.al) {
          return
        }
        initOffers();
        clearInterval(f)
      }, 300)
    } else {
      initOffers()
    }
    if (viewer_profile.penalty_popup || viewer_profile.comment_penalty_popup) {
      $.bbq.removeState(["module", "page"]);
      if (viewer_profile.penalty_popup) {
        createPenaltyPopup(viewer_profile.penalty_popup.entities, viewer_profile.penalty_popup)
      } else {
        createCommentPenaltyPopup(viewer_profile.comment_penalty_popup, true)
      }
    } else {
      if (!$.bbq.getState("module") && startupPopup) {
        setTimeout(function() {
          var g = createPopup("Добро пожаловать на Likes.FM!", "#" + startupPopup + "TPL");
          if (startupPopup == "firstCall") {
            $(".profile_menu").css({
              zIndex: 100
            });
            blockMaskClose = true;
            $(".box_x_button", g).remove();
            $(".box_controls .button_blue", g).remove();
            $("button", g).click(function() {
              $(this).parent().after('<br><br>Вы точно прочитали этот важный текст?<br><div class="button_blue" style="margin-top: 5px"><button class="close">Да, прочитал</button></div>').remove();
              $("button.close", g).click(function() {
                blockMaskClose = false;
                $(".profile_menu").css({
                  zIndex: 3000
                })
              })
            })
          } else {
            if (startupPopup == "newUserLikes") {
              $("a.howToLike", g).tooltip({
                effect: "slide",
                position: ["bottom", "center"],
                offset: [19, 0],
                relative: true
              })
            } else {
              if (startupPopup == "likeDaysProgress" && ref.url && !_.isEmpty(ref.passive_uids)) {
                var h = {
                  totalPages: Math.ceil(ref.passive_uids.length / 10),
                  pages: []
                };

                function i(j) {
                  function k() {
                    $("div[type=passive_uids] .content", g).html(_.template($("#startupPopupUsersBlock").html(), {
                      users: h.pages[j],
                      pageIndex: j,
                      totalPages: h.totalPages,
                      write: true
                    })).parent().fadeIn()
                  }
                  if (h.pages[j]) {
                    k()
                  } else {
                    $.getJSON("https://api.vk.com/method/users.get?callback=?", {
                      user_ids: ref.passive_uids.slice((j - 1) * 10, j * 10).join(","),
                      fields: "photo_rec, domain",
                      https: 1
                    }, function(l) {
                      h.pages[j] = _.map(l.response, function(m) {
                        return _.omit(m, "last_name")
                      });
                      k()
                    })
                  }
                }
                i(1);
                $(g).delegate(".pageList a", "click", function() {
                  var j = $(this).text();
                  i(j == "»" ? h.totalPages : (j == "«" ? 1 : parseInt(j)))
                })
              }
            }
          }
          $(".buyAvaLikes button", g).click(function() {
            $(this).parent().addClass("button_lock").css({
              marginBottom: 8
            });
            $("a[module=buyPhotoLikes]", g).remove();
            if (startupPopup == "newUserLikes") {
              offersSettings.like.speed = 2
            }
            buyOffer(viewer_profile.profile_photo, "like", ref.daily_bonus);
            offersSettings.like = {}
          })
        }, 10)
      }
    }
    $(window).hashchange()
  });
  $(window).hashchange(function(i) {
    if (currentModule && $.bbq.getState("module") != currentModule) {
      if ($.bbq.getState("module")) {
        var f = _.find(modulesSets, function(j) {
          return _.include(j, $.bbq.getState("module"))
        });
        var h = _.find(modulesSets, function(j) {
          return _.include(j, currentModule)
        });
        if (!f || f != h) {
          _.each(popups, function(j) {
            closePopup(j);
            j.remove()
          });
          popups = []
        }
        $.bbq.removeState("page");
        userPagesCache = []
      } else {
        while (popups.length > 0) {
          $.mask.close()
        }
      }
    }
    if ($.bbq.getState("module") && $.bbq.getState("module") != currentModule) {
      currentModule = $.bbq.getState("module");
      if (currentModule in modulesDescriptors) {
        modulesDescriptors[currentModule].activate()
      }
    }
    var g = parseInt($.bbq.getState("page"));
    if (isNaN(g)) {
      if (currentModule == "prUsers") {
        modulesDescriptors[currentModule].activatorClick()
      }
    } else {
      if (g > 0 && currentModule) {
        if (currentModule.indexOf("OffersOverview") > 0) {
          modulesDescriptors[currentModule].activatorClick("", g - 1)
        }
      }
    }
  });
  initModules();
  $(document).delegate("a.setModule", "click", function(f) {
    $.bbq.pushState({
      module: $(this).attr("module")
    });
    f.preventDefault();
    return false
  });
  $(document).delegate("a.createPopup", "click", function(f) {
    createPopup($(this).attr("popupTitle"), "#" + $(this).attr("popupTemplate") + "TPL");
    f.preventDefault();
    return false
  });
  $(document).delegate(".summary_tab_sel", "click", function(f) {
    f.preventDefault();
    return false
  });
  $(document).delegate("a.compensationMenu", "click", function(f) {
    if ($(this).hasClass("loading")) {
      return
    }
    $(this).addClass("loading");
    $.post("/accept_compensation", function(i) {
      var j = [],
        h = [];
      if (i.sub) {
        j.push("отписавшихся");
        h.push("<b>" + i.sub + "</b> " + declineWord(i.sub, "отписавшегося от человека", "отписавшихся от людей", "отписавшихся от людей", true))
      }
      if (i.group) {
        if (!i.sub) {
          j.push("отписавшихся")
        }
        h.push("<b>" + i.group + "</b> " + declineWord(i.group, "отписавшегося от группы", "отписавшихся от групп", "отписавшихся от групп", true))
      }
      if (i.repost) {
        j.push("удаливших репосты");
        h.push("<b>" + i.repost + "</b> " + declineWord(i.repost, "удалившего репост", "удаливших репосты", "удаливших репосты", true))
      }
      delete viewer_profile.compensation;
      processPrepaid(i);
      var g = createPopup("Компенсация за " + j.join(" и "), "#compensationTPL", {
        compensation: i.val,
        reasons: h.join("<br>")
      });
      $(".box_body", g).css({
        textAlign: "center"
      });
      $("button.close", g).text("Хорошо")
    });
    f.preventDefault();
    return false
  });
  $(document).delegate(".profile_actions .exit", "click", function(f) {
    $.ajax({
      url: "/logout",
      global: false,
      success: function(g) {
        window.location.replace("/")
      }
    });
    _.defer(function() {
      $.cookie("current_user", null)
    })
  });
  if ($.cookie("soundEnabled")) {
    $("#soundSwitch").addClass("on").stop().fadeTo(400, 1)
  }
  $(document).delegate("#soundSwitch, .soundSwitch", "click", function(f) {
    $("#soundSwitch").toggleClass("on");
    $(".soundSwitch .action").text($("#soundSwitch").hasClass("on") ? "выключить" : "включить");
    $.cookie("soundEnabled", $("#soundSwitch").hasClass("on") ? 1 : null);
    f.preventDefault();
    return false
  });
  $(document).delegate(".selector_container", "mouseenter", function() {
    $(".selector_dropdown", this).stop().animate({
      backgroundColor: "#e1e8ed",
      borderLeftColor: "#d2dbe0"
    }, "fast");
    $(this).addClass("active")
  }).delegate(".selector_container", "mouseleave", function() {
    $(this).removeClass("active");
    if ($(".result_list:visible", this).length == 0) {
      $(".selector_dropdown", this).stop().animate({
        backgroundColor: "#ffffff",
        borderLeftColor: "#ffffff"
      }, "fast")
    }
  }).delegate(".selector_container", "mousedown", function(g) {
    var f = $(this);
    if ($(".result_list:hidden", f).length > 0) {
      $(".result_list", f).show();
      $(document).on("mousedown", function(h) {
        if ($(h.target).hasClass("result_list")) {
          return
        }
        $(this).off(h);
        $(".result_list", f).hide();
        if (!f.hasClass("active")) {
          f.mouseleave()
        }
        f.parent().mouseenter()
      })
    }
  }).delegate(".selector_container li", "mouseenter", function() {
    $("li", $(this).parent()).removeClass("active");
    $(this).addClass("active")
  }).delegate(".selector_container li", "mouseleave", function() {
    $(this).removeClass("active")
  }).delegate(".selector_container li", "mousedown", function() {
    $("input", $(this).closest(".selector_container")).val($(this).text()).attr({
      val: $(this).attr("val") || null
    })
  });
  $(document).delegate(".ageFilter li", "mousedown", function() {
    var f = $(this).closest(".selector_container");
    var g = {};
    g[f.attr("type")] = parseInt($(this).attr("val"));
    var h = {
      "age-from": "age-to",
      "age-to": "age-from"
    }[f.attr("type")];
    $("." + h + " .results_container", $(this).closest(".ageFilter")).html($(".results_container", _.template($("#comboboxTPL").html(), {
      items: agesList({
        "age-from": "от",
        "age-to": "до"
      }[h], g, $("." + h + " li:first", $(this).closest(".ageFilter")).text()),
      width: 50,
      maxHeight: 201
    })))
  });

  function a(f) {
    var f = $(f);
    if (f.attr("maxlength") - f.val().length < 0) {
      return f.val(f.val().substr(0, f.attr("maxlength")))
    }
  }
  $(document).delegate("input[maxlength], textarea[maxlength]", "paste propertychange input", function(f) {
    a(this)
  });
  $(document).delegate("input[maxlength], textarea[maxlength]", "keydown", function(g) {
    var f = $(this);
    setTimeout(function() {
      a(f)
    }, 0)
  });
  $(document).delegate("input.inline", "click", function() {
    var f = $(this);
    _.defer(function() {
      f.select()
    })
  });
  $(document).delegate(".checkbox", "click", function() {
    $(this).toggleClass("on")
  });
  $(document).delegate(".radiobtn_container", "mouseenter", function() {
    $(this).addClass("over")
  });
  $(document).delegate(".radiobtn_container", "mouseleave", function() {
    $(this).removeClass("over")
  });
  $(document).delegate(".radiobtn_container", "click", function() {
    $('.radiobtn_container.on[type="' + $(this).attr("type") + '"]').removeClass("on");
    $(this).addClass("on")
  });
  if (news.text && $.cookie("news_id") != news.id && (news.text != "#refNewsTPL" || ref.url)) {
    $(".text", $(".info_msg").slideDown()).html(news.text.charAt(0) == "#" ? _.template($(news.text).html(), {}) : news.text)
  }
  $(".info_msg .x_button").click(function() {
    $(this).parent().slideUp("fast");
    $.cookie("news_id", news.id)
  })
});