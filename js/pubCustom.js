(function ($) {
  'use strict';
  $(function () {
    const $elements = $.find('*[data-include-html]');
    if ($elements.length) {
      Html.include(uiInit);
    } else {
      uiInit();
    }

    // 팝업 
    popupUI() 
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
      return navigator.userAgent.match(/macintosh/i) == null ? false : true;
    },
    chrome: function () {
      return navigator.userAgent.match(/chrome/i) == null ? false : true;
    },
    firefox: function () {
      return navigator.userAgent.match(/firefox/i) == null ? false : true;
    },
    opera: function () {
      return navigator.userAgent.match(/opera|OPR/i) == null ? false : true;
    },
    safari: function () {
      return navigator.userAgent.match(/safari/i) == null ? false : true;
    },
    edge: function () {
      return navigator.userAgent.match(/edge/i) == null ? false : true;
    },
    msie: function () {
      return navigator.userAgent.match(/rv:11.0|msie/i) == null ? false : true;
    },
    ie11: function () {
      return navigator.userAgent.match(/rv:11.0/i) == null ? false : true;
    },
    ie10: function () {
      return navigator.userAgent.match(/msie 10.0/i) == null ? false : true;
    },
    ie9: function () {
      return navigator.userAgent.match(/msie 9.0/i) == null ? false : true;
    },
    ie8: function () {
      return navigator.userAgent.match(/msie 8.0/i) == null ? false : true;
    },
    any: function () {
      return isPC.window() || isPC.mac();
    },
    check: function () {
      if (isPC.any()) {
        if (isPC.window()) $('html').addClass('window');
        if (isPC.mac()) $('html').addClass('mac');
        if (isPC.msie()) $('html').addClass('msie');
        if (isPC.ie11()) $('html').addClass('ie11');
        if (isPC.ie10()) $('html').addClass('ie10');
        if (isPC.ie9()) $('html').addClass('ie9');
        if (isPC.ie8()) $('html').addClass('ie8');
        if (isPC.edge()) {
          $('html').addClass('edge');
        } else if (isPC.opera()) {
          $('html').addClass('opera');
        } else if (isPC.chrome()) {
          $('html').addClass('chrome');
        } else if (isPC.safari()) {
          $('html').addClass('safari');
        } else if (isPC.firefox()) {
          $('html').addClass('firefox');
        }
      }
    }
  };

  // 디바이스 체크
  const device = {
    check: function () {
      isPC.check(); 
    }
  };

  const Html = {
    include: function (fn) {
      const $elements = $.find('*[data-include-html]');
      // const $fileName = location.pathname.split('/').pop();
      if ($elements.length) {
        // const $url = location.href;
        //if ($url.indexOf('http') >= 0) {
        if (location.host) {
          $.each($elements, function (i) {
            const $this = $(this);
            const $html = $this.data('include-html');
            const $htmlAry = $html.split('/');
            const $htmlFile = $htmlAry[$htmlAry.length - 1];
            const $docTitle = document.title;
            let $title = null;
            if ($docTitle.indexOf(' | ') > -1) {
              $title = $docTitle.split(' | ')[0];
            }
            $this.load($html, function (res, sta, xhr) {
              if (sta == 'success') {
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
    }
  };
  $(window).on('load', function(){
    tabReady();

  })
  const common = {
    init: function () {
      common.sidebar();
      common.menuActive();
      common.btnTop();
      uiTab();
      
      if($('.input-date').length > 0){
        common.calendar();
      }
      common.pageTitle();
      common.pagiNation();
    },
    
    sidebar: function () {
      
      $(document).on('click', '.btn-expand', function (e) {
        $('.kb-wrap').toggleClass('sidebar-off');
      });
      
      if(!$('.kb-lnb-dep1').children(":first-child").hasClass('active')){
        $('.kb-lnb-link').removeClass('open');
      }

      $(document).on('click', '.kb-lnb-dep1 .kb-lnb-link', function (e) {
        if($(this).hasClass('in-sub')){
          e.preventDefault();
          const $this = $(this);
          const $subMenu = $this.next();
          if ($this.hasClass('open')) {
            $this.removeClass('open');
            $subMenu.stop(true, false).slideUp(300);
          } else {
            $this.addClass('open');
            $subMenu.stop(true, false).slideDown(300);
            $this.parent().siblings().find('>.open').each(function(){
                const $open = $(this)
                $open.removeClass('open');
                $open.next().stop(true, false).slideUp(300);
            });
          }
        }
      });
      $(document).on('click', '.kb-lnb-dep2 .kb-lnb-link', function (e) {
        if($(this).hasClass('in-subDepth2')){
          e.preventDefault();
          const $this = $(this);
          const $subMenu = $this.next();

          if ($this.hasClass('open')) {
            $this.removeClass('open');
            $subMenu.stop(true, false).slideUp(300);
          } else {
            $this.addClass('open');
            $subMenu.stop(true, false).slideDown(300);
            $this.parent().siblings().find('>.open').each(function(){
              const $open = $(this)
              $open.removeClass('open');
              $open.next().stop(true, false).slideUp(300);
            });
          }
        }
      });

      // $(document).on('click', '.kb-lnb-dep1 .in-sub', function (e) {
      //   e.preventDefault();
      //   $(this).parent().addClass('open').siblings().removeClass('open');
      // });
    },
    menuActive: function () {
      if ($('.kb-sidebar').length) {
        const $linkDepth1 = $('.kb-lnb-dep1 .kb-lnb-link');
        const $lnbDepth2 = $('.kb-lnb-dep2 .kb-lnb-link');
        const $lnbDepth3 = $('.kb-lnb-dep3');
        const $path = location.pathname;
        const $title = $('.breadcrumb-item.active').length ? $('.breadcrumb-item.active').text() : $('.kb-title h1').text();
        
        $('.kb-lnb-dep2').hide();

        $linkDepth1.each(function () {
          const $this = $(this);
          const $text = $this.text();
          const $href = $this.attr('href').split('/').pop();

          // $('.kb-lnb-dep2 .kb-lnb-link').removeClass('open');
          if ($this.next('.kb-lnb-dep2').length) {

            $this.addClass('in-sub');
          }
          
          let isActive = false;
        
          if ($path.indexOf($href) > -1) {
            isActive = true;
          } else if ($text === $title) {
            isActive = true;
          }
          
          if (isActive) {
            // isActiveOn = true;
            
            $this.parents('li').addClass('active');
            $this.parents('li').children('.kb-lnb-dep2').show();
            $this.parent().addClass('active');
          }
          if($this.parents('li').hasClass('active')){
            
            $this.parents('li').children(':first-child').addClass('open test');
          }
        });

        $lnbDepth2.each(function () {
          const $this = $(this);

          if ($this.next('.kb-lnb-dep3').length) {
            $this.addClass('in-subDepth2');
          }
          
          if($this.children('li').hasClass('active')){
            $this.show();
          }
          if($this.parents('li').hasClass('active')){
            $this.parents('li').children(':first-child').children(':first-child').addClass('open');
          }
         
        });
        
        $lnbDepth3.each(function () {
          const $this = $(this);
          if($(this).children('li').hasClass('active')){
            $(this).show()
          }
        })

      }
    },
    calendar: function(){
      
      //var specificDate = new Date();
      pickmeup('.weekselect input', {
        select_year: false,
        select_month: false,
        mode: 'range',
        format: 'Y.m.d',
        render: function (date) {
          const specificDate = new Date(2022, 7, 14);// 월은 0부터 시작하여 + 1을 해야 원하는 달이 됨
          // 특정일 이전의 날짜 비활성화
          const isBeforeSpecificDate = date < specificDate;
          
          const renderObj = {
            disabled: isBeforeSpecificDate
          };

          return renderObj;
        }
      });
      // 주단위 선택 스크립트
      const $weekSelect = $('.weekselect');
      const datePickerWeek = document.querySelector('.weekselect input');

      if($weekSelect.length){
        datePickerWeek.addEventListener('pickmeup-change', function (e) {
          const dateRange = e.detail.formatted_date;

          if (dateRange.length === 2) {
            const startDate = new Date(dateRange[0]);
            const endDate = new Date(dateRange[1]);

            const firstDayOfWeek = new Date(startDate);
            firstDayOfWeek.setDate(startDate.getDate() - startDate.getDay() + 1);

            const lastDayOfWeek = new Date(endDate);
            lastDayOfWeek.setDate(endDate.getDate() + (6 - endDate.getDay() + 1));

            pickmeup('.weekselect input').clear();
            pickmeup('.weekselect input').set_date([firstDayOfWeek, lastDayOfWeek]);

            // pickmeup('.weekselect input').hide();
          }
        });
      }

      pickmeup('.daterange input', {
        // hide_on_select : true,
        mode: 'range',
        calendars: 2,
        format: 'Y.m.d',
        render: function (date) {
          const specificDate = new Date(2023, 7, 14);// 월은 0부터 시작하여 + 1을 해야 원하는 달이 됨
          // 특정일 이전의 날짜 비활성화
          const isBeforeSpecificDate = date < specificDate;

          const renderObj = {
            disabled: isBeforeSpecificDate
          };

          return renderObj;
        }
      });

      document.querySelector('.btn-currentDay').addEventListener('click', selectCurrentDay);
      document.querySelector('.btn-prevWeek').addEventListener('click', selectPreviousWeek);
      document.querySelector('.btn-prevMonth').addEventListener('click', selectPreviousMonth);
         
      pickmeup('.monthselect input', {
        select_year: false,
        select_day: false,
        format: 'Y.m'
      });

      pickmeup('.dayselect input', {
        // hide_on_select: true,
        format: 'Y.m.d'
      });
      // 이전 달 전체를 선택하는 함수
      function selectPreviousMonth() {

        var currentDate = new Date();

        var firstDayOfLastMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() - 30, 1);
        var lastDayOfLastMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 0);

        pickmeup('.daterange input').set_date([
          firstDayOfLastMonth,
          lastDayOfLastMonth
        ]);
        $('.btn-currentDay, .btn-prevWeek, .btn-prevMonth').removeClass('active');
        $('.btn-prevMonth').addClass('active');
        pickmeup('.daterange input').hide();
        pickmeup('.daterange input').show();
      }
      // 이전 주 전체를 선택하는 함수
      function selectPreviousWeek() {
        var currentDate = new Date();
        var firstDayOfWeek = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() - 6, 1);
        var lastDayOfWeek = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 0);
        
        pickmeup('.daterange input').set_date([
          firstDayOfWeek,
          lastDayOfWeek
        ]);
        $('.btn-currentDay, .btn-prevWeek, .btn-prevMonth').removeClass('active');
        $('.btn-prevWeek').addClass('active');
        pickmeup('.daterange input').hide();
        pickmeup('.daterange input').show();
      }

      // 현재 선택하는 함수
      function selectCurrentDay() {
        var currentDate = new Date();

        pickmeup('.daterange input').set_date([
          currentDate
        ]);
        $('.btn-currentDay, .btn-prevWeek, .btn-prevMonth').removeClass('active');
        $('.btn-currentDay').addClass('active');
        pickmeup('.daterange input').hide();
        pickmeup('.daterange input').show();
      }
    },
    btnTop: function () {
      const settings = {
        button: '#btnTop',
        text: '컨텐츠 상단으로 이동',
        min: 100,
        onClass: 'on',
        hoverClass: 'hover',
        scrollSpeed: 300
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
        $('body').append(btnHtml);

        $(document)
          .on('click', settings.button, function (e) {
            e.preventDefault();
            $('html, body').animate({ scrollTop: 0 }, settings.scrollSpeed);
          })
          .on('mouseenter', function () {
            $(settings.button).addClass(settings.hoverclass);
          })
          .on('mouseleave', function () {
            $(settings.button).removeClass(settings.hoverClass);
          });

        const btnTopOn = function () {
          $(settings.button).attr('aria-hidden', 'false').addClass(settings.onClass);
        };

        const btnTopOff = function () {
          $(settings.button).attr('aria-hidden', 'true').removeClass(settings.onClass);
        };

        $(window).on('scroll', function () {
          const $SclTop = $(this).scrollTop();
          if ($SclTop > settings.min) {
            btnTopOn();
          } else {
            btnTopOff();
          }
        });
      }
    },
    pagiNation: function (){
      $('.pagination a').click(function(){
        const $this = $(this);
        if($this.hasClass('disabled')){
          return false
        }
      })
    },
    pageTitle: function () {
      $(window).scroll(function () {
        const $SclTop = $(this).scrollTop();
        const $title = $('.kb-page-title');
        if ($title.length) {
          const $titleTop = $title.offset().top;
          const $headH = $('.kb-navbar').outerHeight() - 30;
          if ($SclTop > $titleTop - $headH) {
            $title.addClass('fixed');
          } else {
            $title.removeClass('fixed');
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
      $(document).on('change', '.table input.ui-tbl-chk-all', function () {
        const $wrap = $(this).closest('.table'),
          $chk = $wrap.find('input.ui-tbl-chk').not(':disabled');
        if ($(this).prop('checked')) {
          $chk.prop('checked', true).change();
        } else {
          $chk.prop('checked', false).change();
        }
      });
      //같은 name 속성값 끼리 체크
      $(document).on('change', '.table input.ui-tbl-chk-name', function () {
        const $wrap = $(this).closest('.table'),
          $name = $(this).attr('name'),
          $chk = $wrap.find('input.ui-tbl-chk[name='+ $name +']').not(':disabled');
          console.log($name)
        if ($(this).prop('checked')) {
          $chk.prop('checked', true).change();
        } else {
          $chk.prop('checked', false).change();
        }
      });
      $(document).on('change', '.table input.ui-tbl-chk', function () {
        const $wrap = $(this).closest('.table'),
          $tr = $(this).closest('tr'),
          $allChk = $wrap.find('input.ui-tbl-chk-all'),
          $chkLength = $wrap.find('input.ui-tbl-chk').not(':disabled').length,
          $checkedLength = $wrap.find('input.ui-tbl-chk:checked').length;

        if ($(this).prop('checked')) {
          $tr.addClass('tr-selected');
        } else {
          $tr.removeClass('tr-selected');
        }

        if ($chkLength == $checkedLength) {
          $allChk.prop('checked', true);
        } else {
          $allChk.prop('checked', false);
        }
      });
    }
  };
})(jQuery);

function popOpen(tar){	
  $('body').addClass('hidden popOpen');
  $(tar).addClass('opened');
	$(tar).fadeIn(300);
	// popPositin(tar,300);
	$(window).on('resizeEnd',function(){
		// popPositin(tar,300);
	})
  
}
function popupUI(){
  $('.pop-open').on('click',function(e) {
    e.preventDefault();
    var pop = $(this).attr('href');
    popOpen(pop);
  });
  $('.pop-close').on('click',function(e) {
    e.preventDefault();
    var pop = $(this).attr('href');
    $(pop + " #msgPop").empty();
    popClose(pop);
  });
}
function popPositin(tar,speed){
	var $wrapH = $(tar).height(),
		$pop = $(tar).find('.modal-content'),
		$popH = $pop.outerHeight(),
		$mT = Math.max(0,($wrapH-$popH)/2);
	if(speed > 100){
		$pop.stop().css({'margin-top':$mT});
	}else{
		$pop.css({'margin-top':$mT});
	}
}
function popClose(tar) {
  if($(".opened").length < 2){
    $('body').removeClass('hidden popOpen');
  }
  $(tar).fadeOut(500).removeClass('opened');
}

// Tab
function uiTab() {
  $('.ui_tab a').click(function (e) {
    if(!$(this).parents('.tab-list').hasClass('link-tab')){
      e.preventDefault();
      const $href = $(this).attr('href');
      $(this).parent().addClass('active').siblings().removeClass('active');
      $(this)
        .parent()
        .siblings()
        .each(function (e) {
          const $btn = $(this).find('a');
          const $btnHref = $btn.attr('href');
          $($btnHref).removeClass('active');
        });
      $($href).addClass('active');
    }
    tabLine($(this).closest('.ui_tab')); 
  });
}
function tabLine(wrap) {
  const $active = $(wrap).find('.tab.active');
  const $activeLeft = $active.position().left;
  const $activeWidth = $active.outerWidth();
  const $line = $(wrap).find('.tab_line');
  $line.stop().animate(
    {
      left: $activeLeft,
      width: $activeWidth
    },
    300
  );
}
function tabReady() {
  $('.ui_tab').each(function () {
    tabLine(this);
  });
}

$(window).resize(function () {
  tabReady();
});

(function () {
  'use strict';
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
    const jscriptVersion = new Function('/*@cc_on return @_jscript_version; @*/')();
    if (typeof jscriptVersion === 'undefined') {
      return 11;
    }
    if (jscriptVersion < 9) {
      return 8;
    }
    return jscriptVersion;
  }
  const ua = window.navigator.userAgent;
  if (ua.indexOf('Opera') > -1 || ua.indexOf('Presto') > -1) {
    return;
  }
  const emulated = emulatedIEMajorVersion();
  if (emulated === null) {
    return;
  }
  const nonEmulated = actualNonEmulatedIEMajorVersion();
  if (emulated !== nonEmulated) {
    window.alert(
      'WARNING: You appear to be using IE' +
        nonEmulated +
        ' in IE' +
        emulated +
        " emulation mode.\nIE emulation modes can behave significantly differently from ACTUAL older versions of IE.\nPLEASE DON'T FILE BOOTSTRAP BUGS based on testing in IE emulation modes!"
    );
  }
})();
