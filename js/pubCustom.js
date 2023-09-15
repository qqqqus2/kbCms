(function ($) {
    "use strict";
    $(function () {
        const $elements = $.find("*[data-include-html]");
        if ($elements.length) {
            Html.include(uiInit);
        } else {
            uiInit();
        }

        // 팝업
        popupUI();

    });

    const uiInit = function () {
        device.check();
        common.init();
        table.init();
        $(window).scroll();
    };

    //PC 디바이스 체크
    const isPC = {
        window: function () {
            return navigator.userAgent.match(/windows/i) == null ? false : true;
        },
        mac: function () {
            return navigator.userAgent.match(/macintosh/i) == null
                ? false
                : true;
        },
        chrome: function () {
            return navigator.userAgent.match(/chrome/i) == null ? false : true;
        },
        firefox: function () {
            return navigator.userAgent.match(/firefox/i) == null ? false : true;
        },
        opera: function () {
            return navigator.userAgent.match(/opera|OPR/i) == null
                ? false
                : true;
        },
        safari: function () {
            return navigator.userAgent.match(/safari/i) == null ? false : true;
        },
        edge: function () {
            return navigator.userAgent.match(/edge/i) == null ? false : true;
        },
        msie: function () {
            return navigator.userAgent.match(/rv:11.0|msie/i) == null
                ? false
                : true;
        },
        ie11: function () {
            return navigator.userAgent.match(/rv:11.0/i) == null ? false : true;
        },
        ie10: function () {
            return navigator.userAgent.match(/msie 10.0/i) == null
                ? false
                : true;
        },
        ie9: function () {
            return navigator.userAgent.match(/msie 9.0/i) == null
                ? false
                : true;
        },
        ie8: function () {
            return navigator.userAgent.match(/msie 8.0/i) == null
                ? false
                : true;
        },
        any: function () {
            return isPC.window() || isPC.mac();
        },
        check: function () {
            if (isPC.any()) {
                if (isPC.window()) $("html").addClass("window");
                if (isPC.mac()) $("html").addClass("mac");
                if (isPC.msie()) $("html").addClass("msie");
                if (isPC.ie11()) $("html").addClass("ie11");
                if (isPC.ie10()) $("html").addClass("ie10");
                if (isPC.ie9()) $("html").addClass("ie9");
                if (isPC.ie8()) $("html").addClass("ie8");
                if (isPC.edge()) {
                    $("html").addClass("edge");
                } else if (isPC.opera()) {
                    $("html").addClass("opera");
                } else if (isPC.chrome()) {
                    $("html").addClass("chrome");
                } else if (isPC.safari()) {
                    $("html").addClass("safari");
                } else if (isPC.firefox()) {
                    $("html").addClass("firefox");
                }
            }
        },
    };

    // 디바이스 체크
    const device = {
        check: function () {
            isPC.check();
        },
    };

    const Html = {
        include: function (fn) {
            const $elements = $.find("*[data-include-html]");
            // const $fileName = location.pathname.split('/').pop();
            if ($elements.length) {
                // const $url = location.href;
                //if ($url.indexOf('http') >= 0) {
                if (location.host) {
                    $.each($elements, function (i) {
                        const $this = $(this);
                        const $html = $this.data("include-html");
                        const $htmlAry = $html.split("/");
                        const $htmlFile = $htmlAry[$htmlAry.length - 1];
                        const $docTitle = document.title;
                        let $title = null;
                        if ($docTitle.indexOf(" | ") > -1) {
                            $title = $docTitle.split(" | ")[0];
                        }
                        $this.load($html, function (res, sta, xhr) {
                            if (sta == "success") {
                                $this.children().unwrap();
                            }
                            if (i === $elements.length - 1) {
                                if (!!fn) fn();
                            }
                        });
                    });
                } else {
                    if (!!fn) fn();
                }
            }
        },
    };
    $(window).on("load", function () {
        tabReady();
    });
    const common = {
        init: function () {
            common.sidebar();
            common.menuActive();
            common.btnTop();

            if ($(".input-date").length > 0) {
                common.calendar();
            }
            common.pageTitle();
            common.pagiNation();

            common.searchToggle();
            //탭
            uiTab();

            //커스텀 셀렉트
            customSelect();

            //툴팁
            tooltips();
        },

        searchToggle: function () {
            //검색바 열기 & 닫기
            $(".btn-searchToggle").each(function () {
                const $this = $(this);
                $this.on("click", function () {
                    const title = $this.attr("title");
                    $this.parents(".common-search").toggleClass("active");
                    $this.siblings(".expand-condition").stop().slideToggle(300);
                    $this.siblings(".selected-condition").stop().toggle();
                    if (title == "닫힘") {
                        $this.attr("title", "열기");
                    } else {
                        $this.attr("title", "닫기");
                    }
                });
            });
        },

        sidebar: function () {
          $(document).on("click", ".btn-expand", function (e) {
              $(".kb-wrap").toggleClass("sidebar-off");
          });

          if (
              !$(".kb-lnb .kb-lnb-dep1")
                  .children(":first-child")
                  .hasClass("active")
          ) {
              $(".kb-lnb .kb-lnb-link").removeClass("open");
          }

          $(document).on(
              "click",
              ".kb-lnb .kb-lnb-dep1 .kb-lnb-link",
              function (e) {
                  if ($(this).hasClass("in-sub")) {
                      e.preventDefault();
                      const $this = $(this);
                      const $subMenu = $this.next();
                      if ($this.hasClass("open")) {
                          $this.removeClass("open");
                          $subMenu.stop(true, false).slideUp(300);
                      } else {
                          $this.addClass("open");
                          $subMenu.stop(true, false).slideDown(300);
                          $this
                              .parent()
                              .siblings()
                              .find(">.open")
                              .each(function () {
                                  const $open = $(this);
                                  $open.removeClass("open");
                                  $open.next().stop(true, false).slideUp(300);
                              });
                      }
                  }
              }
          );
          $(document).on(
              "click",
              ".kb-lnb .kb-lnb-dep2 .kb-lnb-link",
              function (e) {
                if ($(this).hasClass("in-subDepth2")) {
                    e.preventDefault();

                    const $this = $(this);
                    const $subMenu = $this.next();

                    if ($this.hasClass("open")) {
                        $this.removeClass("open");
                        $subMenu.stop(true, false).slideUp(300);
                    } else {
                        $this.addClass("open");
                        $subMenu.stop(true, false).slideDown(300);
                        $this
                            .parent()
                            .siblings()
                            .find(">.open")
                            .each(function () {
                                const $open = $(this);
                                $open.removeClass("open");
                                $open.next().stop(true, false).slideUp(300);
                            });
                    }
                }
              }
          );
        },
        menuActive: function () {
            if ($(".kb-sidebar").length) {
                const $linkDepth1 = $(".kb-lnb-dep1 .kb-lnb-link");
                const $lnbDepth2 = $(".kb-lnb-dep2 .kb-lnb-link");
                const $lnbDepth3 = $(".kb-lnb-dep3");
                const $path = location.pathname;
                const $title = $(".breadcrumb-item.active").length
                    ? $(".breadcrumb-item.active").text()
                    : $(".kb-title h1").text();

                $(".kb-lnb .kb-lnb-dep2").hide();

                $linkDepth1.each(function () {
                    const $this = $(this);
                    const $text = $this.text();
                    const $href = $this.attr("href").split("/").pop();

                    // $('.kb-lnb-dep2 .kb-lnb-link').removeClass('open');
                    if ($this.next(".kb-lnb-dep2").length) {
                        $this.addClass("in-sub");
                    }

                    let isActive = false;

                    if ($path.indexOf($href) > -1) {
                        // isActive = true;
                    } else if ($text === $title) {
                        isActive = true;
                    }

                    if (isActive) {
                        // isActiveOn = true;

                        $this.parents("li").addClass("active");
                        $this.parents("li").children(".kb-lnb-dep2").show();
                        $this.parent().addClass("active");
                    }
                    if ($this.parents("li").hasClass("active")) {
                        $this
                            .parents("li.active")
                            .children("a:first-child")
                            .addClass("open");
                    }
                });

                $lnbDepth2.each(function () {
                    const $this = $(this);

                    if ($this.next(".kb-lnb-dep3").length) {
                        $this.addClass("in-subDepth2");
                    }

                    if ($this.children("li").hasClass("active")) {
                        $this.show();
                    }
                    if ($this.parents("li").hasClass("active")) {
                        $this
                            .parents("li")
                            .children(":first-child")
                            .children(":first-child")
                            .addClass("open");
                    }
                });

                $lnbDepth3.each(function () {
                    const $this = $(this);
                    if ($(this).children("li").hasClass("active")) {
                        $(this).show();
                    }
                });
            }
        },
        calendar: function () {
            $(".date-single input").daterangepicker(
                {
                    startDate: start,
                    endDate: end,
                    singleDatePicker: true,
                    showDropdowns: true,
                    timePicker: false,
                    locale: {
                        format: "YYYY-MM-DD",
                        direction: "rtl",
                        separator: " ~ ",
                        applyLabel: "확인",
                        cancelLabel: "다시 선택",
                        fromLabel: "부터",
                        toLabel: "까지",
                        customRangeLabel: "Custom",
                        daysOfWeek: ["일", "월", "화", "수", "목", "금", "토"],
                        monthNames: [
                            "1월",
                            "2월",
                            "3월",
                            "4월",
                            "5월",
                            "6월",
                            "7월",
                            "8월",
                            "9월",
                            "10월",
                            "11월",
                            "12월",
                        ],
                        firstDay: 0,
                    },
                },
                function (start, end, label) {
                    // console.log("New date range selected: ' + start.format('YYYY-MM-DD') + ' to ' + end.format('YYYY-MM-DD') + ' (predefined range: ' + label + ')");
                }
            );

            if ($(".input-date").hasClass("showUp")) {
                $(".date-single input").daterangepicker({
                    drops: "up",
                    startDate: start,
                    endDate: end,
                    singleDatePicker: true,
                    showDropdowns: true,
                    timePicker: false,
                    locale: {
                        format: "YYYY-MM-DD",
                        direction: "rtl",
                        separator: " ~ ",
                        applyLabel: "확인",
                        cancelLabel: "다시 선택",
                        fromLabel: "부터",
                        toLabel: "까지",
                        customRangeLabel: "Custom",
                        daysOfWeek: ["일", "월", "화", "수", "목", "금", "토"],
                        monthNames: [
                            "1월",
                            "2월",
                            "3월",
                            "4월",
                            "5월",
                            "6월",
                            "7월",
                            "8월",
                            "9월",
                            "10월",
                            "11월",
                            "12월",
                        ],
                        firstDay: 0,
                    },
                });
            }

            $(".range input").on("input", function () {
                // 입력 필드의 값을 가져옵니다.
                var inputValue = $(this).val();

                if (inputValue.length == 8) {
                    $(this).val(inputValue + " ");
                }

                if (inputValue.length === 16) {
                    var startDate = inputValue.substring(0, 8); // 앞부분 8자리
                    var endDate = inputValue.substring(8, 16); // 뒷부분 8자리
                    var formattedDate = startDate + " ~ " + endDate;
                    $(this).val(formattedDate);
                }
                inputValue = inputValue.replace(/[^0-9]/g, "");
            });

            $(".range input").on("keydown", function (e) {
                // Backspace 키 (keyCode 8) 를 눌렀고 input 요소가 focus 상태인 경우
                if (e.keyCode === 8 && $(this).is(":focus")) {
                    // 입력 값(value) 삭제
                    $(this).val("");
                    // Backspace 키의 기본 동작(이전 페이지로 이동) 막기
                    e.preventDefault();
                }
            });

            var start = moment();
            var end = moment();

            function dateRange() {
                $(".range input").daterangepicker({
                    showDropdowns: true,
                    minYear: 2023,
                    maxYear: 2024,
                    timePicker: false,
                    locale: {
                        format: "YYYY-MM-DD",
                        showDropdowns: true,
                        direction: "rtl",
                        separator: " ~ ",
                        applyLabel: "확인",
                        cancelLabel: "다시 선택",
                        fromLabel: "부터",
                        toLabel: "까지",
                        customRangeLabel: "Custom",
                        daysOfWeek: ["일", "월", "화", "수", "목", "금", "토"],
                        monthNames: [
                            "1월",
                            "2월",
                            "3월",
                            "4월",
                            "5월",
                            "6월",
                            "7월",
                            "8월",
                            "9월",
                            "10월",
                            "11월",
                            "12월",
                        ],
                        firstDay: 0,
                    },
                });
            }
            dateRange();

            $(".range input").on(
                "cancel.daterangepicker",
                function (ev, picker) {
                    $(
                        ".btn-currentDay , .btn-prevWeek, .btn-prevMonth, .btn-Reset"
                    ).removeClass("active");
                    $(".btn-Reset").addClass("active");
                    $(".range input").val("");
                }
            );

            $(".btn-Reset").on("click", function () {
                $(
                    ".btn-currentDay , .btn-prevWeek, .btn-prevMonth, .btn-Reset"
                ).removeClass("active");
                $(".btn-Reset").addClass("active");
                $(".range input").val("");
            });

            $(".btn-currentDay").on("click", function () {
                $(
                    ".btn-currentDay , .btn-prevWeek, .btn-prevMonth, .btn-Reset"
                ).removeClass("active");
                $(this).addClass("active");
                $(".range input").val(
                    start.format("YYYY-MM-DD") +
                        " ~ " +
                        end.format("YYYY-MM-DD")
                );
                dateRange();
            });

            $(".btn-prevWeek").on("click", function () {
                var start = moment().subtract(7, "days");

                $(
                    ".btn-currentDay , .btn-prevWeek, .btn-prevMonth, .btn-Reset"
                ).removeClass("active");
                $(this).addClass("active");
                $(".range input").val(
                    start.format("YYYY-MM-DD") +
                        " ~ " +
                        end.format("YYYY-MM-DD")
                );
                dateRange();
            });

            // 전체 먼저 활성화 될 시
            if ($(".range").hasClass("allFirst")) {
                $(".range input").val("");
            }

            $(".btn-prevMonth").on("click", function () {
                var start = moment().subtract(30, "days");

                $(
                    ".btn-currentDay , .btn-prevWeek, .btn-prevMonth, .btn-Reset"
                ).removeClass("active");
                $(this).addClass("active");
                $(".range input").val(
                    start.format("YYYY-MM-DD") +
                        " ~ " +
                        end.format("YYYY-MM-DD")
                );
                dateRange();
            });

            $(".monitoring-date label").html(start.format("YYYY.MM.DD"));
            monitoringDate();

            function monitoringDate() {
                $(".monitoring-date label").daterangepicker({
                    startDate: start,
                    endDate: end,
                    minYear: 2023,
                    singleDatePicker: true,
                    showDropdowns: true,
                    timePicker: false,
                    autoUpdateInput : true,
                    opens: "center",
                    locale: {
                        format: "YYYY.MM.DD",
                        direction: "ltr",
                        applyLabel: "확인",
                        customRangeLabel: "Custom",
                        daysOfWeek: ["일", "월", "화", "수", "목", "금", "토"],
                        monthNames: [
                            "1월",
                            "2월",
                            "3월",
                            "4월",
                            "5월",
                            "6월",
                            "7월",
                            "8월",
                            "9월",
                            "10월",
                            "11월",
                            "12월",
                        ],
                        firstDay: 0,
                    },
                });
            }

            $(".btn-today").on("click", function (ev, picker) {
                $(".btn-today, .btn-week, .btn-month").removeClass("active");
                $(this).addClass("active");
                $(".daterangepicker").addClass("monitoring-day");
                $(".monitoring-date").removeClass("week month").addClass("day");

                monitoringDate();

                $(".monitoring-date label").html(end.format("YYYY.MM.DD"));
                applyDate();
            });

            //주단위
            $(".btn-week").on("click", function () {
                $(".btn-today, .btn-week, .btn-month").removeClass("active");
                $(this).addClass("active");

                $(".daterangepicker").addClass("monitoring-week");

                var start = moment().subtract(6, "days");
                var end = moment();
                $(".monitoring-date label").html(
                    start.format("YYYY.MM.DD") +
                        " ~ " +
                        end.format("YYYY.MM.DD")
                );
                $(".monitoring-date").removeClass("day month").addClass("week");

                $(".monitoring-date label").daterangepicker({
                    startDate: moment().subtract(6, "days"),
                    endDate: moment(),
                    showDropdowns: true,
                    minYear: 2023,
                    timePicker: false,
                    opens: "center",
                    autoUpdateInput: true,
                    locale: {
                        format: "YYYY.MM.DD",
                        showDropdowns: true,
                        direction: "ltr",
                        separator: " ~ ",
                        applyLabel: "확인",
                        cancelLabel: "다시 선택",
                        fromLabel: "부터",
                        toLabel: "까지",
                        customRangeLabel: "Custom",
                        daysOfWeek: ["일", "월", "화", "수", "목", "금", "토"],
                        monthNames: [
                            "1월",
                            "2월",
                            "3월",
                            "4월",
                            "5월",
                            "6월",
                            "7월",
                            "8월",
                            "9월",
                            "10월",
                            "11월",
                            "12월",
                        ],
                        firstDay: 0,
                    },
                });
                applyDate();
            });

            //월단위
            $(".btn-month").on("click", function () {
                $(".btn-today, .btn-week, .btn-month").removeClass("active");
                $(this).addClass("active");
                

                var end = moment();
                $(".monitoring-date label").html(end.format("YYYY.MM"));
                $(".monitoring-date").removeClass("day week").addClass("month");

                $(".monitoring-date label").daterangepicker({
                    startDate: moment().startOf("month"),
                    endDate: moment().endOf("month"),
                    minYear: 2023,
                    // "maxYear" : 2024,
                    // showDropdowns: true,
                    dateLimit: {
                    'months': 1,
                    'days': -1
                    },
                    autoUpdateInput : true,
                    timePicker: false,
                    opens: "center",
                    linkedCalendars: false,
                    locale: {
                        format: "YYYY.MM.DD",
                        direction: "ltr",
                        applyLabel: "확인",
                        fromLabel: "부터",
                        toLabel: "까지",
                        customRangeLabel: "Custom",
                        daysOfWeek: ["일", "월", "화", "수", "목", "금", "토"],
                        monthNames: [
                            "1월",
                            "2월",
                            "3월",
                            "4월",
                            "5월",
                            "6월",
                            "7월",
                            "8월",
                            "9월",
                            "10월",
                            "11월",
                            "12월",
                        ],
                        firstDay: 0,
                    },
                }).on('show.daterangepicker', function(ev, picker){
                    $(".daterangepicker").addClass("monitoring-month");
                });
                
                //applyDate();
            });

            function applyDate() {
                // $('.monitoring-date label').on('apply.daterangepicker', function(ev, picker) {
                //   const $this = $(this);
                //   const rangePicker = $('.daterangepicker');
                //   if(rangePicker.hasClass('.monitoring-month')){
                //     $this.html(end.format('YYYY.MM'));
                //     alert(1)
                //   }else if(rangePicker.hasClass('.monitoring-week')){
                //     $('.monitoring-date label').html(start.format('YYYY.MM.DD') + ' ~ ' + end.format('YYYY.MM.DD'));
                //     alert(2)
                //   }else{
                //     $this.html(end.format('YYYY.MM.DD'));
                //     alert(3)
                //   }
                // });
            }
        },

        btnTop: function () {
            const settings = {
                button: "#btnTop",
                text: "컨텐츠 상단으로 이동",
                min: 100,
                onClass: "on",
                hoverClass: "hover",
                scrollSpeed: 300,
            };
            const btnHtml =
                '<a href="#" id="' +
                settings.button.substring(1) +
                '" class="btn-scl-top" title="' +
                settings.text +
                '" role="button" aria-label="' +
                settings.text +
                '"><i class="bi bi-arrow-up-short"></i></a>';
            if (!$(settings.button).length) {
                $("body").append(btnHtml);

                $(document)
                    .on("click", settings.button, function (e) {
                        e.preventDefault();
                        $("html, body").animate(
                            { scrollTop: 0 },
                            settings.scrollSpeed
                        );
                    })
                    .on("mouseenter", function () {
                        $(settings.button).addClass(settings.hoverclass);
                    })
                    .on("mouseleave", function () {
                        $(settings.button).removeClass(settings.hoverClass);
                    });

                const btnTopOn = function () {
                    $(settings.button)
                        .attr("aria-hidden", "false")
                        .addClass(settings.onClass);
                };

                const btnTopOff = function () {
                    $(settings.button)
                        .attr("aria-hidden", "true")
                        .removeClass(settings.onClass);
                };

                $(window).on("scroll", function () {
                    const $SclTop = $(this).scrollTop();
                    if ($SclTop > settings.min) {
                        btnTopOn();
                    } else {
                        btnTopOff();
                    }
                });
            }
        },
        pagiNation: function () {
            $(".pagination a").click(function () {
                const $this = $(this);
                if ($this.hasClass("disabled")) {
                    return false;
                }
            });
        },
        pageTitle: function () {
            $(window).scroll(function () {
                const $SclTop = $(this).scrollTop();
                const $title = $(".kb-page-title");
                if ($title.length) {
                    const $titleTop = $title.offset().top;
                    const $headH = $(".kb-navbar").outerHeight() - 30;

                    if ($SclTop > $titleTop - $headH) {
                        $title.addClass("fixed");
                    } else {
                        $title.removeClass("fixed");
                    }
                }
            });
        },
    };

    const table = {
        init: function () {
            table.checkbox();
        },
        checkbox: function () {
            //전체 선택
            $(document).on(
                "change",
                ".table input.ui-tbl-chk-all",
                function () {
                    const $wrap = $(this).closest(".table"),
                        $chk = $wrap.find("input.ui-tbl-chk").not(":disabled");
                    if ($(this).prop("checked")) {
                        $chk.prop("checked", true).change();
                    } else {
                        $chk.prop("checked", false).change();
                    }
                }
            );
            //같은 name 속성값 끼리 체크
            $(document).on(
                "change",
                ".table input.ui-tbl-chk-name",
                function () {
                    const $wrap = $(this).closest(".table"),
                        $name = $(this).attr("name"),
                        $chk = $wrap
                            .find("input.ui-tbl-chk[name=" + $name + "]")
                            .not(":disabled");
                    console.log($name);
                    if ($(this).prop("checked")) {
                        $chk.prop("checked", true).change();
                    } else {
                        $chk.prop("checked", false).change();
                    }
                }
            );
            $(document).on("change", ".table input.ui-tbl-chk", function () {
                const $wrap = $(this).closest(".table"),
                    $tr = $(this).closest("tr"),
                    $allChk = $wrap.find("input.ui-tbl-chk-all"),
                    $chkLength = $wrap
                        .find("input.ui-tbl-chk")
                        .not(":disabled").length,
                    $checkedLength = $wrap.find(
                        "input.ui-tbl-chk:checked"
                    ).length;

                if ($(this).prop("checked")) {
                    $tr.addClass("tr-selected");
                } else {
                    $tr.removeClass("tr-selected");
                }

                if ($chkLength == $checkedLength) {
                    $allChk.prop("checked", true);
                } else {
                    $allChk.prop("checked", false);
                }
            });
        },
    };
})(jQuery);

function popOpen(tar) {
    $("body").addClass("hidden popOpen");
    $(tar).addClass("opened");
    $(tar).fadeIn(300);
    // popPositin(tar,300);
    $(window).on("resizeEnd", function () {
        // popPositin(tar,300);
    });
}
function popupUI() {
    $(".pop-open").on("click", function (e) {
        e.preventDefault();
        var pop = $(this).attr("href");
        popOpen(pop);
    });
    $(".pop-close").on("click", function (e) {
        e.preventDefault();
        var pop = $(this).attr("href");
        $(pop + " #msgPop").empty();
        popClose(pop);
    });
    //팝업 백그라운드 있을때
    $(".modal-bg").on("click", function () {
        $("body").removeClass("hidden popOpen");
        $(".modal").fadeOut(500).removeClass("opened");
    });
}
function popPositin(tar, speed) {
    var $wrapH = $(tar).height(),
        $pop = $(tar).find(".modal-content"),
        $popH = $pop.outerHeight(),
        $mT = Math.max(0, ($wrapH - $popH) / 2);
    if (speed > 100) {
        $pop.stop().css({ "margin-top": $mT });
    } else {
        $pop.css({ "margin-top": $mT });
    }
}
function popClose(tar) {
    if ($(".opened").length < 2) {
        $("body").removeClass("hidden popOpen");
    }
    $(tar).fadeOut(500).removeClass("opened");
}

// Tab
function uiTab() {
    $(".ui_tab a").click(function (e) {
        if (!$(this).parents(".tab-list").hasClass("link-tab")) {
            e.preventDefault();
            const $href = $(this).attr("href");
            $(this)
                .parent()
                .addClass("active")
                .siblings()
                .removeClass("active");
            $(this)
                .parent()
                .siblings()
                .each(function (e) {
                    const $btn = $(this).find("a");
                    const $btnHref = $btn.attr("href");
                    $($btnHref).removeClass("active");
                });
            $($href).addClass("active");
        }
        tabLine($(this).closest(".ui_tab"));
    });
}
function tabLine(wrap) {
    const $active = $(wrap).find(".tab.active");
    const $activeLeft = $active.position().left;
    const $activeWidth = $active.outerWidth();
    const $line = $(wrap).find(".tab_line");
    $line.stop().animate(
        {
            left: $activeLeft,
            width: $activeWidth,
        },
        300
    );
}
function tabReady() {
    $(".ui_tab").each(function () {
        tabLine(this);
    });
}

$(window).resize(function () {
    tabReady();
});

(function () {
    "use strict";
    function emulatedIEMajorVersion() {
        const groups = /MSIE ([\d.]+)/.exec(window.navigator.userAgent);
        if (groups === null) {
            return null;
        }
        const ieVersionNum = parseInt(groups[1], 10);
        const ieMajorVersion = Math.floor(ieVersionNum);
        return ieMajorVersion;
    }
    function actualNonEmulatedIEMajorVersion() {
        const jscriptVersion = new Function(
            "/*@cc_on return @_jscript_version; @*/"
        )();
        if (typeof jscriptVersion === "undefined") {
            return 11;
        }
        if (jscriptVersion < 9) {
            return 8;
        }
        return jscriptVersion;
    }
    const ua = window.navigator.userAgent;
    if (ua.indexOf("Opera") > -1 || ua.indexOf("Presto") > -1) {
        return;
    }
    const emulated = emulatedIEMajorVersion();
    if (emulated === null) {
        return;
    }
    const nonEmulated = actualNonEmulatedIEMajorVersion();
    if (emulated !== nonEmulated) {
        window.alert(
            "WARNING: You appear to be using IE" +
                nonEmulated +
                " in IE" +
                emulated +
                " emulation mode.\nIE emulation modes can behave significantly differently from ACTUAL older versions of IE.\nPLEASE DON'T FILE BOOTSTRAP BUGS based on testing in IE emulation modes!"
        );
    }
})();

//툴 팁
function tooltips() {
    $(".tooltips").each(function () {
        const $this = $(this);
        const $msg = $(".msg");

        $this.children(".btn-tooltips").click(function () {
            $msg.hide();
            $this.children($msg).show();
        });
        $this.find(".btn-tipClose").click(function () {
            $msg.hide();
        });

        $("body").on("click", function (event) {
            var clickedElement = $(event.target);

            if (!clickedElement.hasClass("btn-tooltips")) {
                $msg.hide();
            }
        });
    });
}

// 커스텀 셀렉트
function customSelect() {
    var x, i, j, l, ll, selElmnt, a, b, c;

    x = document.getElementsByClassName("custom-select");
    l = x.length;

    for (i = 0; i < l; i++) {
        selElmnt = x[i].getElementsByTagName("select")[0];

        if (selElmnt.selectedIndex >= 0) {
            if (selElmnt.disabled) {
                x[i].classList.add("disabledSelect");
                continue;
            }
        } else {
            x[i].classList.add("disabledSelect");
            x[i].classList.add("nullOption");
            // x[i].querySelector('select').disabled = true;
            continue;
        }

        ll = selElmnt.length;
        a = document.createElement("div");
        a.setAttribute("class", "select-selected");
        a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
        x[i].appendChild(a);

        // console.log(selElmnt.selectedIndex)

        b = document.createElement("div");
        b.setAttribute("class", "select-items select-hide");

        for (j = 0; j < ll; j++) {
            c = document.createElement("div");
            c.innerHTML = selElmnt.options[j].innerHTML;
            c.addEventListener("click", function (e) {
                var y, i, k, s, h, sl, yl;
                s =
                    this.parentNode.parentNode.getElementsByTagName(
                        "select"
                    )[0];
                sl = s.length;

                h = this.parentNode.previousSibling;
                for (i = 0; i < sl; i++) {
                    if (s.options[i].innerHTML == this.innerHTML) {
                        s.selectedIndex = i;
                        h.innerHTML = this.innerHTML;
                        y =
                            this.parentNode.getElementsByClassName(
                                "same-as-selected"
                            );

                        yl = y.length;
                        for (k = 0; k < yl; k++) {
                            y[k].removeAttribute("class");
                        }
                        this.setAttribute("class", "same-as-selected");

                        // 현재 선택된 select box의 값을 출력
                        // console.log("Selected Value:", s.options[s.selectedIndex].value);
                        break;
                    }
                }
                h.click();

                // select 값이 변경되면 selectedItem() 함수 실행
                s.dispatchEvent(new Event("change"));
            });
            b.appendChild(c);
        }

        x[i].appendChild(b);

        const bodyElement = document.body;
        bodyElement.addEventListener("click", function (e) {
            // 클릭된 요소가 a 요소가 아니면 closeAllSelect 함수를 호출합니다.
            if (!e.target.classList.contains("select-arrow")) {
                closeAllSelect();
            }
        });

        a.addEventListener("click", function (e) {
            e.stopPropagation();
            closeAllSelect(this);
            this.nextSibling.classList.toggle("select-hide");
            this.classList.toggle("select-arrow-active");
        });

        $(window).scroll(function () {
            closeAllSelect();
        });
    }

    function closeAllSelect(elmnt) {
        var x,
            y,
            i,
            xl,
            yl,
            arrNo = [];
        x = document.getElementsByClassName("select-items");
        y = document.getElementsByClassName("select-selected");
        xl = x.length;
        yl = y.length;
        for (i = 0; i < yl; i++) {
            if (elmnt == y[i]) {
                arrNo.push(i);
            } else {
                y[i].classList.remove("select-arrow-active");
            }
        }
        for (i = 0; i < xl; i++) {
            if (arrNo.indexOf(i)) {
                x[i].classList.add("select-hide");
            }
        }
    }

    // 셀렉트 박스 옵션 fixed로 변경
    $(".select-selected").each(function () {
        const $this = $(this);

        if ($this.parents(".custom-select").hasClass("fixed")) {
            $this.click(function () {
              const customSelectWidth = $this.outerWidth();
              const customSelectLeft = $this.offset().left;
              const customSelectTop = $this.offset().top;
              $this.siblings(".select-items").css({
                  left: customSelectLeft + "px",
                  top: customSelectTop + 32 + "px",
                  "min-width": customSelectWidth,
              });
            });
        }
    });
}
