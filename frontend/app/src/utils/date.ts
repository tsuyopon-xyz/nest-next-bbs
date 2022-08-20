import dayjs from 'dayjs';

export const formatDiffDateOnPost = (date: Date) => {
  const now = dayjs();
  const targetDate = dayjs(date);

  const diffSeconds = now.diff(targetDate, 'second');
  if (diffSeconds < 60) {
    return diffSeconds + '秒前';
  }

  const diffMinutes = now.diff(targetDate, 'minute');
  if (diffMinutes < 60) {
    return diffMinutes + '分前';
  }

  const diffHours = now.diff(targetDate, 'hour');
  if (diffHours < 24) {
    return diffHours + '時間前';
  }

  const diffDays = now.diff(targetDate, 'day');
  if (diffDays < 30) {
    return diffDays + '日前';
  }

  return targetDate.format('YYYY/MM/DD');
};
