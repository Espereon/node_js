function genRandomPassword(len) {
    if (len >= 5) return Math.random().toString(36).slice(-len)
    else console.log('Слишком короткий пароль');
};

module.exports = { genRandomPassword };