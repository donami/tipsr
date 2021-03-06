export const formatDate = (timestamp: string, includeTime = false) => {
  const date = new Date(+timestamp);
  let options = {};

  if (includeTime) {
    options = {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
    };
  }
  const formatted = new Intl.DateTimeFormat('en-GB', options).format(date);

  return formatted;
};

export const getReleaseYear = (date: string) => {
  return date ? new Date(date).getFullYear() : null;
};

export const slugify = (string: string) => {
  const a = 'àáäâãåăæçèéëêǵḧìíïîḿńǹñòóöôœøṕŕßśșțùúüûǘẃẍÿź·/_,:;';
  const b = 'aaaaaaaaceeeeghiiiimnnnooooooprssstuuuuuwxyz------';
  const p = new RegExp(a.split('').join('|'), 'g');
  return string
    .toString()
    .toLowerCase()
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(p, c => b.charAt(a.indexOf(c))) // Replace special characters
    .replace(/&/g, '-and-') // Replace & with ‘and’
    .replace(/[^\w\-]+/g, '') // Remove all non-word characters
    .replace(/\-\-+/g, '-') // Replace multiple - with single -
    .replace(/^-+/, '') // Trim - from start of text
    .replace(/-+$/, ''); // Trim - from end of text
};

export const isValidEmail = (email: string) => {
  // tslint:disable-next-line:max-line-length
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

export const truncate = (text: string, max: number) => {
  return text.substr(0, max - 1) + (text.length > max ? '...' : '');
};

export const createTitle = (text: string) => {
  return `${text} | Spot-movie.com`;
};
