
  (function() {
    'use strict';
    var url = 'http://192.168.2.117:8081';
    $.toast.prototype.defaults.duration = 1000;
    var myApp = angular.module("myApp", ['ui.router', 'ui.router.state.events', 'infinite-scroll']);
    myApp.config(function($stateProvider, $urlRouterProvider, $httpProvider) {
      $httpProvider.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';
      $urlRouterProvider.otherwise('/');
      $httpProvider.interceptors.push('loginLoseEfficacy');
      $stateProvider.state("loadMore", {
        url: "/loadMore",
        templateUrl: "loadMore.html",
        controller: 'loadMoreCtr'
      }).state("address", {
        url: "/address",
        templateUrl: "address/address.view.html",
        controller: 'addressCtr'
      }).state("bill", {
        url: "/bill",
        templateUrl: "bill/bill.view.html",
        controller: 'billCtr',
        params: {id: ''}
      }).state("bindCard", {
        url: "/bindCard",
        templateUrl: "bindCard/bindCard.view.html",
        controller: 'bindCardCtr'
      }).state("blankPage", {
        url: "/",
        templateUrl: "blankPage/blankPage.view.html",
        controller: 'blankPageCtr'
      }).state("card", {
        url: "/card",
        templateUrl: "card/card.view.html",
        controller: 'cardCtr'
      }).state("chooseTake", {
        url: "/chooseTake",
        templateUrl: "chooseTake/chooseTake.view.html",
        controller: 'chooseTakeCtr',
        params: {id: ''}
      }).state("ensurePay", {
        url: "/ensurePay",
        templateUrl: "ensurePay/ensurePay.view.html",
        controller: 'ensurePayCtr',
        params: {id: ''}
      }).state("exchangeDetail", {
        url: "/exchangeDetail",
        templateUrl: "exchangeDetail/exchangeDetail.view.html",
        controller: 'exchangeDetailCtr',
        params: {id: ''}
      }).state("exchangeRecord", {
        url: "/exchangeRecord",
        templateUrl: "exchangeRecord/exchangeRecord.view.html",
        controller: 'exchangeRecordCtr'
      }).state("exchangeSuccess", {
        url: "/exchangeSuccess",
        templateUrl: "exchangeSuccess/exchangeSuccess.view.html",
        controller: 'exchangeSuccessCtr'
      }).state("expressGood", {
        url: "/expressGood",
        templateUrl: "expressGood/expressGood.view.html",
        controller: 'expressGoodCtr',
        params: {id: ''}
      }).state("goodDetail", {
        url: "/goodDetail/:id",
        templateUrl: "goodDetail/goodDetail.view.html",
        controller: 'goodDetailCtr'
      }).state("goodRedirect", {
        url: "/goodRedirect/:id",
        templateUrl: "goodRedirect/goodRedirect.view.html",
        controller: 'goodRedirectCtr'
      }).state("integration", {
        url: "/integration",
        templateUrl: "integration/integration.view.html",
        controller: 'integrationCtr'
      }).state("integrationDetail", {
        url: "/integrationDetail",
        templateUrl: "integrationDetail/integrationDetail.view.html",
        controller: 'integrationDetailCtr',
        params: {id: ''}
      }).state("main", {
        url: "/main",
        templateUrl: "main/main.view.html",
        controller: 'mainCtr'
      }).state("pay", {
        url: "/pay",
        templateUrl: "pay/pay.view.html",
        controller: 'payCtr',
        params: {id: ''}
      }).state("paySuccess", {
        url: "/paySuccess",
        templateUrl: "paySuccess/paySuccess.view.html",
        controller: 'paySuccessCtr'
      }).state("recommendCode", {
        url: "/recommendCode",
        templateUrl: "recommendCode/recommendCode.view.html",
        controller: 'recommendCodeCtr'
      }).state("recommendMember", {
        url: "/recommendMember",
        templateUrl: "recommendMember/recommendMember.view.html",
        controller: 'recommendMemberCtr'
      }).state("rule", {
        url: "/rule",
        templateUrl: "rule/rule.view.html",
        controller: 'ruleCtr'
      }).state("shop", {
        url: "/shop",
        templateUrl: "shop/shop.view.html",
        controller: 'shopCtr'
      }).state("shopDetail", {
        url: "/shopDetail/:id",
        templateUrl: "shopDetail/shopDetail.view.html",
        controller: 'shopDetailCtr'
      }).state("takeGood", {
        url: "/takeGood",
        templateUrl: "takeGood/takeGood.view.html",
        controller: 'takeGoodCtr',
        params: {args: ''}
      }).state("verifyPhone", {
        url: "/verifyPhone",
        templateUrl: "verifyPhone/verifyPhone.view.html",
        controller: 'verifyPhoneCtr'
      }).state("verifySuccess", {
        url: "/verifySuccess",
        templateUrl: "verifySuccess/verifySuccess.view.html",
        controller: 'verifySuccessCtr'
      }).state("wallet", {
        url: "/wallet",
        templateUrl: "wallet/wallet.view.html",
        controller: 'walletCtr'
      });
    });
    myApp.controller('indexCtr', ['$scope', 'locals', '$state', '$http', '$timeout', function($scope, locals, $state, $http, $timeout) {}]);
    myApp.controller('loadMoreCtr', ['$scope', 'locals', '$state', '$http', '$timeout', function($scope, locals, $state, $http, $timeout) {
      var num = 5;
      var currentNum = 0;
      $scope.loadMoreLine = function() {
        $scope.stop = false;
        if (currentNum <= num) {
          console.log('loadMore');
          $('.newAppend').append("<p>jdska</p><p>jdska</p><p>jdska</p><p>jdska</p><p>jdska</p><p>jdska</p>");
          currentNum++;
          if (currentNum === 2) {
            $scope.stop = true;
          }
          console.log($scope.stop);
        }
      };
    }]);
    myApp.controller('addressCtr', ['$scope', 'locals', '$state', '$http', '$timeout', function($scope, locals, $state, $http, $timeout) {
      document.body.style.backgroundColor = '#eeeeee';
      var token = locals.get("token");
      $http.get(url + '/api/addr/find', {headers: {"TOKEN": token}}).then(function(res) {
        console.log(res.data);
        if (res.data.info == 1) {
          $scope.addresses = res.data.parms.addresses;
          if (res.data.parms.addresses.length == 0) {
            $scope.hasAddress = 0;
          } else if (res.data.parms.addresses.length > 0) {
            $scope.hasAddress = 1;
          }
          console.log($scope.addresses);
          console.log($scope.hasAddress);
        }
      });
      $scope.saveAddress = function() {
        console.log($scope.addresses.length);
        if (!$scope.name) {
          $.toast("缺少名称", "forbidden");
        } else if (!$scope.phone) {
          $.toast("缺少手机号", "forbidden");
        } else if ($scope.phone.length != 11) {
          $.toast("手机号错误", "forbidden");
        } else if (!$scope.addr) {
          $.toast("缺少详细地址", "forbidden");
        } else {
          if ($scope.addresses.length > 0) {
            var mainAddress = $("#city-picker").val().split(' ');
            console.log(mainAddress);
            console.log(mainAddress[0]);
            console.log($scope.name);
            console.log($scope.phone);
            console.log($scope.addr);
            $http.post(url + '/api/addr/ud', {
              id: $scope.addresses[0].id,
              addr: $scope.addr,
              name: $scope.name,
              phone: $scope.phone,
              country: '中国',
              province: mainAddress[0],
              city: mainAddress[1],
              district: mainAddress[2]
            }, {headers: {"TOKEN": token}}).then(function(res) {
              console.log(res.data);
              if (res.data.info == 1) {
                $state.reload();
              } else {
                $.toast("信息填写有误", "forbidden");
              }
            });
          } else if ($scope.addresses.length == 0) {
            var mainAddress$__2 = $("#city-picker").val().split(' ');
            console.log(mainAddress$__2);
            console.log(mainAddress$__2[0]);
            console.log($scope.name);
            console.log($scope.phone);
            console.log($scope.addr);
            $http.post(url + '/api/addr/add', {
              addr: $scope.addr,
              name: $scope.name,
              phone: $scope.phone,
              country: '中国',
              province: mainAddress$__2[0],
              city: mainAddress$__2[1],
              district: mainAddress$__2[2]
            }, {headers: {"TOKEN": token}}).then(function(res) {
              console.log(res.data);
              if (res.data.info == 1) {
                $state.reload();
              } else {
                $.toast("信息填写有误", "forbidden");
              }
            });
          }
        }
      };
      $scope.toAdd = function() {
        $scope.hasAddress = 0;
        console.log(111);
      };
      $("#city-picker").cityPicker({title: "请选择收货地址"});
    }]);
    myApp.controller('billCtr', ['$scope', 'locals', '$state', '$http', '$timeout', '$stateParams', function($scope, locals, $state, $http, $timeout, $stateParams) {
      document.body.style.backgroundColor = '#eeeeee';
      var token = locals.get("token");
      var params = $stateParams;
      console.log(params);
      $http.get(url + '/api/record/findpr/' + params.id, {headers: {"TOKEN": token}}).then(function(res) {
        console.log(res.data);
        $scope.record = res.data.parms;
      });
    }]);
    myApp.controller('bindCardCtr', ['$scope', 'locals', '$state', '$http', '$timeout', function($scope, locals, $state, $http, $timeout) {
      var token = locals.get("token");
      document.body.style.backgroundColor = '#eeeeee';
      console.log($("#weuiAgree").is(':checked'));
      $scope.toVerify = function() {
        console.log($("#weuiAgree").is(':checked'));
        if (!$scope.realName) {
          $.toast("缺少姓名", "forbidden");
        } else if (!$scope.phone) {
          $.toast("缺少手机号", "forbidden");
        } else if ($scope.phone.length != 11) {
          $.toast("手机号错误", "forbidden");
        } else if (!$scope.num) {
          $.toast("缺少银行卡号", "forbidden");
        } else if (!$("#weuiAgree").is(':checked')) {
          $.toast("请同意条款", "forbidden");
        } else {
          $http.post(url + '/api/pocket/addBrankCard', {
            brankType: 0,
            num: $scope.num,
            phone: $scope.phone,
            realName: $scope.realName
          }, {headers: {"TOKEN": token}}).then(function(res) {
            console.log(res.data);
            if (res.data.info == 1) {
              $state.go("verifySuccess");
            } else {
              $.toast("信息有误", "forbidden");
            }
          });
        }
      };
    }]);
    myApp.controller('cardCtr', ['$scope', 'locals', '$state', '$http', '$timeout', function($scope, locals, $state, $http, $timeout) {
      document.body.style.backgroundColor = '#ffffff';
      var token = locals.get("token");
      $http.get(url + '/api/pocket/findbrank', {headers: {"TOKEN": token}}).then(function(res) {
        console.log(res.data);
        $scope.info = res.data.info;
        console.log($scope.info);
        $scope.brankCard = res.data.parms.brankCard;
        $scope.cardNum = res.data.parms.brankCard.num.substring(res.data.parms.brankCard.num.length - 4);
        console.log($scope.cardNum);
      });
      $scope.newCard = function() {
        $state.go("bindCard");
      };
    }]);
    myApp.controller('chooseTakeCtr', ['$scope', 'locals', '$state', '$http', '$timeout', '$stateParams', function($scope, locals, $state, $http, $timeout, $stateParams) {
      document.body.style.backgroundColor = '#eeeeee';
      var token = locals.get("token");
      var params = $stateParams;
      if (params.id) {
        locals.set("goodDetailId", params.id);
        $scope.id = params.id;
      } else {
        $scope.id = locals.get("goodDetailId");
      }
      console.log(params);
      $scope.currentPage = 2;
      $scope.longitude = locals.get("longitude");
      $scope.latitude = locals.get("latitude");
      $http.get(url + '/api/shop/findLocation2/true?longitude=' + $scope.longitude + '&latitude=' + $scope.latitude, {headers: {"TOKEN": token}}).then(function(res) {
        console.log(res.data);
        $scope.shops = res.data.parms.shops;
        if (res.data.parms.shops.length == 0) {
          $scope.nearby = 0;
        } else {
          $scope.nearby = 1;
        }
      });
      $http.get(url + '/api/addr/find', {headers: {"TOKEN": token}}).then(function(res) {
        console.log(res.data);
        if (res.data.info == 1) {
          $scope.addresses = res.data.parms.addresses;
          if (res.data.parms.addresses.length == 0) {} else if (res.data.parms.addresses.length > 0) {
            $scope.name = res.data.parms.addresses[0].name;
            $scope.phone = res.data.parms.addresses[0].phone;
          }
          console.log($scope.addresses);
        }
      });
      $scope.takeShop = function(shop, $event) {
        console.log(shop);
        if (!$scope.name) {
          $.toast("缺少姓名", "forbidden");
        } else if (!$scope.phone) {
          $.toast("缺少手机号", "forbidden");
        } else if ($scope.phone.length != 11) {
          $.toast("手机号错误", "forbidden");
        } else {
          $state.go("takeGood", {args: {
              id: $scope.id,
              province: shop.province,
              city: shop.city,
              district: shop.district,
              addr: shop.addr,
              shopId: shop.id,
              username: shop.username,
              phone: $scope.phone,
              name: $scope.name
            }});
        }
      };
      $("#city-picker").cityPicker({
        title: '请选择城市',
        showDistrict: false,
        onClose: function() {
          $scope.nearby = 2;
          console.log($("#city-picker").val().split(" "));
          var address = $("#city-picker").val().split(" ");
          $scope.province = address[0];
          $scope.city = address[1];
          $http.get(url + '/api/shop/getPickShop/' + $scope.province + '/' + $scope.city + '?page=1&size=10', {headers: {"TOKEN": token}}).then(function(res) {
            console.log(res.data);
            $scope.maxSize = res.data.parms.maxSize;
            $scope.shops = res.data.parms.shops;
          });
        }
      });
      $scope.loadMore = function() {
        $scope.stop = true;
        $http.get(url + '/api/shop/getPickShop/' + $scope.province + '/' + $scope.city + '?page=' + $scope.currentPage + '&size=10', {headers: {"TOKEN": token}}).then(function(res) {
          console.log(res.data);
          if (res.data.info == 1 && res.data.parms.shops.length > 0) {
            $scope.shops = $scope.shops.concat(res.data.parms.shops);
            $scope.currentPage++;
            console.log($scope.curtentPage);
            $scope.stop = false;
          }
        });
      };
    }]);
    myApp.controller('blankPageCtr', ['$scope', 'locals', '$state', '$http', '$timeout', '$window', function($scope, locals, $state, $http, $timeout, $window) {
      document.body.style.backgroundColor = '#ffffff';
      var token = getQueryString("token");
      if (!token) {
        $.alert({text: '系统异常'});
      } else if (token) {
        locals.set("token", token);
        $window.location.href = "http://localhost:8083/cookingEasy/trunk/index.html#/main";
      }
      function getQueryString(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);
        if (r != null)
          return unescape(r[2]);
        return null;
      }
    }]);
    myApp.controller('ensurePayCtr', ['$scope', 'locals', '$state', '$http', '$window', '$timeout', '$stateParams', function($scope, locals, $state, $http, $timeout, $stateParams, $window) {
      document.body.style.backgroundColor = '#ffffff';
      var token = locals.get("token");
      var params = $stateParams;
      $scope.newOrderId = locals.get("newOrderId");
      $http.get(url + '/api/order/find/' + $scope.newOrderId, {headers: {"TOKEN": token}}).then(function(res) {
        console.log(res.data);
        $scope.parms = res.data.parms;
      });
      $scope.payNow = function() {
        console.log($("#x12").is(':checked'));
        console.log($("#x11").is(':checked'));
        if ($("#x12").is(':checked')) {
          console.log('农行支付');
          $http.post(url + '/api/abc/pay/' + $scope.newOrderId, {}, {headers: {"TOKEN": token}}).then(function(res) {
            console.log(res.data);
            return res.data;
          }).then(function(res) {
            console.log(res.parms.url);
            window.location.href = res.parms.url;
          });
        } else if ($("#x11").is(':checked')) {
          console.log('微信支付');
          $http.post(url + '/api/pay/wxPayP/' + $scope.newOrderId, {}, {headers: {"TOKEN": token}}).then(function(res) {
            console.log(res.data);
            $scope.pay = res.data.parms;
            WeixinJSBridge.invoke('getBrandWCPayRequest', {
              "appId": $scope.pay.appId,
              "timeStamp": $scope.pay.timeStamp,
              "nonceStr": $scope.pay.nonceStr,
              "package": $scope.pay.package,
              "signType": $scope.pay.signType,
              "paySign": $scope.pay.paySign
            }, function(res) {
              console.log(res);
              alert(res.err_msg);
              if (res.err_msg == "get_brand_wcpay_request:ok") {}
            });
          });
        }
      };
    }]);
    myApp.controller('exchangeDetailCtr', ['$scope', 'locals', '$state', '$http', '$timeout', '$stateParams', function($scope, locals, $state, $http, $timeout, $stateParams) {
      document.body.style.backgroundColor = '#eeeeee';
      var token = locals.get("token");
      var params = $stateParams;
      console.log(params);
      $http.get(url + '/api/order/find/' + params.id, {headers: {"TOKEN": token}}).then(function(res) {
        console.log(res.data);
        if (res.data.info == 1) {
          $scope.parms = res.data.parms;
        }
      });
      $scope.confirmGood = function() {
        $http.post(url + '/api/order/sure/' + params.id, {}, {headers: {"TOKEN": token}}).then(function(res) {
          console.log(res.data);
          if (res.data.info == 1) {
            $.alert({text: '确认成功！'});
            $state.reload();
          }
        });
      };
      $(".toPage1").click(function() {
        $(".page1").show();
        $(".page2").hide();
        $(".page3").hide();
        $(".weui-navbar").children().removeClass("weui-bar__item_on1");
        $(this).addClass("weui-bar__item_on1");
      });
      $(".toPage2").click(function() {
        $(".page1").hide();
        $(".page2").show();
        $(".page3").hide();
        $(".weui-navbar").children().removeClass("weui-bar__item_on1");
        $(this).addClass("weui-bar__item_on1");
      });
      $(".toPage3").click(function() {
        $(".page1").hide();
        $(".page2").hide();
        $(".page3").show();
        $(".weui-navbar").children().removeClass("weui-bar__item_on1");
        $(this).addClass("weui-bar__item_on1");
      });
    }]);
    myApp.controller('exchangeRecordCtr', ['$scope', 'locals', '$state', '$http', '$timeout', function($scope, locals, $state, $http, $timeout) {
      document.body.style.backgroundColor = '#ffffff';
      var token = locals.get("token");
      $scope.curtentPage = 2;
      $http.get(url + '/api/order/findAllui?page=1&size=10', {headers: {"TOKEN": token}}).then(function(res) {
        console.log(res.data);
        if (res.data.info == 1) {
          $scope.orders = res.data.parms.orders;
        }
      });
      $scope.loadMore = function() {
        $scope.stop = true;
        $http.get(url + '/api/order/findAllui?page=' + $scope.curtentPage + '&size=10', {headers: {"TOKEN": token}}).then(function(res) {
          console.log(res.data);
          console.log(res.data.parms.orders.length);
          if (res.data.info == 1 && res.data.parms.orders.length > 0) {
            $scope.orders = $scope.orders.concat(res.data.parms.orders);
            $scope.curtentPage++;
            console.log($scope.curtentPage);
            $scope.stop = false;
          }
        });
      };
    }]);
    myApp.controller('exchangeSuccessCtr', ['$scope', 'locals', '$state', '$http', '$timeout', function($scope, locals, $state, $http, $timeout) {
      document.body.style.backgroundColor = '#ffffff';
      var token = locals.get("token");
      $scope.ExOrderId = locals.get("ExOrderId");
      $http.get(url + '/api/order/find/' + $scope.ExOrderId, {headers: {"TOKEN": token}}).then(function(res) {
        console.log(res.data);
        $scope.parms = res.data.parms;
      });
    }]);
    myApp.controller('expressGoodCtr', ['$scope', 'locals', '$state', '$http', '$timeout', '$stateParams', function($scope, locals, $state, $http, $timeout, $stateParams) {
      document.body.style.backgroundColor = '#eeeeee';
      console.log($stateParams);
      var params = $stateParams;
      if (params.id) {
        locals.set("goodDetailId", params.id);
        $scope.id = params.id;
      } else {
        $scope.id = locals.get("goodDetailId");
      }
      var token = locals.get("token");
      $http.get(url + '/api/addr/find', {headers: {"TOKEN": token}}).then(function(res) {
        console.log(res.data);
        if (res.data.info == 1) {
          $scope.addresses = res.data.parms.addresses;
          if (res.data.parms.addresses.length == 0) {
            $scope.hasAddress = 0;
          } else if (res.data.parms.addresses.length > 0) {
            $scope.hasAddress = 1;
          }
          console.log($scope.addresses);
          console.log($scope.hasAddress);
        }
      });
      $http.get(url + '/api/integral/find/' + $scope.id, {headers: {"TOKEN": token}}).then(function(res) {
        console.log(res.data);
        if (res.data.info == 1) {
          $scope.integralGood = res.data.parms.integralGood;
          console.log($scope.integralGood);
        }
      });
      $(".toPage1").click(function() {
        $(".page1").show();
        $(".page2").hide();
        $(".page3").hide();
        $(".weui-navbar").children().removeClass("weui-bar__item_on1");
        $(this).addClass("weui-bar__item_on1");
      });
      $(".toPage2").click(function() {
        $(".page1").hide();
        $(".page2").show();
        $(".page3").hide();
        $(".weui-navbar").children().removeClass("weui-bar__item_on1");
        $(this).addClass("weui-bar__item_on1");
      });
      $(".toPage3").click(function() {
        $(".page1").hide();
        $(".page2").hide();
        $(".page3").show();
        $(".weui-navbar").children().removeClass("weui-bar__item_on1");
        $(this).addClass("weui-bar__item_on1");
      });
      $("#toExchange").click(function() {
        if ($scope.hasAddress == 0) {
          $.toast("缺少配送地址", "forbidden");
        } else {
          weui.confirm('兑换该商品将扣除' + $scope.integralGood.integral + '积分，另需支付' + $scope.integralGood.price / 100 + '元，点击确定继续', {
            title: '确定兑换？',
            buttons: [{
              label: '取消',
              type: 'default',
              onClick: function() {
                console.log('no');
              }
            }, {
              label: '确定',
              type: 'primary',
              onClick: function() {
                $http.post(url + '/api/order/newOrder0/' + $scope.integralGood.id, {
                  name: $scope.addresses[0].name,
                  phone: $scope.addresses[0].phone,
                  province: $scope.addresses[0].province,
                  city: $scope.addresses[0].city,
                  district: $scope.addresses[0].district,
                  addr: $scope.addresses[0].addr
                }, {headers: {"TOKEN": token}}).then(function(res) {
                  console.log(res.data);
                  if (res.data.info == 1) {
                    $scope.ExOrderId = res.data.parms.id;
                    locals.set("ExOrderId", res.data.parms.id);
                    window.location.href = 'http://www.cookingeasy.cn/user/exchange.html';
                  }
                });
              }
            }]
          });
        }
      });
      $(".payPic").click(function() {
        $(".mask").hide();
      });
    }]);
    myApp.controller('goodDetailCtr', ['$scope', 'locals', '$state', '$http', '$timeout', '$stateParams', function($scope, locals, $state, $http, $timeout, $stateParams) {
      document.body.style.backgroundColor = '#eeeeee';
      var token1 = getQueryString("token");
      if (token1) {
        locals.set("token", token1);
      }
      console.log($stateParams);
      var params = $stateParams;
      if (params.id) {
        locals.set("goodDetailId", params.id);
        $scope.id = params.id;
      } else {
        $scope.id = locals.get("goodDetailId");
      }
      wx.ready(function() {
        wx.onMenuShareAppMessage({
          title: '易德菜',
          desc: '这商品超赞的，你也来看看吧！',
          link: 'http://www.cookingeasy.cn/user/index.html#/goodRedirect/' + $scope.id,
          imgUrl: 'http://www.cookingeasy.cn/images/good/' + $scope.id + '/logo.jpg',
          type: '',
          dataUrl: '',
          success: function() {
            console.log(111);
          },
          cancel: function() {}
        });
      });
      var token = locals.get("token");
      $http.get(url + '/api/addr/find', {headers: {"TOKEN": token}}).then(function(res) {
        console.log(res.data);
        if (res.data.info == 1) {
          $scope.addresses = res.data.parms.addresses;
          if (res.data.parms.addresses.length == 0) {
            $scope.hasAddress = 0;
          } else if (res.data.parms.addresses.length > 0) {
            $scope.hasAddress = 1;
          }
          console.log($scope.addresses);
          console.log($scope.hasAddress);
        }
      });
      $http.get(url + '/api/integral/find/' + $scope.id, {headers: {"TOKEN": token}}).then(function(res) {
        console.log(res.data);
        if (res.data.info == 1) {
          $scope.integralGood = res.data.parms.integralGood;
          console.log($scope.integralGood);
        }
      });
      $(".toPage1").click(function() {
        $(".page1").show();
        $(".page2").hide();
        $(".page3").hide();
        $(".weui-navbar").children().removeClass("weui-bar__item_on1");
        $(this).addClass("weui-bar__item_on1");
      });
      $(".toPage2").click(function() {
        $(".page1").hide();
        $(".page2").show();
        $(".page3").hide();
        $(".weui-navbar").children().removeClass("weui-bar__item_on1");
        $(this).addClass("weui-bar__item_on1");
      });
      $(".toPage3").click(function() {
        $(".page1").hide();
        $(".page2").hide();
        $(".page3").show();
        $(".weui-navbar").children().removeClass("weui-bar__item_on1");
        $(this).addClass("weui-bar__item_on1");
      });
      $("#toExchange").click(function() {
        if ($scope.hasAddress == 0) {
          $.toast("缺少配送地址", "forbidden");
        } else {
          weui.confirm('兑换该商品将扣除' + $scope.integralGood.integral + '积分，另需支付' + $scope.integralGood.price / 100 + '元，点击确定继续', {
            title: '确定兑换？',
            buttons: [{
              label: '取消',
              type: 'default',
              onClick: function() {
                console.log('no');
              }
            }, {
              label: '确定',
              type: 'primary',
              onClick: function() {
                $http.post(url + '/api/order/newOrder0/' + $scope.integralGood.id, {
                  name: $scope.addresses[0].name,
                  phone: $scope.addresses[0].phone,
                  province: $scope.addresses[0].province,
                  city: $scope.addresses[0].city,
                  district: $scope.addresses[0].district,
                  addr: $scope.addresses[0].addr
                }, {headers: {"TOKEN": token}}).then(function(res) {
                  console.log(res.data);
                  if (res.data.info == 1) {
                    $scope.ExOrderId = res.data.parms.id;
                    locals.set("ExOrderId", res.data.parms.id);
                    window.location.href = 'http://www.cookingeasy.cn/user/exchange.html';
                  }
                });
              }
            }]
          });
        }
      });
      $(".payPic").click(function() {
        $(".mask").hide();
      });
      $scope.toShop = function() {
        $state.go("shop");
      };
      function getQueryString(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);
        if (r != null)
          return unescape(r[2]);
        return null;
      }
    }]);
    myApp.controller('goodRedirectCtr', ['$scope', 'locals', '$state', '$http', '$timeout', '$window', '$stateParams', function($scope, locals, $state, $http, $timeout, $window, $stateParams) {
      document.body.style.backgroundColor = '#ffffff';
      console.log($stateParams);
      var params = $stateParams;
      var goodId = params.id;
      window.location.href = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx2d63fca66c12d30a&redirect_uri=https%3a%2f%2fwww.cookingeasy.cn%2fapi%2fpc%2frelate5&response_type=code&scope=snsapi_userinfo&state=" + goodId + "#wechat_redirect";
      function getQueryString(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);
        if (r != null)
          return unescape(r[2]);
        return null;
      }
    }]);
    myApp.controller('integrationCtr', ['$scope', 'locals', '$state', '$http', '$timeout', function($scope, locals, $state, $http, $timeout) {
      document.body.style.backgroundColor = '#eeeeee';
      var token = locals.get("token");
      $scope.curtentPage = 2;
      $http.get(url + '/api/pocket/find', {headers: {"TOKEN": token}}).then(function(res) {
        console.log(res.data);
        $scope.pocket = res.data.parms.pocket;
      });
      $http.get(url + '/api/record/findAllir?page=1&size=10', {headers: {"TOKEN": token}}).then(function(res) {
        console.log(res.data);
        if (res.data.info == 1) {
          $scope.integralRecords = res.data.parms.integralRecords;
        }
      });
      $scope.loadMore = function() {
        $scope.stop = true;
        $http.get(url + '/api/record/findAllir?page=' + $scope.curtentPage + '&size=10', {headers: {"TOKEN": token}}).then(function(res) {
          console.log(res.data);
          console.log(res.data.parms.integralRecords.length);
          if (res.data.info == 1 && res.data.parms.integralRecords.length > 0) {
            $scope.integralRecords = $scope.integralRecords.concat(res.data.parms.integralRecords);
            $scope.curtentPage++;
            console.log($scope.curtentPage);
            $scope.stop = false;
          }
        });
      };
    }]);
    myApp.controller('integrationDetailCtr', ['$scope', 'locals', '$state', '$http', '$timeout', '$stateParams', function($scope, locals, $state, $http, $timeout, $stateParams) {
      document.body.style.backgroundColor = '#eeeeee';
      var token = locals.get("token");
      var params = $stateParams;
      console.log(params);
      $http.get(url + '/api/record/findir/' + params.id, {headers: {"TOKEN": token}}).then(function(res) {
        console.log(res.data);
        $scope.record = res.data.parms;
      });
    }]);
    myApp.controller('mainCtr', ['$scope', 'locals', '$state', '$http', '$timeout', function($scope, locals, $state, $http, $timeout) {
      document.body.style.backgroundColor = '#eeeeee';
      var token = locals.get("token");
      $http.get(url + '/api/record/findIncome', {headers: {"TOKEN": token}}).then(function(res) {
        console.log(res.data);
        $scope.sum = res.data.parms.sum ? res.data.parms.sum : 0;
        $scope.today = res.data.parms.today ? res.data.parms.today : 0;
        console.log($scope.sum);
        console.log($scope.today);
      });
      $http.get(url + '/api/pc/getJS?url=http://www.cookingeasy.cn/user/index.html', {headers: {"TOKEN": token}}).then(function(res) {
        console.log(res.data);
        var appdId = res.data.parms.appId;
        var noncestr = res.data.parms.noncestr;
        var signature = res.data.parms.signature;
        var timestamp = res.data.parms.timestamp;
        locals.set("appdId", appdId);
        locals.set("noncestr", noncestr);
        locals.set("signature", signature);
        locals.set("timestamp", timestamp);
        wx.config({
          debug: false,
          appId: appdId,
          timestamp: timestamp,
          nonceStr: noncestr,
          signature: signature,
          jsApiList: ['getLocation', 'scanQRCode', 'chooseWXPay', 'onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareWeibo', 'onMenuShareQZone']
        });
        wx.ready(function() {
          console.log(222);
          wx.getLocation({
            type: 'wgs84',
            success: function(res) {
              console.log(res);
              var latitude = res.latitude;
              var longitude = res.longitude;
              console.log(latitude);
              console.log(longitude);
              $scope.latitude = res.latitude;
              $scope.longitude = res.longitude;
              locals.set("latitude", res.latitude);
              locals.set("longitude", res.longitude);
              var speed = res.speed;
              var accuracy = res.accuracy;
              console.log($scope.latitude);
              console.log($scope.longitude);
              $http.get(url + '/api/shop/findLocation?longitude=' + $scope.longitude + '&latitude=' + $scope.latitude, {headers: {"TOKEN": token}}).then(function(res) {
                console.log(res.data);
                $scope.shops = res.data.parms.shops;
                $scope.distances = $scope.shops.map(function(i) {
                  return {howFar: Math.floor(getDistance($scope.latitude, $scope.longitude, i.latitude, i.longitude))};
                });
                console.log($scope.distances);
                $scope.json1 = angular.merge({}, $scope.distances, $scope.shops);
                console.log($scope.json1);
              });
            }
          });
        });
        wx.error(function(res) {
          console.log(res);
        });
      }).catch(function(err) {
        console.log(err);
      });
      $scope.toShop = function() {
        $state.go("shop");
      };
      $scope.scanCode = function() {
        console.log('scanCode');
        wx.ready(function() {
          console.log(222);
          wx.scanQRCode({
            desc: 'scanQRCode desc',
            needResult: 1,
            scanType: ["qrCode", "barCode"],
            success: function(res) {
              console.log(res);
              window.location.href = res.resultStr;
            },
            error: function(res) {
              console.log(res);
              if (res.errMsg.indexOf('function_not_exist') > 0) {
                alert('版本过低请升级');
              }
            }
          });
        });
      };
      $scope.loadMore = function() {
        console.log('加载更多');
        $('#testBox').append("\n         <div class=\"shopList\" ui-sref=\"loadMore\">\n    <img src=\"images/replace.png\" alt=\"\">\n    <div class=\"shopDes\">\n      <p><span class=\"selfSupport\">自营</span><span class=\"shopName pl3\">虾饭先生(静安市场店)</span></p>\n      <p class=\"shopDistance\">科学城 200m</p>\n      <p class=\"shopDiscount\">单笔消费打9折</p>\n    </div>\n  </div>\n      ");
      };
      function getDistance(lat1, lng1, lat2, lng2) {
        var radLat1 = lat1 * Math.PI / 180.0;
        var radLat2 = lat2 * Math.PI / 180.0;
        var a = radLat1 - radLat2;
        var b = lng1 * Math.PI / 180.0 - lng2 * Math.PI / 180.0;
        var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) + Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)));
        s = s * 6378.137;
        s = Math.round(s * 10000) / 10000;
        return s * 1000;
      }
      ;
    }]);
    myApp.controller('payCtr', ['$scope', 'locals', '$state', '$http', '$timeout', '$stateParams', function($scope, locals, $state, $http, $timeout, $stateParams) {
      document.body.style.backgroundColor = '#ffffff';
      var token = locals.get("token");
      var params = $stateParams;
      console.log(params);
      if (params.id) {
        locals.set("payId", params.id);
        $scope.payId = params.id;
      } else {
        $scope.payId = locals.get("payId");
      }
      $http.get(url + '/api/shop/find/' + $scope.payId, {headers: {"TOKEN": token}}).then(function(res) {
        console.log(res.data);
        $scope.shop = res.data.parms.shop;
        $scope.prePhone = res.data.parms.shop.phone.slice(0, 3);
        $scope.lastPhone = res.data.parms.shop.phone.slice(7);
        console.log($scope.prePhone);
        console.log($scope.lastPhone);
      });
      $scope.ensurePay = function() {
        if (!$scope.price) {
          $.toast("缺少金额", "forbidden");
        } else {
          $http.post(url + '/api/order/newOrder1/' + $scope.price * 100, {
            shopId: $scope.payId,
            remark: $scope.remark
          }, {headers: {"TOKEN": token}}).then(function(res) {
            console.log(res.data);
            console.log(res.data.parms.id);
            if (res.data.info == 1) {
              var orderId = res.data.parms.id;
              locals.set("newOrderId", orderId);
              window.location.href = 'http://www.cookingeasy.cn/user/test.html';
            }
          });
        }
      };
    }]);
    myApp.controller('paySuccessCtr', ['$scope', 'locals', '$state', '$http', '$timeout', function($scope, locals, $state, $http, $timeout) {
      document.body.style.backgroundColor = '#ffffff';
      $scope.toMain = function() {
        $state.go("main");
      };
    }]);
    myApp.controller('recommendCodeCtr', ['$scope', 'locals', '$state', '$http', '$timeout', function($scope, locals, $state, $http, $timeout) {
      document.body.style.backgroundColor = '#ccc';
      var token = locals.get("token");
      $http.get(url + '/api/user/getMyQrc', {headers: {"TOKEN": token}}).then(function(res) {
        console.log(res.data);
        if (res.data.info == 1) {
          $scope.imgUrl = res.data.parms.url;
        }
      });
      $http.get(url + '/api/user/findmy', {headers: {"TOKEN": token}}).then(function(res) {
        console.log(res.data);
        $scope.user = res.data.parms.user;
      });
    }]);
    myApp.controller('recommendMemberCtr', ['$scope', 'locals', '$state', '$http', '$timeout', function($scope, locals, $state, $http, $timeout) {
      document.body.style.backgroundColor = '#eeeeee';
      var token = locals.get("token");
      $http.get(url + '/api/user/findAllInvite', {headers: {"TOKEN": token}}).then(function(res) {
        console.log(res.data);
        if (res.data.info == 1) {
          $scope.users = res.data.parms.users;
          $scope.usersNum = res.data.parms.users.length;
          console.log($scope.users);
          console.log($scope.usersNum);
        }
      });
    }]);
    myApp.controller('ruleCtr', ['$scope', 'locals', '$state', '$http', '$timeout', function($scope, locals, $state, $http, $timeout) {}]);
    myApp.controller('shopCtr', ['$scope', 'locals', '$state', '$http', '$timeout', function($scope, locals, $state, $http, $timeout) {
      document.body.style.backgroundColor = '#eeeeee';
      var token = locals.get("token");
      $scope.img1 = 'http://www.cookingeasy.cn/images/ad/0.jpg?random=' + Math.random() * 10000;
      $scope.img2 = 'http://www.cookingeasy.cn/images/ad/1.jpg?random=' + Math.random() * 10000;
      $scope.img3 = 'http://www.cookingeasy.cn/images/ad/2.jpg?random=' + Math.random() * 10000;
      $scope.curtentPage = 2;
      $scope.firstTime = true;
      $scope.stop = true;
      $http.get(url + '/api/pocket/find', {headers: {"TOKEN": token}}).then(function(res) {
        console.log(res.data);
        $scope.pocket = res.data.parms.pocket;
      });
      $http.get(url + '/api/goodtype/getGoodTypeByPositionu/0', {headers: {"TOKEN": token}}).then(function(res) {
        console.log(res.data);
        $scope.level1 = res.data.parms.goodTypes;
        console.log($scope.level1);
        $scope.list1 = $scope.level1.map(function(i) {
          return {
            id: i.id,
            value: i.clazz
          };
        });
        var firstType = res.data.parms.goodTypes[0].id;
        console.log(firstType);
        $http.get(url + '/api/integral/findAll/3?page=1&size=6', {headers: {"TOKEN": token}}).then(function(res) {
          console.log(res.data);
          $scope.stop = false;
          $scope.integralGoods = res.data.parms.integralGoods;
          $scope.maxSize = res.data.parms.maxSize;
          $("#trigger1").text("请选择分类");
        });
        console.log($scope.list1);
        var mobileSelect1 = new MobileSelect({
          trigger: '#trigger1',
          title: '选择大种类',
          wheels: [{data: $scope.list1}],
          position: [0],
          callback: function(indexArr, data) {
            $scope.firstTime = false;
            $scope.check = true;
            $scope.resultNull = '';
            $scope.curtentPage = 2;
            $scope.stop = false;
            console.log(data[0].id);
            $scope.dataId = data[0].id;
            $scope.typeId = $scope.dataId;
            $http.get(url + '/api/goodtype/findAlligt/' + $scope.typeId + '/3?page=1&size=6', {headers: {"TOKEN": token}}).then(function(res) {
              console.log(res.data);
              $scope.integralGoods = res.data.parms.integralGoods;
              $scope.maxSize = res.data.parms.maxSize;
            });
            $http.get(url + '/api/goodtype/getGoodTypeByPositionu/' + $scope.dataId, {headers: {"TOKEN": token}}).then(function(res) {
              console.log(res.data);
              $scope.level2 = res.data.parms.goodTypes;
              console.log($scope.level2);
              $scope.list2 = $scope.level2.map(function(i) {
                return {
                  id: i.id,
                  value: i.clazz
                };
              });
              console.log($scope.list2);
              $("#trigger2").text("请选择小分类");
              mobileSelect2.updateWheel(0, $scope.list2);
            });
          }
        });
      });
      var mobileSelect2 = new MobileSelect({
        trigger: '#trigger2',
        title: '选择小类型',
        wheels: [{data: [{
            id: -1,
            value: "请选择大种类"
          }]}],
        position: [0],
        callback: function(indexArr, data) {
          console.log(data[0].value);
          $scope.resultNull = '';
          $scope.curtentPage = 2;
          $scope.stop = false;
          $scope.typeId = data[0].id;
          if (data[0].id != -1) {
            $http.get(url + '/api/goodtype/findAlligt/' + $scope.typeId + '/3?page=1&size=6', {headers: {"TOKEN": token}}).then(function(res) {
              console.log(res.data);
              $scope.integralGoods = res.data.parms.integralGoods;
              $scope.maxSize = res.data.parms.maxSize;
            });
          }
        }
      });
      $(document).ready(function() {
        var windowWidth = $(window).width();
        var imgHeight = windowWidth / 2;
        $(".swiper-slide").height = imgHeight;
        $(".swiperImg").height = imgHeight;
        console.log(imgHeight);
        console.log(windowWidth);
        var mySwiper = new Swiper('.swiper-container', {
          loop: true,
          autoplay: {
            delay: 3000,
            disableOnInteraction: false
          }
        });
      });
      $scope.search = function() {
        console.log($scope.searchName);
        $scope.curtentPage = 2;
        $("#trigger1").text("请选择分类");
        $("#trigger2").text("");
        if (!$scope.searchName) {
          $.alert({text: '缺少搜索内容'});
        } else {
          $scope.firstTime = false;
          $scope.stop = true;
          $http.get(url + '/api/integral/findn/' + $scope.searchName, {headers: {"TOKEN": token}}).then(function(res) {
            console.log(res.data);
            $scope.searchName = '';
            $scope.integralGoods = res.data.parms.integralGoods;
            if (res.data.parms.integralGoods.length === 0) {
              $scope.resultNull = 0;
              $scope.resultNum = res.data.parms.integralGoods.length;
            } else {
              $scope.resultNull = '';
              $scope.resultNum = res.data.parms.integralGoods.length;
            }
          });
        }
      };
      $scope.loadMore = function() {
        console.log(111);
        $scope.stop = true;
        if ($scope.typeId) {
          $http.get(url + '/api/goodtype/findAlligt/' + $scope.typeId + '/3?page=' + $scope.curtentPage + '&size=6', {headers: {"TOKEN": token}}).then(function(res) {
            console.log(res.data);
            if (res.data.info == 1 && res.data.parms.integralGoods.length > 0) {
              $scope.integralGoods = $scope.integralGoods.concat(res.data.parms.integralGoods);
              $scope.curtentPage++;
              console.log($scope.curtentPage);
              $scope.stop = false;
            }
          });
        } else if ($scope.firstTime) {
          $http.get(url + '/api/integral/findAll/3?page=' + $scope.curtentPage + '&size=6', {headers: {"TOKEN": token}}).then(function(res) {
            console.log(res.data);
            if (res.data.info == 1 && res.data.parms.integralGoods.length > 0) {
              $scope.integralGoods = $scope.integralGoods.concat(res.data.parms.integralGoods);
              $scope.curtentPage++;
              console.log($scope.curtentPage);
              $scope.stop = false;
            }
          });
        } else {}
      };
      $scope.toMain = function() {
        $state.go("main");
      };
    }]);
    myApp.controller('shopDetailCtr', ['$scope', 'locals', '$state', '$http', '$timeout', '$stateParams', function($scope, locals, $state, $http, $timeout, $stateParams) {
      document.body.style.backgroundColor = '#eeeeee';
      var token = locals.get("token");
      var params = $stateParams;
      console.log(params);
      if (params.id) {
        locals.set("shopId", params.id);
        $scope.shopId = params.id;
      } else {
        $scope.shopId = locals.get("shopId");
      }
      if (!token) {
        window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx2d63fca66c12d30a&redirect_uri=https%3a%2f%2fwww.cookingeasy.cn%2fapi%2fpc%2frelate3&response_type=code&scope=snsapi_userinfo&state=' + $scope.shopId + '#wechat_redirect';
      } else {
        $http.get(url + '/api/shop/find/' + $scope.shopId, {headers: {"TOKEN": token}}).then(function(res) {
          console.log(res.data);
          $scope.shop = res.data.parms.shop;
        });
      }
      $scope.toMain = function() {
        $state.go("main");
      };
      $scope.toPay = function() {
        $state.go("pay", {id: $scope.shopId});
      };
    }]);
    myApp.controller('takeGoodCtr', ['$scope', 'locals', '$state', '$http', '$timeout', '$stateParams', function($scope, locals, $state, $http, $timeout, $stateParams) {
      document.body.style.backgroundColor = '#eeeeee';
      var params = $stateParams;
      console.log(params);
      $scope.args = params.args;
      if (params.id) {
        locals.set("goodDetailId", params.id);
        $scope.id = params.id;
      } else {
        $scope.id = locals.get("goodDetailId");
      }
      var token = locals.get("token");
      $http.get(url + '/api/addr/find', {headers: {"TOKEN": token}}).then(function(res) {
        console.log(res.data);
        if (res.data.info == 1) {
          $scope.addresses = res.data.parms.addresses;
          if (res.data.parms.addresses.length == 0) {
            $scope.hasAddress = 0;
          } else if (res.data.parms.addresses.length > 0) {
            $scope.hasAddress = 1;
          }
          console.log($scope.addresses);
          console.log($scope.hasAddress);
        }
      });
      $http.get(url + '/api/integral/find/' + $scope.id, {headers: {"TOKEN": token}}).then(function(res) {
        console.log(res.data);
        if (res.data.info == 1) {
          $scope.integralGood = res.data.parms.integralGood;
          console.log($scope.integralGood);
        }
      });
      $(".toPage1").click(function() {
        $(".page1").show();
        $(".page2").hide();
        $(".page3").hide();
        $(".weui-navbar").children().removeClass("weui-bar__item_on1");
        $(this).addClass("weui-bar__item_on1");
      });
      $(".toPage2").click(function() {
        $(".page1").hide();
        $(".page2").show();
        $(".page3").hide();
        $(".weui-navbar").children().removeClass("weui-bar__item_on1");
        $(this).addClass("weui-bar__item_on1");
      });
      $(".toPage3").click(function() {
        $(".page1").hide();
        $(".page2").hide();
        $(".page3").show();
        $(".weui-navbar").children().removeClass("weui-bar__item_on1");
        $(this).addClass("weui-bar__item_on1");
      });
      $("#toExchange").click(function() {
        weui.confirm('兑换该商品将扣除' + $scope.integralGood.integral + '积分，另需支付' + $scope.integralGood.price / 100 + '元，点击确定继续', {
          title: '确定兑换？',
          buttons: [{
            label: '取消',
            type: 'default',
            onClick: function() {
              console.log('no');
            }
          }, {
            label: '确定',
            type: 'primary',
            onClick: function() {
              $http.post(url + '/api/order/newOrder2/' + $scope.integralGood.id + '/' + $scope.args.shopId + '/' + $scope.args.phone + '/' + $scope.args.name, {}, {headers: {"TOKEN": token}}).then(function(res) {
                console.log(res.data);
                if (res.data.info == 1) {
                  $scope.ExOrderId = res.data.parms.id;
                  locals.set("ExOrderId", res.data.parms.id);
                  window.location.href = 'http://www.cookingeasy.cn/user/exchange.html';
                }
              });
            }
          }]
        });
      });
      $(".payPic").click(function() {
        $(".mask").hide();
      });
    }]);
    myApp.controller('verifyPhoneCtr', ['$scope', 'locals', '$state', '$http', '$timeout', function($scope, locals, $state, $http, $timeout) {
      document.body.style.backgroundColor = '#eeeeee';
      $scope.verifySuccess = function() {
        $state.go("verifySuccess");
      };
    }]);
    myApp.controller('verifySuccessCtr', ['$scope', 'locals', '$state', '$http', '$timeout', function($scope, locals, $state, $http, $timeout) {
      document.body.style.backgroundColor = '#ffffff';
      var token = locals.get("token");
      $http.get(url + '/api/pocket/findbrank', {headers: {"TOKEN": token}}).then(function(res) {
        console.log(res.data);
        $scope.brankCard = res.data.parms.brankCard;
        $scope.cardNum = res.data.parms.brankCard.num.substring(res.data.parms.brankCard.num.length - 4);
        console.log($scope.cardNum);
      });
      $scope.toCard = function() {
        $state.go("card");
      };
    }]);
    myApp.controller('walletCtr', ['$scope', 'locals', '$state', '$http', '$timeout', function($scope, locals, $state, $http, $timeout) {
      document.body.style.backgroundColor = '#eeeeee';
      var token = locals.get("token");
      $scope.curtentPage = 2;
      $http.get(url + '/api/record/findIncome', {headers: {"TOKEN": token}}).then(function(res) {
        console.log(res.data);
        $scope.sum = res.data.parms.sum ? res.data.parms.sum : 0;
        $scope.today = res.data.parms.today ? res.data.parms.today : 0;
      });
      $http.get(url + '/api/pocket/find', {headers: {"TOKEN": token}}).then(function(res) {
        console.log(res.data);
        $scope.pocket = res.data.parms.pocket;
      });
      $http.get(url + '/api/record/findAllpr?page=1&size=8', {headers: {"TOKEN": token}}).then(function(res) {
        console.log(res.data);
        $scope.prs = res.data.parms.prs;
      });
      $scope.showWithDraw = function() {
        $scope.isWithDraw = true;
      };
      $scope.hideWithDraw = function() {
        $scope.isWithDraw = false;
      };
      $scope.withDraw = function() {
        if (!$scope.money) {
          $.toast("缺少金额", "forbidden");
        } else if ($scope.money < 1) {
          $.toast("金额应大于等于1元", "forbidden");
        } else {
          $http.post(url + '/api/user/withdraw/' + $scope.money * 100, {}, {headers: {"TOKEN": token}}).then(function(res) {
            console.log(res.data);
            if (res.data.info == 1) {
              $state.reload();
            }
          });
        }
      };
      $scope.loadMore = function() {
        $scope.stop = true;
        $http.get(url + '/api/record/findAllpr?page=' + $scope.curtentPage + '&size=8', {headers: {"TOKEN": token}}).then(function(res) {
          console.log(res.data);
          console.log(res.data.parms.prs.length);
          if (res.data.info == 1 && res.data.parms.prs.length > 0) {
            $scope.prs = $scope.prs.concat(res.data.parms.prs);
            $scope.curtentPage++;
            console.log($scope.curtentPage);
            $scope.stop = false;
          }
        });
      };
    }]);
    myApp.factory('locals', ['$window', function($window) {
      return {
        set: function(key, value) {
          $window.localStorage[key] = value;
        },
        get: function(key, defaultValue) {
          return $window.localStorage[key] || defaultValue;
        },
        setObject: function(key, value) {
          $window.localStorage[key] = JSON.stringify(value);
        },
        getObject: function(key) {
          return JSON.parse($window.localStorage[key] || '{}');
        }
      };
    }]);
    myApp.factory('loginLoseEfficacy', ['$log', '$window', 'locals', function($log, $window, locals) {
      $log.debug('$log is here to show you that this is a regular factory with injection');
      return {
        request: function(config) {
          config.requestTimestamp = new Date().getTime();
          var token = locals.get("token");
          return config;
        },
        response: function(response) {
          if (response.data.info == 18) {
            console.log(111);
          }
          return response;
        }
      };
    }]);
    myApp.directive('whenScrolled', function($timeout) {
      return function(scope, elm, attr) {
        var forbid = false;
        $(window).scroll(function() {
          var scrollTop = Math.ceil($(window).scrollTop());
          var scrollHeight = $(document).height();
          var windowHeight = $(window).height();
          if (scrollTop + windowHeight >= scrollHeight - 50) {
            if (!forbid) {
              scope.$apply(attr.whenScrolled);
              forbid = true;
              $timeout(function() {
                forbid = false;
              }, 100);
            }
          }
        });
      };
    });
    myApp.run(['$rootScope', '$state', '$window', 'locals', '$location', '$anchorScroll', function($rootScope, $state, $window, locals, $location, $anchorScroll) {
      $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
        $anchorScroll();
      });
    }]);
  }());

