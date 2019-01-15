export const getDateTimeStamp = (dateStr) => {
  return Date.parse(dateStr.replace(/-/gi,"/"));
}

export const getDateDiff = (dateStr) => {
  var publishTime = parseInt(new Date(dateStr).getTime()/1000),//getDateTimeStamp(dateStr)/1000,
      d_seconds,
      d_minutes,
      d_hours,
      d_days,
      d_months,
      d_years,
      timeNow = parseInt(new Date().getTime()/1000),
      d,

      date = new Date(publishTime*1000),
      Y = date.getFullYear(),
      M = date.getMonth() + 1,
      D = date.getDate(),
      H = date.getHours(),
      m = date.getMinutes(),
      s = date.getSeconds();
      //小于10的在前面补0
      if (M < 10) {
          M = '0' + M;
      }
      if (D < 10) {
          D = '0' + D;
      }
      if (H < 10) {
          H = '0' + H;
      }
      if (m < 10) {
          m = '0' + m;
      }
      if (s < 10) {
          s = '0' + s;
      }

  d = timeNow - publishTime;
  d_years = parseInt(d/(86400 * 365));
  d_months = parseInt(d/(86400 * 30));
  d_days = parseInt(d/86400);
  d_hours = parseInt(d/3600);
  d_minutes = parseInt(d/60);
  d_seconds = parseInt(d);

  if (d_years > 0) {
    return d_years + ' 年前';
  } else if (d_months > 0) {
    return d_months + ' 个月前';
  } else if (d_days > 0) {
    return d_days + ' 天前';
  } else if (d_hours > 0) {
    return d_hours + ' 小时前';
  } else if (d_minutes > 0) {
    return d_minutes + ' 分钟前';
  } else if (d_seconds < 60) {
    return '刚刚发表';
  } else {
    return Y + '-' + M + '-' + D + ' ' + H + ':' + m + ':00';
  }
} 