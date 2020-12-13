const format_date = (date) => {
  let formated_date = new Date(date).toISOString().slice(0, 10)
  return formated_date
}

export default (context, inject) => {
  inject('format_date', format_date)
}