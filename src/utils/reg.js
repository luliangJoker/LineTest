export default {
    //银行卡
    getCard(str) {
        return str.replace(/^(\d{4})\d+(\d{4})$/, "$1***$2")
    },
    //过滤数字
    getNumber(num) {
        num = parseFloat(num);
        num = num.toFixed(2);
        num = parseFloat(num);
        num = num.toLocaleString();
        // num = num + '.00';
        if (Math.round(num) === num) {
            num = num + '.00';
            return num;
        } else {
            return num;
        }
    },
    //电话号码
    getPhone(str) {
        return str.replace(/^(\d{4})\d+(\d{4})$/, "$1 *** $2")
    },
    //输入框只允许输入小数点后2位
    pushNumber(num) {
        return num.match(/^\d*(\.?\d{0,1})/g)[0]
    },
    //汉字的数字
    convertCurrency(money) { //汉字的数字

        var cnNums = new Array('零', '一', '二', '三', '四', '五', '六', '七', '八', '九'); //基本单位

        var cnIntRadice = new Array('', '十', '百', '千'); //对应整数部分扩展单位

        var cnIntUnits = new Array('', '万', '亿', '兆'); //对应小数部分单位

        var cnDecUnits = new Array('角', '分', '毫', '厘'); //整数金额时后面跟的字符

        var cnInteger = '整'; //整型完以后的单位

        var cnIntLast = '元'; //最大处理的数字

        var maxNum = 999999999999999.9999; //金额整数部分

        var integerNum; //金额小数部分

        var decimalNum; //输出的中文金额字符串

        var chineseStr = ''; //分离金额后用的数组，预定义

        var parts;
        if (money == '') {
            return '';
        }
        money = parseFloat(money);
        if (money >= maxNum) { //超出最大处理数字

            return '';
        }
        if (money == 0) {
            chineseStr = cnNums[0] + cnIntLast + cnInteger;
            return chineseStr;
        } //转换为字符串

        money = money.toString();
        if (money.indexOf('.') == -1) {
            integerNum = money;
            decimalNum = '';
        } else {
            parts = money.split('.');
            integerNum = parts[0];
            decimalNum = parts[1].substr(0, 4);
        } //获取整型部分转换

        if (parseInt(integerNum, 10) > 0) {
            var zeroCount = 0;
            var IntLen = integerNum.length;
            for (var i = 0; i < IntLen; i++) {
                var n = integerNum.substr(i, 1);
                var p = IntLen - i - 1;
                var q = p / 4;
                var m = p % 4;
                if (n == '0') {
                    zeroCount++;
                } else {
                    if (zeroCount > 0) {
                        chineseStr += cnNums[0];
                    } //归零

                    zeroCount = 0;
                    chineseStr += cnNums[parseInt(n)] + cnIntRadice[m];
                }
                if (m == 0 && zeroCount < 4) {
                    chineseStr += cnIntUnits[q];
                }
            }
            chineseStr += cnIntLast;
        } //小数部分

        if (decimalNum != '') {
            var decLen = decimalNum.length;
            for (var i = 0; i < decLen; i++) {
                var n = decimalNum.substr(i, 1);
                if (n != '0') {
                    chineseStr += cnNums[Number(n)] + cnDecUnits[i];
                }
            }
        }
        if (chineseStr == '') {
            chineseStr += cnNums[0] + cnIntLast + cnInteger;
        } else if (decimalNum == '') {
            chineseStr += cnInteger;
        }
        return chineseStr;
    }

}