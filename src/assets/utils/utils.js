export function validatePsd (rule, value, callback) {
  return callback()
}

export function validatePhone (rule, value, callback) {
  const reg = /^[1][3-9][0-9]{9}$/
  if (value === '' || value === undefined || value === null) {
    callback(new Error('请输入手机号码'))
  } else {
    if ((!reg.test(value)) && value !== '') {
      callback(new Error('请输入正确的电话号码'))
    } else {
      callback()
    }
  }
}

export function validateEMail (rule, value, callback) {
  if (value === '') {
    callback(new Error('请正确填写邮箱'))
  } else {
    if (value !== '') {
      var reg = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
      if (!reg.test(value)) {
        callback(new Error('请输入有效的邮箱'))
      }
    }
    callback()
  }
}
