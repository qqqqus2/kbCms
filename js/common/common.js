/*
@param str
@param isTrim
@return
*/
function isBlank(str, isTrim){
    if(str == null || str == undefined){
        return true;
    }
    str = str.toString();
    if((isTrim && str.trim() == '') || (!isTrim && str == '')){
        return true;
    }
    return false;
}
function isNotBlank(str, isTrim){    
    return !isBlank(str, isTrim)
}

var commonDatePrev1Year = moment().add(-364, 'days');
var commonDateToday = moment();

function alertMsg(msg, callback, param){
    var alertLayer = $('#_modalAlert_');
    $('.alert-msg', alertLayer).html(msg);
    popOpen(alertLayer);
    $('.modal-footer :last', alertLayer).focus();
    $('.pop-close', alertLayer).off('click').on('click', function(e){
        e.preventDefault();
        popClose(alertLayer);
        callback.call(this,param)
    });
}

function requiredCheck(obj){
    let val = $(obj).val();
    if($(obj).prop('tagName') == 'CHECKBOX'){
        val = $('input[name='+$(obj).attr('name')+']:checked').val();
    }else if($(obj).prop('tagName') == 'INPUT' && $(obj).prop('type').toUpperCase() == 'FILE'){
        val = $('input[type=file]').prop('files').length > 0 ? "1" : null;
    }
    return isNotBlank(val);
}

function cmmnDatePicker(obj){
    var start = moment().clone();
    var end = moment().clone();
    $(obj).daterangepicker({
        startDate: start,
        endDate: end,
        singleDatePicker: true,
        showDropdowns: true,
        timePicker: false,
        autoApply: true,
        locale: {
          format: 'YYYY-MM-DD',          
          cancelLabel: '오늘',                    
          daysOfWeek: ['일', '월', '화', '수', '목', '금', '토'],
          monthNames: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
          firstDay: 0
        }
        , isInvalidDate: function (start) {
            if(start.format('YYYY-MM-DD') <= "2022-07-31"){
                return true;
            }
        }
      });
      $(obj).on('show.daterangepicker', function(ev, picker){
        $(".daterangepicker .drp-buttons .btn.cancelBtn").attr("style", "display:inline");
        $(".daterangepicker .drp-buttons .btn.applyBtn").attr("style", "display:none");
      });
      $(obj).on('cancel.daterangepicker', function(ev, picker){
        $(this).val(moment().format('YYYY-MM-DD'));
      });
}

function getRangeDateValue(picker, start, end){
    let strtVal = isNotBlank($(picker).data('daterangepicker').startDate.format('YYYYMMDD'),true) && 'Invalid date' != $(picker).data('daterangepicker').startDate.format('YYYYMMDD') ? $(picker).data('daterangepicker').startDate.format('YYYYMMDD') : '';
    let endVal = isNotBlank($(picker).data('daterangepicker').endDate.format('YYYYMMDD'),true) && 'Invalid date' != $(picker).data('daterangepicker').endDate.format('YYYYMMDD') ? $(picker).data('daterangepicker').endDate.format('YYYYMMDD') : '';
    $(start).val(strtVal);
    $(end).val(endVal);
}
function getRangeDateValueNew(stPicker, edPicker, start, end){
    let strtVal = isNotBlank($(stPicker).data('daterangepicker').startDate.format('YYYYMMDD'),true) && 'Invalid date' != $(stPicker).data('daterangepicker').startDate.format('YYYYMMDD') ? $(stPicker).data('daterangepicker').startDate.format('YYYYMMDD') : '';
    let endVal = isNotBlank($(edPicker).data('daterangepicker').endDate.format('YYYYMMDD'),true) && 'Invalid date' != $(edPicker).data('daterangepicker').endDate.format('YYYYMMDD') ? $(edPicker).data('daterangepicker').endDate.format('YYYYMMDD') : '';
    $(start).val(strtVal);
    $(end).val(endVal);
}
function refreshRangeDateValue(picker){
    let dateRange = $(picker).val();
    if( !dateRange ){
        return false;
    }
    dateRange = dateRange.split($(picker).data('daterangepicker').locale.separator);
    let startDate = new Date(dateRange[0]);
    let endDate = new Date(dateRange[1]);
    $(picker).data('daterangepicker').setStartDate(startDate);
    $(picker).data('daterangepicker').setEndDate(endDate);
}
function clearRangeDateValue(picker){
    $(picker).data('daterangepicker').setStartDate(null);
    $(picker).data('daterangepicker').setEndDate(null);
    $(picker).val('');
}
function getDiffDateTime(date1, date2){
    let diff = 0;
    try{
        if(typeof date1 == 'string'){
            date1 = new Date(formatListDate(date1));
        }
        if(typeof date2 == 'string'){
            date2 = new Date(formatListDate(date2));
        }
        diff = date2.getTime() - date1.getTime();
    }catch(e){
        return 0;
    }
    return diff;
}
function getDiffDay(date1, date2){
    let diff = getDiffDateTime(date1, date2);
    if(diff == 0){
        return -1;
    }
    return diff / 1000 / 60 / 60 / 24;
}