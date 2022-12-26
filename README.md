# 爱拍网登录

目标网址：

```
https://www.aipai.com/
```

登录的时候有个用户名和密码参数都是被加密的：

![image-20221227025039395](README.assets/image-20221227025039395.png)

通过请求的Initiator直接定位到登录的代码的位置：

![image-20221227025118843](README.assets/image-20221227025118843.png)

可以看到参数是怎么构造的：

![image-20221227025200577](README.assets/image-20221227025200577.png)

密码其实就是对原始密码进行一次MD5，这个没什么好说的。

然后就是用户名：

```js
        var publicKey = '-----BEGIN PUBLIC KEY-----MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDs/S8+O5yCcwypPNAQDmcVGY5UEa/iMNDFKcoovLFayhy3Jm/S1L8oYC85Rx8YwWOaQ9Zak0i6eb1AM2JDN7T9+pYb7mf4fzpE4BbXnAc3OqPwxEsNAsAsMKg6GhVxLu2/bfhrKOZ9Arvf6m/n0bGpfdJhIdom6iWh5iG4c+z5vwIDAQAB-----END PUBLIC KEY-----'
        // Encrypt with the public key...
        var encrypt = new JSEncrypt();
        encrypt.setPublicKey(publicKey);
        var encrypted = encrypt.encrypt(user);
        var encryptedStr = encrypted.replace(/\s|\n|\r\n/g, '+')
        
```

是一个RSA加密，并且公钥都放在这里了，就没啥好说的了，分析完毕。

























 