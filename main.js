const JSEncrypt = require('node-jsencrypt');
const axios = require('axios');
const md5 = require('md5');

async function login() {
    const publicKey = "-----BEGIN PUBLIC KEY-----MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDs/S8+O5yCcwypPNAQDmcVGY5UEa/iMNDFKcoovLFayhy3Jm/S1L8oYC85Rx8YwWOaQ9Zak0i6eb1AM2JDN7T9+pYb7mf4fzpE4BbXnAc3OqPwxEsNAsAsMKg6GhVxLu2/bfhrKOZ9Arvf6m/n0bGpfdJhIdom6iWh5iG4c+z5vwIDAQAB-----END PUBLIC KEY-----";
    const username = "13791486931"; // 替换为实际的用户名
    const password = "af0WCBfK$eG&LVWz"; // 替换为实际的密码
    const keeplogin = 1;
    const comouterTime = 1;
    const userNowTime = Math.floor(Date.now() / 1000); // 获取当前时间戳

    // RSA 加密
    const encryptor = new JSEncrypt();
    encryptor.setPublicKey(publicKey);
    const encryptedUsername = encryptor.encrypt(username);
    const formattedUsername = encryptedUsername.replace(/\s|\n|\r\n/g, "+");

    // MD5 加密密码
    const encryptedPassword = md5(password);

    // 发送请求
    try {
        const response = await axios.post('https://www.aipai.com/login.php', {
            action: 'loginNew',
            user: formattedUsername,
            password: encryptedPassword,
            keeplogin: keeplogin,
            comouterTime: comouterTime,
            userNowTime: userNowTime
        }, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                'Cookie': 'Hm_lvt_2b9a12f37be003e78fc59382e95f594b=1735828497; Hm_lvt_ff8778b8fc64ca7ae073bc03921a038d=1735828497; PHPSESSID=k09j02shk2h9kq30i74tta0t87; wvpfaaaa=0; lt=1735829263; Hm_lpvt_2b9a12f37be003e78fc59382e95f594b=1735830208; Hm_lpvt_ff8778b8fc64ca7ae073bc03921a038d=1735830208; com_img=ed8af57fea4b76dce70dd301b97dbea6',
                'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36',
                'X-Requested-With': 'XMLHttpRequest'
            }
        });

        console.log(response.data);
    } catch (error) {
        console.error('Error during login:', error);
    }
}

login();