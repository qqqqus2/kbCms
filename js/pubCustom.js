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
        // const $url = location.href; if ($url.indexOf('http') >= 0) {
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
  $(window).on('load', function () {
    tabReady();
  });
  const common = {
    init: function () {
      common.sidebar();
      common.menuActive();
      common.btnTop();

      if ($('.input-date').length > 0) {
        common.calendar();
      }
      common.pageTitle();
      common.pagiNation();
      common.searchToggle();
      //탭
      uiTab();

      //커스텀 셀렉트
      customSelect();
      uiSelect.UI();

      //툴팁
      tooltips();
    },

    searchToggle: function () {
      //검색바 열기 & 닫기
      $('.btn-searchToggle').each(function () {
        const $this = $(this);
        $this.on('click', function () {
          const title = $this.attr('title');
          $this.parents('.common-search').toggleClass('active');
          $this.siblings('.expand-condition').stop().slideToggle(300);
          $this.siblings('.selected-condition').stop().slideToggle(300);
          if (title == '닫힘') {
            $this.attr('title', '열기');
          } else {
            $this.attr('title', '닫기');
          }
        });
      });
    },

    sidebar: function () {
      $(document).on('click', '.btn-expand', function (e) {
        $('.kb-wrap').toggleClass('sidebar-off');
      });

      if (!$('.kb-lnb .kb-lnb-dep1').children(':first-child').hasClass('active')) {
        $('.kb-lnb .kb-lnb-link').removeClass('open');
      }

      $(document).on('click', '.kb-lnb .kb-lnb-dep1 .kb-lnb-link', function (e) {
        if ($(this).hasClass('in-sub')) {
          e.preventDefault();
          const $this = $(this);
          const $subMenu = $this.next();
          if ($this.hasClass('open')) {
            $this.removeClass('open');
            $subMenu.stop(true, false).slideUp(300);
          } else {
            $this.addClass('open');
            $subMenu.stop(true, false).slideDown(300);
            $this
              .parent()
              .siblings()
              .find('>.open')
              .each(function () {
                const $open = $(this);
                $open.removeClass('open');
                $open.next().stop(true, false).slideUp(300);
              });
          }
        }
      });
      $(document).on('click', '.kb-lnb .kb-lnb-dep2 .kb-lnb-link', function (e) {
        if ($(this).hasClass('in-subDepth2')) {
          e.preventDefault();

          const $this = $(this);
          const $subMenu = $this.next();

          if ($this.hasClass('open')) {
            $this.removeClass('open');
            $subMenu.stop(true, false).slideUp(300);
          } else {
            $this.addClass('open');
            $subMenu.stop(true, false).slideDown(300);
            $this
              .parent()
              .siblings()
              .find('>.open')
              .each(function () {
                const $open = $(this);
                $open.removeClass('open');
                $open.next().stop(true, false).slideUp(300);
              });
          }
        }
      });
    },
    menuActive: function () {
      if ($('.kb-sidebar').length) {
        const $linkDepth1 = $('.kb-lnb-dep1 .kb-lnb-link');
        const $lnbDepth2 = $('.kb-lnb-dep2 .kb-lnb-link');
        const $lnbDepth3 = $('.kb-lnb-dep3');
        const $path = location.pathname;
        const $title = $('.kb-title .page-tit').text();
        const $breadcrumbAvtive = $('.breadcrumb-item.active').text();

        $('.kb-lnb .kb-lnb-dep2').hide();

        $linkDepth1.each(function () {
          const $this = $(this);
          const $text = $this.text();
          if ($this.next('.kb-lnb-dep2').length) {
            $this.addClass('in-sub');
          }

          let isActive = false;

          if ($title && $text === $title) {
            isActive = true;
          } else if ($breadcrumbAvtive && $text === $breadcrumbAvtive) {
            isActive = true;
          }

          if (isActive) {
            $this.parents('li').addClass('active');
            $this.parents('li').children('.kb-lnb-dep2').show();
            $this.parent().addClass('active');
            if ($this.parents('li').hasClass('active')) {
              $this.parents('li.active').children('a:first-child').addClass('open');
            }
            return false;
          }
        });

        $lnbDepth2.each(function () {
          const $this = $(this);

          if ($this.next('.kb-lnb-dep3').length) {
            $this.addClass('in-subDepth2');
          }

          if ($this.children('li').hasClass('active')) {
            $this.show();
          }
          if ($this.parents('li').hasClass('active')) {
            $this.parents('li').children(':first-child').children(':first-child').addClass('open');
          }
        });

        $lnbDepth3.each(function () {
          const $this = $(this);
          if ($(this).children('li').hasClass('active')) {
            $(this).show();
          }
        });
      }
    },
    calendar: function () {
      var inValiDate = '2022-07-31'; // 이전 날짜는 전부 막음
      var monthInVali = [1, 2, 3, 4, 5, 6, 7, 8]; // 이전 월 막음

      var start = moment().clone();
      var end = moment().clone();

      $('.rangeToggle').on('click', function () {
        if ($(this).children('input').prop('checked')) {
          $('.posting-date').addClass('date-single').removeClass('range');
        } else {
          $('.posting-date').addClass('range').removeClass('date-single');
        }
      });

      $('.date-single input').daterangepicker({
        startDate: start,
        endDate: end,
        singleDatePicker: true,
        showDropdowns: true,
        timePicker: false,
        locale: {
          format: 'YYYY-MM-DD',
          direction: 'rtl',
          separator: ' ~ ',
          applyLabel: '확인',
          cancelLabel: '다시 선택',
          fromLabel: '부터',
          toLabel: '까지',
          customRangeLabel: 'Custom',
          daysOfWeek: ['일', '월', '화', '수', '목', '금', '토'],
          monthNames: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
          firstDay: 0
        }
      });

      //디폴트 초기값 빈값(월)
      $('.date-empty-single input').daterangepicker({
        // autoUpdateInput: false,
        startDate: start,
        endDate: end,
        singleDatePicker: true,
        showDropdowns: true,
        timePicker: false,
        locale: {
          format: 'YYYY-MM-DD',
          direction: 'rtl',
          separator: ' ~ ',
          applyLabel: '확인',
          cancelLabel: '다시 선택',
          fromLabel: '부터',
          toLabel: '까지',
          customRangeLabel: 'Custom',
          daysOfWeek: ['일', '월', '화', '수', '목', '금', '토'],
          monthNames: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
          firstDay: 0
        }
      });
      $('.date-empty-single input').on('apply.daterangepicker', function (ev, picker) {
        $(this).val(picker.endDate.format('YYYY-MM-DD'));
      });

      $('.date-empty-single input').on('cancel.daterangepicker', function () {
        $(this).val('');
      });
      $('.date-empty-range input').daterangepicker({
        // autoUpdateInput: false,
        startDate: start,
        endDate: moment().add(1, 'month'),
        singleDatePicker: false,
        showDropdowns: true,
        timePicker: false,
        locale: {
          format: 'YYYY-MM-DD',
          direction: 'rtl',
          separator: ' ~ ',
          applyLabel: '확인',
          cancelLabel: '다시 선택',
          fromLabel: '부터',
          toLabel: '까지',
          customRangeLabel: 'Custom',
          daysOfWeek: ['일', '월', '화', '수', '목', '금', '토'],
          monthNames: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
          firstDay: 0
        }
      });
      $('.date-empty-range input').on('apply.daterangepicker', function (ev, picker) {
        $(this).val(picker.startDate.format('YYYY-MM-DD') + '~' + picker.endDate.format('YYYY-MM-DD'));
      });

      $('.date-empty-range input').on('cancel.daterangepicker', function () {
        $(this).val('');
      });

      if ($('.input-date').hasClass('showUp')) {
        $('.date-single input').daterangepicker({
          drops: 'up',
          startDate: start,
          endDate: end,
          singleDatePicker: true,
          showDropdowns: true,
          timePicker: false,
          locale: {
            format: 'YYYY-MM-DD',
            direction: 'rtl',
            separator: ' ~ ',
            applyLabel: '확인',
            cancelLabel: '다시 선택',
            fromLabel: '부터',
            toLabel: '까지',
            customRangeLabel: 'Custom',
            daysOfWeek: ['일', '월', '화', '수', '목', '금', '토'],
            monthNames: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
            firstDay: 0
          }
        });
      }

      // 직접입력
      $('.range input').on('input', function () {
        // 입력 필드의 값을 가져옵니다.
        var inputValue = $(this).val();

        if (inputValue.length == 8) {
          $(this).val(inputValue + ' ');
        }

        if (inputValue.length === 16) {
          var startDate = inputValue.substring(0, 8); // 앞부분 8자리
          var endDate = inputValue.substring(8, 16); // 뒷부분 8자리
          var formattedDate = startDate + ' ~ ' + endDate;
          if (startDate < inValiDate) {
            $(this).val('');
            // alert(inValiDate + " 이후로 입력해 주세요.");
          } else {
            $(this).val(formattedDate);
          }
        }
        inputValue = inputValue.replace(/[^0-9]/g, '');
      });

      $('.range input').on('keydown', function (e) {
        // Backspace 키 (keyCode 8) 를 눌렀고 input 요소가 focus 상태인 경우
        if (e.keyCode === 8 && $(this).is(':focus')) {
          // 입력 값(value) 삭제
          $(this).val('');
          // Backspace 키의 기본 동작(이전 페이지로 이동) 막기
          e.preventDefault();
        }
      });

      function dateRange(inValiDate) {
        $('.range input').daterangepicker({
          showDropdowns: true,
          minYear: 2022,
          // maxYear: 2024,
          ranges: {
            'Last year': [moment().subtract(1, 'year').startOf('year'), moment().subtract(1, 'year').endOf('year')]
          },
          timePicker: false,
          locale: {
            format: 'YYYY-MM-DD',
            showDropdowns: true,
            direction: 'rtl',
            separator: ' ~ ',
            applyLabel: '확인',
            cancelLabel: '다시 선택',
            fromLabel: '부터',
            toLabel: '까지',
            customRangeLabel: 'Custom',
            daysOfWeek: ['일', '월', '화', '수', '목', '금', '토'],
            monthNames: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
            firstDay: 0
          },
          isInvalidDate: function (start) {
            // console.log(inValiDate);
            if (start.format('YYYY-MM-DD') <= inValiDate) {
              return true;
            }
          }
        });
        $('.range input').on('showCalendar.daterangepicker', function (ev, picker) {
          $('.daterangepicker .right select').prop('disabled', true);
        });
      }

      dateRange(inValiDate);

      $('.range input').on('cancel.daterangepicker', function (ev, picker) {
        $('.range input').val('');
      });

      $('.btn-Reset').on('click', function () {
        $('.range input').val('');
        $('.range input').attr('placeholder', '예) 20230101 20230109');
      });

      $('.btn-currentDay').on('click', function () {
        $('.range input').val(start.format('YYYY-MM-DD') + ' ~ ' + end.format('YYYY-MM-DD'));
        dateRange(inValiDate);
      });

      $('.btn-prevWeek').on('click', function () {
        var start = moment().subtract(6, 'days');

        $('.range input').val(start.format('YYYY-MM-DD') + ' ~ ' + end.format('YYYY-MM-DD'));
        dateRange(inValiDate);
      });

      // 1년 기간 선택 추가
      $('.btn-prevYear').on('click', function () {
        var start = moment().subtract(364, 'days');

        $('.range input').val(start.format('YYYY-MM-DD') + ' ~ ' + end.format('YYYY-MM-DD'));

        $('.range input').daterangepicker({
          startDate: moment().subtract(364, 'day'), // 오늘 날짜에서 1년 전
          endDate: moment(), // 오늘 날짜
          locale: {
            format: 'YYYY-MM-DD',
            showDropdowns: false,
            separator: ' ~ '
          },
          ranges: {
            '1년': [moment().subtract(364, 'day'), moment()]
          }
        });
      });

      // 전체 먼저 활성화 될 시
      if ($('.range').hasClass('allFirst')) {
        $('.range input').val('');
      }

      $('.btn-prevMonth').on('click', function () {
        var month = moment().format('MM');

        if (month === '2') {
          // 2월은 30일 미만인 경우
          var monthDate = 32;
        } else if (month === '4' || month === '6' || month === '9' || month === '11') {
          // 4, 6, 9, 11월은 30일인 경우
          var monthDate = 30;
        } else {
          // 나머지 월은 31일인 경우
          var monthDate = 29;
        }

        var start = moment().subtract(monthDate, 'days');

        $('.range input').val(start.format('YYYY-MM-DD') + ' ~ ' + end.format('YYYY-MM-DD'));
        dateRange(inValiDate);
      });

      monitoringDate(inValiDate);

      $('.monitoring-date input').val(start.format('YYYY.MM.DD'));

      function monitoringDate(inValiDate) {
        $('.prev-date').attr('disabled', false);
        $('.monitoring-date #datepicker').daterangepicker({
          startDate: start,
          endDate: end,
          minYear: 2022,
          singleDatePicker: true,
          showDropdowns: true,
          alwaysShowCalendars: true,
          timePicker: false,
          autoUpdateInput: true,
          opens: 'center',
          locale: {
            format: 'YYYY.MM.DD',
            direction: 'ltr',
            applyLabel: '확인',
            autoApply: true,
            // customRangeLabel: "Custom",
            daysOfWeek: ['일', '월', '화', '수', '목', '금', '토'],
            monthNames: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
            firstDay: 0
          },
          isInvalidDate: function (start) {
            // console.log(inValiDate);
            if (start.format('YYYY-MM-DD') <= inValiDate) {
              return true;
            }
          }
        });
      }
      function monitoringWeek(inValiDate) {
        $('.prev-date').attr('disabled', false);
        $('.monitoring-date #datepicker')
          .daterangepicker({
            startDate: moment().isoWeekday(1),
            endDate: moment().isoWeekday(7),
            singleDatePicker: true,
            minYear: 2023,
            timePicker: false,
            // maxSpan: {
            //     days: 0,
            // },
            opens: 'center',
            showDropdowns: true,
            autoUpdateInput: true,
            autoApply: true,
            locale: {
              format: 'YYYY.MM.DD',
              direction: 'ltr',
              separator: ' ~ ',
              applyLabel: '확인',
              cancelLabel: '다시 선택',
              fromLabel: '부터',
              toLabel: '까지',
              customRangeLabel: 'Custom',
              daysOfWeek: ['일', '월', '화', '수', '목', '금', '토'],
              monthNames: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
              firstDay: 0
            },
            isInvalidDate: function (start) {
              // console.log(inValiDate);
              if (start.format('YYYY-MM-DD') <= inValiDate) {
                return true;
              }
            }
          })
          .on('apply.daterangepicker', function (ev, picker) {
            //picker.endDate.isSame(picker.startDate);
            picker.startDate.isoWeekday(1); // startDate를 월요일로 설정
            picker.endDate.isoWeekday(7); // endDate를 일요일로 설정
            // 선택한 날짜를 적용
            $(this).val(picker.startDate.format('YYYY.MM.DD') + ' ~ ' + picker.endDate.format('YYYY.MM.DD'));
            // console.log($(this).val());
          })
          .on('hide.daterangepicker', function (ev, picker) {
            //picker.endDate.isSame(picker.startDate);
            picker.startDate.isoWeekday(1); // startDate를 월요일로 설정
            picker.endDate.isoWeekday(7); // endDate를 일요일로 설정
            // 선택한 날짜를 적용
            $(this).val(picker.startDate.format('YYYY.MM.DD') + ' ~ ' + picker.endDate.format('YYYY.MM.DD'));
            $('.prev-date').attr('disabled', false);
          });
      }
      function monitoringMonth(monthInVali) {
        var disabledMonths = monthInVali;

        $('.monitoring-date #monthpicker')
          .monthpicker({
            pattern: 'yyyy.mm',
            selectedYear: 2023 //
          })
          .bind('monthpicker-change-year', function (e, year) {
            // 2023년 이외의 년도
            if (year !== 2023) {
              var disabledMonths = [];
              $('.monitoring-date #monthpicker').monthpicker('disableMonths', disabledMonths);
            }
            if (year == 2023) {
              var disabledMonths = monthInVali;
              $('.monitoring-date #monthpicker').monthpicker('disableMonths', disabledMonths);
            }
          });
        $('.monitoring-date #monthpicker').monthpicker('disableMonths', disabledMonths);
      }

      function monitorCalendar() {
        const $monitorDate = $('.monitoring-date');
        $('.prev-date').attr('disabled', false);

        $('.prev-date').on('click', function (e) {
          const inValiDatePrev = new Date(inValiDate);
          const inValiDateYear = inValiDatePrev.getFullYear();
          const inValiDateMonth = (inValiDatePrev.getMonth() + 1).toString().padStart(2, '0'); // 월을 2자리 숫자로
          const inValiDateDay = (inValiDatePrev.getDate() + 1).toString().padStart(2, '0'); // 일을 2자리 숫자로

          // 시작 날짜
          const formattedStartDate = `${inValiDateYear}.${inValiDateMonth}.${inValiDateDay}`;

          if ($monitorDate.hasClass('month')) {
            // 현재 선택된 월 값을 가져옴
            var currentMonth = $('#monthpicker').val();

            //월 가져오기
            const inValiMonth = inValiDatePrev.getMonth() + 1;

            //월과 년도 조합
            const formattedDate = `${inValiDateYear}.${inValiMonth < 10 ? '0' : ''}${inValiMonth}`;
            const currentMonthCompare = new Date(currentMonth);
            const compareMonth = `${currentMonthCompare.getFullYear()}.${currentMonthCompare.getMonth() + 1 < 10 ? '0' : ''}${currentMonthCompare.getMonth() + 1}`;

            // 현재 선택된 월을 "yyyy.mm" 형식에서 분해
            var parts = currentMonth.split('.');
            var currentYear = parseInt(parts[0]);
            var currentMonthNum = parseInt(parts[1]);

            if (compareMonth === formattedDate) {
              //alert("이전 달로 검색할수 없습니다.");
            } else {
              if (currentMonthNum === 1) {
                // 1월인 경우 전년도 12월로 이동
                currentYear--;
                currentMonthNum = 12;
              } else {
                currentMonthNum--;
              }
            }

            //리셋
            $('#monthpicker').monthpicker('destroy');
            $('#monthpicker').val(currentYear + '.' + (currentMonthNum < 10 ? '0' : '') + currentMonthNum);

            let LastMonthhNum = currentMonthNum - 1;
            //console.log(currentMonthNum);
            if (currentMonthNum === 1) {
              LastMonthhNum = 12;
            }

            $('#date-hidden').val(currentYear + '.' + (LastMonthhNum < 10 ? '0' : '') + LastMonthhNum);

            monitoringMonth(monthInVali);
          } else if ($monitorDate.hasClass('week')) {
            // 7일 뒤의 날짜 계산
            const compareEndDate = new Date(inValiDatePrev);
            compareEndDate.setDate(inValiDatePrev.getDate() + 7);

            // 년도, 월, 일 가져오기
            const endYear = compareEndDate.getFullYear();
            const endMonth = (compareEndDate.getMonth() + 1).toString().padStart(2, '0'); // 월을 2자리 숫자로
            const endDay = compareEndDate.getDate().toString().padStart(2, '0'); // 일을 2자리 숫자로

            // 종료 날짜 포맷
            const formattedEndDate = `${endYear}.${endMonth}.${endDay}`;
            const compareRange = formattedStartDate + ' ~ ' + formattedEndDate;

            var dateRange = $('#datepicker').data('daterangepicker');

            var start = dateRange.startDate.subtract(1, 'weeks').isoWeekday(1);
            var end = dateRange.endDate.subtract(1, 'weeks').isoWeekday(7);
            var weekrange = start.format('YYYY.MM.DD') + ' ~ ' + end.format('YYYY.MM.DD');
            var lastStart = start.clone().subtract(1, 'weeks');
            var lastEnd = end.clone().subtract(1, 'weeks');

            $('#datepicker').val(dateRange.startDate.format('YYYY.MM.DD') + ' ~ ' + dateRange.endDate.format('YYYY.MM.DD'));
            // $("#datepicker").val(weekrange);
            $('#date-hidden').val(lastStart.format('YYYY.MM.DD') + ' ~ ' + lastEnd.format('YYYY.MM.DD'));

            if (compareRange === $('#datepicker').val()) {
              // alert("이전 주로는 검색할수 없습니다.");
              $(this).attr('disabled', true);
            }
          } else {
            var dateRange = $('#datepicker').data('daterangepicker');

            var start = dateRange.startDate.subtract(1, 'days');
            var end = dateRange.endDate.subtract(1, 'days');

            $('#datepicker').val(start.format('YYYY.MM.DD'));

            var lastStart = start.clone().subtract(1, 'days');

            $('#date-hidden').val(lastStart.format('YYYY.MM.DD'));

            if (formattedStartDate === start.format('YYYY.MM.DD')) {
              // alert("이전 일로는 검색할수 없습니다.")
              $(this).attr('disabled', true);
            }
          }
        });

        $('.next-date').on('click', function () {
          $('.prev-date').attr('disabled', false);
          if ($monitorDate.hasClass('month')) {
            // 현재 선택된 월 값을 가져옴
            var currentMonth = $('#monthpicker').val();

            // 현재 선택된 월을 "yyyy.mm" 형식에서 분해
            var parts = currentMonth.split('.');
            var currentYear = parseInt(parts[0]);
            var currentMonthNum = parseInt(parts[1]);
            // 다음 월로 이동
            if (currentMonthNum === 12) {
              // 12월인 경우 다음년도 1월로 이동
              currentYear++;
              currentMonthNum = 1;
            } else {
              currentMonthNum++;
            }
            //리셋
            $('#monthpicker').monthpicker('destroy');

            $('#monthpicker').val(currentYear + '.' + (currentMonthNum < 10 ? '0' : '') + currentMonthNum);
            monitoringMonth(monthInVali);

            $('#date-hidden').val(currentMonth);
            // console.log($("#date-hidden").val());
          } else if ($monitorDate.hasClass('week')) {
            var dateRange = $('#datepicker').data('daterangepicker');

            var start = dateRange.startDate.add(1, 'weeks').isoWeekday(1);
            var end = dateRange.endDate.add(1, 'weeks').isoWeekday(7);

            var weekrange = start.format('YYYY.MM.DD') + ' ~ ' + end.format('YYYY.MM.DD');
            $('#datepicker').val(weekrange);

            var lastStart = start.clone().subtract(1, 'weeks');
            var lastEnd = end.clone().subtract(1, 'weeks');

            $('#date-hidden').val(lastStart.format('YYYY.MM.DD') + ' ~ ' + lastEnd.format('YYYY.MM.DD'));

            // console.log($("#date-hidden").val());
          } else {
            var dateRange = $('#datepicker').data('daterangepicker');

            var start = dateRange.startDate.add(1, 'days');
            var end = dateRange.endDate.add(1, 'days');

            $('#datepicker').val(start.format('YYYY.MM.DD'));

            var lastStart = start.clone().subtract(1, 'days');

            $('#date-hidden').val(lastStart.format('YYYY.MM.DD'));
            // console.log($("#date-hidden").val());
          }
        });

        //일단위
        $('.btn-today').on('click', function () {
          $('.btn-today, .btn-week, .btn-month').removeClass('active');
          $(this).addClass('active');
          $('.daterangepicker').addClass('monitoring-day');
          $('.monitoring-date').removeClass('week month').addClass('day');

          $('#datepicker').val(end.format('YYYY.MM.DD'));
          $('#date-hidden').val(end.subtract(1, 'days').format('YYYY.MM.DD'));
          //console.log($("#date-hidden").val());

          monitoringDate(inValiDate);
        });

        //주단위
        $('.btn-week').on('click', function () {
          $('.btn-today, .btn-week, .btn-month').removeClass('active');
          $(this).addClass('active');

          $('.daterangepicker').addClass('monitoring-week');

          $('.monitoring-date').removeClass('day month').addClass('week');

          monitoringWeek(inValiDate);

          var dateRange = $('#datepicker').data('daterangepicker');
          dateRange.startDate.isoWeekday(1);
          dateRange.endDate.isoWeekday(7);

          $('#datepicker').val(dateRange.startDate.format('YYYY.MM.DD') + ' ~ ' + dateRange.endDate.format('YYYY.MM.DD'));

          $('#date-hidden').val(dateRange.startDate.clone().subtract(1, 'weeks').format('YYYY.MM.DD') + ' ~ ' + dateRange.endDate.clone().subtract(1, 'weeks').format('YYYY.MM.DD'));
          // console.log($("#date-hidden").val())
        });

        //월단위
        $('.btn-month').on('click', function () {
          $('.btn-today, .btn-week, .btn-month').removeClass('active');
          $(this).addClass('active');

          $('.monitoring-date').removeClass('day week').addClass('month');

          $('#monthpicker').monthpicker('destroy');

          $('#monthpicker').val(end.format('YYYY.MM'));
          $('#date-hidden').val(end.clone().subtract(1, 'months').format('YYYY.MM'));

          // console.log(end.clone().subtract(1, 'months').format("YYYY.MM"));
          monitoringMonth(monthInVali);
        });
      }
      monitorCalendar();
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
      const btnHtml = '<a href="#" id="' + settings.button.substring(1) + '" class="btn-scl-top" title="' + settings.text + '" role="butt' + 'on" aria-label="' + settings.text + '"><i class="bi bi-arrow-up-short"></i></a>';
      if (!$(settings.button).length) {
        $('body').append(btnHtml);

        $(document)
          .on('click', settings.button, function (e) {
            e.preventDefault();
            $('html, body').animate(
              {
                scrollTop: 0
              },
              settings.scrollSpeed
            );
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
    pagiNation: function () {
      $('.pagination a').click(function () {
        const $this = $(this);
        if ($this.hasClass('disabled')) {
          return false;
        }
      });
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
    }
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
          $chk = $wrap.find('input.ui-tbl-chk[name=' + $name + ']').not(':disabled');
        // console.log($name);
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

function popOpen(tar) {
  $('body').addClass('hidden popOpen');
  //$('body').addClass('popOpen');
  $(tar).addClass('opened');
  $(tar).fadeIn(300);
  // popPositin(tar,300);
  $(window).on('resizeEnd', function () {
    // popPositin(tar,300);
  });
  // 팝업창 열리면 팝업내에 스크롤 상단으로
  $('.modal-body .inner-scroll').each(function () {
    $(this).scrollTop(0);
  });
}
function popSeparated(tar) {
  $('body').addClass('hidden popOpen');
  $(tar).addClass('opened');
  $(tar).fadeIn(300);
}
function popupUI() {
  $('.pop-open').on('click', function (e) {
    e.preventDefault();
    var pop = $(this).attr('href');
    popOpen(pop);
  });
  $('.pop-close').on('click', function (e) {
    e.preventDefault();
    var pop = $(this).attr('href');
    $(pop + ' #msgPop').empty();
    popClose(pop);
  });
  //팝업 백그라운드 있을때
  $('.modal-bg').on('click', function () {
    $('body').removeClass('hidden popOpen');
    $('.modal').fadeOut(500).removeClass('opened');
  });
}
function popPositin(tar, speed) {
  var $wrapH = $(tar).height(),
    $pop = $(tar).find('.modal-content'),
    $popH = $pop.outerHeight(),
    $mT = Math.max(0, ($wrapH - $popH) / 2);
  if (speed > 100) {
    $pop.stop().css({ 'margin-top': $mT });
  } else {
    $pop.css({ 'margin-top': $mT });
  }
}
function popClose(tar) {
  if ($('.opened').length < 2) {
    $('body').removeClass('hidden popOpen');
  }
  $(tar).fadeOut(500).removeClass('opened');
  $('#_modalConfirm_').removeClass('w-500');
}

function windPop(url) {
  window.open(url, '_blank');
}

// Tab
function uiTab() {
  $('.ui_tab a').click(function (e) {
    if (!$(this).parents('.tab-list').hasClass('link-tab')) {
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
  $('.ajax-tab li').on('click', function () {
    $(this).addClass('active').siblings().removeClass('active');
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
    window.alert('WARNING: You appear to be using IE' + nonEmulated + ' in IE' + emulated + ' em' + 'ulation mode.\nIE emulation modes can behave significantly differently from AC' + "TUAL older versions of IE.\nPLEASE DON'T FILE BOOTSTRAP BUGS based on testing " + 'in IE emulation modes!');
  }
})();

//툴 팁
function tooltips() {
  $('.tooltips').each(function () {
    const $this = $(this);
    const $msg = $('.msg');

    $this.children('.btn-tooltips').click(function () {
      $msg.hide();
      $this.children($msg).show();
    });
    $this.find('.btn-tipClose').click(function () {
      $msg.hide();
    });

    $('body').on('click', function (event) {
      var clickedElement = $(event.target);

      if (!clickedElement.hasClass('btn-tooltips')) {
        $msg.hide();
      }
    });
  });
}

// 커스텀 셀렉트
function customSelect() {
  uiSelect.ready();
}

const uiSelect = {
  class: {
    init: 'init',
    wrap: 'custom-select',
    disabled: 'disabled',
    btn: 'custom-select-btn',
    btnActive: 'open',
    options: 'custom-select-options',
    option: 'custom-select-option',
    optionSelected: 'selected'
  },
  ready: function () {
    const customSelects = document.querySelectorAll('.' + uiSelect.class.wrap);
    if (!customSelects.length) return;

    customSelects.forEach(function (_select) {
      if (_select.closest('#__selectBoxTemp')) return; // 예외처리
      if (_select.closest('.readOnlyCase')) return; // 예외처리 2

      const selElmnt = _select.querySelector('select');
      uiSelect.changeEvt(selElmnt);
      selElmnt.classList.add(uiSelect.class.init);
      if (typeof jQuery != 'undefined') {
        $(selElmnt).off('change', uiSelect.changeEvt);
        $(selElmnt).on('change', uiSelect.changeEvt);
      } else {
        selElmnt.removeEventListener('change', uiSelect.changeEvt);
        selElmnt.addEventListener('change', uiSelect.changeEvt);
      }
    });
  },
  changeEvt: function (e) {
    const selElmnt = e.type === 'change' ? e.target : e;
    if (!selElmnt) return;
    const _select = selElmnt.closest('.' + uiSelect.class.wrap);
    if (selElmnt.disabled) _select.classList.add(uiSelect.class.disabled);
    else _select.classList.remove(uiSelect.class.disabled);
    uiSelect.btn(_select);
  },
  btn: function (el) {
    const selElmnt = el.querySelector('select');
    const seletedIndex = selElmnt.selectedIndex;
    const selValue = selElmnt.value;
    let btn = el.querySelector('.' + uiSelect.class.btn);
    if (!btn) {
      const Html = document.createElement('button');
      Html.type = 'button';
      Html.className = uiSelect.class.btn;
      el.appendChild(Html);
      btn = Html;
    }
    if (selElmnt.disabled) btn.disabled = true;
    else btn.disabled = false;

    if (seletedIndex >= 0) {
      const btnTxt = selElmnt.options[seletedIndex].innerHTML;
      btn.innerHTML = btnTxt;
      btn.dataset.value = selValue;
      btn.dataset.index = seletedIndex;
    }
  },
  options: function (el) {
    const selElmnt = el.querySelector('select');
    const seletedIndex = selElmnt.selectedIndex;
    let options = el.querySelector('.' + uiSelect.class.options);
    if (!options) {
      const Html = document.createElement('div');
      Html.className = uiSelect.class.options;
      el.appendChild(Html);
      options = Html;
    }
    let optionsHtml = '';
    const selOptions = selElmnt.options;
    if (selOptions.length) {
      Array.from(selOptions).forEach(function (option, i) {
        const selected = i === seletedIndex ? ' ' + uiSelect.class.optionSelected : '';
        const disabled = option.disabled ? ' disabled' : '';
        optionsHtml += '<button type="button" class="' + uiSelect.class.option + selected + '" data-value="' + option.value + '" data-index="' + i + '"' + disabled + '>' + option.textContent + '</button>';
      });
    }
    options.innerHTML = optionsHtml;
  },
  position: function () {
    const customSelect = document.querySelectorAll('.' + uiSelect.class.wrap);
    if (!customSelect.length) return;
    customSelect.forEach(function (_select) {
      if (_select.classList.contains('fixed')) {
        const selectWidth = _select.offsetWidth;
        const selectHeight = _select.offsetHeight;
        const selectLeft = getOffset(_select).left;
        const selectTop = getOffset(_select).top;
        const items = _select.querySelector('.' + uiSelect.class.options);
        if (items && isElementVisible(_select)) {
          items.style.minWidth = selectWidth + 'px';
          items.style.left = selectLeft + 'px';
          items.style.top = selectTop + selectHeight + 'px';
        }
      }
    });
  },
  close: function (el) {
    const selectBtn = document.querySelectorAll('.' + uiSelect.class.btn + '.' + uiSelect.class.btnActive);
    if (!selectBtn.length) return;
    selectBtn.forEach(function (_btn) {
      if (_btn !== el) _btn.classList.remove(uiSelect.class.btnActive);
    });
  },
  clickOption: function (el) {
    const $el = el;
    const $idx = $el.dataset.index;
    const $wrap = $el.closest('.' + uiSelect.class.wrap);
    const $options = $el.closest('.' + uiSelect.class.options);
    const selElmnt = $wrap.querySelector('select');
    if (selElmnt && $idx >= 0 && $idx < selElmnt.options.length) {
      selElmnt.selectedIndex = $idx;
      if (typeof jQuery != 'undefined') $(selElmnt).change();
      else selElmnt.dispatchEvent(new Event('change'));
      $options.remove();
      // uiSelect.options($wrap);
    }
  },
  UI: function () {
    document.addEventListener('click', function (e) {
      const $target = e.target;
      if ($target.classList.contains(uiSelect.class.btn)) {
        e.preventDefault();
        uiSelect.close($target);
        $target.classList.toggle(uiSelect.class.btnActive);
        const $select = $target.closest('.' + uiSelect.class.wrap);
        uiSelect.options($select);
        uiSelect.position();
      } else {
        uiSelect.close();
      }

      if ($target.classList.contains(uiSelect.class.option)) {
        e.preventDefault();
        uiSelect.clickOption($target);
      }
    });
    window.addEventListener('resize', uiSelect.position);
  }
};

function getOffset(element) {
  let $el = element;
  let $elX = 0;
  let $elY = 0;
  let isSticky = false;
  while ($el && !Number.isNaN($el.offsetLeft) && !Number.isNaN($el.offsetTop)) {
    let $style = window.getComputedStyle($el);
    if ($style.position === 'sticky') {
      isSticky = true;
      $el.style.position = 'static';
    }
    $elX += $el.offsetLeft;
    $elY += $el.offsetTop;
    if (isSticky) {
      isSticky = false;
      $el.style.position = '';
      if ($el.getAttribute('style') === '') $el.removeAttribute('style');
    }
    $el = $el.offsetParent;
    if ($el !== null) {
      $style = window.getComputedStyle($el);
      $elX += parseInt($style.borderLeftWidth);
      $elY += parseInt($style.borderTopWidth);
    }
  }
  return { left: $elX, top: $elY };
}

function isElementVisible(element) {
  const computedStyle = getComputedStyle(element);
  const displayValue = computedStyle.getPropertyValue('display');
  if (displayValue === 'none') return false;
  let parent = element.parentElement;
  while (parent) {
    const parentDisplayValue = window.getComputedStyle(parent).getPropertyValue('display');
    if (parentDisplayValue === 'none') return false;
    parent = parent.parentElement;
  }
  return true;
}

function findScrollableClosest(element) {
  let parent = element.parentElement;
  while (parent) {
    const isScrollable = parent.scrollHeight > parent.clientHeight;
    const position = window.getComputedStyle(parent).getPropertyValue('position');
    if (isScrollable && position !== 'static') return parent;
    parent = parent.parentElement;
  }
  return null;
}

/* 변상우 수석님이 넣으라고 허락함 _2023.11.20 */
function getDateDiff(d1, d2) {
  var date1 = new Date(d1);
  var date2 = new Date(d2);

  var diffDate = Math.abs(date2.getTime() - date1.getTime());

  return Math.ceil(diffDate / (1000 * 60 * 60 * 24));
}
