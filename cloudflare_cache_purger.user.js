// ==UserScript==
// @name         Cloudflare 缓存清理
// @namespace    https://github.com/JsBeta/cloudflare-cache-purge/
// @version      1.0.0
// @description  一次点击清除当前页面资源在Cloudflare中的缓存！
// @author       xuwei
// @license MIT
// @downloadURL  https://raw.githubusercontent.com/JsBeta/cloudflare-cache-purge/main/cloudflare_cache_purger.user.js
// @updateURL    https://raw.githubusercontent.com/JsBeta/cloudflare-cache-purge/main/cloudflare_cache_purger.user.js
// @connect      api.cloudflare.com
// @match        *://*/*
// @grant        GM_registerMenuCommand
// @grant        GM_xmlhttpRequest
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_addStyle
// ==/UserScript==

(function() {
    'use strict';
    // 配置信息
    let config = {
        apiToken: GM_getValue('cfApiToken', ''),
    };

    // 添加配置菜单
    GM_registerMenuCommand('Configure Cloudflare API', function() {
        const apiToken = prompt('请输入您的 Cloudflare API Token:', config.apiToken);
        if (apiToken !== null) {
            GM_setValue('cfApiToken', apiToken);
            config.apiToken = apiToken;
        }
    });

    // 添加清除缓存菜单和页面按钮
    GM_registerMenuCommand('清除当前缓存', purgeCurrentPageCache);


    // 创建悬浮按钮
    function createPurgeButton() {
    const btn = document.createElement('button');
    btn.id = 'cf-purge-btn';
    btn.textContent = '清除缓存';
    btn.style = `
        position: absolute;
        top: 20px;
        left: 20px;
        padding: 12px 24px;
        background: #F48400;
        color: white;
        border: none;
        border-radius: 4px;
        box-shadow: 0 2px 6px rgba(0,0,0,0.2);
        z-index: 9999;
        user-select: none;
        -webkit-user-select: none;
    `;

    let isDragging = false;
    let offsetX = 0, offsetY = 0;
    let hasDragged = false; // 新增标志位，用于判断是否发生过拖动

    btn.addEventListener('mousedown', function(e) {
        isDragging = true;
        hasDragged = false; // 每次按下时重置拖动标志
        offsetX = e.clientX - btn.getBoundingClientRect().left;
        offsetY = e.clientY - btn.getBoundingClientRect().top;
        if (e.pointerId) {
          btn.setPointerCapture(e.pointerId);
        }
    });

    document.addEventListener('mousemove', function(e) {
        if (isDragging) {
            btn.style.left = `${e.clientX - offsetX}px`;
            btn.style.top = `${e.clientY - offsetY}px`;
            hasDragged = true; // 发生移动时标记为已拖动
        }
    });

    document.addEventListener('mouseup', function() {
        isDragging = false;
    });

    btn.addEventListener('click', function(e) {
        if (!hasDragged) {
            purgeCurrentPageCache(); // 只有未发生拖动时才执行点击操作
        }
        hasDragged = false; // 每次点击后重置标志
    });

    setTimeout(() => {
        if (!document.getElementById('cf-purge-btn')) {
            document.body.appendChild(btn);
        }
    }, 1000);
}
    // 初始化按钮
    createPurgeButton();

    // 修改验证配置
    function validateConfig() {
        if (!config.apiToken) {
            alert('请先配置Cloudflare API Token.');
            return false;
        }
        return true;
    }

    // 修改getZoneId函数
    // 在getZoneId函数中添加调试输出
    async function getZoneId(domain) {
        return new Promise((resolve) => {
            console.log('正在获取域名:', domain);
            GM_xmlhttpRequest({
                method: 'GET',
                url: `https://api.cloudflare.com/client/v4/zones?name=${domain}`,
                headers: {
                    'Authorization': `Bearer ${config.apiToken}`,
                    'Content-Type': 'application/json'
                },
                onload: function(response) {
                    console.log('API响应状态:', response.status);
                    const data = JSON.parse(response.responseText);
                    console.log('完整API响应:', data);
                    if (data.result) {
                      resolve(data.result[0]?.id);
                    } else {
                      resolve(null);
                    }
                },
                onerror: function(error) {
                    console.error('获取Zone ID失败:', error);
                    resolve(null);
                }
            });
        });
    }

    // 修改清除缓存函数
    // 在purgeCurrentPageCache中添加阶段标记
    async function purgeCurrentPageCache() {
        console.log('开始清除缓存流程');
        if (!validateConfig()) return;
        let domain = new URL(window.location.href).hostname;
        // 去除domain的www前缀
        domain = domain.replace(/^www\./, '');
        console.log('解析出的域名:', domain);
        const zoneId = await getZoneId(domain);
        if (!zoneId) {
            alert('未找到该域名对应的Cloudflare zone');
            return;
        }

        // 使用动态zoneId发送请求...
        await purgeCache(zoneId)
    }
    // 清除当前页面缓存
    function purgeCache(zongeId) {
       

        const currentUrl = window.location.href;
        const apiUrl = `https://api.cloudflare.com/client/v4/zones/${zongeId}/purge_cache`;

        GM_xmlhttpRequest({
            method: 'POST',
            url: apiUrl,
            headers: {
                'Authorization': `Bearer ${config.apiToken}`,
                'Content-Type': 'application/json'
            },
            data: JSON.stringify({
                files: [currentUrl]
            }),
            onload: function(response) {
                const result = JSON.parse(response.responseText);
                if (result.success) {
                    alert('缓存清理成功!');
                    // 刷新当前页面
                    window.location.reload();
                } else {
                    alert('Failed to purge cache: ' + (result.errors?. [0]?.message || 'Unknown error'));
                }
            },
            onerror: function(error) {
                alert('Error purging cache: ' + error.responseText);
            }
        });
    }
    // 清除所有缓存
    function purgeEverything() {
        if (!validateConfig()) return;

        const apiUrl = `https://api.cloudflare.com/client/v4/zones/${config.zoneId}/purge_cache`;

        GM_xmlhttpRequest({
            method: 'POST',
            url: apiUrl,
            headers: {
                'Authorization': `Bearer ${config.apiToken}`,
                'Content-Type': 'application/json'
            },
            data: JSON.stringify({
                purge_everything: true
            }),
            onload: function(response) {
                const result = JSON.parse(response.responseText);
                if (result.success) {
                    alert('All cache purged successfully!');
                } else {
                    alert('Failed to purge cache: ' + (result.errors ?. [0]?.message || 'Unknown error'));
                }
            },
            onerror: function(error) {
                alert('Error purging cache: ' + error.responseText);
            }
        });
    }

})();
