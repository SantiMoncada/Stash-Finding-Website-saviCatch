
const htmlDecode = str => {
    console.log("input test:", str)
    str = str.replaceAll('&#039;', "'");
    str = str.replaceAll('&quot;', '"');
    console.log("output test", str)
    return str;

}
module.exports = { htmlDecode }