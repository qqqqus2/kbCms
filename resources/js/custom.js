(function ($) {
  'use strict';
  $(function () {
    const $elements = $.find('*[data-include-html]');
    if ($elements.length) {
      Html.include(uiInit);
    } else {
      uiInit();
    }
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
  const common = {
    init: function () {
      common.sidebar();
      common.menuActive();
      common.btnTop();
      common.pageTitle();
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
      });

      // $(document).on('click', '.kb-lnb-dep1 .in-sub', function (e) {
      //   e.preventDefault();
      //   $(this).parent().addClass('open').siblings().removeClass('open');
      // });
    },
    menuActive: function () {
      if ($('.kb-sidebar').length) {
        const $linkDepth1 = $('.kb-lnb-dep1 .kb-lnb-link');
        const $lnbDepth2 = $('.kb-lnb-dep2');
        const $lnbDepth3 = $('.kb-lnb-dep3');
        const $path = location.pathname;
        const $title = $('.breadcrumb-item.active').length ? $('.breadcrumb-item.active').text() : $('.kb-title h1').text();
        
        $linkDepth1.each(function () {
          const $this = $(this);
          const $text = $this.text();
          const $href = $this.attr('href').split('/').pop();

          // $linkDepth1.removeClass('open');
          if ($this.next('.kb-lnb-dep2').length) {

            $this.addClass('in-sub');
            if($this.parent().hasClass('active')){
              $this.addClass('open');
            }
            
            $this.next().show();
            // $this.siblings('.kb-lnb-dep2').children('.kb-lnb-dep3 li').hide();
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
            $this.siblings('.kb-lnb-link').addClass('open');
            $this.parent().addClass('active');
          }
          
        });

        $('.kb-lnb-dep2').hide();

        $lnbDepth2.each(function () {
          const $this = $(this);
          if($this.children('li').hasClass('active')){
            $this.show();
            $this.children('.kb-lnb-link').addClass('open')
          }
        })
        $lnbDepth3.each(function () {
          const $this = $(this);
          if($(this).children('li').hasClass('active')){
            $(this).show()
          }
        })

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
    pageTitle: function () {
      $(window).scroll(function () {
        const $SclTop = $(this).scrollTop();
        const $title = $('.kb-page-title');
        if ($title.length) {
          const $titleTop = $title.offset().top;
          const $headH = $('.kb-navbar').outerHeight();
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
      $(document).on('change', '.table input.ui-tbl-chk-all', function () {
        const $wrap = $(this).closest('.table'),
          $chk = $wrap.find('input.ui-tbl-chk').not(':disabled');
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

const Modal = {
  alertIdx: 0,
  alertHtml: function (type, msg, popId, btnActionId, btnCancelId) {
    const $html = '<article class="modal alert fade" id="' + popId + '" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">';
    $html += '<div class="modal-dialog modal-sm modal-dialog-centered modal-dialog-scrollable">';
    $html += '<div class="modal-content">';
    $html += '<div class="modal-body">';
    $html += '<div class="modal-messege">';
    $html += msg;
    $html += '</div>';
    $html += '</div>';
    $html += '<div class="modal-footer">';
    if (type === 'confirm') $html += '<button type="button" id="' + btnCancelId + '" class="btn btn-outline-dark">취소</button>';
    $html += '<button type="button" id="' + btnActionId + '" class="btn btn-primary">확인</button>';
    $html += '</div>';
    $html += '</div>';
    $html += '</div>';
    $html += '</article>';
    return $html;
  },
  alertEvt: function (type, msg, callback) {
    const $popId = 'modal-alert-' + Modal.alertIdx;
    const $btnActionId = 'modal-action-' + Modal.alertIdx;
    const $btnCancelId = 'modal-cancel-' + Modal.alertIdx;
    Modal.alertIdx += 1;
    const $html = Modal.alertHtml(type, msg, $popId, $btnActionId, $btnCancelId);
    const $layer = $($html);
    $('body').append($layer);
    $('#' + $popId).modal({
      backdrop: false
    });
    $('#' + $btnActionId + ', #' + $btnCancelId)
      .off('click')
      .on('click', function () {
        const $thisId = $(this).attr('id');
        $('#' + $popId)
          .modal('hide')
          .on('hidden.bs.modal', function (event) {
            $('#' + $popId).remove();
          });
        if (typeof callback === 'function') {
          if (type === 'confirm') {
            if ($thisId === $btnActionId) callback(true);
            else if ($thisId === $btnCancelId) callback(false);
            else callback();
          } else {
            callback();
          }
        }
      });
  },
  alert(msg, callback) {
    Modal.alertEvt('alert', msg, callback);
  },
  confirm(msg, callback) {
    Modal.alertEvt('confirm', msg, callback);
  }
};
